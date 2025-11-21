import { Resend } from 'resend';

// Resend API configuration
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistConfirmation(
  email: string,
  name: string,
  mpaName: string,
  hectares: number,
  amount: number
) {
  try {
    const info = await resend.emails.send({
      from: 'Wild Reefs <hello@wildreefs.com>',
      to: email,
      subject: 'Welcome to the Wild Reefs Waitlist!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0A2463 0%, #247BA0 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              .button { display: inline-block; background: #3BCEAC; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to Wild Reefs!</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for joining the waitlist to become a sponsor of climate-resilient coral reefs!</p>

                <div class="details">
                  <h3>Your Selection:</h3>
                  <p><strong>Marine Protected Area:</strong> ${mpaName}</p>
                  <p><strong>Hectares:</strong> ${hectares}</p>
                  <p><strong>Investment:</strong> $${amount}</p>
                </div>

                <p>You're now part of a growing community dedicated to protecting the ocean's last hope. We'll be in touch soon with next steps for your sponsorship.</p>

                <p>In the meantime, feel free to explore our impact registry and learn more about coral refugia on our website.</p>

                <center>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/registry" class="button">View Impact Registry</a>
                </center>

                <p>Together, we're protecting coral reefs one hectare at a time.</p>

                <p>With gratitude,<br><strong>The Wild Reefs Team</strong></p>
              </div>
              <div class="footer">
                <p>Keep Reefs Wild</p>
                <p>hello@wildreefs.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Email sent:', info.data?.id);
    return { success: true, messageId: info.data?.id };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export async function sendPaymentConfirmation(
  email: string,
  name: string,
  mpaName: string,
  hectares: number,
  amount: number,
  certificateUrl?: string
) {
  try {
    const info = await resend.emails.send({
      from: 'Wild Reefs <hello@wildreefs.com>',
      to: email,
      subject: 'Your Wild Reefs Sponsorship is Confirmed!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0A2463 0%, #247BA0 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .success { background: #3BCEAC; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              .button { display: inline-block; background: #3BCEAC; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, Sponsor!</h1>
              </div>
              <div class="content">
                <div class="success">
                  <h2 style="margin: 0;">✓ Payment Successful</h2>
                  <p style="margin: 10px 0 0 0;">You are now officially a Wild Reefs Sponsor!</p>
                </div>

                <p>Dear ${name},</p>
                <p>Your payment has been successfully processed. Thank you for protecting climate-resilient coral reefs!</p>

                <div class="details">
                  <h3>Sponsorship Details:</h3>
                  <p><strong>Marine Protected Area:</strong> ${mpaName}</p>
                  <p><strong>Hectares Protected:</strong> ${hectares}</p>
                  <p><strong>Amount Paid:</strong> $${amount}</p>
                  <p><strong>Status:</strong> Active</p>
                </div>

                <h3>What Happens Next:</h3>
                <ul>
                  <li>Your certificate will be generated and emailed within 24 hours</li>
                  <li>You'll be added to our public registry (unless you opted for anonymous)</li>
                  <li>You'll receive quarterly impact updates on your sponsored MPA</li>
                  <li>Your funds are already supporting coral protection activities</li>
                </ul>

                ${certificateUrl ? `
                <center>
                  <a href="${certificateUrl}" class="button">Download Your Certificate</a>
                </center>
                ` : `
                <p><em>Your official certificate will arrive in a separate email within 24 hours.</em></p>
                `}

                <p>Thank you for joining the movement to protect our ocean's last hope.</p>

                <p>With deep gratitude,<br><strong>The Wild Reefs Team</strong></p>
              </div>
              <div class="footer">
                <p>Keep Reefs Wild</p>
                <p>hello@wildreefs.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Payment confirmation email sent:', info.data?.id);
    return { success: true, messageId: info.data?.id };
  } catch (error) {
    console.error('Failed to send payment confirmation email:', error);
    return { success: false, error };
  }
}

export async function sendPartnershipNotification(inquiry: {
  company_name: string;
  contact_name: string;
  email: string;
  company_size: string;
  interest_type: string;
  message?: string;
}) {
  try {
    const info = await resend.emails.send({
      from: 'Wild Reefs System <system@wildreefs.com>',
      to: 'hello@wildreefs.com', // Admin email
      subject: `New Partnership Inquiry from ${inquiry.company_name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0A2463; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Partnership Inquiry</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Company:</div>
                  <div>${inquiry.company_name}</div>
                </div>
                <div class="field">
                  <div class="label">Contact Name:</div>
                  <div>${inquiry.contact_name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Company Size:</div>
                  <div>${inquiry.company_size}</div>
                </div>
                <div class="field">
                  <div class="label">Interest Type:</div>
                  <div>${inquiry.interest_type}</div>
                </div>
                ${inquiry.message ? `
                <div class="field">
                  <div class="label">Message:</div>
                  <div>${inquiry.message}</div>
                </div>
                ` : ''}
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Partnership notification sent:', info.data?.id);
    return { success: true, messageId: info.data?.id };
  } catch (error) {
    console.error('Failed to send partnership notification:', error);
    return { success: false, error };
  }
}

export async function sendCertificateEmail(
  email: string,
  name: string,
  mpaName: string,
  mpaLocation: string,
  hectares: number,
  amount: number,
  certificateId: string,
  certificatePdf: Buffer
) {
  try {
    const quarterDate = new Date();
    quarterDate.setMonth(quarterDate.getMonth() + 3);
    const nextReportDate = quarterDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

    const info = await resend.emails.send({
      from: 'Wild Reefs <hello@wildreefs.com>',
      to: email,
      subject: `Your Ocean Protection Certificate - ${mpaName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.8; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0A2463 0%, #247BA0 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 40px; border: 1px solid #e0e0e0; border-top: none; }
              .highlight-box { background: linear-gradient(135deg, #3BCEAC 0%, #247BA0 100%); color: white; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0; }
              .details { background: #f8f9fa; padding: 25px; border-left: 4px solid #3BCEAC; margin: 25px 0; }
              .impact-section { background: #fff9f0; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #ffe6cc; }
              .footer { text-align: center; padding: 30px 20px; color: #666; font-size: 14px; background: #f8f9fa; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #3BCEAC; color: white !important; padding: 14px 35px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
              h1 { margin: 0 0 10px 0; font-size: 32px; }
              h2 { color: #0A2463; margin-top: 0; }
              h3 { color: #247BA0; margin-top: 25px; }
              ul { padding-left: 25px; }
              li { margin-bottom: 10px; }
              .detail-row { margin-bottom: 12px; }
              .detail-label { font-weight: bold; color: #0A2463; display: inline-block; width: 140px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, Ocean Sponsor!</h1>
                <p style="font-size: 18px; margin: 10px 0 0 0; opacity: 0.95;">Your coral reef protection is now active</p>
              </div>
              <div class="content">
                <div class="highlight-box">
                  <h2 style="color: white; margin: 0 0 10px 0;">✓ Certificate Ready!</h2>
                  <p style="margin: 0; font-size: 16px; opacity: 0.95;">Your official Ocean Protection Certificate is attached to this email</p>
                </div>

                <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>

                <p>Thank you for protecting <strong>${hectares} hectare${hectares > 1 ? 's' : ''}</strong> of climate-resilient coral reefs at <strong>${mpaName}</strong>! Your contribution is already making a difference in safeguarding our ocean's last hope.</p>

                <div class="details">
                  <h3 style="margin-top: 0; color: #0A2463;">📋 YOUR IMPACT SUMMARY</h3>
                  <div class="detail-row">
                    <span class="detail-label">Location:</span>
                    <span>${mpaLocation}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Area Protected:</span>
                    <span>${hectares} hectare${hectares > 1 ? 's' : ''}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Certificate ID:</span>
                    <span><strong>${certificateId}</strong></span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Contribution:</span>
                    <span>$${amount} USD</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Valid Period:</span>
                    <span>2025-2035 (10 years)</span>
                  </div>
                </div>

                <div class="impact-section">
                  <h3 style="margin-top: 0; color: #d97706;">🎯 WHAT YOUR $${amount} FUNDS</h3>
                  <ul style="margin: 15px 0;">
                    <li><strong>Ranger Patrols:</strong> Preventing illegal fishing and protecting marine life</li>
                    <li><strong>Biodiversity Monitoring:</strong> Tracking coral health and fish populations</li>
                    <li><strong>Waste Removal:</strong> Cleaning debris and plastic pollution from reefs</li>
                    <li><strong>Community Education:</strong> Training local communities in reef conservation</li>
                  </ul>
                </div>

                <h3>📅 What Happens Next</h3>
                <ul>
                  <li>Your certificate is attached to this email as a PDF</li>
                  <li>You're now listed in our <a href="${process.env.NEXT_PUBLIC_BASE_URL}/registry" style="color: #247BA0; text-decoration: none; font-weight: bold;">Public Impact Registry</a></li>
                  <li>You'll receive quarterly impact reports starting <strong>${nextReportDate}</strong></li>
                  <li>Your funds are already supporting active conservation programs</li>
                  <li>You can verify your certificate anytime using the QR code</li>
                </ul>

                <center>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/registry?id=${certificateId}" class="button">View in Public Registry →</a>
                </center>

                <p style="margin-top: 35px; font-size: 16px;">Welcome to the reef sponsor community! Together, we're protecting coral reefs one hectare at a time.</p>

                <p style="margin-top: 25px;">With deep gratitude,<br><strong>The Wild Reefs Team</strong></p>
              </div>
              <div class="footer">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #0A2463;">Keep Reefs Wild</p>
                <p style="margin: 5px 0;">Questions? Reply to this email or visit our website</p>
                <p style="margin: 5px 0; font-size: 12px; color: #999;">hello@wildreefs.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `Wild-Reefs-Certificate-${certificateId}.pdf`,
          content: certificatePdf,
        },
      ],
    });

    console.log('Certificate email sent:', info.data?.id);
    return { success: true, messageId: info.data?.id };
  } catch (error) {
    console.error('Failed to send certificate email:', error);
    return { success: false, error };
  }
}

export async function sendGiftCertificateEmail(
  recipientEmail: string,
  recipientName: string,
  purchaserEmail: string,
  purchaserName: string,
  mpaName: string,
  mpaLocation: string,
  hectares: number,
  amount: number,
  certificateId: string,
  giftMessage: string | null,
  certificatePdf: Buffer
) {
  try {
    const quarterDate = new Date();
    quarterDate.setMonth(quarterDate.getMonth() + 3);
    const nextReportDate = quarterDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

    const info = await resend.emails.send({
      from: 'Wild Reefs <hello@wildreefs.com>',
      to: recipientEmail,
      cc: purchaserEmail, // CC the gift giver
      subject: `🎁 ${purchaserName} has gifted you coral reef protection!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.8; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0A2463 0%, #247BA0 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 40px; border: 1px solid #e0e0e0; border-top: none; }
              .gift-message { background: #fff7ed; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0; font-style: italic; border-radius: 4px; }
              .stats { background: #f0f9ff; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #0ea5e9; }
              .stats ul { list-style: none; padding: 0; margin: 15px 0; }
              .stats li { padding: 10px 0; border-bottom: 1px solid #e0f2fe; }
              .stats li:last-child { border-bottom: none; }
              .footer { text-align: center; padding: 30px 20px; color: #666; font-size: 14px; background: #f8f9fa; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #3BCEAC; color: white !important; padding: 14px 35px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
              h1 { margin: 0 0 10px 0; font-size: 32px; }
              h2 { color: #0A2463; margin-top: 0; }
              h3 { color: #247BA0; margin-top: 25px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎁 You've Received a Gift!</h1>
                <p style="font-size: 18px; margin: 10px 0 0 0; opacity: 0.95;">A special gift of ocean protection</p>
              </div>

              <div class="content">
                <p style="font-size: 18px; color: #0A2463; font-weight: 600;">
                  Dear ${recipientName},
                </p>

                <p style="font-size: 16px;">
                  <strong>${purchaserName}</strong> has gifted you the protection of
                  <strong>${hectares} hectare${hectares > 1 ? 's' : ''}</strong>
                  of climate-resilient coral reef in <strong>${mpaName}</strong>!
                </p>

                ${giftMessage ? `
                  <div class="gift-message">
                    <strong style="color: #92400e;">💌 Personal message:</strong><br>
                    <span style="color: #78350f;">"${giftMessage}"</span>
                  </div>
                ` : ''}

                <div class="stats">
                  <h3 style="margin-top: 0; color: #0A2463;">🌊 What This Gift Protects:</h3>
                  <ul>
                    <li>🪸 <strong>~${hectares * 220} coral colonies</strong> in a climate refugium</li>
                    <li>🐟 Critical habitat for <strong>1,000+ fish species</strong></li>
                    <li>🦈 Sanctuary for endangered species like hawksbill turtles</li>
                    <li>📊 You'll receive <strong>quarterly impact reports</strong> from the field</li>
                    <li>📍 GPS coordinates to <strong>visit your reef</strong> anytime</li>
                  </ul>
                </div>

                <p>
                  Your personalized certificate is attached to this email. You can save it, print it,
                  or share it on social media to inspire others!
                </p>

                <center>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/registry?id=${certificateId}" class="button">View in Public Registry →</a>
                </center>

                <h3>📋 YOUR IMPACT SUMMARY</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                  <p style="margin: 5px 0;"><strong>Location:</strong> ${mpaLocation}</p>
                  <p style="margin: 5px 0;"><strong>Area Protected:</strong> ${hectares} hectare${hectares > 1 ? 's' : ''}</p>
                  <p style="margin: 5px 0;"><strong>Certificate ID:</strong> ${certificateId}</p>
                  <p style="margin: 5px 0;"><strong>Contribution:</strong> $${amount} USD</p>
                </div>

                <h3>🎯 What Your Gift Funds</h3>
                <ul>
                  <li><strong>Ranger Patrols:</strong> Preventing illegal fishing and protecting marine life</li>
                  <li><strong>Biodiversity Monitoring:</strong> Tracking coral health and fish populations</li>
                  <li><strong>Waste Removal:</strong> Cleaning debris and plastic pollution from reefs</li>
                  <li><strong>Community Education:</strong> Training local communities in reef conservation</li>
                </ul>

                <h3>📅 What Happens Next</h3>
                <ul>
                  <li>Your certificate is attached to this email as a PDF</li>
                  <li>You're now listed in our Public Impact Registry</li>
                  <li>You'll receive quarterly impact reports starting <strong>${nextReportDate}</strong></li>
                  <li>Your funds are already supporting active conservation programs</li>
                </ul>

                <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                  This gift supports direct reef protection efforts by local conservation partners.
                  Thank you for being part of the solution to protect our ocean's future.
                </p>

                <p style="margin-top: 25px;">With deep gratitude,<br><strong>The Wild Reefs Team</strong></p>
              </div>

              <div class="footer">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #0A2463;">Keep Reefs Wild</p>
                <p style="margin: 5px 0;">Questions? Reply to this email or visit our website</p>
                <p style="margin: 5px 0; font-size: 12px; color: #999;">hello@wildreefs.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `Wild-Reefs-Certificate-${certificateId}.pdf`,
          content: certificatePdf,
        },
      ],
    });

    console.log('Gift certificate email sent:', info.data?.id);
    return { success: true, messageId: info.data?.id };
  } catch (error) {
    console.error('Failed to send gift certificate email:', error);
    return { success: false, error };
  }
}

export async function sendAdminNotification(
  subject: string,
  message: string,
  details?: Record<string, string | number>
) {
  try {
    const detailsHtml = details
      ? Object.entries(details)
          .map(
            ([key, value]) =>
              `<div class="field"><div class="label">${key}:</div><div>${value}</div></div>`
          )
          .join('')
      : '';

    const info = await resend.emails.send({
      from: 'Wild Reefs System <system@wildreefs.com>',
      to: 'hugocrespodumpert@gmail.com',
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0A2463; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>${subject}</h2>
              </div>
              <div class="content">
                <p>${message}</p>
                ${detailsHtml}
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Admin notification sent:', info.data?.id);
    return { success: true, messageId: info.data?.id };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error };
  }
}
