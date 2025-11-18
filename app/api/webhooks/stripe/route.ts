import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { generateCertificate, formatCertificateDate } from '@/lib/certificate-generator';
import { sendCertificateEmail, sendAdminNotification } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

// MPA data for location lookups
const MPA_DATA: Record<string, { location: string; coordinates: string }> = {
  'ras-mohammed': {
    location: 'South Sinai, Egypt',
    coordinates: '27.8°N, 34.2°E',
  },
  'giftun-islands': {
    location: 'Hurghada, Red Sea, Egypt',
    coordinates: '27.2°N, 33.9°E',
  },
  'wadi-el-gemal': {
    location: 'Marsa Alam, Red Sea, Egypt',
    coordinates: '24.7°N, 35.1°E',
  },
};

/**
 * Stripe webhook handler - processes payment completion events
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    console.error('Missing Stripe signature');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const error = err as Error;
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log('✅ Payment completed for session:', session.id);
    console.log('📦 Session metadata:', session.metadata);

    try {
      await handleSuccessfulPayment(session);
      console.log('✅ Payment processing completed successfully');
    } catch (error) {
      console.error('❌ ERROR processing successful payment:', error);
      if (error instanceof Error) {
        console.error('Error stack:', error.stack);
      }

      // Send admin notification about the error
      await sendAdminNotification(
        '🚨 Certificate Generation Failed',
        `Failed to process payment and generate certificate for session ${session.id}. Manual intervention required.`,
        {
          'Session ID': session.id,
          'Customer Email': session.customer_email || 'unknown',
          'Error': error instanceof Error ? error.message : 'Unknown error',
        }
      );

      // Return 200 to acknowledge receipt (don't retry automatically)
      return NextResponse.json({
        received: true,
        error: 'Processing failed, admin notified',
      });
    }
  }

  // 🔑 NEW: Log platform fee collection
  if (event.type === 'application_fee.created') {
    const fee = event.data.object as Stripe.ApplicationFee;
    console.log('💰 Platform fee collected:', {
      amount: `$${fee.amount / 100}`,
      account: fee.account,
      feeId: fee.id,
    });
  }

  // 🔑 NEW: Log transfer to partner
  if (event.type === 'transfer.created') {
    const transfer = event.data.object as Stripe.Transfer;
    console.log('💸 Transfer to partner:', {
      amount: `$${transfer.amount / 100}`,
      destination: transfer.destination,
      transferId: transfer.id,
    });
  }

  return NextResponse.json({ received: true });
}

/**
 * Process a successful payment:
 * 1. Generate certificate ID
 * 2. Save sponsorship to database
 * 3. Generate PDF certificate
 * 4. Send email with certificate
 * 5. Notify admin
 */
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  console.log('🔄 Starting payment processing...');

  // Extract metadata from the session
  const metadata = session.metadata!;
  const sponsorName = metadata.name;
  const sponsorEmail = metadata.email || session.customer_email!;
  const company = metadata.company || null;
  const mpaId = metadata.mpaId;
  const mpaName = metadata.mpaName;
  const hectares = parseInt(metadata.hectares);
  const amount = parseInt(metadata.amount);
  const isAnonymous = metadata.isAnonymous === 'true';

  // 🔑 NEW: Stripe Connect data
  const partnerName = metadata.partner_name;
  const partnerAccountId = metadata.partner_account_id;
  const platformFee = parseInt(metadata.platform_fee);
  const partnerAmount = parseInt(metadata.partner_amount);

  // 🔑 NEW: Pricing tier data
  const pricingTier = metadata.pricing_tier || 'annual';
  const commitmentDuration = metadata.commitment_duration ? parseInt(metadata.commitment_duration) : null;
  const isSubscription = metadata.is_subscription === 'true';
  const stripeSubscriptionId = session.subscription ? session.subscription as string : null;

  console.log('📋 Processing payment for:', {
    sponsorName,
    sponsorEmail,
    mpaName,
    hectares,
    amount,
    partner: partnerName,
    platformFee: `$${platformFee / 100}`,
    partnerAmount: `$${partnerAmount / 100}`,
  });

  // Get MPA location data
  const mpaData = MPA_DATA[mpaId] || {
    location: 'Red Sea, Egypt',
    coordinates: 'Unknown',
  };

  console.log('💾 Saving sponsorship to database...');

  // Save to Supabase with Stripe Connect data and pricing tier info
  const { data: sponsorship, error: dbError } = await supabase
    .from('sponsorships')
    .insert({
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
      name: sponsorName,
      email: sponsorEmail,
      company: company,
      mpa_id: mpaId,
      mpa_name: mpaName,
      hectares: hectares,
      amount: amount,
      is_anonymous: isAnonymous,
      payment_status: 'completed',
      certificate_status: 'generated',
      certificate_url: null,

      // 🔑 Stripe Connect fields
      connected_account_id: partnerAccountId,
      platform_fee_amount: platformFee,
      partner_amount: partnerAmount,
      partner_name: partnerName,

      // 🔑 Pricing tier fields
      pricing_tier: pricingTier,
      commitment_duration: commitmentDuration,
      is_subscription: isSubscription,
      stripe_subscription_id: stripeSubscriptionId,
    })
    .select()
    .single();

  if (dbError) {
    console.error('❌ DATABASE ERROR:', dbError);
    console.error('Error details:', {
      message: dbError.message,
      code: dbError.code,
      details: dbError.details,
      hint: dbError.hint,
    });
    throw new Error(`Failed to save sponsorship: ${dbError.message}`);
  }

  console.log('✅ Sponsorship saved to database:', sponsorship.id);

  // Generate certificate ID from sponsorship ID
  const certificateId = `CR-${mpaId.toUpperCase().substring(0, 3)}-${sponsorship.id.substring(0, 8).toUpperCase()}`;
  console.log('📜 Generated certificate ID:', certificateId);

  // Step 3: Generate PDF Certificate
  console.log('📄 Generating PDF certificate...');
  const now = new Date();
  const validUntil = new Date(now);
  validUntil.setFullYear(validUntil.getFullYear() + 10);

  const certificatePdf = await generateCertificate({
    certificateId,
    sponsorName,
    mpaName,
    mpaLocation: mpaData.location,
    hectares,
    amount,
    date: formatCertificateDate(now),
    validUntil: formatCertificateDate(validUntil),
  });

  console.log('✅ Certificate PDF generated, size:', certificatePdf.length, 'bytes');

  // Step 4: Send email with certificate
  console.log('📧 Sending certificate email...');
  const emailResult = await sendCertificateEmail(
    sponsorEmail,
    sponsorName,
    mpaName,
    mpaData.location,
    hectares,
    amount,
    certificateId,
    certificatePdf
  );

  if (emailResult.success) {
    console.log('✅ Certificate email sent successfully');

    // Update certificate status to 'sent'
    await supabase
      .from('sponsorships')
      .update({ certificate_status: 'sent' })
      .eq('id', sponsorship.id);
  } else {
    console.error('❌ Failed to send certificate email:', emailResult.error);
    throw new Error('Failed to send certificate email');
  }

  // Step 5: Notify admin of new sponsorship
  console.log('📬 Sending admin notification...');
  await sendAdminNotification(
    '🎉 New Sponsorship Received!',
    `A new coral reef sponsorship has been successfully processed.`,
    {
      'Sponsor': isAnonymous ? 'Anonymous' : sponsorName,
      'Email': sponsorEmail,
      'MPA': mpaName,
      'Partner': partnerName,
      'Hectares': hectares,
      'Amount': `$${amount}`,
      'Platform Fee (15%)': `$${(platformFee / 100).toFixed(2)}`,
      'Partner Receives (85%)': `$${(partnerAmount / 100).toFixed(2)}`,
      'Certificate ID': certificateId,
      'Session ID': session.id,
    }
  );

  console.log('🎉 Payment processing completed successfully!');
  console.log('Certificate ID:', certificateId);
  console.log('Sponsorship ID:', sponsorship.id);
}
