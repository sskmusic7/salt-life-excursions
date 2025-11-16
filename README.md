# Salt Life - Turks & Caicos Excursions Marketplace

A comprehensive multi-vendor marketplace platform for booking excursions and activities in Turks & Caicos Islands.

## 🌴 Features

### Customer Features
- 🔍 Browse and search 50+ activities across multiple categories
- 🗺️ Filter by location, price, category, duration, and rating
- 📦 Exclusive package deals with group discounts
- ⭐ Reviews and ratings system
- 💝 Wishlist functionality
- 🌐 Multi-language support (English, Spanish, French)
- 💳 Multiple payment methods (Stripe, PayPal, Apple Pay)
- 📱 Mobile-first responsive design
- 📧 Email notifications for bookings
- 📝 Blog and travel guides for SEO

### Provider Features
- 📊 Comprehensive dashboard with analytics
- 📝 Manage listings and availability
- 📅 Calendar management system
- 💰 Earnings and payout tracking (30% commission)
- 📈 Performance metrics and insights
- 🔔 Real-time notifications
- ✅ Approval workflow for new listings
- 📸 Multi-image and video uploads
- 💬 Direct messaging with customers

### Admin Features
- 🛡️ Provider approval and verification
- 📋 Activity listing approval
- 💼 Commission management (customizable rates)
- 📊 Comprehensive analytics and reports
- 👥 User and provider management
- 💳 Booking and payment tracking
- ⚙️ Platform settings and configuration

## 🚀 Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Email:** Nodemailer
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Stripe account for payments
- SMTP server for emails

## 🛠️ Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/salt-life-excursions.git
cd salt-life-excursions
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your credentials:
- Database URL
- NextAuth secret
- Stripe keys
- Email SMTP settings

4. **Set up the database**
\`\`\`bash
npx prisma generate
npx prisma db push
# Optional: Seed database with sample data
npx prisma db seed
\`\`\`

5. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── activities/         # Activities listing and detail pages
│   ├── admin/              # Admin panel
│   ├── provider/           # Provider dashboard
│   ├── packages/           # Package deals
│   ├── blog/               # Blog section
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── admin/              # Admin components
│   ├── provider/           # Provider components
│   ├── activities/         # Activity components
│   ├── home/               # Homepage components
│   └── layout/             # Layout components
├── prisma/                 # Database schema and migrations
│   └── schema.prisma       # Prisma schema
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies
\`\`\`

## 🎨 Design System

### Colors
- **Primary (Ocean):** #0891b2 - Main brand color
- **Sand:** #b8a080 - Tropical beach vibes
- **Purple:** #8b5cf6 - VIP/Premium features
- **Green:** #10b981 - Success states
- **Red:** #ef4444 - Alerts and errors

### Typography
- **Display:** Playfair Display (headings)
- **Body:** Inter (content)

## 💰 Commission Structure

- Default commission rate: **30%**
- Customizable per category
- Automatic deduction from bookings
- Bi-weekly payout schedule (1st and 15th)
- Minimum payout: $100

## 🔐 User Roles

1. **Customer** - Browse and book activities
2. **Provider** - Manage listings and bookings
3. **Admin** - Platform management and oversight

## 🌍 Multi-Language Support

Supported languages:
- 🇺🇸 English (default)
- 🇪🇸 Spanish
- 🇫🇷 French

Configure in `next.config.js`

## 📧 Email Notifications

Automated emails for:
- Booking confirmations
- Booking cancellations
- Payment receipts
- Provider approval
- Activity approval
- Newsletter subscriptions

## 🔄 Booking Flow

1. Customer selects activity and date
2. Fills booking form with details
3. Payment processing (Stripe)
4. Provider receives notification
5. Provider approves/confirms booking (if required)
6. Customer receives confirmation
7. After completion, customer can leave review
8. Commission auto-deducted and scheduled for payout

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
vercel deploy
\`\`\`

### Other Platforms
1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start production server:
\`\`\`bash
npm start
\`\`\`

## 🔧 Environment Variables

See `.env.example` for all required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Authentication secret
- `NEXTAUTH_URL` - Application URL
- `STRIPE_PUBLIC_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `SMTP_HOST` - Email server host
- `SMTP_PORT` - Email server port
- `SMTP_USER` - Email username
- `SMTP_PASSWORD` - Email password

## 📱 Features by Page

### Homepage
- Hero with search
- Category grid
- Featured activities
- Package deals
- Testimonials
- Newsletter signup

### Activities Page
- Advanced search and filters
- Grid/list view toggle
- Real-time availability
- Reviews and ratings
- Wishlist functionality

### Provider Dashboard
- Overview analytics
- Listings management
- Bookings management
- Calendar availability
- Earnings reports
- Profile settings

### Admin Panel
- Platform dashboard
- Provider approval
- Activity approval
- Booking management
- Commission settings
- Analytics and reports

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support and inquiries:
- Email: hello@saltlifetci.com
- Phone: +1 (649) XXX-XXXX

## 🎯 Roadmap

- [ ] Mobile apps (iOS & Android)
- [ ] Expand to Jamaica
- [ ] Multi-day tour packages with accommodation
- [ ] Affiliate program
- [ ] Live chat integration
- [ ] WhatsApp booking
- [ ] Gift vouchers and discount codes
- [ ] Integration with TripAdvisor and Google Maps
- [ ] Automatic invoice generation

---

Built with ❤️ for Turks & Caicos by Salt Life

**Making Life Easier**


