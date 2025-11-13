import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendPartnershipNotification } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, contactName, email, companySize, interestType, message } = body;

    // Validate required fields
    if (!companyName || !contactName || !email || !companySize || !interestType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('partnership_inquiries')
      .insert({
        company_name: companyName,
        contact_name: contactName,
        email,
        company_size: companySize,
        interest_type: interestType,
        message: message || null,
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

    // Send notification email to admin
    const emailResult = await sendPartnershipNotification({
      company_name: companyName,
      contact_name: contactName,
      email,
      company_size: companySize,
      interest_type: interestType,
      message,
    });

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Partnership inquiry submitted successfully',
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
