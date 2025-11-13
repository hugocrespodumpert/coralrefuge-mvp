import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';

export const resend = new Resend(resendApiKey);

export async function sendWaitlistConfirmation(email: string, name: string, mpaName: string, hectares: number, amount: number) {
  try {
    const data = await resend.emails.send({
      from: 'Coral Refuge <noreply@coralrefuge.org>',
      to: [email],
      subject: 'Welcome to the Coral Refuge Waitlist!',
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
                <h1>🪸 Welcome to Coral Refuge!</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for joining the waitlist to become a guardian of climate-resilient coral reefs!</p>

                <div class="details">
                  <h3>Your Selection:</h3>
                  <p><strong>Marine Protected Area:</strong> ${mpaName}</p>
                  <p><strong>Hectares:</strong> ${hectares}</p>
                  <p><strong>Investment:</strong> $${amount}</p>
                </div>

                <p>You're now part of a growing community dedicated to protecting the ocean's last hope. We'll be in touch soon with next steps for your sponsorship.</p>

                <p>In the meantime, feel free to explore our impact registry and learn more about coral refugia on our website.</p>

                <center>
                  <a href="https://coralrefuge.org/registry" class="button">View Impact Registry</a>
                </center>

                <p>Together, we're protecting coral reefs one hectare at a time.</p>

                <p>With gratitude,<br><strong>The Coral Refuge Team</strong></p>
              </div>
              <div class="footer">
                <p>Built with science. Driven by purpose.</p>
                <p>info@coralrefuge.org</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
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
    const data = await resend.emails.send({
      from: 'Coral Refuge <noreply@coralrefuge.org>',
      to: ['info@coralrefuge.org'], // Admin email
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
                  <div>${inquiry.email}</div>
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
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
