# Creaties verzamelen — input voor de businesscase

**Doel van dit document.** Dit document geeft collega's die een businesscase opstellen
alle inhoudelijke context over het product "Creaties verzamelen": welk probleem het
oplost, hoe de oplossing eruitziet, waar de waarde zit en wat de belangrijkste
aannames, afhankelijkheden en risico's zijn. De technische en functionele opbouw
staat in het zusterdocument
[`creaties-verzamelen-productbeschrijving.md`](./creaties-verzamelen-productbeschrijving.md).

**Basis.** Beide documenten zijn gebaseerd op het gevalideerde klikbare prototype
"Creaties verzamelen" (live op `https://www.globalnl-innovate.com/prototypes/creaties-verzamelen/`,
achter het gedeelde wachtwoord). Het prototype toont de beoogde werking met
demodata; alle cijfers over volumes en baten in dit document zijn **aannames die in
de businesscase gevalideerd moeten worden**.

---

## 1. Het probleem

Voor elke out-of-home-campagne moet Global creatieve uitingen ("creaties")
ontvangen van adverteerders, mediabureaus of hun designstudio's: video's en stills
in exacte specificaties per netwerk (resolutie, duur, bestandsformaat), soms in
meerdere varianten. Dat verzamelproces loopt vandaag grotendeels via e-mail en
handwerk. De gevolgen:

- **Geen overzicht.** Niemand ziet in één oogopslag welke campagnes nog op
  materiaal wachten, wie aan zet is (Global of de externe partij) en waar de
  deadline in gevaar komt. Status leeft in mailboxen en hoofden.
- **Gemiste deadlines en lege schermen.** Als materiaal te laat of fout binnenkomt,
  komt de startdatum in gevaar en blijven verkochte posities leeg — direct
  omzetverlies en een slechte klantervaring.
- **Veel handmatig na-jagen.** Campagnemanagers versturen zelf uitvragen,
  herinneringen en bevestigingen, en bewaken deadlines met de hand. Dat is
  repeterend werk dat niet schaalt met het campagnevolume.
- **Fouten en herwerk laat in het proces.** Technische afwijkingen (verkeerde duur,
  verkeerd formaat, geluid waar dat niet mag) worden pas ontdekt als een mens het
  bestand opent. Afkeuringen en nieuwe versies lopen opnieuw via losse mails.
- **Geen aantoonbaarheid.** Wie wat wanneer heeft aangeleverd, gecontroleerd,
  goedgekeurd of gecommuniceerd is achteraf lastig te reconstrueren — vervelend
  bij discussies met klanten en bij interne overdracht.
- **Onvoorspelbare ervaring voor de klant.** Elke aanlevering gaat anders; de
  externe partij weet niet waar hij aan toe is, wat de status is of wat er precies
  (nog) verwacht wordt.

## 2. De oplossing in één alinea

Eén werkproces-applicatie ("Creatieve uitingen dashboard") waarin elk
campagnedossier automatisch ontstaat vanuit de order in Salesforce, waarin per
dossier een **aanlevermatrix** vastlegt welke uitingen er precies nodig zijn, en
waarin het systeem de aanlevering zelf bewaakt: het genereert de uitvraag met een
**unieke persoonlijke aanleverlink**, stuurt automatisch herinneringen met
oplopende urgentie, controleert elk geüpload bestand direct automatisch tegen de
specificaties, en leidt de interne controles (Ad Ops, representativiteit,
marketing) via taken langs de juiste mensen. De externe partij krijgt een eigen
aanleverpagina (zonder inlog, tweetalig NL/EN) met status, specificaties,
berichten en versiegeschiedenis. Elke stap wordt gelogd, zodat elk dossier
aantoonbaar compleet is.

Het ontwerpprincipe: **automatiseren wat kan, mensen alleen op de
beslismomenten.** Het systeem doet aanmaken, uitvragen genereren, bewaken,
herinneren, technisch controleren en bevestigingen klaarzetten; medewerkers doen
alleen de vijf bewuste beslismomenten (gates G0 t/m G4, zie het productdocument).

## 3. Voor wie

