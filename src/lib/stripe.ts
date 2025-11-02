import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe with your publishable key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!

if (!stripePublishableKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable')
}

export const stripePromise = loadStripe(stripePublishableKey)

// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: stripePublishableKey,
  prices: {
    pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || 'price_pro_monthly',
    enterprise: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || 'price_enterprise_monthly',
  },
}

// Helper functions for Stripe integration
export const stripeHelpers = {
  // Create a checkout session
  createCheckoutSession: async (priceId: string, userId: string) => {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    return response.json()
  },

  // Create a customer portal session
  createPortalSession: async (customerId: string) => {
    const response = await fetch('/api/stripe/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create portal session')
    }

    return response.json()
  },

  // Redirect to checkout
  redirectToCheckout: async (sessionId: string) => {
    const stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe failed to initialize')
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })

    if (error) {
      throw error
    }
  },

  // Redirect to customer portal
  redirectToPortal: async (url: string) => {
    window.location.href = url
  },
}

// Subscription plan configurations
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Up to 3 projects',
      'Basic analytics',
      'Community support'
    ],
    limits: {
      projects: 3,
      users: 1,
      storage_gb: 1,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month',
    stripePriceId: STRIPE_CONFIG.prices.pro,
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom integrations'
    ],
    limits: {
      projects: -1, // unlimited
      users: 10,
      storage_gb: 100,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    stripePriceId: STRIPE_CONFIG.prices.enterprise,
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom contracts',
      'SLA guarantee'
    ],
    limits: {
      projects: -1, // unlimited
      users: -1, // unlimited
      storage_gb: 1000,
    },
  },
}

// Utility functions
export const getPlanById = (planId: string) => {
  return SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
}

export const getAllPlans = () => {
  return Object.values(SUBSCRIPTION_PLANS)
}

export const formatPrice = (price: number, interval: string = 'month') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price) + (interval === 'year' ? '/year' : '/month')
}
