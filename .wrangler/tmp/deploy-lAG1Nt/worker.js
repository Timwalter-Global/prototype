// worker.js
var worker_default = {
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
      }
    }
    return new Response("Inloggen vereist \u2014 vraag het wachtwoord op bij Tim.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Global prototypes", charset="UTF-8"'
      }
    });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
