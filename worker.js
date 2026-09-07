// Wachtwoordbeveiliging voor de hele site (Cloudflare Worker met static
// assets). Elke request passeert eerst deze Worker (run_worker_first in
// wrangler.jsonc); alleen met het juiste wachtwoord worden de statische
// bestanden geserveerd.
//
// Het wachtwoord staat NIET in deze publieke repo maar als secret
// SITE_PASSWORD in het Workers-project (Settings → Variables and secrets).
// Zonder dat secret blijft de site dicht (fail closed).

// Keep-alive voor de Supabase-database achter de Casar-datatabel
// (docs/casar-dashboard/datatabel.html). De gratis Supabase-tier pauzeert
// een project na 7 dagen zonder databasegebruik; deze lichte query telt
// als gebruik. Draait via de cron-trigger in wrangler.jsonc (2x per week).
// De key hieronder is de publieke (publishable) key die ook in de pagina
// zelf staat — geen secret.
const SUPABASE_URL = "https://oenfktekinmrsehfzdva.supabase.co";
const SUPABASE_KEY = "sb_publishable_mgbVOTLLpxUBvnv8BOXDKQ_cPN9AJxx";

export default {
  async scheduled(event, env, ctx) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/datatabel_rows?select=id&limit=1`,
      { headers: { apikey: SUPABASE_KEY } }
    );
    if (!res.ok) {
      // Zichtbaar in de Workers-logs; bij een al gepauzeerd project moet
      // het project handmatig hervat worden in het Supabase-dashboard.
      console.error(`Supabase keep-alive mislukt: HTTP ${res.status}`);
    }
  },

  async fetch(request, env) {
    const password = env.SITE_PASSWORD;

    if (!password) {
      return new Response(
        "Site is nog niet geconfigureerd: secret SITE_PASSWORD ontbreekt in Cloudflare.",
        { status: 503 }
      );
    }

    const header = request.headers.get("Authorization") || "";
    if (header.startsWith("Basic ")) {
      try {
        const decoded = atob(header.slice(6));
        const supplied = decoded.slice(decoded.indexOf(":") + 1);
        if (supplied === password) {
          return env.ASSETS.fetch(request);
        }
      } catch {
        // ongeldige header → opnieuw om inlog vragen
      }
    }

    return new Response("Inloggen vereist — vraag het wachtwoord op bij Tim.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Global prototypes", charset="UTF-8"',
      },
    });
  },
};
