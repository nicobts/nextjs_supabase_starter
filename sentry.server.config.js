import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',

  // Performance monitoring
  enabled: process.env.NODE_ENV === 'production',

  // Release health
  enableTracing: true,

  // HTTP integration for automatic instrumentation
  integrations: [
    Sentry.httpIntegration(),
    Sentry.prismaIntegration(),
  ],

  // Ignore certain errors
  ignoreErrors: [
    'Non-Error promise rejection captured',
    'Loading chunk',
    'Network Error',
    'Request failed with status code 401',
  ],

  // Set user context for server-side
  beforeSend: (event, hint) => {
    // Don't send events in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }

    // Add additional context for server errors
    if (event.exception) {
      event.tags = {
        ...event.tags,
        environment: process.env.NODE_ENV,
        region: process.env.VERCEL_REGION || 'unknown',
      };
    }

    return event;
  },
});
