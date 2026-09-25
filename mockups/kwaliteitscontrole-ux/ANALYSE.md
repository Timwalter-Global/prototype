# UX-voorstel · Kwaliteitscontrole 2.0, mobiele app

Status: **voorstel, wacht op reactie van Tim.** Niets hiervan is doorgevoerd in
`prototypes/kwaliteitscontrole/` (referentie v3, live sinds 25 september 2026).
Wireframes: `wireframes.html` in deze map (`img/soll-wireframes.png` is de
gerenderde versie). Huidige mobiele weergave: `img/mobiel-huidig.png`.
Deze map wordt niet gehost (zie `.assetsignore`).

Rol: productowner-review op UX en UI, met nadruk op de telefoon. Bronnen: de
code van het referentieprototype, de functionele specificatie uit het
bouwpakket (03), metingen in Chromium op 390 × 844 px (iPhone-formaat) en de
interviewcitaten in het toelichtingspaneel van het prototype.

## 1. Samenvatting

1. Het prototype bewijst de kernideeën overtuigend: nummerbevestiging met
   wisseloptie, foto-instructie per objecttype, inspreken met AI, de zeven
   punten, offline werken. Dat blijft allemaal staan.
2. Het is gebouwd als demo voor een laptop. Op een telefoon gaat **34% van het
   scherm** op aan chrome boven de inhoud, waarvan 158 px demo-shell die geen
   product is, en valt de onderkant van het frame met de primaire knop of de
   tabbar **23 px onder de vouw**. De inspecteurs testen op hun telefoon, dus
   dit vertekent hun oordeel over de app zelf.
3. Een goed object kost minimaal **14 taps**; met de voorstellen hieronder
   worden dat 8. De grootste winst: geen "Verder" na elke foto, geen tussenstop
   op het objectscherm voor het eerstvolgende object.
4. De vier gevraagde verbeteringen zijn alle vier terecht en passen in één
   structuur: **Vandaag als startscherm met dagwisselaar**, **Zoeken als
   volwaardig tabblad over alle objecten**, **een procesbalk met vier stappen**
   boven elke controlestap en een **objectscherm dat een beslisscherm is** in
   plaats van een informatiepagina.
5. Uit de code komen drie inconsistenties die los van de UX gerepareerd moeten
   worden: het blok "Wat gebeurt er na afronden" is leeg als alleen punt 4
   afwijkt; na "Onleesbaar" meldt stap Controleren toch "Objectnummer
   bevestigd"; het handmatige en offline pad stelt de veiligheidsvraag nooit.
6. Voorstel voor het vervolg: een klikbare mobiele mock (v4) in deze map,
   valideren met Roy, Sjaak en Dick op hun eigen telefoon, daarna pas de
   definitieve versie via Claude Design.

## 2. Wat ik heb gemeten

Viewport 390 × 844 px, huidige live versie, demo-shell zichtbaar zoals een
tester hem ziet.

| Scherm | Chrome boven de inhoud | Inhoud zichtbaar | Onder de vouw |
| --- | --- | --- | --- |
| P1 Vandaag | 287 px (34%) | 436 px (52%) | 23 px (tabbar afgesneden) |
| P4 Objectdetail | 287 px (34%) | 503 px (60%) | 23 px (footer deels) |
| P6 Bevestig nummer | 309 px (37%) | 483 px (57%) | 23 px |
| P10 Observaties | 287 px (34%) | 580 px (69%) | 23 px |
| P14 Controleren | 287 px (34%) | 494 px (59%) | 24 px (knop Afronden deels) |

Opbouw van die 287 px: sitebalk met tabbladen 116 px, knoppen Schermen en
Toelichting 42 px, framerand 6 px, statusbalk 44 px, schermkop met titel van
22 px, subtitel en verbindingspil circa 80 px.

Taps per object, goed object met één posterzijde, vanaf de lijst Vandaag:

| | Huidig | Voorstel |
| --- | --- | --- |
| Object openen en starten | 2 (object, Start controle) | 1 (Start volgende) |
| Nummer | 2 (Scan, Bevestig) | 2 |
| Foto's | 4 (foto, Verder, foto zijde A, Verder) | 2 (foto, foto zijde A; automatisch door) |
| Schadestap zonder schade | 1 (Verder naar observaties) | 0 (stap alleen bij afwijking) |
| Observaties | 3 (Inspreken, stoppen, Klopt) | 3 |
| Afronden en terug | 2 (Afronden, Naar ronde) | 1 (Afronden, automatisch terug) |
| **Totaal** | **14** | **8** |

