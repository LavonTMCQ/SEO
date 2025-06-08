# SEO Pro - Professional SEO Analytics Platform

A modern, full-stack SEO analytics application built with Next.js 14, TypeScript, Prisma, and Supabase. Compete with industry leaders like Semrush and Ahrefs at a fraction of the cost.

## 🚀 Features

- **Modern Dashboard** - Beautiful 2024-2025 design with glassmorphism effects
- **Project Management** - Create and manage multiple SEO projects
- **Real-time Analytics** - Track keywords, rankings, and SEO metrics
- **User Authentication** - Secure login with NextAuth.js
- **Database Integration** - PostgreSQL with Prisma ORM
- **Type-safe APIs** - tRPC for end-to-end type safety
- **Responsive Design** - Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: tRPC, Prisma ORM, NextAuth.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with Google OAuth
- **Deployment**: Vercel
- **SEO Data**: DataForSEO API (optional)

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seo-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase Database
DATABASE_URL=your-supabase-database-url
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# DataForSEO (Optional)
DATAFORSEO_LOGIN=your-dataforseo-login
DATAFORSEO_PASSWORD=your-dataforseo-password
```

## 📊 Database Schema

The application uses the following main entities:

- **Users** - User accounts and authentication
- **Projects** - SEO projects for different websites
- **Keywords** - Tracked keywords for each project
- **Rankings** - Historical ranking data
- **SiteAudits** - SEO audit results
- **Backlinks** - Backlink tracking data

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🔐 Authentication Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

## 📈 SEO Data Integration

### DataForSEO Setup (Optional)

1. Sign up at [DataForSEO](https://dataforseo.com)
2. Get your API credentials
3. Add to environment variables
4. Pricing starts at $29/month

## 🏗️ Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utilities and configurations
│   ├── trpc/             # tRPC setup and routers
│   └── prisma.ts         # Prisma client
├── prisma/               # Database schema
└── public/               # Static assets
```

## 💰 Business Model

**Competitive Pricing:**
- Starter: $29/month (vs Semrush $119/month)
- Professional: $79/month (vs Ahrefs $99/month)
- Enterprise: $199/month (vs Semrush $449/month)

**Target Market:**
- Small to medium businesses
- SEO agencies
- Digital marketers
- Website owners

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@seopro.com or join our Discord community.

---

Built with ❤️ using modern web technologies. Ready to compete with industry giants!
