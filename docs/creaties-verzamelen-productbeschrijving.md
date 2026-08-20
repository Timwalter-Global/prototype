# Creaties verzamelen — productopbouw en functionele inventarisatie

**Doel van dit document.** Dit document beschrijft hoe het product "Creaties
verzamelen" (werktitel in het prototype: *Creatieve uitingen dashboard*) is
opgebouwd en wat er allemaal in zit, zodat je de oplossing kunt beschrijven en een
technische inschatting kunt maken van wat er gerealiseerd moet worden. De
businesscase-context staat in
[`creaties-verzamelen-businesscase-input.md`](./creaties-verzamelen-businesscase-input.md).

Alles hieronder is ontleend aan het klikbare prototype op
`https://www.globalnl-innovate.com/prototypes/creaties-verzamelen/` (gedeeld
wachtwoord nodig). Waar het prototype iets alleen simuleert, staat dat erbij.

---

## 1. Wat het prototype is — en wat niet

Het prototype is een **klikbare demo in één HTML-pagina**: een statisch bestand
met een kleine React-gebaseerde runtime en vaste demodata (±30 voorbeelddossiers).
Er is geen backend, geen opslag, geen echte upload en geen integratie; alle
gedrag (uploads, checks, statusovergangen, mails) is gesimuleerd in de browser.
Een "demo console" bovenin laat de kijker wisselen van perspectief (intern /
extern / procesmonitor), rol en externe partij — dat is demo-gereedschap, geen
productfunctie.

Het prototype is dus **geen startpunt voor de codebase**, maar wél een complete
functionele specificatie: alle schermen, taken, statussen, teksten en
beslisregels van het beoogde product zitten erin en zijn met gebruikers
gevalideerd.

## 2. Kernconcepten en ontwerpprincipes

- **Dossier.** Per order (uit Salesforce) ontstaat automatisch één dossier dat de
  hele reis van uitvraag tot afronding volgt. Eén dossier heeft altijd **één
  actuele status en één eigenaar "aan zet"** (een interne rol, de externe partij
  of het systeem zelf).
- **Aanlevermatrix.** Per dossier ligt vast welke uitingen nodig zijn: regels van
  formaat/specificatie × netwerk, gekoppeld aan ordernummer(s), met per regel een
  **verwacht aantal creaties**. De matrix is de *bewakingsbasis*: het dossier kan
  nooit doorschuiven zolang een regel openstaat.
- **Automatiseren wat kan, gates waar het moet.** Systeemstappen zijn overal
  gemarkeerd als AUTO; menselijke tussenkomst is beperkt tot vijf bewuste
  beslismomenten (gates G0 t/m G4) plus de inhoudelijke beoordelingen.
- **Alles gelogd.** Elke actie, statusovergang, keuze en afwijking komt in de
  event log van het dossier ("aantoonbaar compleet"). Afwijken van een standaard
  kan, maar altijd met verplichte reden die wordt gelogd.
- **Afkeurlus in hetzelfde dossier.** Afkeurredenen worden gebundeld
  teruggestuurd; de nieuwe versie komt via dezelfde aanleverlink in hetzelfde
  dossier binnen. Versies blijven zichtbaar in de versiegeschiedenis.
- **Uploaden ≠ indienen (extern).** Een aanleveraar kan meerdere bestanden
  uploaden, laten checken, vervangen of verwijderen; pas het expliciete
  **indienen** telt als aanlevering. Een "guard" waarschuwt beide kanten als er
  goedgekeurde creaties klaarstaan die nog niet zijn ingediend.

## 3. Rollen en partijen

**Intern** (in het prototype met voorbeeldpersonen):

| Rol | Verantwoordelijkheid in het proces |
| --- | --- |
| Accountmanagement (AM) | Eindverantwoordelijk richting klant; regieblik en dagsamenvatting, zit niet in de uitvoering |
| Campagnemanagement (CM) | Uitvraag reviewen/versturen (G1), matrix samenstellen (G0), representativiteitstoets (G3), escalaties, klantbevestiging (G4) |
| Ad Ops | Technische beoordeling, taboe- en variantencontrole (G2-pakket), koppelen in Broadsign |
| Marketing | Beoordeling bij merk-/representativiteitstwijfel, alleen na doorverwijzing |