Aantal schermen in de app: 20 (P0 tot P16 plus P4b, P8b, P10b, P16b). In het
voorstel blijven het er 20 in functie, maar de gebruiker ervaart er 9: drie
tabbladen, één objectscherm, vier stappen met substappen, één afsluiting.

## 3. De vier vragen

### 3.1 Landingspagina en navigatie naar gisteren en morgen

**Huidig.** Start is P0 "Mijn week": vier dagen, alleen dinsdag klikbaar,
woensdag tot vrijdag uitgeschakeld, geen maandag. Daaronder de persoonlijke
cijfers en een uitleg over de planningsregels. Vandaag (P1) zit één tik
verder en is het scherm waar het werk gebeurt.

**Probleem.** Het startscherm is een tussenstation. Gisteren bestaat niet, en
dat is precies waar de losse eindjes zitten die het prototype zelf creëert:
vragen uit de offline wachtrij (P16b) en objecten die nog op de telefoon
staan. Morgen bestaat alleen als grijze regel.

**Voorstel** (wireframes W1 tot W3).
* Vandaag wordt het startscherm. Bovenaan een dagwisselaar: gisteren,
  vandaag, morgen, met pijlen en swipe, beperkt tot de planningsweek. Het
  weekoverzicht en de eigen cijfers verhuizen naar een menu (≡) en blijven
  bestaan; ze horen niet op het scherm waar je dertig keer per dag kijkt.
* Gisteren: alleen lezen, met bovenin één blok "Nog af te ronden" (open
  vragen, objecten op telefoon). Afgeronde controles wijzig je niet meer;
  dat beschermt de bewijswaarde richting gemeenten en TOOC.
* Morgen: dezelfde opbouw als vandaag maar zonder startknop en zonder
  statussen. Wel: aantal, kilometers, waarom deze objecten, bijzonderheden
  (dakglas, hercontrole), knop "Bekijk op kaart".

Aanname, expliciet: met "landingspagina" bedoel je het startscherm van de app
voor de inspecteur, niet een introductiepagina vóór de app. Een aparte
introductiepagina raad ik af: de inspecteurs openen de app dagelijks en elke
extra tik voor de eerste controle telt.

### 3.2 Zoeken over alle objecten en overzicht van wat rest

**Huidig.** Vandaag toont alle twaalf objecten, afgerond en open door elkaar,
in routevolgorde. De kaart (P2) toont pins met nummers en een blauwe stip
"jij", maar die stip staat vast bij het eerstvolgende open object; er is
geen echte positie. Zoeken zit achter de knop "Object buiten planning" (P3)
en zoekt alleen in de drie voorbeeldobjecten plus de eigen route. Wie een
willekeurig objectnummer intikt vindt niets.

**Probleem.** Zoeken is geframed als uitzondering terwijl het een van de drie
basisvragen van een inspecteur is: wat moet ik doen, waar ben ik, waar is
object X. En het resterende werk is nooit met één blik te zien.

**Voorstel** (W1, W4, W5).
* Tabbar met drie tabbladen die die drie vragen beantwoorden: Vandaag, Kaart,
  Zoeken. Week verdwijnt uit de tabbar (zit achter ≡).
* Vandaag krijgt een segment "Te doen / Klaar / Alles", standaard Te doen, met
  aantallen. Dat is het overzicht van resterende objecten.
* Zoeken zoekt over alle objecten van de gemeente of regio (in het prototype:
  route, buiten planning en de gegenereerde steekproef; in de bouw: de
  objectendatabase met geofilter). Resultaten in drie groepen op relevantie:
  in je ronde, dichtbij en niet gepland, elders. Twee snelle ingangen naast
  het tekstveld: cijfers intikken (hetzelfde toetsenblok als stap 1) en
  plaatje scannen.
* Kaart met echte GPS-positie en nauwkeurigheidscirkel, knop "centreer op
  mij", filter Te doen/Alles gelijk aan de lijst. Alleen open objecten dragen
  een nummer; afgeronde worden een vinkje. Tik op een pin opent een onderblad
  met afstand en één primaire knop, geen aparte pagina.

### 3.3 Flow na het aantikken van een object: wat kan wel en niet worden ingevuld

