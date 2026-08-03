# Global — Design System

> **Global Media & Entertainment** is the Netherlands' leading **(Digital) Out‑of‑Home** advertising operator. With a nationwide network of **12,000+ street abri's and europanels** and **3,300+ digital screens** — at supermarkets, petrol stations, shopping centres, on the street and along the motorway — Global reaches **~60% of the Netherlands every week**. The Dutch operation is part of the UK‑based **Global Media & Entertainment Group** (radio brands Capital, Heart, Classic FM, Smooth, LBC, Radio X, Gold).

This project is the Global design system: brand foundations (colour, type, spacing), the wordmark and brand assets, reusable React UI primitives, and product UI kits — everything an agent needs to design on‑brand interfaces and artefacts for Global.

---

## Sources

| Source | Reference | Notes |
|---|---|---|
| Brand book | `uploads/Brandbook 2026_compressed.pdf` (29 pp.) | Mission, vision, pillars, tone of voice, logo, type, colour, shapes, photography, presentation rules. The authoritative source for this system. |
| PowerPoint template | `uploads/Presentatie template.pdf` (82 pp.) | Global's official slide template. The `slides/` deck is recreated from this — title, section divider, content, data/chart, ranking and guidelines layouts, plus the real title & section backgrounds. |
| Logo files | `uploads/Global logo.png`, `uploads/Global logo wordmark.png` | Official full lock-up and "g" icon mark supplied by the client. |
| Website (NL) | https://global.com/nl/ | Corporate / advertiser‑facing marketing site. |
| Self‑service | https://globalbuitenreclame.nl/ | Online ordering for outdoor advertising. |
| Group | https://global.com/ | UK parent group. |

> Global uses **only two marks**: the full lock-up (`global-lockup-{white,blue}.png` — wordmark + "Making everyone's day brighter" tagline) and the **"g" icon mark** (`global-icon.png`). **Never use a wordmark-only crop** — the single-story "g" has a descender that gets clipped, which is incorrect. The `Logo` component only exposes `lockup`, `lockup-blue` and `icon`.

---

## Brand at a glance

- **Mission** — "To become the home to the best media and entertainment on the planet."
- **Vision / payoff** — **"Making everyone's day brighter."**
- **Pillars** — Think Big · Own it · Keep it Simple · Better Together.
- **Voertaal** — Dutch. Energetic, confident, informal, human, lightly humorous.

---

## CONTENT FUNDAMENTALS — how Global writes

The tone of voice mirrors an *energetic, ambitious, people‑centric* culture and should convey progress, creativity and collaboration.

- **Language is Dutch.** Write in Dutch by default; English exists for the international/group audience.
- **Address people directly with "je" — never "u".** Communication feels like a conversation between equals: no distance, no formality.
- **Energetic & confident.** Strong, active verbs. Lead with ambition and momentum ("Global is dé specialist…", "We bereiken…").
- **Speak from the brand.** Talk *as* Global: "Global is…", "Bij Global…". In articles/press, write the name in full **"Global Media & Entertainment"** on first use, then just **"Global"**.
- **Positive & motivating.** Optimists. Emphasise possibilities and opportunities; inspire and encourage.
- **Accessible & human.** Clear, empathetic, jargon‑light. It's about building success *together* with advertisers, agencies and partners.
- **Light, with subtle humour.** Fresh and approachable, a wink where it fits — never at the expense of professionalism. Balance.
- **Minimise jargon — spell abbreviations out.** Always write out: DOOH → Digital Out‑of‑Home, OOH → Out‑of‑Home, (D)OOH → (Digital) Out‑of‑Home. Also spell out (first use, abbrev. in brackets): OTS, CPA, BRO, VAC, NVP, TIM, SOT, SOV, CEP, TVC, TOM, TOMA, CTA. **Keep as abbreviations:** CPM, CPC. Prefer weaving metrics into a narrative over alphabet soup.
- **Locations & networks are written out in full** — never SUP/WINC etc. Networks: Treinstations, Tankstations, Snelwegmasten, Winkelstraten, Winkelcentra, Supermarkten. Channels: Run of Network, Retail, On‑The‑Go, Urban.
- **Emoji** — used in social copy (💙 is on‑brand), but **not** in formal/product UI.

**Example voice:** *"Global is dé (Digital) Out‑of‑Home specialist van Nederland. Met ruim 3.300 digitale schermen bereiken we elke week 60% van Nederland — op het juiste moment, op de juiste locatie, voor de juiste doelgroep."*

---

## VISUAL FOUNDATIONS

**Colour.** A confident, all‑blue palette. Five brand colours are preferred for all external communication: **Main Blue `#195AA6`** (primary), **Mid Blue `#0B78BE`** (links/secondary), **Dark Blue `#1B4B89`** (depth/headers), **Bright Blue `#5BC4E8`** (accent/highlight) and **Grey `#575756`** (body text). The system extends these into a 10‑step blue scale and an 11‑step cool‑grey neutral scale. Status colours are restrained; **info defaults to Mid Blue**. Backgrounds are predominantly white / very light cool grey, with Dark Blue used for inverse sections and hero blocks. Imagery skews neutral‑to‑cool and bright.

**Type.** The brand's design/PowerPoint face is **ITC Avant Garde Gothic Pro** (geometric, single‑story *g*), its office face is **Century Gothic**, and its declared **web font is Montserrat** — so this system is built on **Montserrat**. ExtraBold (800) for headlines, Bold (700) for subheads/links, Medium (500) for titles, Regular (400) for body. **HOOFDTITELS are set in UPPERCASE; titles and body in sentence case.** Headlines are large and confident; generous body line‑height (1.65). IBM Plex Mono carries figures/data specimens.