| Groep | Rol in het proces | Wat het product hen oplevert |
| --- | --- | --- |
| Campagnemanagement (CM) | Uitvraag versturen, escalaties, afkeuringen, klantbevestiging | Teamcockpit met "wie is aan zet", taken in plaats van mailwerk, automatische bewaking en herinneringen |
| Ad Ops | Technische beoordeling, taboe- en variantencontrole, koppeling in Broadsign | Aangeleverd materiaal komt technisch vooraf gecontroleerd binnen; beoordeling als afvinkbare taak; koppelstap gelogd |
| Accountmanagement (AM) | Eindverantwoordelijk richting klant | Regie-overzicht en dagsamenvatting van dossiers buiten de tijdsnorm, zonder zelf in de uitvoering te zitten |
| Marketing | Beoordeling merk-/representativiteitstwijfels | Alleen betrokken als het nodig is, via een duidelijke taakwachtrij |
| Adverteerders, mediabureaus, designstudio's (extern) | Aanleveren van creaties | Eén duidelijke aanleverpagina: wat is nodig, wat is de status, directe feedback of een bestand voldoet; bureaus kunnen doorsturen naar hun studio |

## 4. Waar de waarde zit

De batenlogica voor de businesscase, kwalitatief. De kwantificering (volumes,
uren, tarieven, omzetimpact) moet in de businesscase zelf worden opgehaald.

1. **Minder omzetverlies door lege schermen en verschoven startdata.**
   Automatische bewaking, herinneringen met oplopende urgentie en escalatie naar
   AM/CM vóórdat de deadline verstrijkt, verkleinen de kans dat een campagne niet
   of te laat live gaat. Deellivegang (goedgekeurde uitingen alvast live, rest
   blijft bewaakt) beperkt de schade als een deel van het materiaal te laat is.
2. **Minder handmatig werk per dossier.** Dossier aanmaken, uitvraag opstellen,
   specificaties opzoeken, herinneren, technisch controleren en de bevestiging
   klaarzetten gebeurt automatisch. De mens houdt per dossier een klein aantal
   beslismomenten over. Dit is de grootste efficiencypost; te kwantificeren als
   (aantal dossiers per jaar) × (bespaarde minuten per dossier).
3. **Minder herwerk en snellere doorlooptijd.** De automatische
   specificatiecheck bij upload geeft de aanleveraar directe feedback (fout
   bestand = direct zichtbaar, met reden), waardoor foute aanleveringen niet meer
   het interne proces in lopen. Afkeurredenen worden gebundeld teruggestuurd en
   de nieuwe versie komt in hetzelfde dossier binnen.
4. **Aantoonbaarheid en kwaliteit.** Elke actie, keuze en afwijking wordt gelogd
   (event log per dossier). Dat verlaagt risico bij klantdiscussies, maakt
   overdracht tussen collega's triviaal en maakt de controlestappen (taboe,
   varianten, representativiteit) aantoonbaar uitgevoerd.
5. **Betere klant- en partnerervaring.** Eén professionele, tweetalige
   aanleverpagina met status en duidelijke verwachtingen, in plaats van
   mailverkeer. Dit ondersteunt het commerciële verhaal richting bureaus.
6. **Stuurinformatie.** De procesmonitor toont live waar het werk in het proces
   zit (aantallen per stap), wat structurele knelpunten zichtbaar maakt.

## 5. Scope

**Binnen scope van het product (zoals gevalideerd in het prototype):**

- Automatische dossieraanmaak vanuit Salesforce-orders, inclusief verwerking van
  mutaties (vervallen, gewijzigd) gedurende het hele proces.
- Aanlevermatrix per dossier als bewakingsbasis (welke uitingen, hoeveel, voor
  welk netwerk/ordernummer).
- Uitvraag- en communicatiemodule (gegenereerde mails, unieke aanleverlinks,
  automatische herinneringen, escalaties, klantbevestiging, dagsamenvatting).
- Extern aanleverportaal zonder inlog, tweetalig, met upload, automatische
  specificatiecheck, tweestaps indienen, versiegeschiedenis en doorstuurfunctie.
- Interne teamcockpit, dossierscherm, taakvensters voor de vijf gates en de
  beoordelingstaken, procesmonitor en volledige event log.
- Back-uproute: Global uploadt namens de klant, met verplichte registratie van
  het oorspronkelijke kanaal.
- Koppelstap naar Broadsign (registratie van de koppeling in het dossier).

**Buiten scope / nog te beslissen (relevant voor de raming):**

- Daadwerkelijke automatische plaatsing in Broadsign (in het prototype is de
  koppeling een geregistreerde handmatige stap; "gCam" wordt als toekomstige
  opvolger genoemd).