Taken zijn eigendom van één persoon, maar **overnemen kan altijd** ("Ik pak dit
op") en wordt gelogd. Niet-eigenaren zien taakvensters in leesmodus.

**Extern:** adverteerder direct, mediabureau, of designstudio. Een mediabureau
kan zijn uitvraag **doorsturen naar de designstudio**; die krijgt dan een eigen
unieke aanleverlink (gelogd). De aanleverpagina is tweetalig (NL/EN).

## 4. Procesmodel — zes fasen

Elke fase kent systeemstappen (AUTO) en waar nodig een gate (G):

1. **Start en dossier.** Order komt binnen uit Salesforce → dossier automatisch
   aangemaakt → benodigde aanleverspecificaties automatisch bepaald uit netwerk-
   en klantprofiel. Alleen bij een niet-eenduidige ordernummerkoppeling volgt
   **G0** (taak T1): de CM kiest het juiste ordernummer en stelt de
   aanlevermatrix samen (regels aanvinken, verwacht aantal creaties per regel).
2. **Uitvraag.** Het systeem genereert de uitvraagmail uit een
   standaardtemplate, inclusief specificaties uit het profiel en een unieke,
   persoonlijke aanleverlink. **G1** (taak T2): de CM reviewt, past eventueel aan
   en verstuurt — verzending en statusovergang zijn één handeling. Afwijken van
   de standaard vereist een reden (gelogd). Bij partnerroutes toont het systeem
   de afspraak uit het partnerprofiel (bijv. "aanlevering via wekelijkse batch").
3. **Aanlevering en bewaking.** Drie aanleverroutes: **Preferred** (externe
   partij levert zelf via de unieke link), **Partnerproces** (afgestemd op het
   werkproces van de partner) en **Back-up** (Global uploadt namens de klant; zie
   §8). Het systeem bewaakt de deadline en stuurt automatisch herinneringen met
   oplopende urgentie; elke linkactie (geopend, geüpload, ingediend) wordt
   gelogd. Bij het verstrijken van de deadline zonder actie: melding aan de AM en
   een escalatietaak bij de CM (handmatige herinnering/contact, taak T2-variant).
   Elke upload krijgt direct een **automatische technische controle** (resolutie,
   duur, geluidsspoor, bestandsformaat/bitrate) met concrete uitleg bij afkeuring.
4. **Controle.** Twee sporen **parallel**: (A) het Ad Ops-pakket — G2 technische
   beoordeling bij uitzondering, taboecontrole per locatieprofiel,
   variantencontrole netwerk × variant (taak T3) — en (B) de
   representativiteitstoets — automatische voortoets die aandachtspunten
   signaleert → CM beoordeelt (taak T4, **G3**) → kan doorverwijzen naar
   Marketing (taak T5). Afkeuren kan in elk spoor; redenen worden per sectie
   gebundeld en via de aanleverlink teruggestuurd, waarna de nieuwe versie in
   hetzelfde dossier binnenkomt. Verzamelpunt: pas als alle controles akkoord
   zijn én de matrix compleet is, gaat het dossier door. Een CM kan een
   **deellivegang** aanvragen (alleen goedgekeurde regels gaan live; open regels
   blijven bewaakt; reden verplicht en gelogd).
5. **Koppeling.** Ad Ops koppelt de goedgekeurde creatie in **Broadsign** (met
   "gCam" als genoemde toekomstige opvolger) aan de planning; status Gekoppeld,
   gelogd. In het prototype is dit een geregistreerde handmatige stap, geen
   automatische plaatsing.
6. **Bevestiging en afronding.** Het systeem zet de klantbevestiging klaar op
   basis van de afzenderregistratie (wie leverde aan). **G4** (taak T6): de CM
   valideert het contactadres (keuze wordt gelogd) en verstuurt. Daarna is het
   dossier afgerond en elke stap terug te vinden in de event log.

**Mutaties** komen in elke fase binnen vanuit Salesforce: **Vervallen** stopt het
dossier en alle uitgaande communicatie; **Gewijzigd** herberekent deadline en
bewaking automatisch, waarna het dossier verdergaat in zijn actuele fase.

## 5. Statusmodel

Twaalf dossierstatussen, altijd precies één actueel:

`Aangemaakt` → `Uitvraag klaar voor review` → `Uitvraag verstuurd` →
`Wacht op aanlevering` → `In controle` → (`Afgekeurd, nieuwe versie` ⤺ terug naar
aanlevering) → `Goedgekeurd` → `Gekoppeld` → `Wacht op klantbevestiging` →
`Afgerond`, plus de mutatiestatussen `Vervallen` en `Gewijzigd`.

Daarnaast heeft elke **matrixregel** een eigen status: `open`, `aangeleverd`,
`in controle`, `goedgekeurd`, `afgekeurd`, `gekoppeld` — de dossierstatus wordt
mede afgeleid uit de regelstatussen (bijv. "Wacht op aanlevering · 1/3").

Elke **creatie (bestand)** binnen een regel heeft bovendien een eigen
levenscyclus: `concept` (geüpload, checkresultaat groen of rood) → `ingediend` →
eventueel `afgekeurd` of `vervangen` (nieuwe versie, versienummer loopt op).

Voor de urgentie geldt een **tijdsnorm** op resterende tijd tot deadline: groen,
amber (aandacht, ≤ ~48 uur) en rood ("buiten tijdsnorm", deadline verstreken —
directe actie).

## 6. Schermen en componenten

### Intern

1. **Teamcockpit (I1).** Werklijst van alle dossiers met:
   - Tellers die tegelijk filter zijn: *Buiten tijdsnorm* (rood), *Intern aan
     zet* uitgesplitst per team (AM / CM / Ad Ops, met badges "x actie" en
     "x aandacht") en *Onze partners aan zet* (extern).
   - Filters: adverteerder (zoekveld), ordernummer, mediabureau, stakeholder,
     status, aanleverroute; toggle "Mijn taken" voor CM's; "Groepeer per bureau"
     (toont ook "x lopende uitvragen" per bureau/klant).
   - Sorteerbare kolommen, paginering, rij-accenten (rood bij verlopen; eigen
     wachtrij gemarkeerd voor Marketing, incl. banner met aantallen).
2. **Dossierscherm (I2).** Alles van één dossier:
   - Kop met campagne, klant, ordernummer, resterende tijd en een
     **antwoordstrook** die per kijker vertelt wat er speelt: "Jij bent aan zet"
     (met knop naar het taakvenster), "Een collega is aan zet" (met
     overnemen-knop), regieblik voor AM, of "Geen actie nodig / wachten op
     extern" — inclusief feitenregel (openstaande uitingen, herinneringen,
     guard) en de status van een parallelle taak. De strook krimpt mee bij
     scrollen.
   - **Fasetracker** (6 fasen met voortgang, incl. tellers x/y op aanlevering en
     controle) — klikbaar naar de flowoverlay.
   - **Aanlevermatrix**: per regel status, bestandsna(a)m(en), ordernummers,
     voortgang (x/y creaties), afkeurreden, back-up-label, link naar
     specificaties, knop "Uploaden namens klant" en (voor CM) "Deellivegang
     aanvragen".
   - **Tijdlijn / event log** met filterchips (alles / communicatie /
     statuswijzigingen / acties), "laatste bericht"-regel, uitklapbare details en
     klikbare berichten die het berichtpaneel openen. Inkomende mails zijn
     gemarkeerd ("Inkomend · via mailbox").
   - **Andere lopende uitvragen bij deze klant** (dwarsverband op klant/bureau).
