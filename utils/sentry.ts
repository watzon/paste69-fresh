import * as Sentry from "npm:@sentry/node";

const DSN = Deno.env.get("SENTRY_DSN");
if (DSN) {
  Sentry.init({
    dsn: DSN,
    tracesSampleRate: 1.0,
  });
}

export {
    Sentry,
}