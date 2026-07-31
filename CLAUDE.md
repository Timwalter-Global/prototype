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
3. **De naam van het Usersnap-project waar de feedback moet binnenkomen.**
   Vraag hier altijd expliciet naar, ook als de snippet al is aangeleverd.
   Zonder die naam kun je stap 5 niet uitvoeren en weet je niet of de key klopt.

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
5. **Controleer de key vóórdat je commit.** Draai:

   ```bash
   grep -rn "widget.usersnap.com" prototypes/ archief/
   ```

   Komt de key die je net hebt geplaatst al voor bij een ánder prototype, dan
   is het vrijwel zeker de verkeerde: een aangeleverde snippet komt in de
   praktijk regelmatig uit het verkeerde Usersnap-project. **Stop dan, plaats
   niets, en vraag de gebruiker de snippet opnieuw op te halen** — met de
   projectnaam uit stap 3 zichtbaar in beeld. Werk de sleutelregistratie
   hieronder bij zodra de juiste key bekend is.

   Let bij het vergelijken op de héle URL, niet alleen de UUID: het pad­deel
   vóór `/load/` is de Usersnap-space en kan per project verschillen.
6. Voeg op de landingspagina `index.html` een kaart voor het prototype toe
   tussen de markers `<!-- PROTOTYPES-START -->` en `<!-- PROTOTYPES-END -->`
   (kopieer het kaart-template uit de comment ter plekke; vul titel, slug,
   een korte omschrijving voor de tester en de datum van vandaag in).
7. Commit en push naar `main`. GitHub Pages publiceert automatisch (1–2 min).
8. Meld de live URL aan de gebruiker:
   `https://timwalter-global.github.io/prototype/prototypes/<slug>/`
9. **Vraag om een routeringstest vóórdat testers worden uitgenodigd.** Laat de
   gebruiker één testfeedback insturen en bevestigen dat die binnenkomt in het
   project uit stap 3. Een zichtbare widget bewijst alleen dat de key geldig
   is — niet dat hij bij het juiste project hoort. Deze fout blijft anders
   onopgemerkt tot de feedback al vervuild is.

## Sleutelregistratie

Houd per prototype bij welke widget-key erbij hoort, zodat verwisselingen
direct opvallen. Vul deze tabel bij elke go-live aan.

| Slug | Usersnap-project | Widget-key |
| --- | --- | --- |
| `casar-dashboard` | Casar 2.0 | *nog niet bekend — key ontbreekt* |
| — | Mast Monitor | `c4f048c1-ba97-4344-8bc6-a7afcbec2233` |

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
- Neem nooit aan dat een aangeleverde snippet bij het juiste project hoort.
  Controleer hem altijd tegen de sleutelregistratie hierboven en tegen de
  projectnaam die de gebruiker noemde. Twee snippets die identiek zijn, horen
  per definitie bij hetzelfde project — vervangen heeft dan geen effect.
- Verwissel je toch een key, dan landt de feedback in het verkeerde project.
  Laat de bestaande widget in dat geval staan tot de juiste key bekend is:
  verkeerd gearchiveerde feedback kun je in Usersnap verplaatsen of
  exporteren, maar feedback die een tester niet kón geven is definitief weg.
- De repository is publiek en de pagina's zijn bereikbaar voor iedereen met de
  link. Zet er dus nooit vertrouwelijke data, echte klantgegevens of secrets in
  (de Usersnap-key is een publieke widget-key en mag er wél in).
- Werk direct op `main`, tenzij de gebruiker om een branch of PR vraagt.
