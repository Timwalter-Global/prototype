// Wachtwoordbeveiliging voor de hele site (Cloudflare Pages Functions).
// Het wachtwoord staat NIET in deze publieke repo maar als environment
// variable SITE_PASSWORD in het Cloudflare Pages-project
// (Settings → Variables and secrets). Zonder die variabele blijft de
// site dicht (fail closed).

export async function onRequest({ request, env, next }) {
  const password = env.SITE_PASSWORD;

  if (!password) {
    return new Response(
      "Site is nog niet geconfigureerd: SITE_PASSWORD ontbreekt in Cloudflare Pages.",
      { status: 503 }
    );
  }

  const header = request.headers.get("Authorization") || "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const supplied = decoded.slice(decoded.indexOf(":") + 1);
      if (supplied === password) {
        return next();
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
}