Uit de code, per stap. "Offline" geeft aan of de invoer zonder verbinding
mogelijk is.

| Stap | Veld | Invoer | Verplicht | Offline | Bevinding |
| --- | --- | --- | --- | --- | --- |
| P4 Object | geen | alleen lezen | | | zeven blokken informatie, drie knoppen; verwachte campagnes staan hier én in P8 |
| P4b Overslaan | reden | 1 van 4 knoppen | ja | ja | "Anders" zonder toelichting; "Object staat er niet meer" is een overslag, geen bevinding, terwijl het dashboard dit als actie zou moeten zien |
| P6 Nummer | objectnummer | 5 cijfers of Scan | nee (Onleesbaar) | ja | na Onleesbaar wordt `nrConfirmed: false` opgeslagen, maar P14 toont hardcoded "Objectnummer bevestigd" |
| P7 Foto nummer | foto | 1 | ja | ja | goed |
| P8 Foto per zijde | foto per zijde | 1 per zijde | ja, alle zijden | ja | kan niet vastleggen wélke campagne er hangt; alleen punt 1 of 2 als ja/nee via observaties |
| P8b Dak | foto | 1 | ja bij dakglas | ja | goed |
| P9 Schade | foto's | 0 tot n | alleen bij afwijking | ja | staat vóór de observaties; bij een afwijking moet je later terug. Zie beslissing 8.1 |
| P10 Observaties online | geen | keuze: inspreken of aanvinken | | | zeven punten alleen lezen |
| P10 offline / P10b aanvinken | zeven punten | checkbox | nee | ja | geen toelichting per punt: alles wordt "Aangevinkt door inspecteur" |
| P11 en P12 AI | transcript, zeven punten | spraak | | nee | de toelichting per punt komt uit de AI en is nergens te corrigeren |
| P13 Vragen | verlichting, veiligheidsrisico | knoppen | ja | nee (wachtrij) | alleen op het AI-pad; wie zelf aanvinkt of offline werkt krijgt de veiligheidsvraag nooit, dus "voorrang" bij TOOC is dan onbereikbaar |
| P14 Controleren | zeven punten aan/uit, Melden aan TOOC | tik, schakelaar | | ja | schakelaar alleen bij risico Actie; punt 4 (niet schoon, eigenaar TOOC) leidt tot niets en het blok "Wat gebeurt er na afronden" blijft leeg (`img/p14-leeg-blok-punt4.png`) |
| P15 Afgerond | geen | | | | goed, wel twee knoppen waar één volstaat |

Wat **nergens** kan worden ingevuld:
* een vrije opmerking bij het object (de spraakopname is de enige vrije tekst,
  en alleen online);
