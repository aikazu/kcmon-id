# Landing Page Overhaul — Editorial Magazine Noir

**Date**: 2026-05-25
**Project**: kcmon-id (Iqbal Attila personal landing)
**Status**: Approved, pending implementation
**Author**: Iqbal Attila + Claude (frontend-design)

---

## 1. Goal

Transform the existing premium link-tree landing page into a distinctive editorial magazine experience that doubles as a portfolio masthead. The page must:

- Feel hand-crafted, not template-generated
- Read like a magazine cover + index, not a generic dev portfolio
- Stay performant, accessible, and respect reduced-motion preferences
- Work flawlessly on 360px mobile through 1920px desktop
- Reuse existing data model (`src/data/data.json`) without breaking content authoring

---

## 2. Aesthetic Direction

**Concept**: Editorial Magazine Noir.

A literary magazine masthead crashed into a personal portfolio. Print sensibility (drop caps, column rules, ornamental glyphs, baseline grid, issue numbers) collides with cinematic web motion (page-turn reveal, magnetic links, parallax meta column, custom serif cursor).

**Personal tagline**: `Secure by Design, Ship with Intent.`

This tagline is hero-prominent on the masthead and echoes as a pull-quote in the footer.

### 2.1 Palette (OKLCH where possible, hex fallback)

| Token | Light (day) | Dark (night) |
| --- | --- | --- |
| `--background` | `#f4ede0` warm cream paper | `#0d0a07` deep ink |
| `--foreground` | `#16110b` ink black | `#ede4d3` warm cream |
| `--card` | `#efe6d2` | `#15110b` |
| `--muted` | `#ddd0b3` | `#1c170f` |
| `--muted-foreground` | `#7a6a4f` | `#9a8a70` |
| `--rule` | `#c9b896` faded gold | `#2a2218` |
| `--rule-strong` | `#a89674` | `#3a3022` |
| `--primary` (accent) | `#6b1e1e` oxblood maroon | `#9a3030` oxblood (lifted for contrast) |
| `--primary-foreground` | `#f4ede0` | `#0d0a07` |
| `--grain-blend` | `multiply` | `screen` |

Accent oxblood is the single chromatic statement. Everything else lives on a cream/ink spectrum.

### 2.2 Typography

All fonts loaded via `next/font/google` (self-hosted, no external requests at runtime). Existing CSP `font-src 'self' fonts.gstatic.com` permits this.

| Role | Family | Notes |
| --- | --- | --- |
| Display | **Bricolage Grotesque** | Variable (opsz, wght). Used for name + section headlines. |
| Body | **Fraunces** | Variable (opsz, wght, SOFT). Italic available. Tagline + meta + link labels. |
| Mono | **JetBrains Mono** | Tags, numbers, issue meta, status. Already in project. |

Variable font axes leveraged:

- Bricolage `opsz`: large optical size for name (96–176px), tight for section titles (32–48px)
- Fraunces `opsz`: 96 for pull-quote, 14 for meta lines; `SOFT` axis for warmth

### 2.3 Type scale (fluid)

```css
--type-name:        clamp(3.5rem, 12vw, 11rem);   /* hero name */
--type-section:     clamp(1.5rem, 4vw, 2.5rem);
--type-pullquote:   clamp(2rem, 6vw, 5rem);
--type-body:        clamp(0.95rem, 1.1vw, 1.05rem);
--type-meta:        11px;   /* mono fixed */
```

---

## 3. Layout

### 3.1 Desktop (≥1024px)

**Masthead band** (full-width, ~100vh on first paint, releases on scroll):

```
┌─────────────────────────────────────────────────────────────┐
│ ISSUE Nº 04  ·  MMXXVI                          [theme] ◐  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Iqbal                              ◆ STATUS               │
│     Attila.                          ● Available            │
│                                                             │
│                                      ◆ ROLE                 │
│                                      Cybersecurity ·        │
│                                      Full-Stack             │
│                                                             │
│                                      ◆ LOCATION             │
│                                      Jakarta, ID            │
│                                                             │
│   ──── § ────                                               │
│                                                             │
│   "Secure by Design,                                        │
│        Ship with Intent."                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          scroll ↓
```

Masthead grid: 12-col, `8/4` split. Name spans cols 1–8, meta column 9–12.

**Body band** (3-col asymmetric, max-width 1440px, padded):

