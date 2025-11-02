# SaaS Dashboard Template

A production-ready, full-stack SaaS application built with Next.js 16, Supabase, and modern web technologies. Features authentication, subscription management, real-time analytics, and enterprise-grade monitoring.

![SaaS Dashboard](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Supabase](https://img.shields.io/badge/Supabase-2-green) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-orange)

## ✨ Features

### 🔐 Authentication & User Management
- **Email/Password Authentication** with Supabase Auth
- **Social Login Support** (Google, GitHub - extensible)
- **Role-based Access Control** (Owner, Admin, Member)
- **Secure Session Management** with automatic refresh
- **Password Reset** and email verification flows

### 💳 Subscription & Billing
- **Flexible Pricing Plans** (Free, Pro, Enterprise)
- **Stripe Integration** for payment processing
- **Usage-based Limits** and quota management
- **Subscription Analytics** and billing history
- **Plan Upgrades/Downgrades** with proration

### 📊 Dashboard & Analytics
- **Interactive Data Tables** with sorting and filtering
- **Real-time Charts** and visualizations
- **Usage Metrics** and performance tracking
- **Customizable Widgets** and layouts
- **Export Functionality** (CSV, PDF)

### 🎨 Modern UI/UX
- **Dark/Light Theme Support** with system preference detection
- **Responsive Design** optimized for all devices
- **Smooth Animations** with Framer Motion
- **Accessible Components** following WCAG guidelines
- **Professional Design System** with consistent styling

### 🚀 Performance & Scalability
- **Next.js 16** with App Router and Server Components
- **Edge Runtime** support for global deployment
- **Optimized Images** and asset delivery
- **Caching Strategies** for improved performance
- **Database Optimization** with proper indexing

### 📈 Monitoring & Analytics
- **Real-time Health Checks** and system monitoring
- **Error Tracking** with Sentry integration
- **Performance Monitoring** and Core Web Vitals
- **User Analytics** with Vercel Analytics
- **Custom Dashboards** for business metrics

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Shadcn/ui** - Modern component library
- **Lucide Icons** - Beautiful icon set

### Backend & Database
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)
- **PostgreSQL** - Primary database
- **Row Level Security** - Database-level access control
- **Real-time Subscriptions** - Live data updates

### Payments & Integrations
- **Stripe** - Payment processing and billing
- **Sentry** - Error tracking and monitoring
- **Vercel Analytics** - User analytics and insights

### Deployment & DevOps
- **Vercel** - Cloud platform for deployment
- **Environment Configuration** - Secure credential management
- **Health Checks** - Automated system monitoring
- **CI/CD Ready** - Production deployment pipeline

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - JavaScript runtime
- **npm/yarn/pnpm** - Package manager
- **Git** - Version control
- **Supabase Account** - Backend services
- **Stripe Account** - Payment processing (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/saas-dashboard.git
   cd saas-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your credentials:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Stripe (optional)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_key

   # Sentry (optional)
   NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn
   SENTRY_DSN=https://your-sentry-dsn
   ```

4. **Set up Supabase**
   ```bash
   # Link to your Supabase project
   npx supabase link --project-ref your-project-id

   # Run database migrations
   npx supabase db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📋 Environment Setup

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ❌ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ❌ |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN | ❌ |
| `SENTRY_DSN` | Sentry server DSN | ❌ |

### Supabase Setup

1. **Create a new project** at [supabase.com](https://supabase.com)
2. **Get your credentials** from Settings > API
3. **Run migrations** to set up database schema
4. **Configure authentication** settings

### Stripe Setup (Optional)

1. **Create a Stripe account** at [stripe.com](https://stripe.com)
2. **Create products and prices** in the dashboard
3. **Copy API keys** to environment variables
4. **Configure webhooks** for subscription events

### Sentry Setup (Optional)

1. **Create a Sentry project** at [sentry.io](https://sentry.io)
2. **Get your DSN** from project settings
3. **Configure environment variables**
4. **Set up release tracking** for error correlation

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main tables:

### Core Tables
- **`profiles`** - Extended user information
- **`organizations`** - Multi-tenant organization support
- **`organization_members`** - User roles within organizations
- **`projects`** - User workspaces and projects

### Business Logic
- **`subscription_plans`** - Available pricing plans
- **`subscriptions`** - User subscription records
- **`usage_stats`** - Analytics and usage tracking
- **`notifications`** - In-app notification system

### Security
- **Row Level Security (RLS)** enabled on all tables
- **Role-based permissions** for data access
- **Secure defaults** with proper access controls

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in project settings
3. **Deploy automatically** on git push
4. **Configure custom domain** (optional)

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Configure reverse proxy** (nginx/apache)
4. **Set up SSL certificate**
5. **Configure monitoring**

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📖 Usage Guide

### User Authentication

1. **Sign Up**: Create a new account with email/password
2. **Email Verification**: Check your email for verification link
3. **Sign In**: Login with your credentials
4. **Password Reset**: Use "Forgot Password" if needed

### Dashboard Navigation

- **Main Dashboard**: Overview of key metrics and recent activity
- **Projects**: Manage your workspaces and projects
- **Subscriptions**: View and manage your billing
- **Team**: Collaborate with organization members
- **Monitoring**: System health and analytics (admin only)

### Subscription Management

1. **Choose Plan**: Select from available pricing tiers
2. **Payment**: Complete Stripe checkout process
3. **Usage Tracking**: Monitor your usage against limits
4. **Billing History**: View invoices and payment history
5. **Plan Changes**: Upgrade or downgrade as needed

## 🔌 API Reference

### Authentication Endpoints

#### POST `/api/auth/signin`
Sign in with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/signup`
Create a new account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

### Health Check

#### GET `/api/health`
Get system health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "checks": {
    "database": { "status": "healthy" },
    "environment": { "status": "healthy" }
  }
}
```

### Subscription Management

#### GET `/api/subscriptions`
Get user's subscription information.

#### POST `/api/stripe/create-checkout-session`
Create Stripe checkout session for subscription.

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```
__tests__/
├── components/     # Component tests
├── pages/         # Page tests
├── lib/           # Utility tests
├── api/           # API endpoint tests
└── e2e/           # End-to-end tests
```

### Testing Stack

- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing
- **MSW** - API mocking for tests

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run test
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Conventional Commits**: Standardized commit messages
- **Branch Protection**: PR reviews required

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Supabase Team** for the incredible backend platform
- **Shadcn** for the beautiful component library
- **Vercel** for the excellent deployment platform
- **Stripe** for payment processing
- **Sentry** for error tracking

## 📞 Support

- **Documentation**: [docs.yourproject.com](https://docs.yourproject.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/saas-dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/saas-dashboard/discussions)
- **Email**: support@yourproject.com

## 🚀 Roadmap

### Upcoming Features
- [ ] **Multi-tenant Organizations** - Advanced team management
- [ ] **API Access** - REST and GraphQL APIs
- [ ] **Mobile App** - React Native companion app
- [ ] **Advanced Analytics** - Custom reporting dashboards
- [ ] **Integrations** - Third-party service connections
- [ ] **White-labeling** - Custom branding options

### Version History

#### v1.0.0 (Current)
- ✅ Complete SaaS foundation
- ✅ Authentication and user management
- ✅ Subscription and billing system
- ✅ Dashboard and analytics
- ✅ Monitoring and error tracking
- ✅ Production deployment ready

---

**Built with ❤️ using Next.js, Supabase, and modern web technologies.**
