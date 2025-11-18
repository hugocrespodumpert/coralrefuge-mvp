import { Resend } from 'resend';
import { Sponsorship } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  recipientEmail: string;
  recipientName: string;
  certificatePdf: Buffer;
  sponsorshipDetails: Sponsorship;
}

/**
 * Sends a certificate email to the sponsor
 * @param data Email data including recipient info and certificate
 */
export async function sendCertificateEmail(data: EmailData): Promise<void> {
  console.log('Sending certificate email to:', data.recipientEmail);

  const { recipientEmail, recipientName, certificatePdf, sponsorshipDetails } = data;

  const coralCount = sponsorshipDetails.hectares * 220;
  const formattedDate = new Date(sponsorshipDetails.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const coordinatesText = sponsorshipDetails.coordinates
    ? `${sponsorshipDetails.coordinates.lat.toFixed(6)}°N, ${sponsorshipDetails.coordinates.lon.toFixed(6)}°E`
    : 'Contact us for coordinates';

  try {
    const result = await resend.emails.send({
      from: 'Coral Refuge <noreply@coralrefuge.org>',
      to: recipientEmail,
      subject: '🪸 Your Coral Refuge Certificate - Thank You for Protecting Our Oceans!',
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Coral Refuge Certificate</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f9ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                🪸 Thank You for Protecting Coral Refugia!
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; color: #1e293b; margin: 0 0 20px 0;">
                Dear <strong>${recipientName}</strong>,
              </p>

              <p style="font-size: 16px; line-height: 1.6; color: #1e293b; margin: 0 0 20px 0;">
                Your sponsorship of <strong>${sponsorshipDetails.hectares} hectare${sponsorshipDetails.hectares !== 1 ? 's' : ''}</strong> in
                <strong>${sponsorshipDetails.mpa_name}</strong> is now <span style="color: #10b981; font-weight: bold;">ACTIVE</span>.
              </p>

              <p style="font-size: 16px; line-height: 1.6; color: #1e293b; margin: 0 0 30px 0;">
                You are now part of a global movement protecting the last surviving coral reefs in warming oceans.
              </p>

              <!-- Impact Box -->
              <table role="presentation" style="width: 100%; background-color: #f0f9ff; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h2 style="margin: 0 0 15px 0; color: #0369a1; font-size: 20px;">
                      Your Conservation Impact:
                    </h2>
                    <ul style="margin: 0; padding-left: 20px; color: #1e293b;">
                      <li style="margin-bottom: 12px; line-height: 1.6;">
                        🪸 <strong>~${coralCount.toLocaleString()} coral colonies</strong> under active protection
                      </li>
                      <li style="margin-bottom: 12px; line-height: 1.6;">
                        🐟 Critical habitat for <strong>1,000+ fish and marine species</strong>
                      </li>
                      <li style="margin-bottom: 12px; line-height: 1.6;">
                        🛡️ Direct support for <strong>HEPCA patrol operations</strong> and enforcement
                      </li>
                      <li style="margin-bottom: 12px; line-height: 1.6;">
                        📊 <strong>Quarterly impact reports</strong> from field researchers
                      </li>
                      <li style="margin-bottom: 12px; line-height: 1.6;">
                        🌡️ Contributing to <strong>climate change resilience</strong> research
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Location Info -->
              <table role="presentation" style="width: 100%; background-color: #ecfeff; border-left: 4px solid #0ea5e9; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 10px 0; color: #0369a1; font-size: 16px;">
                      📍 GPS Coordinates of Your Protected Area:
                    </h3>
                    <p style="margin: 0; font-size: 15px; color: #164e63; font-family: 'Courier New', monospace;">
                      ${coordinatesText}
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #475569; font-style: italic;">
                      You can visit your protected area anytime! We recommend snorkeling or diving during calm weather.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Certificate Info -->
              <table role="presentation" style="width: 100%; background-color: #fef3c7; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0; font-size: 16px; color: #92400e;">
                      📜 <strong>Your official certificate is attached to this email.</strong>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #78350f;">
                      Print it, frame it, or share it proudly on social media!
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Sponsorship Details -->
              <table role="presentation" style="width: 100%; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; background-color: #f8fafc; border-radius: 6px;">
                    <h3 style="margin: 0 0 15px 0; color: #0369a1; font-size: 18px;">
                      Sponsorship Details:
                    </h3>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Protected Area:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: bold; text-align: right;">
                          ${sponsorshipDetails.hectares} hectare${sponsorshipDetails.hectares !== 1 ? 's' : ''}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Location:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: bold; text-align: right;">
                          ${sponsorshipDetails.mpa_name}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Date:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: bold; text-align: right;">
                          ${formattedDate}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Certificate ID:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-family: 'Courier New', monospace; text-align: right;">
                          ${sponsorshipDetails.certificate_id}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Call to Action -->
              <table role="presentation" style="width: 100%; margin-bottom: 20px;">
                <tr>
                  <td style="text-align: center;">
                    <a href="https://coralrefuge.org/dashboard"
                       style="display: inline-block; padding: 14px 32px; background-color: #0ea5e9; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                      View Your Dashboard
                    </a>
                  </td>
                </tr>
              </table>

              <!-- What's Next -->
              <div style="border-top: 2px solid #e2e8f0; padding-top: 25px; margin-top: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #0369a1; font-size: 18px;">
                  What Happens Next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                  <li style="margin-bottom: 10px;">
                    <strong>Immediate:</strong> Your funds are deployed for patrol operations
                  </li>
                  <li style="margin-bottom: 10px;">
                    <strong>Monthly:</strong> Access your dashboard for live satellite monitoring
                  </li>
                  <li style="margin-bottom: 10px;">
                    <strong>Quarterly:</strong> Receive impact reports with photos and research updates
                  </li>
                  <li style="margin-bottom: 10px;">
                    <strong>Annually:</strong> Invitation to virtual site visits with marine biologists
                  </li>
                </ul>
              </div>

              <!-- Footer Message -->
              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 30px 0 0 0;">
                Questions or want to increase your protected area? Simply reply to this email - we're here to help.
              </p>

              <p style="font-size: 16px; line-height: 1.6; color: #1e293b; margin: 20px 0 0 0;">
                With deep gratitude,<br>
                <strong style="color: #0369a1;">The Coral Refuge Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 2px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b;">
                <strong>Coral Refuge Conservation Program</strong>
              </p>
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #94a3b8;">
                Protecting the last coral refugia in warming oceans
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                <a href="https://coralrefuge.org" style="color: #0ea5e9; text-decoration: none;">www.coralrefuge.org</a> |
                <a href="https://coralrefuge.org/verify/${sponsorshipDetails.certificate_id}" style="color: #0ea5e9; text-decoration: none;">Verify Certificate</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      attachments: [
        {
          filename: `coral-refuge-certificate-${sponsorshipDetails.certificate_id}.pdf`,
          content: certificatePdf,
        },
      ],
    });

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending certificate email:', error);
    throw new Error(`Email sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Sends a test email (for debugging)
 */
export async function sendTestEmail(to: string): Promise<void> {
  console.log('Sending test email to:', to);

  try {
    const result = await resend.emails.send({
      from: 'Coral Refuge <noreply@coralrefuge.org>',
      to,
      subject: 'Test Email from Coral Refuge',
      html: '<p>This is a test email. If you received this, the email service is working correctly!</p>',
    });

    console.log('Test email sent successfully:', result);
  } catch (error) {
    console.error('Error sending test email:', error);
    throw error;
  }
}
