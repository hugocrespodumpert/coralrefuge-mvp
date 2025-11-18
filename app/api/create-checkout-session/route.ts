import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

interface CheckoutRequestBody {
  mpa_slug: string;
  mpa_name: string;
  hectares: number;
  pricing_tier: 'annual' | 'multi-year' | 'monthly';
  price_per_hectare: number;
  customer_email?: string;
  customer_name?: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export async function POST(req: NextRequest) {
  console.log('Creating checkout session...');

  try {
    const body: CheckoutRequestBody = await req.json();
    console.log('Checkout request:', body);

    // Validate required fields
    if (!body.mpa_slug || !body.mpa_name || !body.hectares || !body.price_per_hectare) {
      console.error('Missing required fields:', body);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = body.hectares * body.price_per_hectare;

    // Convert to cents for Stripe
    const amountInCents = Math.round(totalAmount * 100);

    console.log(`Creating session for ${body.hectares} hectares at $${body.price_per_hectare}/hectare = $${totalAmount}`);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Coral Refuge Protection - ${body.mpa_name}`,
              description: `Protect ${body.hectares} hectare${body.hectares !== 1 ? 's' : ''} of coral habitat in ${body.mpa_name}, Egypt. Includes certificate and quarterly impact reports.`,
              images: ['https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=500'], // Coral reef image
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/sponsor`,
      customer_email: body.customer_email,
      metadata: {
        mpa_slug: body.mpa_slug,
        mpa_name: body.mpa_name,
        hectares: body.hectares.toString(),
        pricing_tier: body.pricing_tier,
        coordinates_lat: body.coordinates.lat.toString(),
        coordinates_lon: body.coordinates.lon.toString(),
      },
      // Allow customer to enter name if not provided
      billing_address_collection: 'auto',
      // Enable customer to add promotional codes
      allow_promotion_codes: true,
      // Customize the payment page
      payment_intent_data: {
        description: `Coral protection sponsorship - ${body.mpa_name}`,
      },
    });

    console.log('Checkout session created:', session.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while creating the checkout session' },
      { status: 500 }
    );
  }
}
