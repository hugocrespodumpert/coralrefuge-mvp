# 🪸 Coral Refuge - MVP

A Next.js platform connecting individuals and organizations with climate-resilient coral reef refugia through marine protected area sponsorships.

![Coral Refuge](https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&q=80)

## 🌊 Overview

Coral Refuge is a conservation-as-a-service platform that enables people to become guardians of coral reef refugia—the reefs that can survive climate change. By sponsoring hectares of marine protected areas, guardians fund critical conservation activities including patrols, monitoring, and protection infrastructure.

## ✨ Features

### Landing Page
- Beautiful ocean-gradient hero section
- Clear value proposition and urgency messaging
- Step-by-step "How It Works" explanation
- Featured coral refuges with high-quality imagery
- Live impact dashboard
- Mobile-first responsive design

### Sponsorship Selection
- 5 curated marine protected areas with detailed information
- Interactive hectare quantity selector
- Live price calculator ($50/hectare)
- Waitlist signup form with validation
- Success confirmation with next steps

### Public Registry
- Transparent display of all sponsorships
- Filterable by MPA
- Total impact metrics (hectares, sponsors, MPAs)
- Anonymous sponsorship option
- Sponsor messages and corporate recognition

### Corporate Partnerships
- Partnership models (Revenue-based, Flat Commitment, Custom)
- Clear benefits for corporate partners
- Inquiry form for partnership exploration
- ESG/sustainability reporting support

### About Page
- Mission and approach
- Science-based explanation of coral refugia
- How funds are used (transparent breakdown)
- Contact information

### Admin Dashboard
- Basic password authentication
- Waitlist signup management
- Partnership inquiry tracking
- Impact statistics
- Certificate generation (placeholder)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Deployment**: Vercel
- **PDF**: pdf-lib (for certificates)
- **Forms**: React Hook Form + Zod

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Resend account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coralrefuge-mvp.git
cd coralrefuge-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

4. Set up the database:
   - Follow instructions in `DATABASE_SCHEMA.md`
   - Run the SQL in your Supabase SQL Editor

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
coralrefuge-mvp/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx              # Landing page
│   │   ├── sponsor/              # Sponsorship selection
│   │   ├── registry/             # Public registry
│   │   ├── partners/             # Corporate partnerships
│   │   ├── about/                # About page
│   │   └── admin/                # Admin dashboard
│   ├── api/
│   │   ├── waitlist/             # Waitlist API route
│   │   ├── partnerships/         # Partnership API route
│   │   └── registry/             # Registry API route
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── Navigation.tsx            # Sticky header
│   ├── Footer.tsx                # Footer
│   ├── Button.tsx                # Reusable button
│   └── WaveDivider.tsx           # Ocean wave SVG
├── lib/
│   ├── supabase.ts               # Supabase client & types
│   └── resend.ts                 # Email functions
├── DATABASE_SCHEMA.md            # Database setup guide
├── DEPLOYMENT.md                 # Deployment instructions
└── README.md                     # This file
```

## 🎨 Design System

### Colors
- **Ocean Deep**: `#0A2463` - Primary dark blue
- **Ocean Blue**: `#247BA0` - Primary blue
- **Turquoise**: `#3BCEAC` - Accent
- **Turquoise Light**: `#06FFA5` - Bright accent
- **Coral**: `#FF6B6B` - CTA accent

### Typography
- **Font**: Hanken Grotesk (Google Fonts)
- **Headings**: Bold, large scale
- **Body**: Regular weight, comfortable line height

### Components
- Generous white space
- Rounded corners (2xl = 16px)
- Subtle shadows for depth
- Smooth transitions (300ms)
- Hover effects on interactive elements

## 📸 Image Credits

All coral reef images are placeholders from Unsplash. For production, use images from [The Ocean Agency Image Bank](https://theoceanagency.org) with proper photographer credits.

Example credit format: "Photo: [Photographer Name] / The Ocean Agency"

## 🔐 Security

- Environment variables for sensitive data
- Row Level Security (RLS) enabled in Supabase
- Basic admin authentication (upgrade for production)
- Form validation on client and server
- No sensitive data in client-side code

## 📊 Database Schema

Three main tables:
1. **waitlist_signups** - Waitlist form submissions
2. **partnership_inquiries** - Corporate partnership inquiries
3. **registry_entries** - Public sponsorship records

See `DATABASE_SCHEMA.md` for complete schema and setup instructions.

## 📧 Email Configuration

Email templates are defined in `/lib/resend.ts`:
- Waitlist confirmation email (sent to sponsor)
- Partnership notification email (sent to admin)

Update the "from" email address to match your verified Resend domain.

## 🚀 Deployment

Deploy to Vercel in minutes:

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

See `DEPLOYMENT.md` for complete deployment guide and post-deployment checklist.

## 🧪 Testing

### Local Testing
- Visit each page and test all interactions
- Submit forms and verify database entries
- Check email delivery in Resend dashboard
- Test admin panel with password: `coral-admin-2024`

### Build Test
```bash
npm run build
npm start
```

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- ✅ Landing page with all sections
- ✅ Sponsorship selection
- ✅ Public registry
- ✅ Corporate partnerships page
- ✅ About page
- ✅ Admin dashboard
- ✅ Database integration
- ✅ Email notifications

### Phase 2: Payment Integration
- [ ] Stripe payment processing
- [ ] Payment confirmation emails
- [ ] Invoice generation
- [ ] Subscription management

### Phase 3: Enhanced Features
- [ ] PDF certificate generation
- [ ] User authentication & profiles
- [ ] Impact updates for sponsors
- [ ] Advanced admin features
- [ ] Analytics dashboard

### Phase 4: Content & Marketing
- [ ] Blog/news section
- [ ] SEO optimization
- [ ] Social media integration
- [ ] Email newsletter
- [ ] Marketing automation

## 🤝 Contributing

This is an MVP for demonstration purposes. For production deployment:
1. Implement proper authentication
2. Add payment processing
3. Enhance security measures
4. Add comprehensive testing
5. Implement error tracking
6. Add analytics

## 📄 License

© 2024 Coral Refuge. All rights reserved.

## 📞 Contact

- **Email**: info@coralrefuge.org
- **Website**: [coralrefuge.org](https://coralrefuge.org)

---

**Built with science. Driven by purpose.** 🌊
# Updated 
