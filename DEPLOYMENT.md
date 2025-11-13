# Coral Refuge MVP - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (for deployment)
- Supabase account (for database)
- Resend account (for email)

## Environment Setup

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to Project Settings > API
3. Copy your Project URL and anon/public key
4. Go to the SQL Editor and run the schema from `DATABASE_SCHEMA.md`
5. Enable Row Level Security policies as documented

### 2. Resend Setup

1. Create an account at [resend.com](https://resend.com)
2. Verify your domain (or use the free testing domain)
3. Create an API key in the dashboard
4. Update the "from" email in `/lib/resend.ts` to match your verified domain

### 3. Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Fill in all the required values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
RESEND_API_KEY=re_your_resend_api_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_BASE_URL=https://coralrefuge.org
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Testing

### Test Forms Locally

1. **Waitlist Form** (`/sponsor`)
   - Select an MPA
   - Fill in the form
   - Check console for submission data
   - Verify email was sent (check Resend dashboard)

2. **Partnership Form** (`/partners`)
   - Fill in company information
   - Submit and verify data

3. **Admin Panel** (`/admin`)
   - Login with your admin password
   - Verify waitlist and partnership entries display

### Test Database Connection

```bash
# Create a test file to verify Supabase connection
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
supabase.from('waitlist_signups').select('*').then(console.log);
"
```

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial Coral Refuge MVP"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in the Vercel dashboard
6. Deploy

### Option 2: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel
```

3. Follow the prompts to deploy

### Environment Variables in Vercel

Add all environment variables from `.env.local` to Vercel:

1. Go to Project Settings > Environment Variables
2. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - `NEXT_PUBLIC_BASE_URL`

3. Redeploy after adding variables

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test form submissions work
- [ ] Verify emails are being sent
- [ ] Check admin panel access
- [ ] Test on mobile devices
- [ ] Verify images load from Unsplash
- [ ] Check console for errors
- [ ] Test registry filtering
- [ ] Verify navigation works
- [ ] Test all CTA buttons

## Custom Domain Setup

1. In Vercel, go to Project Settings > Domains
2. Add your custom domain (e.g., coralrefuge.org)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_BASE_URL` environment variable
5. Redeploy

## Monitoring and Analytics

### Vercel Analytics

Enable in Project Settings > Analytics for:
- Page views
- Performance metrics
- User behavior

### Supabase Monitoring

Check the Supabase dashboard for:
- Database usage
- API requests
- Query performance
- Storage usage

### Resend Monitoring

Monitor email delivery in the Resend dashboard:
- Emails sent
- Delivery rates
- Bounce rates

## Troubleshooting

### Images Not Loading

- Verify `next.config.mjs` has correct image domains
- Check browser console for CORS errors
- Ensure Unsplash URLs are accessible

### Forms Not Submitting

- Check browser console for errors
- Verify API routes are working (test in network tab)
- Check Supabase connection
- Verify environment variables are set

### Emails Not Sending

- Check Resend API key is valid
- Verify domain is verified in Resend
- Check email addresses in `/lib/resend.ts`
- Look for errors in Vercel logs

### Database Connection Issues

- Verify Supabase URL and key
- Check RLS policies are configured correctly
- Test connection in Supabase dashboard
- Check for rate limits

## Scaling Considerations

As your platform grows:

1. **Database**
   - Monitor query performance
   - Add indexes for frequently queried fields
   - Consider upgrading Supabase plan

2. **Email**
   - Monitor Resend usage limits
   - Consider email queuing for high volume
   - Set up email templates

3. **Images**
   - Consider moving to a CDN
   - Optimize image sizes
   - Implement lazy loading

4. **Caching**
   - Enable Vercel Edge Caching
   - Implement Redis for session data
   - Cache API responses

## Security Best Practices

- [ ] Never commit `.env.local` to git
- [ ] Use strong admin password
- [ ] Enable Supabase RLS policies
- [ ] Implement rate limiting on API routes
- [ ] Add CSRF protection for forms
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Support

For issues or questions:
- GitHub Issues: Create an issue in your repository
- Email: info@coralrefuge.org
- Documentation: Check README.md and this guide

## Next Steps

After initial deployment:

1. Implement payment processing (Stripe)
2. Add certificate generation with PDF
3. Create email templates
4. Set up monitoring and alerts
5. Add Google Analytics
6. Implement SEO optimizations
7. Create social media assets
8. Launch marketing campaigns
