import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendWaitlistConfirmation } from '@/lib/email';

export async function POST(request: Request) {
  console.log('📝 Waitlist API called');

  try {
    const body = await request.json();
    console.log('📥 Request body received:', JSON.stringify(body, null, 2));

    const { name, email, company, mpa, hectares, amount, interestedInPartnership, interest_types } = body;

    // Support both old (sponsorship waitlist) and new (general waitlist) formats
    const isGeneralWaitlist = !mpa && !hectares && !amount;
    console.log('🔍 Waitlist type:', isGeneralWaitlist ? 'General Waitlist' : 'Sponsorship Waitlist');

    // Validate required fields
    if (!name || !email) {
      console.error('❌ Validation failed: Missing name or email');
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (!isGeneralWaitlist && (!mpa || !hectares || !amount)) {
      console.error('❌ Validation failed: Missing sponsorship fields');
      return NextResponse.json(
        { error: 'Missing required sponsorship fields' },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed');

    // Insert into database
    const insertData: {
      name: string;
      email: string;
      company: string | null;
      interested_in_partnership: boolean;
      mpa_id?: string;
      hectares?: number;
      amount?: number;
      interest_types?: string;
    } = {
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

    console.log('💾 Attempting to insert into database:', JSON.stringify(insertData, null, 2));
    console.log('🔗 Supabase client initialized:', !!supabase);

    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      // Check for duplicate email
      if (error.code === '23505') {
        console.error('❌ Duplicate email detected');
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        );
      }
      console.error('❌ Database save failed with unknown error');
      return NextResponse.json(
        { error: `Failed to save to database: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('✅ Successfully saved to database:', data);

    // Send confirmation email (only for sponsorship waitlist for now)
    if (!isGeneralWaitlist) {
      console.log('📧 Attempting to send confirmation email to:', email);
      const emailResult = await sendWaitlistConfirmation(
        email,
        name,
        mpa,
        hectares,
        amount
      );

      if (!emailResult.success) {
        console.error('❌ Email sending failed:', emailResult.error);
        // Don't fail the request if email fails
      } else {
        console.log('✅ Confirmation email sent successfully');
      }
    } else {
      console.log('ℹ️  Skipping email for general waitlist');
    }

    console.log('✅ Waitlist signup completed successfully');
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
      data,
    });
  } catch (error) {
    console.error('❌ Unexpected API error:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
