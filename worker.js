// Wachtwoordbeveiliging voor de hele site (Cloudflare Worker met static
// assets). Elke request passeert eerst deze Worker (run_worker_first in
// wrangler.jsonc); alleen met het juiste wachtwoord worden de statische
// bestanden geserveerd.
//
// Het wachtwoord staat NIET in deze publieke repo maar als secret
// SITE_PASSWORD in het Workers-project (Settings → Variables and secrets).
// Zonder dat secret blijft de site dicht (fail closed).

export default {
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
