import { NextResponse } from 'next/server';
import { stripe, PRICE_PER_HECTARE } from '@/lib/stripe';
import { getPartnerAccountForMPA, calculateFees } from '@/lib/stripe-connect';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      mpaId,
      mpaName,
      hectares,
      isAnonymous,
      // Gift fields
      isGift,
      giftRecipientName,
      giftRecipientEmail,
      giftMessage,
      giftSendDate,
      purchaserName,
      purchaserEmail,
    } = body;

    console.log('📝 Checkout request received:', {
      name,
      email,
      company,
      mpaId,
      mpaName,
      hectares,
      isAnonymous,
      isGift,
      giftRecipientName: isGift ? giftRecipientName : undefined,
      giftRecipientEmail: isGift ? giftRecipientEmail : undefined,
    });

    // Validate required fields
    if (!name || !email || !mpaId || !mpaName || !hectares) {
      console.error('❌ Missing required fields:', { name, email, mpaId, mpaName, hectares });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // STEP 1: Find which partner manages this MPA
    console.log('🔍 Looking up partner for MPA:', mpaId);
    let partnerAccount;
    try {
      partnerAccount = await getPartnerAccountForMPA(mpaId);
      console.log('✅ Partner found:', {
        partner: partnerAccount.partner_name,
        stripeAccountId: partnerAccount.stripe_account_id,
      });
    } catch (error) {
      console.error('❌ Partner lookup failed for MPA:', mpaId, error);
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
    console.log('💳 Creating Stripe checkout session...');
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
        on_behalf_of: 'acct_1SUaGNCQVKGw6RZn',
      },
      transfer_data: {
        destination: 'acct_1SUaGNCQVKGw6RZn',
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
        partner_account_id: 'acct_1SUaGNCQVKGw6RZn',
        partner_name: 'Test HEPCA',
        platform_fee: fees.platformFee.toString(),
        partner_amount: fees.partnerAmount.toString(),
        // Gift metadata
        is_gift: isGift ? 'true' : 'false',
        gift_recipient_name: giftRecipientName || '',
        gift_recipient_email: giftRecipientEmail || '',
        gift_message: giftMessage || '',
        gift_send_date: giftSendDate || '',
        purchaser_name: purchaserName || '',
        purchaser_email: purchaserEmail || '',
      },

      customer_email: email,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/sponsor?canceled=true`,
    });

    console.log('✅ Stripe session created successfully:', {
      sessionId: session.id,
      url: session.url,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('❌ STRIPE CHECKOUT ERROR:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
