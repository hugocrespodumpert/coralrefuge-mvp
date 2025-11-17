import { NextResponse } from 'next/server';
import { stripe, PRICE_PER_HECTARE } from '@/lib/stripe';
import { getPartnerAccountForMPA, calculateFees } from '@/lib/stripe-connect';

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

    // STEP 1: Find which partner manages this MPA
    let partnerAccount;
    try {
      partnerAccount = await getPartnerAccountForMPA(mpaId);
    } catch (error) {
      console.error('Partner lookup failed:', error);
      return NextResponse.json(
        { error: 'This MPA is not yet available for sponsorship.' },
        { status: 500 }
      );
    }

    // STEP 2: Calculate amount and payment split
    const amount = hectares * PRICE_PER_HECTARE;
    const totalAmountInCents = amount * 100; // Convert to cents
    const fees = calculateFees(totalAmountInCents);

    console.log('💰 Payment breakdown:', {
      mpa: mpaName,
      partner: partnerAccount.partner_name,
      total: `$${fees.totalAmount / 100}`,
      platformFee: `$${fees.platformFee / 100} (${fees.platformPercentage}%)`,
      partnerAmount: `$${fees.partnerAmount / 100} (${fees.partnerPercentage}%)`,
      destination: partnerAccount.stripe_account_id,
    });

    // STEP 3: Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
      `https://${request.headers.get('host') || 'coralrefuge.vercel.app'}`;

    // STEP 4: Create Stripe Checkout Session with Connect
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${hectares} hectare${hectares > 1 ? 's' : ''} - ${mpaName}`,
              description: `Protect ${hectares} hectare${hectares > 1 ? 's' : ''} in partnership with ${partnerAccount.partner_name}`,
              images: ['https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&q=80'],
            },
            unit_amount: fees.totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',

      // 🔑 STRIPE CONNECT: Automatic 15/85 split
      payment_intent_data: {
        application_fee_amount: fees.platformFee, // 15% stays with platform
        transfer_data: {
          destination: partnerAccount.stripe_account_id, // 85% goes to partner (HEPCA)
        },
        metadata: {
          mpaId,
          mpaName,
          partner_name: partnerAccount.partner_name,
        },
      },

      // Store data for webhook processing
      metadata: {
        name,
        email,
        company: company || '',
        mpaId,
        mpaName,
        hectares: hectares.toString(),
        amount: amount.toString(),
        isAnonymous: isAnonymous ? 'true' : 'false',
        partner_name: partnerAccount.partner_name,
        partner_account_id: partnerAccount.stripe_account_id,
        platform_fee: fees.platformFee.toString(),
        partner_amount: fees.partnerAmount.toString(),
      },

      customer_email: email,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/sponsor?canceled=true`,
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