3. **Taakvensters** (zijpaneel; alleen de eigenaar kan uitvoeren, anderen kijken
   mee in leesmodus):
   - **T1 · G0 Ordernummer bevestigen** — keuze uit gevonden ordernummers +
     matrix samenstellen (regels aan/uit, verwacht aantal per regel, regel
     toevoegen).
   - **T2 · G1 Uitvraag reviewen en versturen** — bewerkbare mail, specificaties
     uit profiel, unieke aanleverlink, partnerafspraak-melding, "afwijken van
     standaard" met verplichte reden; ook gebruikt voor handmatige herinnering
     bij escalatie.
   - **T3 Beoordeling Ad Ops** — uitklapbaar logje van de automatische technische
     controle, taboecontrole-checklist per locatieprofiel, variantencontrole
     (matrix netwerk × variant), goedkeuren of afkeuren met gebundelde redenen
     per sectie + toelichting; toont de status van het parallelle spoor.
   - **T4 · G3 Representativiteitstoets CM** — aandachtspunten uit de
     automatische toets, voldaan / afkeuren (reden verplicht) / doorverwijzen
     naar Marketing met notitie; toont parallelspoor.
   - **T5 Beoordeling Marketing** — aandachtspunten + notitie van de CM,
     voldaan / afkeuren met reden.
   - **T6 · G4 Klantbevestiging** — aanleverende partij uit afzenderregistratie,
     keuze van contactadres (gelogd), voorbeeldmail, versturen en afronden.
   - **Back-upupload (BU)** — zie §8.
