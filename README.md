# Prototype-feedback (Usersnap)

Prototypes livezetten en feedback ophalen met **Usersnap**.

**Live overzicht:** https://www.globalnl-innovate.com/

De site staat achter een gedeeld wachtwoord: de browser vraagt bij het openen
om een inlog (gebruikersnaam mag leeg blijven of iets willekeurigs zijn, het
wachtwoord telt). Vraag het wachtwoord op bij Tim.

## Hoe het werkt

1. Maak in [Usersnap](https://usersnap.com) een nieuw project aan voor het
   prototype en kopieer de code snippet (project → *Install* → *Code snippet*).
2. Geef Claude Code het HTML-prototype plus de snippet (of alleen de API-key)
   en vraag: *"Zet dit prototype live"*.
3. Claude Code plaatst het prototype in `prototypes/<slug>/`, voegt de
   Usersnap-snippet toe, zet het op de overzichtspagina en pusht naar `main`.
   Cloudflare publiceert het binnen ±1 minuut.
4. Deel de link plus het wachtwoord. Testers loggen in (zie hierboven) en
   kunnen dan het prototype bekijken en via de Usersnap-knop feedback geven;
   de feedback (inclusief wie wat zei) zie je in het Usersnap-dashboard.
5. Klaar met de ronde? Vraag Claude Code het prototype offline te halen.
   De feedback blijft in Usersnap bewaard.

De volledige werkwijze voor Claude Code staat in [`CLAUDE.md`](CLAUDE.md).

## Let op

Deze repository is publiek: alles wat hier staat is voor iedereen met de link
zichtbaar. Zet er geen vertrouwelijke informatie in.
