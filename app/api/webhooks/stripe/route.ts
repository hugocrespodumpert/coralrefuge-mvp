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

    console.log('Payment completed for session:', session.id);

    try {
      await handleSuccessfulPayment(session);
    } catch (error) {
      console.error('Error processing successful payment:', error);

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

  console.log('Processing payment for:', {
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

  // Step 1: Generate unique certificate ID
  // First, get the count of existing sponsorships for this MPA this year
  const currentYear = new Date().getFullYear();
  const { count } = await supabase
    .from('sponsorships')
    .select('*', { count: 'exact', head: true })
    .eq('mpa_id', mpaId)
    .gte('created_at', `${currentYear}-01-01`)
    .lte('created_at', `${currentYear}-12-31`);

  const sequenceNumber = (count || 0) + 1;
  const mpaPrefix = mpaId.replace('-', '').substring(0, 3).toUpperCase();
  const certificateId = `${mpaPrefix}-${currentYear}-${sequenceNumber.toString().padStart(5, '0')}`;

  console.log('Generated certificate ID:', certificateId);

  // Step 2: Save to Supabase with Stripe Connect data
  const { data: sponsorship, error: dbError } = await supabase
    .from('sponsorships')
    .insert({
      certificate_id: certificateId,
      sponsor_name: sponsorName,
      sponsor_email: sponsorEmail,
      company: company,
      mpa_id: mpaId,
      mpa_name: mpaName,
      mpa_location: mpaData.location,
      hectares: hectares,
      amount_paid: amount,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
      is_anonymous: isAnonymous,
      status: 'active',
      certificate_generated_at: new Date().toISOString(),

      // 🔑 NEW: Stripe Connect fields
      connected_account_id: partnerAccountId,
      platform_fee_amount: platformFee,
      partner_amount: partnerAmount,
      partner_name: partnerName,
    })
    .select()
    .single();

  if (dbError) {
    console.error('Database error:', dbError);
    throw new Error(`Failed to save sponsorship: ${dbError.message}`);
  }

  console.log('Sponsorship saved to database:', sponsorship.id);

  // Step 3: Generate PDF Certificate
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

  console.log('Certificate PDF generated, size:', certificatePdf.length, 'bytes');

  // Step 4: Send email with certificate
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
    console.log('Certificate email sent successfully');

    // Update email_sent_at timestamp
    await supabase
      .from('sponsorships')
      .update({ email_sent_at: new Date().toISOString() })
      .eq('id', sponsorship.id);
  } else {
    console.error('Failed to send certificate email:', emailResult.error);
    throw new Error('Failed to send certificate email');
  }

  // Step 5: Notify admin of new sponsorship
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

  console.log('Payment processing completed successfully for:', certificateId);
}