4. **Flowoverlay (I9).** De volledige procesflow van het dossier: zes fasen met
   alle substappen (AUTO/gates, route-specifiek gemarkeerd, niet-relevante
   stappen gedimd), "dit dossier is hier", klikbare fase-uitleg en het volledige
   statusmodel als chips.
5. **Procesmonitor.** Live afgeleide telling van actieve uitingen per processtap
   over alle zes fasen plus de mutaties; klik op een stap opent een detail met
   uitleg en de lijst uitingen die er nu zitten, met doorklik naar het dossier.
   Bewust alleen aantallen — geen grafieken of doorlooptijden.
6. **Mailvoorbeelden-overlay** (demo-hulpmiddel): alle mailmomenten naast elkaar.
7. **Berichtpaneel en specificatiepaneel** (zijpanelen): volledige weergave van
   een verzonden/ontvangen bericht (aan/van/datum/effect) resp. een
   specificatieprofiel (zie §7).

### Extern (aanleverpagina, unieke link, geen inlog, NL/EN)

1. **Overzicht.** Alle lopende uitvragen van de partij, gesplitst in "Actie
   nodig" (gesorteerd op urgentie, met deadline, voortgangsteller en guard) en
   "Geen actie nodig".
2. **Detail per campagne.**
   - *Aan te leveren materiaal*: per matrixregel status ("Nog aanleveren",
     "Klaar om in te dienen", "Nieuwe versie nodig", "In afwachting van Global",
     "Afgerond"), voortgangsbalk (ingediend + klaarstaand), specificatielink,
     afkeurredenen, upload/beheer-knop.
   - *Statustracker* (5 stappen: uitvraag ontvangen → in productie → aangeleverd
     → in controle → goedgekeurd en live) met "aan zet"-regel.
   - *Berichten* (alle aan deze partij gestuurde mails, uitklapbaar) en
     *versiegeschiedenis* (alle geüploade bestanden met versie en status).
   - *Doorsturen naar designstudio* (voor bureaus): maakt een eigen unieke link
     aan, gelogd.
3. **Upload-popup ("Beheer uploads").** Meerdere bestanden tegelijk, optioneel
   veld "wie levert aan", per bestand een live specificatiecheck (groen vinkje
   per kenmerk, of rood met concrete reden), en de tweestaps-flow: concept →
   **indienen bij Global** (per stuk of "alles indienen"). Vóór indienen kan een
   bestand vervangen of verwijderd worden; na indienen of afkeuring alleen
   "nieuwe versie uploaden". Alles gelogd.

## 7. Specificatieprofielen en automatische controles

Specificaties zijn **profielen** (geen vrije tekst), in het prototype o.a.:

- DOOH Portrait Full Motion (1080×1920, 25 fps, .MP4, exacte duur per netwerk,
  geen geluid), DOOH Portrait Still, DOOH Landscape Full Motion, en een
  printprofiel (abri/europanel: afmetingen, afloop, dpi, CMYK-profiel,
  PDF-versie).
