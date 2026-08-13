# Style Guide

**The single source of truth for colors, typography, and tokens.** Every diagram draws from this — not from hex values inlined in other reference files. If you want to change the visual skin of Schematic, change this file.

Current skin is the **Global Media & Entertainment Nederland** huisstijl — wit papier, near-black ink, Main Blue accent, Global-grijs muted, Century Gothic als enige naamsfamilie. Swap these values (or run [`onboarding.md`](onboarding.md)) and every new diagram inherits the new skin without touching any type-specific logic.

To generate your own from a website URL, see [`onboarding.md`](onboarding.md).

---

## Tokens

### Semantic roles

Every token is referred to by **semantic role**, not by its hex value. Type references (`type-*.md`) and SKILL.md say `accent`, not `#f7591f`.

| Role | Purpose | Default (light) | Default (dark) |
|---|---|---|---|
| `paper` | Page background, default node fill | `#FFFFFF` (wit) | `#1D1D1B` |
| `paper-2` | Diagram container bg, kaarten, secondary fill | `#F2F6FA` (lichte tint van Main Blue) | `#282826` |
| `ink` | Primary text, primary stroke | `#1D1D1B` | `#FFFFFF` |
| `muted` | Secondary text, default arrow stroke | `#575756` (Global grijs) | `#B4B4B3` |
| `soft` | Sublabels, boundary labels | `#6E6E6D` | `#8F8F8E` |
| `rule` | Hairline borders (1px) | `#D6DEE7` | `rgba(255,255,255,0.14)` |
| `rule-solid` | Stronger borders, baselines | `#B9C6D4` | `rgba(214,222,231,0.30)` |
| `accent` | Focal / 1–2 max per diagram | `#195AA6` (Main Blue) | `#5BC4E8` (Sky Blue) |
| `accent-tint` | Fill for accent-bordered boxes | `rgba(25,90,166,0.08)` | `rgba(91,196,232,0.10)` |
| `link` | HTTP/API calls, external arrows | `#1B4B89` (donkerblauw) | `#6FA8DC` |

> **Brand palette source:** Global Media & Entertainment Nederland — `Main Blue #195AA6`, `#0B78BE`, `donkerblauw #1B4B89`, `Sky Blue #5BC4E8`, `grijs #575756`, ink `#1D1D1B`, wit `#FFFFFF`; typografie Century Gothic. De tokens `soft`, `rule`, `rule-solid` en de dark-kolom zijn afgeleid: `soft` is een lichtere stap van Global-grijs die op wit nog WCAG AA haalt voor sublabels (5.1:1); `rule`/`rule-solid` zijn koele blauwgrijzen uit de Main Blue-familie voor randen; en op dark paper schuift `accent` naar Sky Blue omdat Main Blue daar onleesbaar wordt (`#195AA6` op `#1D1D1B` ≈ 1.9:1, `#5BC4E8` ≈ 8.5:1). `link` is gekozen als `#1B4B89` boven `#0B78BE` vanwege contrast op wit (8.7:1 vs 4.7:1).

### Aanvullende Global-vulkleuren (alleen vlakken en balken)

| Kleur | Gebruik | Tekst erop |
|---|---|---|
| `#0B78BE` | Vulkleur in vlakken, balken en series | wit `#FFFFFF` (4.7:1) |
| `#5BC4E8` | Vulkleur in vlakken, balken en series | `ink #1D1D1B` (8.4:1) |

**Nooit als tekstkleur op wit of `paper-2`.** `#5BC4E8` haalt op wit maar 2.0:1; `#0B78BE` zit met 4.7:1 op de AA-grens en is als tekst niet te onderscheiden van `link`. Voor tekst en betekenisdragende lijnen: `ink`, `muted`, `accent` of `link`.

> **Note:** The pre-baked example HTML files in `assets/` were built under an earlier skin. Regenerating them against the current `style-guide.md` is a v5.1 task. New diagrams the skill produces will use the tokens above.

### Inversion rule (light → dark)

Any `rgba(29,29,27, X)` in light becomes `rgba(255,255,255, X)` in dark. Same opacities, RGB flipped. The accent switches to Sky Blue (`#5BC4E8`) to read on dark paper.

### Series palette (multi-series chart types only)

A small set of desaturated, editorial-tone colors for chart types that genuinely need to distinguish multiple overlapping entities (currently: **radar**). The "1-focal" rule still holds — `accent` is reserved for the focal series; the palette below covers the rest.

| Token | Light | Dark | Notes |
|---|---|---|---|
| `series-1` | `#7c8f6f` (sage) | `#9caf8f` | Non-focal series |
| `series-2` | `#5e7a9b` (dusty-blue) | `#82a0c0` | Non-focal series |
| `series-3` | `#b8915a` (mustard) | `#d3ad7a` | Non-focal series |
| `series-4` | `#9c6b50` (rust-brown) | `#b88670` | Non-focal series |
| `series-5` | `#6e6479` (slate) | `#8d8298` | Non-focal series |

Fills sit at `0.18` opacity light, `0.22` dark; strokes use the full color. **Don't backfill these tokens to non-chart types** — architecture, swimlane, etc. continue to use muted-ink variants. The series palette is opt-in for diagrams where overlapping shapes demand distinguishable color, not a license to add color elsewhere.

### Terminal skin (opt-in alternate)

A self-contained palette for the terminal-window primitive (see [primitive-terminal.md](primitive-terminal.md)) — a CLI-chrome register for dev-tool posts and technical social cards. It does not replace the default skin above and isn't affected by onboarding; it's a second, fixed skin you opt into per-diagram.

