import nodemailer from 'nodemailer';

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
  },
});

export async function sendWaitlistConfirmation(
  email: string,
  name: string,
  mpaName: string,
  hectares: number,
  amount: number
) {
  try {
    const info = await transporter.sendMail({
      from: `"Coral Refuge" <${process.env.GMAIL_USER}>`,
      to: email,
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
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/registry" class="button">View Impact Registry</a>
                </center>

                <p>Together, we're protecting coral reefs one hectare at a time.</p>

                <p>With gratitude,<br><strong>The Coral Refuge Team</strong></p>
              </div>
              <div class="footer">
                <p>Built with science. Driven by purpose.</p>
                <p>${process.env.GMAIL_USER}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
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
    const info = await transporter.sendMail({
      from: `"Coral Refuge" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '🎉 Your Coral Refuge Sponsorship is Confirmed!',
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
                <h1>🪸 Thank You, Guardian!</h1>
              </div>
              <div class="content">
                <div class="success">
                  <h2 style="margin: 0;">✓ Payment Successful</h2>
                  <p style="margin: 10px 0 0 0;">You are now officially a Coral Refuge Guardian!</p>
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

                <p>With deep gratitude,<br><strong>The Coral Refuge Team</strong></p>
              </div>
              <div class="footer">
                <p>Built with science. Driven by purpose.</p>
                <p>${process.env.GMAIL_USER}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Payment confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
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
    const info = await transporter.sendMail({
      from: `"Coral Refuge" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Admin email
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

    console.log('Partnership notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send partnership notification:', error);
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

    const info = await transporter.sendMail({
      from: `"Coral Refuge System" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
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

    console.log('Admin notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error };
  }
}