- Per profiel: kenmerken, bestandsnaamconventie + voorbeeld, "belangrijk"-regel,
  aanleverdeadline-regel, en **locatie-uitzonderingen** die automatisch getoond
  worden (bijv. NS-netwerk: exacte spotlengte, verboden kleuren, geen verwarring
  met reisinformatie).
- Alle profielteksten bestaan in NL en EN.

Deze profielen voeden drie dingen: de uitvraagmail, het specificatiepaneel
(intern én extern) en de **automatische technische controle** bij upload. De
taboecontrole (bijv. geen alcohol nabij scholen) hangt aan locatieprofielen en
wordt als checklist aan Ad Ops voorgelegd; de variantencontrole toetst de
dekking netwerk × variant tegen de matrix.

## 8. Back-uproute (uploaden namens de klant)

Als een externe partij buiten de link om aanlevert (mail, WeTransfer, telefoon),
uploadt een bevoegde interne rol (AM of de dossier-CM; Ad Ops en Marketing niet)
namens de klant. Verplicht: keuze van het **oorspronkelijke kanaal** (zonder
kanaal blijft de uploadknop gedempt) en koppeling aan een matrixregel; optionele
toelichting. De upload doorloopt dezelfde automatische controle, wordt
geregistreerd als back-up (label op de regel), stopt de lopende herinneringen en
gedraagt zich daarna als reguliere aanlevering. Het venster zelf is de
registratie — uitvoerder en keuzes worden gelogd.

## 9. Communicatiemodel

Alle communicatie wordt door het systeem gegenereerd en gelogd; mails bevatten
deeplinks naar de tool of de aanleverpagina. De momenten:

| # | Bericht | Richting | Trigger |
| --- | --- | --- | --- |
| M1 | Interne taakmail | intern | Taak klaargezet (bijv. beoordeling bij Ad Ops) |
| M2 | Uitvraagmail met specificaties en unieke aanleverlink | extern | G1-verzending |
| M3a | Herinnering 1 (vriendelijk, "nog 3 dagen", incl. stand van de aanlevering) | extern | Automatische bewaking |
| M3b | Herinnering 2 (urgent, "actie nodig vandaag", contactpersoon geïnformeerd) | extern | Automatische bewaking |
| M4 | Klantbevestiging ("staat gepland", startdatum, netwerk) | extern | G4-verzending |
| M5 | Dagsamenvatting AM (dossiers buiten de tijdsnorm) | intern | Dagelijks |
| M6 | Afkeurbericht (gebundelde redenen op de aanleverpagina) | extern | Afkeuring |
| R1 | Inkomende reply, automatisch aan het dossier gekoppeld via de Salesforce-mailboxkoppeling | inkomend | Antwoord van externe partij |