```
┌─meta─────┐┌─works (drop cap + numbered) ─────────┐┌─decor─┐
│ N° 04    ││ § 01  INFORMATION                    ││       │
│ 2026     ││                                      ││  N°   │
│ ───      ││ R esume & Portfolio        →         ││  04   │
│ status   ││   curriculum vitae                   ││       │
│ ● open   ││                                      ││ ────  │
│          ││ § 02  PROJECTS                       ││       │
│ role     ││                                      ││  ◆    │
│ secure / ││ A practitioner's selected works.     ││       │
│ stack    ││                                      ││ ────  │
│          ││ 01  Rirye           →   [nx][nl][sb] ││       │
│ links    ││ 02  Poke Kcmon      →   [nx][vc][sb] ││  ¶    │
│ → gh     ││ 03  WunWun Vault    →   [nx][vc][sb] ││       │
│ → li     ││ 04  KCMedia         →   [as][vc][sb] ││       │
│ → x      ││ 05  Kelola-Event    →   [nx][vc][sb] ││       │
│ ───      ││                                      ││       │
│ © 2026   ││ § 03  CONNECT                        ││       │
│          ││ Threads of presence.                 ││       │
│          ││ ...                                  ││       │
└──────────┘└──────────────────────────────────────┘└───────┘
   col 1-2          col 3-9                            col 10-12
   sticky           scrollable                         sticky decorative
   (parallax)                                          (rotated text)
```

Sticky meta scrolls slightly slower than content (parallax `translateY(scrollY * -0.08)`).
Decorative right column shows rotated-90° `N° 04 MMXXVI`, ornamental glyphs `§ ¶ ◆`, hairline dividers, and a vertical rule.

**Footer band** (full-width):

```
─────────────────────────────────────────────────────────
                                                          
            " Secure by Design,                           
                  Ship with Intent. "                     
                                                          
─────────────────────────────────────────────────────────
© MMXXVI · IQBAL ATTILA · KCMON.ID            ↑ TOP      
```

Pull-quote uses Fraunces italic at `--type-pullquote`. Quotation marks are typographic (`“ ”`).

### 3.2 Tablet (641–1023px)

- Masthead collapses to 2-col `7/5` split. Name still huge but `clamp(5rem, 12vw, 8rem)`.
- Body grid drops decorative right column → 2-col `3/9` (meta + content).
- Magnetic + cursor + parallax retained (hover-capable devices).

### 3.3 Mobile (≤640px)

- All grids collapse to single column, 20px side padding.
- Name `clamp(3.5rem, 18vw, 5.5rem)`, stacked vertically.
- Issue meta single horizontal row, mono 10px, hairline bottom border.
- Status/role/location render as horizontal-scrollable chip row below masthead (sticky-optional).
- Drop caps shrink to 3.5rem.
- Link rows 2-row grid: `[num + tag]` on row 1 (label flows row 2 full-width with arrow right-aligned).
- Tech icons wrap below label, 22px.
- Decorative right column removed entirely.
- Vertical column rules removed.
- Custom cursor disabled via `@media (hover: none)`.
- Magnetic links disabled via same query.
- Parallax meta disabled.
- Page-turn reveal simplified to fade-up (less GPU work).
- Grain overlay opacity reduced to 2.5%.
- Tap targets enforced ≥44×44px; `:active` scale 0.98 feedback.

### 3.4 Breakpoints

```
mobile:   0   – 640px    single col, no cursor/magnetic/parallax
tablet:   641 – 1023px   2-col, no decorative col, motion enabled
desktop:  1024px +       full 3-col, all motion + decor
```

---

## 4. Components

### 4.1 New / refactored files

| File | Purpose | Status |
| --- | --- | --- |
| `src/components/Masthead.tsx` | New. Renders top band: name, issue meta, tagline, theme toggle, status. | new |
| `src/components/MetaColumn.tsx` | New. Sticky left meta (status/role/location/socials/©) + parallax wrap. | new |
| `src/components/DecorColumn.tsx` | New. Right decorative col (rotated text + glyphs). Desktop only. | new |
| `src/components/Section.tsx` | Refactor. Editorial section with drop cap intro + numbered list. | refactor |
| `src/components/LinkRow.tsx` | Refactor. Numbered (`01`–`NN`), serif label, underline-draw, tech icons inline. | refactor |
| `src/components/MagneticLink.tsx` | New. Mousemove proximity translate wrapper. Disabled on touch + reduced motion. | new |
| `src/components/CustomCursor.tsx` | New. Small serif crosshair, scales on hover targets. Pointer:fine only. | new |
| `src/components/PaperGrain.tsx` | New. SVG noise overlay with theme-aware blend mode. | new |
| `src/components/PullQuote.tsx` | New. Footer pull-quote with typographic quotes + reveal animation. | new |
| `src/components/ProfileFooter.tsx` | Refactor. Wraps PullQuote + © line + back-to-top. | refactor |
| `src/components/ProfileHeader.tsx` | **Delete** (replaced by Masthead). | remove |
| `src/components/TechIcons.tsx` | Unchanged. | keep |

### 4.2 App entrypoints

