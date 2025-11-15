import { NextResponse } from 'next/server';
import { stripe, PRICE_PER_HECTARE } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, mpaId, mpaName, hectares, isAnonymous } = body;

    // Validate required fields
    if (!name || !email || !mpaId || !mpaName || !hectares) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate amount
    const amount = hectares * PRICE_PER_HECTARE;

    // Get base URL from environment or construct from request headers
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
      `https://${request.headers.get('host') || 'coralrefuge.vercel.app'}`;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Coral Refuge Sponsorship - ${mpaName}`,
              description: `Protect ${hectares} hectare${hectares > 1 ? 's' : ''} of climate-resilient coral reefs`,
              images: ['https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&q=80'],
            },
            unit_amount: PRICE_PER_HECTARE * 100, // Convert to cents
          },
          quantity: hectares,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/sponsor?canceled=true`,
      customer_email: email,
      metadata: {
        name,
        email,
        company: company || '',
        mpaId,
        mpaName,
        hectares: hectares.toString(),
        amount: amount.toString(),
        isAnonymous: isAnonymous ? 'true' : 'false',
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
