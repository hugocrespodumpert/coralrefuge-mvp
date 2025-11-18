import { NextResponse } from 'next/server';
import { stripe, PRICE_PER_HECTARE } from '@/lib/stripe';
import { getPartnerAccountForMPA, calculateFees } from '@/lib/stripe-connect';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, mpaId, mpaName, hectares, isAnonymous, pricingTier, duration, totalPrice } = body;

    console.log('📝 Checkout request received:', {
      name,
      email,
      company,
      mpaId,
      mpaName,
      hectares,
      isAnonymous,
      pricingTier,
      duration,
      totalPrice,
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
    // Use the totalPrice from frontend (already calculated based on pricing tier)
    const amount = totalPrice || (hectares * PRICE_PER_HECTARE);
    const totalAmountInCents = Math.round(amount * 100); // Convert to cents
    const fees = calculateFees(totalAmountInCents);

    // Helper function to get tier description
    const getTierDescription = (tier: string, years?: number): string => {
      switch (tier) {
        case 'annual':
          return 'Annual protection (renews yearly)';
        case 'multi-year':
          const savingsPercent = years === 2 ? 5 : years === 3 ? 10 : years === 5 ? 15 : 0;
          return `${years}-year commitment (${savingsPercent}% savings)`;
        case 'monthly':
          return 'Monthly subscription (3-month minimum)';
        default:
          return 'Coral reef protection';
      }
    };

    const isSubscription = pricingTier === 'monthly';

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

    // For subscriptions, we need to create the price and product differently
    let sessionParams: any = {
      payment_method_types: ['card'],
      mode: isSubscription ? 'subscription' : 'payment',
      customer_email: email,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/sponsor?canceled=true`,
    };

    if (isSubscription) {
      // Monthly subscription mode
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${hectares} hectare${hectares > 1 ? 's' : ''} - ${mpaName}`,
              description: `${getTierDescription(pricingTier, duration)} - ${partnerAccount.partner_name}`,
              images: ['https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&q=80'],
            },
            unit_amount: fees.totalAmount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ];

      // For subscriptions, use subscription_data instead of payment_intent_data
      sessionParams.subscription_data = {
        application_fee_percent: 15,
        transfer_data: {
          destination: partnerAccount.stripe_account_id,
        },
        metadata: {
          mpaId,
          mpaName,
          partner_name: partnerAccount.partner_name,
        },
      };

      sessionParams.metadata = {
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
        pricing_tier: pricingTier || 'annual',
        commitment_duration: duration?.toString() || '',
        is_subscription: 'true',
      };
    } else {
      // One-time payment mode (annual or multi-year)
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${hectares} hectare${hectares > 1 ? 's' : ''} - ${mpaName}`,
              description: `${getTierDescription(pricingTier, duration)} - ${partnerAccount.partner_name}`,
              images: ['https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&q=80'],
            },
            unit_amount: fees.totalAmount,
          },
          quantity: 1,
        },
      ];

      // 🔑 STRIPE CONNECT: Automatic 15/85 split
      sessionParams.payment_intent_data = {
        application_fee_amount: fees.platformFee, // 15% stays with platform
        transfer_data: {
          destination: partnerAccount.stripe_account_id, // 85% goes to partner (HEPCA)
        },
        metadata: {
          mpaId,
          mpaName,
          partner_name: partnerAccount.partner_name,
        },
      };

      // Store data for webhook processing
      sessionParams.metadata = {
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
        pricing_tier: pricingTier || 'annual',
        commitment_duration: duration?.toString() || '',
        is_subscription: 'false',
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

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