De herinneringsteksten vullen zich automatisch met de actuele stand per
matrixregel ("nog 2 van 3 creaties voor …", "1 creatie staat klaar om in te
dienen — vergeet het indienen niet").

## 10. Datamodel (afgeleid)

De entiteiten die het product minimaal nodig heeft, zoals ze in het prototype
functioneren:

- **Dossier** — order(s), campagne, klant, via-bureau, route
  (Preferred/Partnerproces), netwerk, status, fase, deadline/tijdsnorm,
  eigenaar/owners, taken.
- **Matrixregel** — specificatieprofiel, netwerk, ordernummer(s), verwacht
  aantal, status, afkeurreden, back-up-kanaal.
- **Creatie/versie** — bestand, versienummer, uploadmoment, aanleveraar,
  checkresultaat, status (concept/ingediend/afgekeurd/vervangen), evt. periode.
- **Partij & contact** — adverteerder, mediabureau, designstudio,
  contactadressen (afzenderregistratie), partnerprofiel met afspraken,
  doorstuurrelaties, unieke aanleverlinks (tokens).
- **Specificatieprofiel** — kenmerken NL/EN, naamconventie,
  deadline-regel, locatie-uitzonderingen; **locatieprofiel** met taboeregels.
- **Taak** — type (T1–T6, BU, escalatie), gate, eigenaar, dossier, uitkomst.
- **Event** — tijdstip, actor (persoon / systeem / externe partij), omschrijving,
  type (communicatie / status / actie), detail, gekoppeld bericht.
- **Bericht** — template, ingevulde inhoud, richting, kanaal, effect
  (bijv. "link geopend").

## 11. Integraties

| Systeem | Rol | In het prototype |
| --- | --- | --- |
| **Salesforce** | Bron van orders en ordernummers (dossieraanmaak), mutaties (vervallen/gewijzigd, datumwijzigingen), en de mailboxkoppeling die inkomende replies automatisch aan het dossier hangt | Gesimuleerd in demodata |
| **Broadsign** | Doelsysteem: goedgekeurde creatie koppelen aan de planning ("gCam" genoemd als toekomstige opvolger) | Geregistreerde handmatige stap |
| **E-mail** | Verzending van alle berichten (M1–M6) met deeplinks; ontvangst via mailboxkoppeling | Voorbeeldmails |
| **Bestandsopslag + mediavalidatie** | Opslag van uploads en automatische technische controle (resolutie, duur, fps, geluid, formaat/bitrate; print: afmeting, dpi, kleurprofiel) | Gesimuleerde check met vaste uitkomsten |

## 12. Niet in het prototype, wél nodig in het product

Voor de technische raming: dit zit **niet** in de klikbare demo maar volgt
logisch uit het ontwerp.

1. Authenticatie en autorisatie intern (rollenmodel AM/CM/Ad Ops/Marketing) en
   het token-mechanisme voor de externe links (aanmaken, intrekken, doorsturen).
2. Echte upload-infrastructuur (grote videobestanden, virusscanning, opslag,
   retentie) en de daadwerkelijke mediavalidatie-engine.
3. Beheerschermen voor specificatie-, locatie- en partnerprofielen, taboeregels,
   mailtemplates en tijdsnormen (in het prototype vaste data).
4. De schedulers: deadlinebewaking, herinneringslogica met oplopende urgentie,
   dagsamenvatting, escalaties.
5. De echte integraties uit §11 (Salesforce-events, Broadsign, mailverzending
   en -ontvangst) inclusief foutafhandeling en herverwerking.
6. Notificatie-infrastructuur en deeplinks met sessie-afhandeling.
7. AVG-zaken: dataminimalisatie, bewaartermijnen van creaties en logs,
   verwerkersafspraken met externe partijen.
8. Rapportage voorbij de procesmonitor (als daarvoor gekozen wordt) en
   archivering van afgeronde dossiers.

## 13. Bouwstenen voor de inschatting

Samenvattende decompositie; elk blok is los te ramen:

| Blok | Omvat |
| --- | --- |
| Kern & datamodel | Dossier, matrix, creaties/versies, statusmachine (dossier + regel + creatie), event log |
| Dossieraanmaak & mutaties | Salesforce-inkomend, specificatiebepaling uit profielen, G0-afhandeling, vervallen/gewijzigd |
| Uitvraag & communicatie | Templates, generatie, G1-flow, verzending, herinneringen, escalatie, dagsamenvatting, klantbevestiging, mailboxkoppeling inkomend |
| Extern portaal | Overzicht + detail, tokens/links, doorsturen, upload-popup met tweestaps indienen, tweetaligheid |
| Mediavalidatie | Upload-pijplijn, automatische specificatiecheck, terugkoppeling |
| Interne werkomgeving | Teamcockpit (tellers/filters/sortering), dossierscherm (antwoordstrook, matrix, tijdlijn), taakvensters T1–T6 + back-upupload, flowoverlay, panelen |
| Controleflows | Parallelle sporen, taboe- en variantencontrole, afkeurlus, deellivegang, verzamelpuntlogica |
| Koppeling | Broadsign-stap (registratie; optioneel automatische plaatsing) |
| Procesmonitor | Telling per stap, stapdetail, doorklik |
| Beheer & fundament | Profielenbeheer, rollen/rechten, schedulers, notificaties, AVG, logging-infra |