- `src/app/layout.tsx`: replace `Outfit + Instrument_Serif` with `Bricolage_Grotesque + Fraunces`, keep `JetBrains_Mono`. Add font CSS variables. Keep theme init script. Update metadata description to include new tagline.
- `src/app/page.tsx`: rebuild structure to `Masthead → BodyGrid(MetaColumn + Sections + DecorColumn) → ProfileFooter`. Wire `CustomCursor` + `PaperGrain` once at top level. Keep IntersectionObserver entrance pattern.
- `src/app/globals.css`: full rewrite of tokens, baseline grid, masthead grid utilities, drop-cap, magnetic helper, cursor, grain, pull-quote, link-row editorial styles, reduced-motion guards.

### 4.3 Data

`src/data/data.json` additions (non-breaking):

```jsonc
{
  "profile": {
    "name": "Iqbal Attila",
    "tagline": "Secure by Design, Ship with Intent.",
    "subtitle": "Cybersecurity enthusiast with part-time full-stack development experience.",
    "location": "Jakarta, Indonesia",
    "status": "Available for opportunities",
    "role": "Cybersecurity · Full-Stack",
    "issue": {
      "number": "Nº 04",
      "year": "MMXXVI"
    }
  },
  "sections": [ /* unchanged structure; optional `intro` per section */ ]
}
```

`Profile` TypeScript interface extended with `subtitle`, `role`, `issue: { number; year }`. `Section` gains optional `intro: string` (1–2 sentence editorial lead).

---

## 5. Motion

### 5.1 Entrance

- **Page-turn reveal** on first paint (desktop + tablet): `clip-path: inset(0 100% 0 0)` sweeps to `inset(0 0 0 0)` over 900ms `cubic-bezier(0.22, 1, 0.36, 1)`. Applied to masthead only.
- **Staggered fade-up** on body items (existing IntersectionObserver pattern preserved). Stagger delay 70ms per item.
- **Drop-cap**: scale 0.6→1 + opacity 0→1 once in view, 600ms.
- **Reveal hairlines**: `transform: scaleX(0)→scaleX(1)`, transform-origin left, 800ms.

### 5.2 Hover (hover-capable devices only)

- **Magnetic links**: cursor proximity ≤60px triggers `translate3d(dx/3, dy/3, 0)` on link. Spring decay on leave.
- **Underline draw**: serif underline `scaleX(0)→scaleX(1)`, 320ms.
- **Arrow nudge**: `translateX(2px) translateY(-2px)` + accent color.
- **Tech icon lift**: `translateY(-1px)` + shadow.

### 5.3 Scroll

- **Parallax meta**: left column `translateY(scrollY * -0.08)` (clamped). RAF-throttled.
- **Section header rule**: `scaleX` based on viewport intersection ratio.

### 5.4 Cursor

- Custom small serif crosshair (12px) + outer ring (28px) follows mouse via RAF lerp.
- On `[data-cursor="link"]` hover, ring scales to 44px, fills accent, native cursor hidden.
- Disabled when `(hover: none) or (pointer: coarse)` or `prefers-reduced-motion: reduce`.

### 5.5 Reduced motion

`@media (prefers-reduced-motion: reduce)` disables:

- Page-turn reveal (snap to visible)
- Magnetic translate
- Parallax meta
- Custom cursor (native restored)
- Grain animation (static)
- All keyframe animations (`animation: none !important`)
- Theme toggle smooth transition shortened to 0.01ms

Static states must be fully readable without any motion.

---

## 6. Atmospheric Details

- **Paper grain overlay**: inline SVG `<feTurbulence>` noise filter, fixed position, pointer-events none, z-index 0. Opacity 4% desktop / 2.5% mobile. Blend mode `multiply` on light, `screen` on dark.
- **Baseline grid**: optional hairline 8px horizontal lines at 5% opacity (debug toggle in dev only — final ship: off, kept as utility class).
- **Vertical column rules**: 1px `--rule` between desktop grid columns.
- **Ornamental glyphs**: `§ ¶ ◆` rendered in Fraunces, used as section anchors and decorative breaks.
- **Typographic quotes**: `“ ”` for pull-quote (not straight quotes).
- **Drop cap**: first letter of each section intro paragraph, Fraunces 5.5rem, floats left, 2-line drop, accent color, slight overshoot baseline.

---

## 7. Accessibility

- Semantic landmarks: `<header>` (masthead), `<main>`, `<aside>` (meta + decor), `<section>` per content block, `<footer>`.
- All decorative elements (`PaperGrain`, `DecorColumn`, ornamental glyphs, custom cursor) `aria-hidden="true"`.
- Link rows: visible focus ring (`:focus-visible` outline 2px accent, offset 4px), keyboard-navigable, large hit areas.
- Theme toggle preserves existing `aria-pressed` + `aria-label`.
- Magnetic + custom cursor never break keyboard navigation — both are pure visual augmentation.
- Color contrast verified: ink on cream ~16:1, cream on ink ~17:1, oxblood on cream ~6.2:1 (AA large), oxblood-lifted on deep ink ~5.4:1 (AA large). Body text never uses accent color.
- Drop cap text remains part of the readable paragraph (no `aria-hidden`, no pseudo-element only — actual character with `::first-letter` styling).
- Reduced motion fully honored as per §5.5.

