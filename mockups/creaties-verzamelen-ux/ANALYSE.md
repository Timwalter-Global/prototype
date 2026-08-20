# Restyle-voorstel · creaties-verzamelen

Status: **akkoord gegeven en doorgevoerd** in
`prototypes/creaties-verzamelen/index.html` (acht commits, één per ingreep,
op branch `claude/creaties-ux-ui-optimization-7v56ro`). De klikbare mock in
`mockups/creaties-verzamelen-ux/index.html` blijft staan als referentie
(niet gehost; zie `.assetsignore`).

## Uitgangspunt (na feedback)

Géén herinrichting van de applicatie. Het interne dashboard, het dossierscherm,
de procesmonitor en het externe dashboard behouden hun huidige opzet,
onderdelen en flows. Alleen de **stijl** wordt aangepast: rustiger,
intuïtiever, met minder overbodige tekst.

## De acht stijlingrepen

1. **Grotere, rustigere typografie** — basis van ~11,5px naar 13,5px; één
   labelstijl, één nummerstijl (tabular-nums); minder vet en minder
   hoofdletters.
2. **Drie tellerblokken in één vorm** — zelfde opbouw (label · getal ·
   toelichting) voor "Buiten tijdsnorm", "Intern aan zet" en "Partners aan
   zet"; urgentie alleen via kleurstip en getal, niet via drie verschillende
   layouts.
3. **Kleur alleen waar het iets betekent** — status en tijdsnorm houden
   kleur (blauw = bezig, groen = goed, amber = aandacht, rood = actie/te
   laat, grijs = passief). Route, badges en eigenaren worden neutraal.
   "Tijd" is gekleurde tekst in plaats van nóg een pil.
4. **Minder tekst** — herhalende toelichtingen weg: "Weergave voor het
   profiel waarmee je bent ingelogd", "Klik op de tracker voor de
   procesflow", "Deadline verstreken · directe actie", de lange
   mutatie-uitleg in de monitor, dubbelingen als "wacht op externe partij"
   naast "Onze partners aan zet". Wat blijft is korter geformuleerd.
5. **Filterbalk uitgelijnd** — zelfde filters en volgorde, maar één hoogte
   en één stijl; "Mijn taken" en "Groepeer per bureau" herkenbaar als
   toggles.
6. **Tabel opgeschoond** — zelfde acht kolommen; ruimere regels, avatars in
   plaats van zware eigenaar-pillen, statuspil in één kleursysteem,
   ordernummers/tijden in tabular-nums.
7. **Tijdlijn met stille systeemregels** — zelfde events, filterchips en
   "Laatste bericht"-knop; automatische stappen ("⚙ auto") grijs gedimd
   zodat mensen en berichten eruit springen.
8. **Demo-console licht in plaats van donker** — zelfde knoppen
   (perspectief, rol, mailvoorbeelden, reset), maar visueel duidelijk geen
   onderdeel van het product.

Bewust ongewijzigd: alle pagina's en hun indeling, procesmodel, statusmodel,
gates, matrixbewaking, taakvensters (T1–T6), back-upflow, deellivegang,
flowoverlay, specificatiepanelen, mailvoorbeelden en het externe
aanleverconcept.

## Mock

`mockups/creaties-verzamelen-ux/index.html` — vier schermen via de
donkere mock-balk bovenaan (die balk is de schermkiezer van de mock zelf,
geen productonderdeel): Teamcockpit, Dossier, Procesmonitor, Extern
dashboard. De knop "ⓘ Wat is er veranderd" somt de ingrepen op.

## Doorgevoerd

Alle acht ingrepen zijn vertaald naar de inline styles en tekstconstanten
van de x-dc-bundel; gedrag en structuur van de schermen zijn onaangeroerd.
Headless geverifieerd (teamcockpit, dossier, procesmonitor, extern):
rendert zonder scriptfouten.
