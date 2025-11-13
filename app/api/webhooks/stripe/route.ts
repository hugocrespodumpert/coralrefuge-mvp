import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { sendPaymentConfirmation, sendAdminNotification } from '@/lib/email';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', errorMessage);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      // Extract metadata
      const {
        name,
        email,
        company,
        mpaId,
        mpaName,
        hectares,
        amount,
        isAnonymous,
      } = session.metadata || {};

      if (!name || !email || !mpaId || !mpaName || !hectares || !amount) {
        console.error('Missing metadata in checkout session:', session.metadata);
        break;
      }

      try {
        // Save to Supabase sponsorships table
        const { data: sponsorship, error: sponsorshipError } = await supabase
          .from('sponsorships')
          .insert({
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent,
            name,
            email,
            company: company || null,
            mpa_id: mpaId,
            mpa_name: mpaName,
            hectares: parseInt(hectares),
            amount: parseInt(amount),
            is_anonymous: isAnonymous === 'true',
            payment_status: 'completed',
            certificate_status: 'pending',
          })
          .select()
          .single();

        if (sponsorshipError) {
          console.error('Error saving sponsorship:', sponsorshipError);
          throw sponsorshipError;
        }

        // Add to public registry (if not anonymous)
        if (isAnonymous !== 'true') {
          await supabase.from('registry_entries').insert({
            sponsor_name: name,
            company: company || null,
            mpa_name: mpaName,
            hectares: parseInt(hectares),
            date: new Date().toISOString().split('T')[0],
            is_anonymous: false,
          });
        } else {
          // Add anonymous entry
          await supabase.from('registry_entries').insert({
            sponsor_name: 'Anonymous Sponsor',
            company: company || null,
            mpa_name: mpaName,
            hectares: parseInt(hectares),
            date: new Date().toISOString().split('T')[0],
            is_anonymous: true,
          });
        }

        // Send confirmation email to sponsor
        await sendPaymentConfirmation(
          email,
          name,
          mpaName,
          parseInt(hectares),
          parseInt(amount)
        );

        // Send admin notification
        await sendAdminNotification(
          'New Sponsorship Received!',
          `A new sponsorship has been completed.`,
          {
            'Sponsor': name,
            'Email': email,
            'Company': company || 'N/A',
            'MPA': mpaName,
            'Hectares': hectares,
            'Amount': `$${amount}`,
            'Session ID': session.id,
          }
        );

        console.log('Sponsorship processed successfully:', sponsorship.id);
      } catch (error) {
        console.error('Error processing payment:', error);

        // Send error notification to admin
        await sendAdminNotification(
          'Error Processing Sponsorship Payment',
          'An error occurred while processing a sponsorship payment. Please check logs.',
          {
            'Session ID': session.id,
            'Error': error instanceof Error ? error.message : 'Unknown error',
          }
        );
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.log('Payment failed:', paymentIntent.id);

      // Notify admin of failed payment
      await sendAdminNotification(
        'Payment Failed',
        'A payment attempt has failed.',
        {
          'Payment Intent ID': paymentIntent.id,
          'Error': paymentIntent.last_payment_error?.message || 'Unknown error',
        }
      );
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
