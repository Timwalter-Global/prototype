# Feedback verzamelen — werkwijze voor Claude Code

Deze repository host Claude-design HTML-prototypes via GitHub Pages.
Feedback wordt verzameld met **Usersnap**: elk prototype heeft een eigen
Usersnap-project.

Live basis-URL: `https://timwalter-global.github.io/prototype/`

## Hoe Usersnap hier werkt — lees dit eerst

Alle projecten in de Usersnap-space `global` delen **dezelfde widget-snippet
met dezelfde key**. Dat is geen fout en geen verwisseling: de snippet die je
uit project A kopieert is identiek aan die uit project B.

Welk project de feedback ontvangt, bepaalt Usersnap zelf op basis van de
**target-configuratie** van elk project: daarin staat op welke pagina('s) de
feedbackknop verschijnt en waar de feedback naartoe gaat. Die configuratie
staat in het Usersnap-dashboard, niet in deze repository.

Daaruit volgen twee dingen die je moet onthouden:

- **De code in deze repo bepaalt níet in welk project feedback landt.** Komt
  feedback in het verkeerde project binnen, dan is dat een target-instelling
  in Usersnap. Ga dan niet de snippet vervangen — dat verandert niets, want
  alle snippets zijn gelijk.
- **Bij elke nieuwe go-live moet de gebruiker in Usersnap de target van het
  bijbehorende project op de nieuwe prototype-URL zetten.** Gebeurt dat niet,
  dan is de widget wel zichtbaar maar loopt de feedback naar het project dat
  die URL wél claimt — of naar niets.

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
2. De Usersnap code snippet — of alleen de API-key — uit de space
   (Usersnap: project → *Install* → *Code snippet*). Deze is voor alle
   projecten gelijk; staat er al een prototype live, dan kun je de snippet
   ook daaruit overnemen.
3. **De naam van het Usersnap-project waar de feedback moet binnenkomen.**
   Vraag hier altijd expliciet naar. Je hebt die naam nodig om de gebruiker
   in stap 10 naar de juiste target-configuratie te sturen.

Stappen:

1. Kies een korte slug in kebab-case, bijv. `homepage-v2`. Bestaat de slug al,
   nummer dan door (`homepage-v3`) — hergebruik nooit een oude slug.
2. Zet het prototype **ongewijzigd** neer als `prototypes/<slug>/index.html`.
   Pas niets aan de inhoud of styling van het prototype aan. De enige drie
   toegestane technische toevoegingen zijn de noindex-tag (stap 3), de
   Usersnap-snippet (stap 4) en het feedback-onboarding-script (stap 5).
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
5. Voeg direct ná de Usersnap-snippet, óók vlak vóór `</body>`, het
   feedback-onboarding-script toe, tussen markers:

   ```html
   <!-- FEEDBACK-ONBOARDING-START -->
   <script src="../../assets/feedback-onboarding.js"></script>
   <!-- FEEDBACK-ONBOARDING-END -->
   ```

   Dit gedeelde script (`assets/feedback-onboarding.js`) toont bij het eerste
   bezoek een pop-up in de huisstijl die uitlegt dat feedback via de
   Feedback-knop gaat — eenmalig per browser per prototype (localStorage,
   gedeeld tussen alle pagina's van dezelfde slug). Heeft een prototype
   meerdere pagina's met de widget, zet het script dan op elk van die
   pagina's.
6. Controleer met een grep dat snippet en onboarding-script correct staan en
   dat je ze niet per ongeluk buiten de markers hebt gezet:

   ```bash
   grep -rn "widget.usersnap.com\|feedback-onboarding.js" prototypes/
   ```

   Dat de key gelijk is aan die van andere prototypes is **normaal en goed** —
   zie "Hoe Usersnap hier werkt". Behandel dat niet als fout en blokkeer de
   go-live er niet op.
7. Voeg op de landingspagina `index.html` een entry toe aan de
   `PROTOTYPES`-array tussen de markers `// PROTOTYPES-CONFIG-START` en
   `// PROTOTYPES-CONFIG-END`: titel, categorie, beschrijving (één zin met
   testscenario voor de tester), testtijd, type, url en thumb. Voor `thumb`
   verwijs je naar een template in het `THUMBS`-object; maak zo nodig een
   nieuw, herkenbaar miniatuurtemplate — geen generieke afbeelding of icoon.
   Geen LIVE-badges of livegang-datums op de kaarten; de contactkaart staat
   automatisch altijd achteraan.
8. Commit en push naar `main`. GitHub Pages publiceert automatisch (1–2 min).
9. Meld de live URL aan de gebruiker:
   `https://timwalter-global.github.io/prototype/prototypes/<slug>/`
10. **Draag de target-configuratie expliciet over aan de gebruiker.** Dit is de
   stap die het vaakst wordt vergeten en die je zelf niet kunt uitvoeren.
   Meld letterlijk:

   > Zet in Usersnap bij project **<projectnaam>** onder *Target* deze URL:
   > `https://timwalter-global.github.io/prototype/prototypes/<slug>/`

   Zonder die stap verschijnt de widget wel, maar komt de feedback in het
   verkeerde project of nergens binnen.
11. **Vraag om een routeringstest vóórdat testers worden uitgenodigd.** Laat de
    gebruiker één testfeedback insturen en bevestigen dat die binnenkomt in
    het project uit stap 3. Een zichtbare widget bewijst alleen dat de snippet
    laadt — niet dat de target goed staat. Deze fout blijft anders onopgemerkt
    tot de feedback al vervuild is.

## Registratie van prototypes en projecten

Houd bij welk prototype bij welk Usersnap-project hoort en op welke URL de
target moet staan. Vul deze tabel bij elke go-live aan.

De widget-key is voor de hele space gelijk:
`c4f048c1-ba97-4344-8bc6-a7afcbec2233` (space `global`).

| Slug | Usersnap-project | Target-URL |
| --- | --- | --- |
| `casar-dashboard` | Casar 2.0 | `…/prototypes/casar-dashboard/` |
| `adviewer2` | *(nog niet doorgegeven — gebruiker stelt target zelf in)* | `…/prototypes/adviewer2/` (widget staat ook op de one-pager `…/prototypes/adviewer2/start/`; een target op de prefix `…/prototypes/adviewer2/` dekt beide) |
| `mastmonitor` | Mast Monitor | `…/prototypes/mastmonitor/` (widget staat ook op `…/prototypes/mastmonitor/dashboard.html`) |
| `creaties-verzamelen` | Usersnap-project met target op de prefix `…/prototypes/creaties…` | `…/prototypes/creaties-verzamelen/` (valt binnen die prefix) |
| `creaties-verzamelen-validatie` | *(nog niet doorgegeven — gebruiker configureert Usersnap zelf)* | `…/prototypes/creaties-verzamelen-validatie/to-be/` (widget staat ook op `…/prototypes/creaties-verzamelen-validatie/`). **Let op:** deze URL valt óók onder de prefix `…/prototypes/creaties…` van het project hierboven; die target moet exact worden gemaakt om dubbele routering te voorkomen. |

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

- Eén prototype = één Usersnap-project, gescheiden via de target-configuratie
  in Usersnap — niet via de snippet. Alle prototypes dragen dezelfde key.
- Komt feedback in het verkeerde project binnen, ga dan **niet** aan de code
  zitten. Alle snippets zijn identiek, dus vervangen verandert niets. Stuur de
  gebruiker naar de target-configuratie van de betrokken projecten.
- Laat een werkende widget staan zolang een routeringsprobleem loopt.
  Verkeerd gearchiveerde feedback kun je in Usersnap verplaatsen of
  exporteren, maar feedback die een tester niet kón geven is definitief weg.
- De repository is publiek en de pagina's zijn bereikbaar voor iedereen met de
  link. Zet er dus nooit vertrouwelijke data, echte klantgegevens of secrets in
  (de Usersnap-key is een publieke widget-key en mag er wél in).
- Werk direct op `main`, tenzij de gebruiker om een branch of PR vraagt.