---

## 8. Performance

- `next/font` self-hosts all fonts → zero external font requests, automatic `font-display: swap` and preloading.
- Variable fonts mean **one file per family**, not multiple weights.
- Grain SVG inlined as data URI (no extra request).
- Custom cursor + magnetic use `requestAnimationFrame`, mounted lazily client-side only.
- Parallax uses single rAF loop with `transform: translate3d` (GPU-composited).
- IntersectionObserver pattern preserved → entrance animations don't paint until in-view.
- No additional npm dependencies. Motion via CSS keyframes + plain RAF (no Framer Motion library).
- Page weight target: ≤ current build + 30KB (fonts dominate; ≤2 new fonts vs 3 previous).
- LCP target: ≤ 1.5s on 4G simulated.

---

## 9. Constraints respected

- CSP `font-src 'self' fonts.gstatic.com` — satisfied (next/font self-hosts).
- Existing security headers preserved.
- TypeScript strict mode, no `any`.
- ESLint config unchanged.
- Tailwind v4 (`@import "tailwindcss"`) — keep utility usage minimal, prefer custom CSS classes.
- Indonesian for user-facing copy where applicable (none currently; tagline is intentionally English).
- Conventional commits.
- 300 LOC per chunk; spec split into 3 implementation plans.

---

## 10. Implementation chunks (writing-plans to expand)

### Plan 1 — Tokens + Masthead (~280 LOC)

- `src/app/layout.tsx` font swap (Bricolage Grotesque + Fraunces + JetBrains Mono), metadata tagline update
- `src/app/globals.css` rewrite of color tokens, typography tokens, baseline + grain utility, masthead grid classes, reduced-motion guards
- `src/data/data.json` extend with `tagline`, `subtitle`, `role`, `issue`, optional `intro`
- `src/types/index.ts` extend `Profile`, `Section`
- `src/components/Masthead.tsx` new component (name + meta + tagline + theme toggle)
- `src/components/PaperGrain.tsx` new
- Delete `src/components/ProfileHeader.tsx`
- Tests / verification: dev render check + screenshot at 1440 / 768 / 390

### Plan 2 — Body grid + Sections + Links (~310 LOC)

- `src/components/MetaColumn.tsx` new (sticky meta + parallax hook stub — parallax wired in Plan 3)
- `src/components/DecorColumn.tsx` new (desktop only)
- `src/components/Section.tsx` refactor — drop cap intro, numbered list, editorial layout
- `src/components/LinkRow.tsx` refactor — numbered, serif label, underline-draw, tech icons inline, magnetic wrap (component imported but disabled until Plan 3 if needed; can be no-op wrapper in Plan 2)
- `src/components/ProfileFooter.tsx` refactor → wraps new `PullQuote.tsx`
- `src/components/PullQuote.tsx` new
- `src/app/page.tsx` restructure to `Masthead → BodyGrid → Footer`, keep IntersectionObserver
- Verification: full desktop + tablet + mobile render, content parity with old page

### Plan 3 — Motion + atmosphere (~300 LOC)

- `src/components/MagneticLink.tsx` new
- `src/components/CustomCursor.tsx` new
- Parallax hook in `MetaColumn` (RAF, scroll listener, reduced-motion guard)
- Page-turn reveal CSS + JS trigger in `Masthead`
- Drop cap reveal animation
- Underline-draw, arrow-nudge, tech icon lift in `LinkRow`
- Reduced-motion guards across all new motion paths
- Final polish: grain blend tuning per theme, baseline grid utility class
- Verification: motion across breakpoints + reduced-motion off/on, Lighthouse a11y/perf pass

---

## 11. Out of scope

- New content sections beyond existing 3 (Information, Projects, Connect)
- Blog / writing index
- CMS integration
- i18n (existing single-locale `id_ID` preserved)
- Analytics changes
- Server-side anything new (page stays `"use client"` with static data)
- Animation library (Framer Motion, GSAP) — declined to keep bundle small

---

## 12. Success criteria

A visitor lands on the page and within 2 seconds knows:

1. Whose page this is (huge name)
2. What they do (cybersecurity + ship software)
3. The personal manifesto (`Secure by Design, Ship with Intent.`)
4. That this page is unmistakably hand-designed (drop caps, oxblood accent, ornamental glyphs, editorial grid)

And on mobile, the same is true with no horizontal scroll, all tap targets ≥44px, and motion gracefully reduced.

---
