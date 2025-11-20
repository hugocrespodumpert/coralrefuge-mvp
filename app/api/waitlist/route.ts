import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendAdminNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, interest_types } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Insert into database - only use columns that exist in the table
    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert({
        email: email,
        name: name || null,
        interest_types: interest_types || null,
      })
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

    // Send admin notification
    await sendAdminNotification(
      '📧 New Waitlist Signup',
      `Someone joined the waitlist!`,
      {
        'Email': email,
        'Name': name || 'Not provided',
        'Interest': interest_types || 'General',
        'Date': new Date().toLocaleString(),
      }
    );

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