**Spacing & layout.** 4px base grid; generous white space is part of the look. Centred, contained layouts (max‑widths 640–1320px). Clean geometry over decoration.

**Corners & shape.** Soft corners throughout (4–32px). The **pill / capsule** radius is a signature — it echoes the logo lock‑up and is used for buttons, chips and badges. The **OOH "screen frame"** (a heavy black bezel around content, with the blue capsule lock‑up in a corner) is a recurring structural motif.

**Cards.** White surface, 1px subtle cool‑grey border, `lg` (16px) radius, soft `sm` shadow; lift + deepen to `lg` shadow on hover.

**Shadows.** Cool, blue‑tinted (`rgba(20,42,78,…)`), subtle by default; a dedicated `--shadow-brand` (blue glow) for emphasis on primary actions.

**Borders & lines.** 1–1.5px subtle cool‑grey dividers; a heavy 4px border expresses the screen‑frame motif.

**Backgrounds.** Solid colour or photography — **no gradient‑mesh, no purple, no hand‑drawn illustration**. Hero/section backgrounds use Dark Blue or full‑bleed real photography (often a network mosaic) with a dark overlay for white type.

**Motion.** Purposeful and quick. Standard ease `cubic-bezier(.4,0,.2,1)`, durations 140–380ms. Buttons nudge down 1px on press; cards lift on hover. No bouncy or infinite decorative animation.

**Hover / press states.** Primary buttons darken (Main → `blue-600`) and gain the brand glow on hover; secondary/ghost fill with a light blue/grey wash; everything presses down 1px. Focus is a 3px Bright‑Blue ring.

**Transparency & blur.** Sparing. White‑on‑dark panels use low‑opacity white fills (`rgba(255,255,255,.08)`) with hairline borders; photo overlays darken for legibility. No heavy glassmorphism.

---

## ICONOGRAPHY

The brand book does **not** define a proprietary icon set; Global's visual language leans on **photography and the OOH format shapes** rather than icons. For product UI this system therefore standardises on **Lucide** (https://lucide.dev) — an open‑source line set whose **~1.75px geometric strokes and rounded joins** sit naturally beside Montserrat and the brand's geometric wordmark. Load from CDN: `https://unpkg.com/lucide@latest`.

- **Style:** outline / line icons, consistent stroke weight, rounded caps — never filled duotone or skeuomorphic.
- **Colour:** inherit text colour; Main Blue for active/branded, Grey‑500 for default, never multicolour.
- **Emoji:** social copy only (💙), not in product UI.
- **Brand "icons":** the **"g" icon mark** (`assets/global-icon.png` — single-story *g* in a rounded square) is the app-icon / favicon / avatar symbol. The **OOH format frames** (abri, europanel, digital screen, snelwegmast — see `assets/format-*.png`) act as recognisable pictograms for the network and are preferred over generic icons when representing inventory.

> Substitution flagged: Lucide is a substitute, not a brand‑owned set. Swap for an official set if one exists.

---

## INDEX — what's in this project

**Root**
- `styles.css` — the single entry point consumers link. `@import` manifest only.
- `readme.md` — this guide.
- `SKILL.md` — Agent‑Skills front‑matter for use in Claude Code.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`, `components.css` (all reached from `styles.css`).

**`assets/`** — `global-lockup-{white,blue}.png` (full lock-up w/ tagline — the primary logo); `global-icon.png` (the "g" icon mark); `slide-title-bg.jpg` & `slide-section-bg.jpg` (official template backgrounds); `format-{abri,screen-portrait,screen-landscape,snelwegmast}.png`; `photo-{winkelcentrum,locatie,netwerk}.jpg`.

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`components/`** — reusable React primitives (each with `.jsx` + `.d.ts` + `.prompt.md`, and one `@dsCard` per group):
- `actions/` — **Button**, **IconButton**, **Logo**
- `forms/` — **Input**, **Select**, **Checkbox**, **Switch**
- `display/` — **Card**, **Badge**, **Tag**, **Avatar**, **Stat**, **Alert**

**`ui_kits/`** — full‑screen product recreations:
- `website/` — Global NL advertiser marketing site (hero, network, stats, contact).

**`slides/`** — Global's PowerPoint template, **recreated as HTML from the official `Presentatie template.pdf`** (82 slides). Covers the real layout types: **title** (network-mosaic background + lock-up + speaker/date), **section divider** (full-bleed DOOH photo), **content + chart** (running "PRESENTATION TITLE"-style header, title, body, bar chart), **data** (full grouped bar chart), **ranking** (numbered % drivers), and **guidelines** (OOH/DOOH creative checklist). Use these as the starting point for any Global presentation. Real title & section backgrounds are in `assets/slide-*.jpg`.
  - ⚠️ Layout positions are inferred from the PDF's extracted text + assets (the vector slides couldn't be pixel-rendered here). They faithfully match the template's structure, content and backgrounds — confirm exact spacing against the live `.pptx` and tell me what to nudge.

### Using a component (in `@dsCard` / kit HTML)
```html
<link rel="stylesheet" href="…/styles.css">
<script src="…/_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Card, Stat } = window.GlobalDesignSystem_2a2a17;
</script>
```

---

## Caveats / open items
- **Logo** — the official wordmark, full lock-up and "g" icon mark supplied by the client are now in place (PNG). A **vector (SVG)** master would still be ideal for crisp scaling at any size; supply if available.
- **Fonts:** Montserrat (Google Fonts) substitutes the licensed **ITC Avant Garde Gothic Pro** / **Century Gothic**. This matches the brand book's own web‑font guidance, but supply licensed binaries for pixel‑exact brand display type.
- **Icons:** Lucide substitutes for the (undefined) brand UI icon set.
