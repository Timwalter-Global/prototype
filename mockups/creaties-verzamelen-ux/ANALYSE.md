# UX/UI-analyse en herontwerpvoorstel · creaties-verzamelen

Status: **voorstel, wacht op akkoord** — nog niet doorgevoerd in
`prototypes/creaties-verzamelen/`. De klikbare mock staat in
`mockups/creaties-verzamelen-ux/index.html` (niet gehost; zie `.assetsignore`).

## Stap 1 · Analyse vanuit gebruikersperspectief

Getoetst per rol zoals het prototype die kent (CM, Ad Ops, Marketing, AM en
de externe partij).

### 1. Geen antwoord op de eerste vraag van elke gebruiker: "wat moet ík nu doen?"
De teamcockpit opent met drie tellerblokken, zes filterdropdowns en een tabel
van acht kolommen. Een CM moet zelf tellers aanklikken en filters combineren
om de eigen taken te vinden; de knop "Mijn taken" staat verstopt tussen de
filters en bestaat alleen voor CM-rollen.

### 2. Te hoge informatiedichtheid, te kleine typografie
Basislettergroottes van 9,5–12px, tientallen pills/badges per scherm, en
kleur voor bijna alles (route, status, tijd, filters, rollen). Alles vraagt
aandacht, dus niets krijgt het. De drie tellerblokken bovenaan hebben elk een
nét andere layout, waardoor je ze niet als één geheel scant.

### 3. De tabel vermengt vier concepten
"Actuele taak", "Aan zet", "Tijd" en "Status" overlappen inhoudelijk
(bijv. status "Wacht op aanlevering" + taak "Aanlevering afwachten (extern)"
+ eigenaar "extern" zegt drie keer hetzelfde). Acht kolommen op 1180px
minimumbreedte dwingt horizontaal scrollen af.

### 4. Het dossierscherm heeft twee concurrerende blikvangers
De "antwoordstrook" (actie) en de fasetracker (context) staan naast elkaar
in de kop; daaronder volgt een lange stapel secties achter een vage
"Meer info"-scheiding. De primaire actie is visueel niet dominanter dan de
context eromheen.

### 5. De tijdlijn is een technisch logboek, geen verhaal
Systeemevents ("Taak klaargezet bij…", "Technische controle groen") staan
tussen menselijke acties en externe reacties. Voor de vraag "waar wacht dit
dossier op?" moet je alles lezen. Filterchips (alle/communicatie/acties/status)
verplaatsen het probleem naar de gebruiker.

### 6. Taken zijn eindpunten, geen flow
Na het afronden van een taak (T3/T4/T5…) val je terug op het dossier en moet
je zelf terug naar de cockpit om de volgende taak te vinden. Wie 's ochtends
vijf beoordelingen heeft, klikt vijf keer hetzelfde rondje.

### 7. De demo-console oogt als productonderdeel
De donkere balk bovenaan (perspectief/rol/staat) is voor testers niet te
onderscheiden van het product zelf en vertekent feedback.

### 8. Extern scherm: relatief goed, zelfde dichtheidsprobleem
De aanleverpagina heeft al een duidelijke "Actie nodig"-groepering. De
upload-popup kent wel veel toestanden (concept/klaar/ingediend/vervangen +
teller + guard) met kleine typografie.

## Stap 2 · Voorstellen (geïnspireerd op tools als Watermelon AI)

Watermelon-achtige principes: één duidelijk startpunt, één primaire actie per
kaart, rustige witruimte, zijbalknavigatie, vriendelijke toon, alles wat niet
nú relevant is achter progressive disclosure.

1. **"Vandaag" als startscherm** — persoonlijke takeninbox, gesorteerd op
   urgentie, één primaire knop per taak. Team-signalen (buiten tijdsnorm bij
   collega's, wacht op extern) als rustige secundaire sectie.
2. **Zijbalknavigatie** — Vandaag / Dossiers / Monitor / Wachtrijen als
   plekken i.p.v. alles op één pagina. Demo-console wordt een klein zwevend
   demo-menu buiten het product-frame.
3. **Tabel van 8 → 5 kolommen** — Campagne (+klant/bureau/order als subregel),
   Voortgang (mini-fasetracker), Aan zet (avatar-pil), Deadline, Status (één
   pil). Taak-tekst verhuist naar het detail; afgeronde dossiers dimmen.
4. **Opgeslagen weergaven i.p.v. dropdown-batterij** — chips: Alle / Mijn
   dossiers / Buiten tijdsnorm / Bij partners; overige filters achter
   "+ Filter"; één ⌘K-zoekveld over campagne/klant/ordernummer.
5. **Eén actieblok per dossier** — "Jij bent aan zet · [taak]" met één knop,
   visueel dominant; fasetracker eronder als context, niet als concurrent.
6. **Tijdlijn als verhaal** — gegroepeerd per dag, avatars voor mensen,
   systeemstappen opgevouwen achter "⚙ n automatische stappen — toon".
7. **Taak-chaining** — na Voldaan/Afkeuren direct "Volgende taak →" in
   hetzelfde paneel; stappenindicator "Taak 1 van 3 vandaag".
8. **Rustiger vormtaal** — basis 14px, koppen 20–24px, kleur alléén voor
   status/urgentie, vaste spacingschaal, tabular-nums voor nummers en data.

Bewust ongewijzigd: procesmodel, statusmodel, gates (G0–G4), matrixbewaking,
afkeurlus, back-upflow, mailvoorbeelden en het externe aanleverconcept —
dit is presentatie, geen procesverandering.

## Stap 3 · Mock

`mockups/creaties-verzamelen-ux/index.html` — klikbaar: Vandaag ↔ Dossiers ↔
dossierdetail Festivalzomer, taakpaneel met chaining, opvouwbare tijdlijn.
De knop "ⓘ Over deze mock" (rechtsonder) somt de acht ingrepen op.

## Stap 4 · Na akkoord

Doorvoeren in `prototypes/creaties-verzamelen/index.html` (de x-dc-bundel),
in dezelfde volgorde als de lijst hierboven; per ingreep een commit zodat
onderdelen los terug te draaien zijn.
