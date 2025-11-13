import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendWaitlistConfirmation } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, mpa, hectares, amount, interestedInPartnership } = body;

    // Validate required fields
    if (!name || !email || !mpa || !hectares || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert({
        name,
        email,
        company: company || null,
        mpa_id: mpa,
        hectares,
        amount,
        interested_in_partnership: interestedInPartnership || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save to database' },
        { status: 500 }
      );
    }

    // Send confirmation email
    const emailResult = await sendWaitlistConfirmation(
      email,
      name,
      mpa,
      hectares,
      amount
    );

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
      data,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
