import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  const GOOGLE_ANALYTICS_SITE_ID = Deno.env.get("GOOGLE_ANALYTICS_SITE_ID");
  const PLAUSIBLE_URL = Deno.env.get("PLAUSIBLE_URL") ?? "https://plausible.io";
  const PLAUSIBLE_DOMAIN = Deno.env.get("PLAUSIBLE_DOMAIN");
  const ACKEE_URL = Deno.env.get("ACKEE_URL");
  const ACKEE_DOMAIN_ID = Deno.env.get("ACKEE_DOMAIN_ID");
  
  return (
    <html class="w-full h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paste69 - sharing is caring</title>

        {GOOGLE_ANALYTICS_SITE_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_SITE_ID}`}></script>
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${GOOGLE_ANALYTICS_SITE_ID}');`}} />  
          </>
        )}

        {PLAUSIBLE_DOMAIN && (
          <script async defer data-domain={PLAUSIBLE_DOMAIN} src={`${PLAUSIBLE_URL}/js/plausible.js`}></script>
        )}

        {ACKEE_URL && ACKEE_DOMAIN_ID && (
          <script async src={`${ACKEE_URL}/tracker.js`} data-ackee-server={ACKEE_URL} data-ackee-domain-id={ACKEE_DOMAIN_ID}></script>
        )}
      </head>
      <body class="w-full h-full">
        <Component />
      </body>
    </html>
  );
}