* de werkelijke campagne per zijde;
* ernst of urgentie, behalve via de AI-vraag over veiligheid;
* een foto gekoppeld aan een specifiek punt (schadefoto's zijn generiek);
* "object niet gevonden" als bevinding in plaats van als overslag.

Automatisch te registreren in de bouw, nu niet zichtbaar: begin- en eindtijd
per object, positie bij elke foto. Beide raken de inspecteur als werknemer
(zie 8.6).

### 3.4 Drukte en een voortgangsbalk

**Huidig.** Elke controlestap heeft een eigen kop van circa 80 px met een
titel van 22 px, een subtitel en een verbindingspil die er als knop uitziet
en ook echt de offline-stand schakelt. Alleen in de fotostappen zit een
stepper. P4 stapelt drie chips, een waarschuwing, een referentiefoto, een
feitenkaart, een TOOC-banner, een campagnekaart en drie knoppen. Icoontjes
zijn emoji's (📋 ❔ ☁︎ ⚠️ 🧽 🎯 📨 🎉), die per telefoon anders renderen.

**Voorstel** (W6 tot W9).
* Eén procesbalk boven elke controlestap met vier stappen: Nummer, Foto's,
  Observaties, Controleren. Afgerond donker, huidig blauw, komend grijs.
  Substappen (zijde A, zijde B, dak; opname, gehoord, vragen) als stippen
  onder de actieve stap. Terug tikken mag; vooruit alleen door af te ronden.
* De kop wordt compact: objectnummer en straat op één regel. De schermnaam
  zit in de balk, niet meer als grote titel.
* De verbindingspil wordt een label; offline schakelen verhuist naar het
  demo-menu. Een tester die per ongeluk offline gaat, denkt nu dat de app
  stuk is.
* P4 als beslisscherm met drie blokken: waarom vandaag, referentiefoto met
  haltewaarschuwing, aandachtspunten. Campagnes verhuizen naar de fotostap
  (daar staan ze al), de TOOC-controlevraag naar "Let op bij dit object" in
  de observatiestap.
* Na elke foto automatisch door, met "Opnieuw" als klein alternatief. Geen
  losse Verder-knop meer.
* Emoji's vervangen door één lijnicoonset (dit staat ook in bouwpakket 04).
* Maximaal één banner per scherm; overige aandachtspunten worden een chip
  met aantal ("Let op: 2").

## 4. Voorgestelde structuur

| Huidig | Voorstel | Wat verandert |
| --- | --- | --- |
| P0 Mijn week (start) | menu ≡ | week en eigen cijfers blijven, maar niet als startscherm |
| P1 Vandaag | **Vandaag** (start) met dagwisselaar | segment Te doen/Klaar/Alles, zoekregel, één primaire knop |
| nieuw | Gisteren | alleen lezen plus blok "Nog af te ronden" (vervangt P16b) |
| nieuw | Morgen | alleen lezen, voorbereiding |
| P2 Kaart | **Kaart** | echte positie, filter, onderblad met actie |
| P3 Object buiten planning | **Zoeken** (tabblad) | alle objecten, drie groepen, intikken en scannen |
| P4 Objectdetail | Object (beslisscherm) | van zeven blokken naar drie |
| P4b Overslaan | onderblad op Object | zelfde vier redenen; "staat er niet meer" wordt een bevinding |
| P5 Meer | onderblad "Meer" | ongewijzigd |
| P6 Nummer | **Stap 1** | procesbalk, compacte kop |
| P7, P8, P8b | **Stap 2 Foto's** | automatisch door na elke foto, stippen per substap |
| P9 Schade | onderdeel van stap 2 of na stap 3 | zie beslissing 8.1 |
| P10, P10b, P11, P12, P13 | **Stap 3 Observaties** | één stap met substappen; veiligheidsvraag ook op het handmatige pad |
| P14 Controleren | **Stap 4** | alleen afwijkingen voluit, "Na afronden" altijd gevuld, corrigeerbare toelichting, vrij veld |
| P15 Afgerond | korte bevestiging | automatisch terug naar Vandaag, volgende gemarkeerd |
| P16 Ronde compleet | Dag afsluiten | ongewijzigd in inhoud |
| P16b Vragen over vandaag | blok op Gisteren of Vandaag | geen los scherm |
| demo-shell (sitebalk, tabbladen, Schermen, Toelichting) | één label "Demo" | op de telefoon vult de app het hele scherm |

## 5. Extra bevindingen, los van de UX-vraag

1. **Leeg blok bij punt 4.** Alleen "Object niet schoon" afwijkend: het blok
   "Wat gebeurt er na afronden" toont alleen een kop. Punt 4 heeft eigenaar
   TOOC onderhoud maar leidt nooit tot een melding, omdat melden alleen bij
   risico Actie kan (spec 4.4). Beslissing nodig, zie 8.2.
2. **"Objectnummer bevestigd" na Onleesbaar.** P14 toont die tekst altijd.
   Verwacht: "Objectnummer niet bevestigd" met de foto van het plaatje als
   bewijs.
3. **Veiligheidsvraag alleen op het AI-pad.** Handmatig en offline wordt hij
   niet gesteld; "met voorrang" bij TOOC is dan onbereikbaar.
4. **Verbindingspil is een knop.** Eén tik zet de tester offline zonder dat
   hij dat wilde.
5. **Frame past niet op een telefoon.** `max-height: calc(100vh - 150px)` in
   combinatie met de shell van 158 px: 23 tot 24 px van het frame vallen
   onder de vouw. Op P1 is de tabbar afgesneden, op P14 de knop Afronden
   deels.
6. **Twee knoppen op Afgerond** waar het volgende object al bekend is:
   "Naar ronde" en "Start navigatie". Eén keuze volstaat, met navigatie als
   secundaire actie.

## 6. Wat bewust blijft

Nummerbevestiging met wisseloptie, haltewaarschuwing, referentiefoto, de
zeven controlepunten in de formulering van Global, de foto-instructie,
inspreken met "Dit heb ik gehoord" en maximaal twee vervolgvragen, de
statusstreep links op lijstitems, de twee vocabulaires (app: Goed en
Afwijking; dashboard: Aandacht en Actie), het offline-model met wachtrij,
één primaire knop onderaan per scherm, het gele blok "Let op bij dit object",
de labels "voorbeeld". Het dashboard valt buiten dit voorstel.

## 7. Prioritering

**Moet, vóór de volgende testronde op telefoons**
1. App op de telefoon zonder demo-shell en zonder frame-in-frame (bevinding 5).
2. Procesbalk met vier stappen en compacte kop.
3. Vandaag als startscherm met segment Te doen/Klaar/Alles en zoekregel.
4. Automatisch door na elke foto; schadestap alleen bij afwijking.
5. Reparaties: leeg blok punt 4, "bevestigd" na Onleesbaar, veiligheidsvraag
   op elk pad, verbindingspil als label.

**Zou moeten**
6. Dagwisselaar met Gisteren (nazorg) en Morgen (voorbereiding).
7. Zoeken als tabblad over alle objecten, met intikken en scannen.
8. Kaart met echte positie, filter en onderblad.
9. Object als beslisscherm; campagnes en TOOC-vraag verhuizen.

**Kan later**
10. Corrigeerbare toelichting per punt en een vrij opmerkingenveld.
11. Foto koppelen aan een specifiek punt.
12. Werkelijke campagne per zijde vastleggen.

## 8. Beslissingen en open vragen

1. **Volgorde van de schadefoto.** De foto-instructie van Global (nummer,
   campagne per zijde, schade) is heilig in inhoud; de volgorde in de app is
   een ontwerpkeuze. Voorstel: schadefoto ná de observaties, alleen als er
   een afwijking is, plus altijd een knop "+ foto". Bespaart een stap bij
   ieder goed object. Beslissing: Global (eigenaar van de instructie).
2. **Punt 4 en TOOC.** Moet "niet schoon" een melding aan TOOC opleveren? Zo
   ja, dan verandert de risicologica van het dashboard (Aandacht wordt ook
   gemeld). Zo nee, dan moet het blok "Na afronden" uitleggen dat het via de
   rapportage naar TOOC gaat. Beslissing: Dick.
3. **Gisteren bewerken?** Voorstel: nee; een aanvulling wordt een nieuwe
   notitie met tijdstempel. Beslissing: Dick, met het oog op bewijswaarde.
4. **Morgen: alleen inzien of ook alvast objecten buiten planning toevoegen?**
   Voorstel: alleen inzien. Beslissing: inspecteurs.
5. **Startknop slaat het objectscherm over** voor het eerstvolgende object.
   Voorstel: ja, met de haltewaarschuwing als eerste regel in stap 1 zodat de
   waarschuwing niet verloren gaat. Toetsen bij Roy en Sjaak.
6. **Positie en tijd van de inspecteur.** De kaart vraagt GPS, het rapport
   (D4) belooft datum, tijd en locatie per foto, het dashboard toont tijd per
   object. Dat is registratie van werknemersgegevens: vooraf afstemmen met
   OR en privacy (AVG, doelbinding, bewaartermijn). Voorstel: positie alleen
   per foto als bewijs, geen doorlopende tracking; tijd per object alleen als
   teamgemiddelde. Beslissing: Tim met HR.
7. **Vrije opmerking.** Toevoegen in stap 4 (optioneel veld)? Klein in bouw,
   groot in waarde voor kantoor en TOOC. Voorstel: ja.

## 9. Vervolg

* Stap 1: akkoord op de richting en op de beslissingen in hoofdstuk 8, of een
  keuze per punt.
* Stap 2: klikbare mobiele mock v4 in deze map (`mockups/kwaliteitscontrole-ux/`),
  zoals eerder bij creaties-verzamelen: dezelfde data en dezelfde
  gedragsregels als v3, nieuwe structuur en schermen uit dit voorstel. Het
  regressiescript van v3 dient als vangnet voor het gedrag.
* Stap 3: valideren met Roy, Sjaak en Dick op hun eigen telefoon, met drie
  meetpunten: taps per object, tijd per object, aantal keren dat iemand zich
  afvraagt "waar ben ik in het proces".
* Stap 4: pas daarna de definitieve v4 laten maken (Claude Design) en live
  zetten als `kwaliteitscontrole-v4`, met Usersnap-target op de nieuwe slug.
