import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateCertificate, formatCertificateDate } from '@/lib/certificate-generator';
import { sendCertificateEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { sponsorshipId } = await request.json();

    if (!sponsorshipId) {
      return NextResponse.json(
        { error: 'Missing sponsorship ID' },
        { status: 400 }
      );
    }

    // Fetch sponsorship from database
    const { data: sponsorship, error } = await supabase
      .from('sponsorships')
      .select('*')
      .eq('id', sponsorshipId)
      .single();

    if (error || !sponsorship) {
      return NextResponse.json(
        { error: 'Sponsorship not found' },
        { status: 404 }
      );
    }

    // Generate certificate PDF
    const now = new Date(sponsorship.created_at);
    const validUntil = new Date(now);
    validUntil.setFullYear(validUntil.getFullYear() + 10);

    const certificatePdf = await generateCertificate({
      certificateId: sponsorship.certificate_id,
      sponsorName: sponsorship.sponsor_name,
      mpaName: sponsorship.mpa_name,
      mpaLocation: sponsorship.mpa_location,
      hectares: sponsorship.hectares,
      amount: sponsorship.amount_paid,
      date: formatCertificateDate(now),
      validUntil: formatCertificateDate(validUntil),
    });

    // Send email with certificate
    const emailResult = await sendCertificateEmail(
      sponsorship.sponsor_email,
      sponsorship.sponsor_name,
      sponsorship.mpa_name,
      sponsorship.mpa_location,
      sponsorship.hectares,
      sponsorship.amount_paid,
      sponsorship.certificate_id,
      certificatePdf
    );

    if (emailResult.success) {
      // Update email_sent_at timestamp
      await supabase
        .from('sponsorships')
        .update({ email_sent_at: new Date().toISOString() })
        .eq('id', sponsorshipId);

      return NextResponse.json({
        success: true,
        message: 'Certificate resent successfully',
      });
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error resending certificate:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to resend certificate';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
