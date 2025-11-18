import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { generateCertificate, generateCertificateId } from '@/lib/certificate-generator';
import { sendCertificateEmail } from '@/lib/email-service';
import { Sponsorship, CheckoutSessionMetadata } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Generate certificate and send email for a sponsorship
 */
async function generateAndSendCertificate(sponsorship: Sponsorship): Promise<void> {
  console.log('=== Starting certificate generation and email process ===');
  console.log('Sponsorship ID:', sponsorship.id);

  try {
    // Generate certificate PDF
    console.log('Generating certificate PDF...');
    const certificatePdf = await generateCertificate({
      sponsorshipId: sponsorship.id,
      recipientName: sponsorship.name,
      hectares: sponsorship.hectares,
      mpaName: sponsorship.mpa_name,
      location: 'Red Sea, Egypt',
      coordinates: sponsorship.coordinates || { lat: 27.2579, lon: 33.8116 },
      certificateId: sponsorship.certificate_id,
      date: sponsorship.created_at,
      managedBy: 'HEPCA (Hurghada Environmental Protection and Conservation Association)',
    });

    console.log('Certificate PDF generated successfully');

    // Send email with certificate
    console.log('Sending certificate email...');
    await sendCertificateEmail({
      recipientEmail: sponsorship.email,
      recipientName: sponsorship.name,
      certificatePdf,
      sponsorshipDetails: sponsorship,
    });

    console.log('Certificate email sent successfully');
    console.log('=== Certificate generation and email process completed ===');
  } catch (error) {
    console.error('=== Error in certificate generation/email process ===');
    console.error(error);
    throw error;
  }
}

/**
 * Webhook handler for Stripe events
 */
export async function POST(req: NextRequest) {
  console.log('\n=== STRIPE WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  console.log('Signature present:', !!signature);

  if (!signature) {
    console.error('No signature found in request headers');
    return NextResponse.json(
      { error: 'No signature found' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  // Verify webhook signature
  try {
    console.log('Verifying webhook signature...');
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('Webhook signature verified successfully');
  } catch (err) {
    console.error('=== WEBHOOK SIGNATURE VERIFICATION FAILED ===');
    console.error(err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  console.log('Event type:', event.type);
  console.log('Event ID:', event.id);

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    console.log('\n=== Processing checkout.session.completed ===');

    const session = event.data.object as Stripe.Checkout.Session;

    console.log('Session ID:', session.id);
    console.log('Payment status:', session.payment_status);
    console.log('Amount total:', session.amount_total);

    // Extract data from session
    const metadata = session.metadata as unknown as CheckoutSessionMetadata;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;

    console.log('Customer email:', customerEmail);
    console.log('Customer name:', customerName);
    console.log('Metadata:', metadata);

    // Validate required data
    if (!customerEmail || !customerName) {
      console.error('Missing customer email or name');
      return NextResponse.json(
        { error: 'Missing customer information' },
        { status: 400 }
      );
    }

    if (!metadata?.mpa_slug || !metadata?.mpa_name || !metadata?.hectares) {
      console.error('Missing required metadata');
      return NextResponse.json(
        { error: 'Missing sponsorship metadata' },
        { status: 400 }
      );
    }

    // Generate certificate ID
    const certificateId = generateCertificateId();
    console.log('Generated certificate ID:', certificateId);

    // Parse coordinates
    const coordinates = {
      lat: parseFloat(metadata.coordinates_lat || '27.2579'),
      lon: parseFloat(metadata.coordinates_lon || '33.8116'),
    };

    // Create sponsorship record in database
    console.log('\n=== Creating sponsorship record in database ===');

    const sponsorshipData = {
      email: customerEmail,
      name: customerName,
      mpa_slug: metadata.mpa_slug,
      mpa_name: metadata.mpa_name,
      hectares: parseInt(metadata.hectares),
      amount: (session.amount_total || 0) / 100, // Convert from cents
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
      status: 'completed' as const,
      certificate_sent: false,
      certificate_sent_at: null,
      certificate_id: certificateId,
      coordinates,
      pricing_tier: metadata.pricing_tier || 'annual',
      created_at: new Date().toISOString(),
    };

    console.log('Sponsorship data:', sponsorshipData);

    const { data: sponsorship, error: dbError } = await supabase
      .from('sponsorships')
      .insert(sponsorshipData)
      .select()
      .single();

    if (dbError) {
      console.error('=== DATABASE ERROR ===');
      console.error(dbError);
      return NextResponse.json(
        { error: 'Database error', details: dbError.message },
        { status: 500 }
      );
    }

    console.log('Sponsorship record created successfully');
    console.log('Sponsorship ID:', sponsorship.id);

    // Generate certificate and send email
    try {
      console.log('\n=== Starting certificate and email process ===');
      await generateAndSendCertificate(sponsorship as Sponsorship);

      // Update sponsorship record to mark certificate as sent
      console.log('Updating sponsorship record...');
      const { error: updateError } = await supabase
        .from('sponsorships')
        .update({
          certificate_sent: true,
          certificate_sent_at: new Date().toISOString(),
        })
        .eq('id', sponsorship.id);

      if (updateError) {
        console.error('Error updating sponsorship record:', updateError);
        // Don't fail the webhook, just log the error
      } else {
        console.log('Sponsorship record updated successfully');
      }

      console.log('\n=== WEBHOOK PROCESSING COMPLETED SUCCESSFULLY ===\n');
    } catch (certError) {
      console.error('\n=== CERTIFICATE/EMAIL ERROR ===');
      console.error(certError);

      // Log the error but don't fail the webhook
      // The payment was successful, we just need to retry certificate/email
      console.log('Payment processed successfully, but certificate/email failed');
      console.log('Manual intervention may be required for sponsorship:', sponsorship.id);

      // You could add the sponsorship to a retry queue here
    }
  } else {
    console.log('Unhandled event type:', event.type);
  }

  // Always return 200 to acknowledge receipt
  return NextResponse.json({ received: true });
}

// Disable body parsing for webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};
