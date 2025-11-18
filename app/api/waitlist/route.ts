import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendWaitlistConfirmation } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, mpa, hectares, amount, interestedInPartnership, interest_types } = body;

    // Support both old (sponsorship waitlist) and new (general waitlist) formats
    const isGeneralWaitlist = !mpa && !hectares && !amount;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (!isGeneralWaitlist && (!mpa || !hectares || !amount)) {
      return NextResponse.json(
        { error: 'Missing required sponsorship fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const insertData: any = {
      name,
      email,
      company: company || null,
      interested_in_partnership: interestedInPartnership || false,
    };

    // Add sponsorship fields if provided
    if (!isGeneralWaitlist) {
      insertData.mpa_id = mpa;
      insertData.hectares = hectares;
      insertData.amount = amount;
    } else {
      // For general waitlist, use default values
      insertData.mpa_id = 'general';
      insertData.hectares = 0;
      insertData.amount = 0;
    }

    // Add interest types if provided (stored as JSON array or string)
    if (interest_types && Array.isArray(interest_types)) {
      insertData.interest_types = interest_types.join(',');
    }

    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to save to database' },
        { status: 500 }
      );
    }

    // Send confirmation email (only for sponsorship waitlist for now)
    if (!isGeneralWaitlist) {
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
