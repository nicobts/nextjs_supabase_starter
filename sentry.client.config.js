/*
// Commented out for testing phase - Sentry integration disabled
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
    Sentry.feedbackIntegration({
      // Additional Feedback configuration goes in here, for example:
      colorScheme: "auto",
      showBranding: false,
    }),
  ],

  // Performance monitoring
  enabled: process.env.NODE_ENV === 'production',

  // Release health
  enableTracing: true,

  // User feedback
  beforeSend(event) {
    // Don't send events in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    return event;
  },

  // Ignore certain errors
  ignoreErrors: [
    'Non-Error promise rejection captured',
    'Loading chunk',
    'Network Error',
    'Request failed with status code 401',
  ],

  // Set user context
  beforeSend: (event, hint) => {
    // Add user context if available
    const user = typeof window !== 'undefined' &&
      (window as any).__USER__;

    if (user) {
      event.user = {
        id: user.id,
        email: user.email,
      };
    }

    return event;
  },
});
*/

// Placeholder Sentry initialization for testing phase
console.log('Sentry integration disabled for testing phase')
