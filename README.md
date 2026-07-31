# Prototype-feedback (Usersnap)

Prototypes livezetten en feedback ophalen met **Usersnap**.

**Live overzicht:** https://timwalter-global.github.io/prototype/

## Hoe het werkt

1. Maak in [Usersnap](https://usersnap.com) een nieuw project aan voor het
   prototype en kopieer de code snippet (project → *Install* → *Code snippet*).
2. Geef Claude Code het HTML-prototype plus de snippet (of alleen de API-key)
   en vraag: *"Zet dit prototype live"*.
3. Claude Code plaatst het prototype in `prototypes/<slug>/`, voegt de
   Usersnap-snippet toe, zet het op de overzichtspagina en pusht naar `main`.
   GitHub Pages publiceert het binnen 1–2 minuten.
4. Deel de link. Iedereen met de link kan het prototype bekijken en via de
   Usersnap-knop feedback geven; de feedback (inclusief wie wat zei) zie je in
   het Usersnap-dashboard.
5. Klaar met de ronde? Vraag Claude Code het prototype offline te halen.
   De feedback blijft in Usersnap bewaard.

De volledige werkwijze voor Claude Code staat in [`CLAUDE.md`](CLAUDE.md).

## Let op

Deze repository is publiek: alles wat hier staat is voor iedereen met de link
zichtbaar. Zet er geen vertrouwelijke informatie in.