| Token | Hex | Purpose |
|---|---|---|
| `terminal-page` | `#0a0a0a` | Page background behind the window |
| `terminal-paper` | `#141414` | Window body, node fill |
| `terminal-bar` | `#1b1b1b` | Titlebar strip |
| `terminal-border` | `#2b2b2b` | Window border, hairlines |
| `terminal-ink` | `#f5f5f5` | Primary text, primary stroke (same white-smoke as default `ink`) |
| `terminal-muted` | `#9a9a9a` | Secondary text, sublabels, ring stroke |
| `terminal-soft` | `#5c5c5c` | Tertiary — inactive dots, spokes |
| `terminal-accent` | `#ff5a36` | The one accent — focal station, prompt sign, active dot |
| `terminal-accent-tint` | `rgba(255,90,54,0.12)` | Fill for accent-bordered boxes |

**1-accent rule still holds.** Everything that isn't `terminal-ink` or `terminal-muted`/`terminal-soft` should be `terminal-accent` — never introduce a second hue.

---

## Typography

| Role | Family | Size | Weight | Usage |
|---|---|---|---|---|
| `title` | Century Gothic | 1.75rem | 700 | Page H1 (Global-koppen zijn bold) |
| `node-name` | Century Gothic | 12px | 700 | Human-readable labels |
| `sublabel` | Century Gothic | 9px | 400 | Leesbare sublabels; **technische inhoud (poort, protocol, URL, veldtype) blijft Geist Mono** |
| `eyebrow` | Geist Mono | 7–8px | 500, tracked 0.18em, uppercase | Type tags, axis labels |
| `arrow-label` | Geist Mono | 8px | 400, tracked 0.06em | Arrow annotations |
| `callout` | Century Gothic *italic* | 14px | 400 | Editorial asides only |

### Font stack

```css
font-family: "Century Gothic", "Questrial", "Didact Gothic", "Avant Garde", sans-serif;
```

```html
<link href="https://fonts.googleapis.com/css2?family=Questrial&family=Didact+Gothic&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

Century Gothic is een lokaal geïnstalleerd font (geen webfont). Questrial en Didact Gothic laden via Google Fonts als visueel verwante fallbacks voor machines zonder Century Gothic; beide bestaan alleen in gewicht 400, dus bold wordt daar door de browser gesynthetiseerd.

**Load-bearing rule:** Mono is for *technical* content (ports, commands, URLs, field types) — Geist Mono blijft voor `eyebrow`, `arrow-label` en technische sublabels. Namen, titels en callouts (italic) gaan in Century Gothic. **Never JetBrains Mono** as a blanket "dev" font.

---

## Stroke, radius, spacing

| Token | Value | Use |
|---|---|---|
| `stroke-thin` | `0.8` | Tag-box outlines, leaf nodes |
| `stroke-default` | `1` | Most strokes |
| `stroke-strong` | `1.2` | Emphasis strokes |
| `radius-sm` | `4` | Small tags |
| `radius-md` | `6` | Node boxes |
| `radius-lg` | `8` | Containers, rings |
| `grid` | `4` | Every coord, size, and gap is divisible by 4 (hard rule) |

---

## Node type → treatment

Semantic role combinations — reference these by name in type specs.

| Type | Fill | Stroke |
|---|---|---|
| `focal` (1–2 max) | `accent-tint` | `accent` |
| `backend` | `#ffffff` (= `paper`) | `ink` |
| `store` | `ink @ 0.05` | `muted` |
| `external` | `ink @ 0.03` | `ink @ 0.30` |
| `input` | `muted @ 0.10` | `soft` |
| `optional` | `ink @ 0.02` | `ink @ 0.20` dashed `4,3` |
| `security` | `accent @ 0.05` | `accent @ 0.50` dashed `4,4` |

---

## Customizing the skin

Three options:

1. **Run onboarding** — see [`onboarding.md`](onboarding.md). Drop a URL; the skill extracts the palette + fonts and rewrites this file.
2. **Edit by hand** — change the hex values in the tables above. Run the pre-output taste gate afterward to verify the accent still reads as "focal" against the new paper color.
3. **Brand handoff** — paste your existing design-token JSON into a new section here and map its tokens to the semantic roles above.

### Constraints (don't break these)

- **Contrast**: `ink` must hit WCAG AA on `paper`. `muted` must hit AA on `paper` for 11px+ text.
- **One accent**: pick one color for `accent`. Two accents erases the focal signal.
- **No rainbow palette**: if your brand ships 8 colors, pick 3 (paper, ink, accent). The rest become `muted` variants.
- **Sans + mono**: de Global-huisstijl is bewust volledig sans — Century Gothic draagt `title`, `node-name`, `sublabel` en `callout` (italic); Geist Mono blijft voor technische inhoud. Voeg geen derde familie toe.
- **Paper is zuiver wit**: bewuste afwijking van de upstream-default (warm-neutraal) — Global's huisstijl is wit; `paper-2 #F2F6FA` geeft kaarten en containers diepte.
- **Dot pattern is optional, not default**: the 22×22 dot pattern is an opt-in "dotted paper" variant (good for long-form editorial hero diagrams). The default background is a clean `paper` fill, no pattern. When the pattern is enabled, it should sit at ~10% opacity of `ink` on `paper` — visible but quiet.
- **Container is clean by default**: the diagram sits directly on the page paper, no secondary container background or border. A framed variant (`paper-2` bg + `rule` border + 8px radius + padding) is available as an opt-in for card-heavy layouts, but don't reach for it by default — the extra chrome fights the figure.
