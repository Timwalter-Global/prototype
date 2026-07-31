# Feedback verzamelen — werkwijze voor Claude Code

Deze repository host Claude-design HTML-prototypes via GitHub Pages.
Feedback wordt verzameld met **Usersnap**: elk prototype heeft een eigen
Usersnap-project met een eigen code snippet.

Live basis-URL: `https://timwalter-global.github.io/prototype/`

## Structuur

```
index.html                    Landingspagina in Global-huisstijl met alle live prototypes
assets/                       Global-logo's voor de landingspagina
prototypes/<slug>/index.html  Eén map per live prototype
archief/<slug>/index.html     Offline gehaalde prototypes (optioneel bewaard)
```

De landingspagina volgt de huisstijl van Global Media & Entertainment
(Century Gothic; kleuren #195AA6 dominant, #0B78BE, #1B4B89, #5BC4E8, #575756;
toon: Nederlands, "je", energiek en informeel). Behoud die stijl bij
aanpassingen aan de landingspagina. Prototypes zelf vallen hier nadrukkelijk
**niet** onder — die blijven exact zoals aangeleverd.

## Prototype livezetten

Nodig van de gebruiker:

1. Het HTML-prototype (als bestand of geplakte code).
2. De Usersnap code snippet — of alleen de API-key — van het Usersnap-project
   dat voor dit prototype is aangemaakt (Usersnap: project → *Install* → *Code snippet*).

Stappen:

1. Kies een korte slug in kebab-case, bijv. `homepage-v2`. Bestaat de slug al,
   nummer dan door (`homepage-v3`) — hergebruik nooit een oude slug.
2. Zet het prototype **ongewijzigd** neer als `prototypes/<slug>/index.html`.
   Pas niets aan de inhoud of styling van het prototype aan. De enige twee
   toegestane technische toevoegingen zijn de noindex-tag (stap 3) en de
   Usersnap-snippet (stap 4).
3. Voeg in de `<head>` de noindex-tag toe, zodat prototypes niet in
   zoekmachines belanden:

   ```html
   <meta name="robots" content="noindex, nofollow" />
   ```

4. Voeg vlak vóór `</body>` de Usersnap-snippet toe, tussen markers:

   ```html
   <!-- USERSNAP-START -->
   ...snippet...
   <!-- USERSNAP-END -->
   ```

   Levert de gebruiker alleen een API-key, gebruik dan de standaardsnippet
   hieronder. Levert de gebruiker (nog) geen snippet of key, vraag ernaar.
   Wil de gebruiker toch alvast livezetten zonder key, plaats dan tussen de
   markers `<!-- TODO: Usersnap-snippet toevoegen -->` en meld expliciet dat
   er nog geen feedback verzameld wordt.
5. Voeg op de landingspagina `index.html` een kaart voor het prototype toe
   tussen de markers `<!-- PROTOTYPES-START -->` en `<!-- PROTOTYPES-END -->`
   (kopieer het kaart-template uit de comment ter plekke; vul titel, slug,
   een korte omschrijving voor de tester en de datum van vandaag in).
6. Commit en push naar `main`. GitHub Pages publiceert automatisch (1–2 min).
7. Meld de live URL aan de gebruiker:
   `https://timwalter-global.github.io/prototype/prototypes/<slug>/`

## Prototype offline halen

1. Verplaats `prototypes/<slug>/` naar `archief/<slug>/` (standaard), of
   verwijder de map als de gebruiker dat expliciet vraagt.
2. Verwijder de bijbehorende kaart uit `index.html`.
3. Commit en push naar `main`.
4. Meld dat de verzamelde feedback gewoon in Usersnap blijft staan; het
   Usersnap-project kan daar desgewenst worden gearchiveerd.

## Standaard Usersnap-snippet

Gebruik deze als de gebruiker alleen een API-key aanlevert
(vervang `PROJECT-API-KEY`):

```html
<!-- USERSNAP-START -->
<script>
  window.onUsersnapLoad = function (api) {
    api.init();
  };
  var usersnapScript = document.createElement("script");
  usersnapScript.defer = 1;
  usersnapScript.src =
    "https://widget.usersnap.com/global/load/PROJECT-API-KEY?onload=onUsersnapLoad";
  document.getElementsByTagName("head")[0].appendChild(usersnapScript);
</script>
<!-- USERSNAP-END -->
```

Plakt de gebruiker een eigen snippet uit het Usersnap-dashboard, neem die dan
integraal over (alleen de markers eromheen zetten) — Usersnap kent meerdere
snippetvarianten en de geplakte versie is leidend.

## Regels

- Eén prototype = één Usersnap-project. Hergebruik geen API-keys tussen
  prototypes, anders komt feedback van verschillende prototypes door elkaar.
- De repository is publiek en de pagina's zijn bereikbaar voor iedereen met de
  link. Zet er dus nooit vertrouwelijke data, echte klantgegevens of secrets in
  (de Usersnap-key is een publieke widget-key en mag er wél in).
- Werk direct op `main`, tenzij de gebruiker om een branch of PR vraagt.