- Beheerschermen voor specificatieprofielen, netwerkprofielen, taboeregels en
  partnerafspraken (in het prototype zijn dit vaste gegevens; in het product
  moeten ze beheerd kunnen worden).
- Rapportage voorbij de procesmonitor (doorlooptijdanalyses, trends).
- Facturatie, planning en verkoop zelf — die blijven in Salesforce en de
  bestaande systemen.

## 6. Afhankelijkheden

| Afhankelijkheid | Waarom nodig | Aandachtspunt voor de businesscase |
| --- | --- | --- |
| Salesforce-integratie | Bron van orders, ordernummers, mutaties en de mailboxkoppeling (inkomende replies automatisch aan het dossier koppelen) | Beschikbaarheid van bruikbare API's/events en de kwaliteit van orderdata (G0 bestaat juist omdat ordernummers niet altijd eenduidig zijn) |
| Broadsign | Doelsysteem waar goedgekeurde creaties aan de planning worden gekoppeld | Diepte van de integratie bepaalt een flink deel van de bouwkosten; minimale variant is registratie zonder automatische plaatsing |
| E-mailverzending en -ontvangst | Alle uitvragen, herinneringen en bevestigingen lopen per mail met deeplinks | Afzenderdomein, deliverability, AVG |
| Bestandsopslag en mediavalidatie | Uploads tot videoformaten, automatische controle op resolutie/duur/geluid/bitrate | Opslag- en verwerkingskosten schalen met volume |
| Specificatie- en netwerkprofielen | De automatische checks en uitvraagteksten komen uit profielen per netwerk/locatie (incl. uitzonderingen zoals het NS-netwerk) | Eigenaarschap en onderhoud van deze profielen moet belegd worden |

## 7. Risico's en aannames

- **Adoptie extern.** De waarde staat of valt met externe partijen die de
  aanleverlink gebruiken in plaats van mail. Het ontwerp vangt dit op met drie
  routes (voorkeursroute via de link, partnerproces afgestemd op de partner, en
  een back-uproute waarbij Global zelf uploadt en het kanaal registreert), zodat
  het dossier ook compleet en bewaakt blijft als een partij niet meebeweegt.
  Aanname: het aandeel back-upuploads daalt na verloop van tijd.
- **Datakwaliteit Salesforce.** Onduidelijke of dubbele ordernummers leiden tot
  handmatige G0-taken. Hoe vaak dit voorkomt bepaalt hoeveel automatisering er
  echt uit fase 1 komt — meten in de nulmeting.
- **Integratie-inspanning.** Salesforce en Broadsign zijn de twee grote
  onzekerheden in de bouwraming; laat de technische inschatting deze twee als
  aparte posten opnemen (zie het productdocument, hoofdstuk "Integraties").
- **Beheerlast profielen.** Specificaties en taboeregels veranderen; zonder
  belegd eigenaarschap veroudert de automatische controle.
- **Volume-aannames.** Aantal dossiers per jaar, gemiddeld aantal uitingen per
  dossier, huidig percentage te late aanleveringen en huidige tijdsbesteding per
  dossier zijn nog niet gemeten — dit zijn de vier kerngetallen voor de baten.

## 8. Wat er al ligt

- **Gevalideerd klikbaar prototype** met het volledige werkproces in zes fasen,
  drie perspectieven (intern, extern, procesmonitor), alle taakvensters en alle
  mailmomenten. Getest via de innovatie-site met Usersnap-feedback.
- **Uitgewerkt statusmodel, takenmodel en communicatiemodel** (zie het
  productdocument) — de functionele specificatie is daarmee grotendeels al
  gedaan, wat de ontwerpfase van de bouw verkort.
- Een eerder gevalideerde **procesflow "Creaties verzamelen to-be"** (gearchiveerd
  prototype) als onderbouwing van het procesontwerp.

## 9. Open vragen voor de businesscase

1. Volumes: dossiers per jaar, uitingen per dossier, groeiverwachting.
2. Nulmeting: huidige uren per dossier per rol, percentage te late of foute
   aanleveringen, aantal gemiste startdata per jaar en de omzetimpact daarvan.
3. Integratiediepte Broadsign: registreren (goedkoop) versus automatisch
   plaatsen (duurder, meer baten) — beide scenario's ramen.
4. Bouw-, beheer- en licentiekosten: intern bouwen versus uitbesteden;
   hosting-, opslag- en mailkosten.
5. Uitrol: één netwerk/team eerst of alles tegelijk; migratie van lopende
   campagnes.
