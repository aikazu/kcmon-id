# Plan 2 — Body Grid + Sections + Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the body of the landing page as a 3-col asymmetric editorial layout (meta sticky left · content center · decor right) with refactored `Section` (drop-cap intro + numbered list), refactored `LinkRow` (numbered, serif label, underline-draw, tech icons inline), new `MetaColumn`, `DecorColumn`, `PullQuote`, and refactored `ProfileFooter`. Motion stays at IntersectionObserver level — parallax/magnetic/cursor are deferred to Plan 3.

**Architecture:** `page.tsx` switches from a single max-width column to a 3-col grid wrapping `MetaColumn + Sections + DecorColumn`. Below the grid, `ProfileFooter` wraps a new `PullQuote`. Mobile collapses everything to a single column. All new CSS classes live in `globals.css` under clearly-labeled blocks. Tech icons keep using the existing `TechIcons.tsx` registry — only render position/styling changes.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind 4, CSS variables, `lucide-react` for arrow icon.

---

## File Structure

| File | Action | Responsibility |
| --- | --- | --- |
| `src/app/globals.css` | append | Body-grid, meta-column, decor-column, section, drop-cap, link-row, pull-quote, footer utilities. |
| `src/components/MetaColumn.tsx` | create | Sticky left column: status, role, location, socials, ©. Parallax wrap placeholder. |
| `src/components/DecorColumn.tsx` | create | Desktop-only right column: rotated `N° 04 MMXXVI`, ornamental glyphs, hairlines. |
| `src/components/Section.tsx` | rewrite | Editorial section: numbered header, drop-cap intro, list of numbered `LinkRow`. |
| `src/components/LinkRow.tsx` | rewrite | Numbered link (`01`–`NN`), serif label, underline-draw on hover, inline tech icons. |
| `src/components/PullQuote.tsx` | create | Footer pull-quote with typographic quotes. |
| `src/components/ProfileFooter.tsx` | rewrite | Wraps `PullQuote` + © line + back-to-top. |
| `src/data/data.json` | modify | Add optional `intro` strings to each section. |
| `src/app/page.tsx` | modify | Swap single-column body for `BodyGrid` with new columns; mount `ProfileFooter` with new layout. |

---

## Task 1: Add `intro` text to data.json sections

**Files:**
- Modify: `src/data/data.json`

- [ ] **Step 1: Add intros**

For each of the three sections in `src/data/data.json`, add an `intro` string field directly after `"title"`:

```json
{
  "title": "Information",
  "intro": "A short preface — start here for résumé and references.",
  "items": [ /* unchanged */ ]
},
{
  "title": "Projects",
  "intro": "A practitioner's selected works — small studios shipped with care.",
  "items": [ /* unchanged */ ]
},
{
  "title": "Connect",
  "intro": "Threads of presence — pick a channel and say hello.",
  "items": [ /* unchanged */ ]
}
```

- [ ] **Step 2: Type-check**

Run: `bun run lint`
Expected: PASS (`Section.intro?` already added in Plan 1).

- [ ] **Step 3: Commit**

```bash
rtk git add src/data/data.json
rtk git commit -m "feat(data): add intro copy to sections"
```

---

## Task 2: Append body grid + section + drop-cap styles to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append the CSS block**

Append to the bottom of `src/app/globals.css`:

```css
/* ───────────── BODY GRID ───────────── */

.body-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(28px, 5vw, 56px);
  padding: clamp(28px, 5vw, 56px) clamp(20px, 5vw, 64px) clamp(48px, 7vw, 96px);
  max-width: 1680px;
  margin-inline: auto;
}

@media (min-width: 768px) {
  .body-grid {
    grid-template-columns: minmax(160px, 1fr) minmax(0, 3fr);
    gap: clamp(36px, 4vw, 64px);
  }
}

@media (min-width: 1280px) {
  .body-grid {
    grid-template-columns: minmax(180px, 1fr) minmax(0, 4fr) minmax(120px, 0.7fr);
    gap: clamp(48px, 4vw, 96px);
  }
}

.body-grid__center {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 7vw, 96px);
}

/* ───────────── META COLUMN ───────────── */

.meta-col {
  display: flex;
  flex-direction: column;
  gap: 28px;
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

@media (min-width: 768px) {
  .meta-col {
    position: sticky;
    top: clamp(20px, 4vw, 48px);
    align-self: start;
    max-height: calc(100vh - 96px);
  }
}

.meta-col__block + .meta-col__block {
  padding-top: 18px;
  border-top: 1px solid var(--rule);
}

.meta-col__key {
  display: block;
  color: var(--muted-foreground);
  margin-bottom: 8px;
}

.meta-col__value {
  display: block;
  font-family: var(--font-body), serif;
  font-size: 13px;
  letter-spacing: 0;
  text-transform: none;
  color: var(--foreground);
  font-style: italic;
  line-height: 1.4;
}

.meta-col__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--foreground);
  text-decoration: none;
  transition: color 0.3s ease;
}

.meta-col__link:hover {
  color: var(--primary);
}

.meta-col__link-icon {
  width: 9px;
  height: 9px;
  border-top: 1px solid currentColor;
  border-right: 1px solid currentColor;
  transform: rotate(45deg);
}

.meta-col__copy {
  font-size: 9px;
  color: var(--muted-foreground);
}

/* ───────────── DECOR COLUMN (desktop only) ───────────── */

.decor-col {
  display: none;
}

@media (min-width: 1280px) {
  .decor-col {
    position: sticky;
    top: clamp(20px, 4vw, 48px);
    align-self: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    height: calc(100vh - 96px);
    color: var(--muted-foreground);
    font-family: var(--font-display), serif;
  }
}

.decor-col__rotated {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
}

.decor-col__rule {
  flex: 1;
  width: 1px;
  background: var(--rule);
}

.decor-col__glyph {
  font-size: 24px;
  font-style: italic;
  color: var(--primary);
}

/* ───────────── SECTION ───────────── */

.section {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.section__header {
  display: flex;
  align-items: baseline;
  gap: 18px;
}

.section__number {
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--primary);
}

.section__title {
  font-family: var(--font-display), serif;
  font-size: var(--type-section);
  letter-spacing: -0.02em;
  font-weight: 600;
  color: var(--foreground);
  line-height: 1.05;
  font-variation-settings: "opsz" 48;
}

.section__rule {
  flex: 1;
  height: 1px;
  background: var(--rule);
  transform-origin: left;
}

.section__intro {
  position: relative;
  font-family: var(--font-body), serif;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.55;
  color: var(--foreground);
  font-variation-settings: "opsz" 18, "SOFT" 60;
  max-width: 56ch;
  text-wrap: pretty;
}

.section__intro::first-letter {
  float: left;
  font-family: var(--font-body), serif;
  font-style: italic;
  font-weight: 500;
  font-size: clamp(3.5rem, 8vw, 5.5rem);
  line-height: 0.85;
  padding-right: 14px;
  padding-top: 6px;
  color: var(--primary);
  font-variation-settings: "opsz" 144, "SOFT" 100;
}

.section__list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ───────────── LINK ROW ───────────── */

.link-row {
  position: relative;
  display: grid;
  grid-template-columns: 42px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px 0;
  border-top: 1px solid var(--rule);
  color: var(--foreground);
  text-decoration: none;
  font-family: var(--font-body), serif;
  transition: color 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  min-height: 44px;
}

.link-row:last-child {
  border-bottom: 1px solid var(--rule);
}

.link-row__index {
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--muted-foreground);
  transition: color 0.3s ease;
}

.link-row__body {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 14px;
  min-width: 0;
}

.link-row__tag {
  display: inline-flex;
  font-family: var(--font-mono), monospace;
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 3px 7px;
  border: 1px solid var(--rule);
  color: var(--muted-foreground);
  transition:
    color 0.3s ease,
    border-color 0.3s ease;
}

.link-row--featured .link-row__tag {
  color: var(--primary);
  border-color: color-mix(in oklch, var(--primary) 50%, var(--rule));
}

.link-row__label {
  position: relative;
  font-size: clamp(1.05rem, 1.5vw, 1.35rem);
  line-height: 1.25;
  letter-spacing: -0.005em;
  color: var(--foreground);
  font-variation-settings: "opsz" 24, "SOFT" 80;
}

.link-row__label::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.link-row:hover .link-row__label::after,
.link-row:focus-visible .link-row__label::after {
  transform: scaleX(1);
}

.link-row__tech {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
}

.link-row__tech-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: var(--muted);
  color: var(--muted-foreground);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.link-row__tech-icon svg {
  width: 12px;
  height: 12px;
}

.link-row:hover .link-row__tech-icon {
  background: color-mix(in oklch, var(--primary) 14%, var(--muted));
  color: var(--primary);
  transform: translateY(-1px);
}

.link-row__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--muted-foreground);
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.3s ease;
}

.link-row:hover .link-row__arrow,
.link-row:focus-visible .link-row__arrow {
  color: var(--primary);
  transform: translate(3px, -3px);
}

.link-row:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 4px;
}

.link-row:active {
  transform: scale(0.995);
  transition: transform 0.12s ease;
}

@media (max-width: 640px) {
  .link-row {
    grid-template-columns: 32px 1fr auto;
    gap: 12px;
    padding: 16px 0;
  }

  .link-row__label {
    font-size: 1.05rem;
  }

  .link-row__tech {
    grid-column: 1 / -1;
    margin-left: 32px;
    margin-top: 4px;
  }
}

/* ───────────── PULL QUOTE + FOOTER ───────────── */

.pull-quote {
  position: relative;
  z-index: 2;
  padding: clamp(56px, 9vw, 120px) clamp(20px, 5vw, 64px);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  text-align: center;
}

.pull-quote__text {
  font-family: var(--font-body), serif;
  font-style: italic;
  font-weight: 400;
  font-size: var(--type-pullquote);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--foreground);
  font-variation-settings: "opsz" 144, "SOFT" 100;
  max-width: 18ch;
  margin-inline: auto;
}

.pull-quote__text::before {
  content: "\201C";
  color: var(--primary);
}

.pull-quote__text::after {
  content: "\201D";
  color: var(--primary);
}

.profile-footer {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: clamp(24px, 4vw, 40px) clamp(20px, 5vw, 64px);
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

.profile-footer__top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  transition: color 0.3s ease;
}

.profile-footer__top:hover {
  color: var(--primary);
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/app/globals.css
rtk git commit -m "feat(css): add body grid, section, link-row, pull-quote styles"
```

---

## Task 3: Create MetaColumn component

**Files:**
- Create: `src/components/MetaColumn.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/MetaColumn.tsx`:

```tsx
"use client";

import type { JSX } from "react";
import type { Profile } from "../types";

interface MetaColumnProps {
  profile: Profile;
}

const SOCIALS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "GitHub", href: "https://github.com/aikazu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iqbalattila" },
  { label: "X / Twitter", href: "https://x.com/Vystkailash" },
];

export function MetaColumn({ profile }: MetaColumnProps): JSX.Element {
  return (
    <aside className="meta-col" aria-label="Profile meta">
      <div className="meta-col__block">
        <span className="meta-col__key">Issue</span>
        <span className="meta-col__value">
          {profile.issue.number} · {profile.issue.year}
        </span>
      </div>

      <div className="meta-col__block">
        <span className="meta-col__key">Status</span>
        <span className="meta-col__value">{profile.status}</span>
      </div>

      <div className="meta-col__block">
        <span className="meta-col__key">Role</span>
        <span className="meta-col__value">{profile.role}</span>
      </div>

      <div className="meta-col__block">
        <span className="meta-col__key">Located</span>
        <span className="meta-col__value">{profile.location}</span>
      </div>

      <div className="meta-col__block">
        <span className="meta-col__key">Threads</span>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            className="meta-col__link meta-col__value"
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="meta-col__link-icon" aria-hidden="true" />
            {s.label}
          </a>
        ))}
      </div>

      <div className="meta-col__block">
        <span className="meta-col__copy">© {profile.issue.year} {profile.name}</span>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/MetaColumn.tsx
rtk git commit -m "feat(ui): add MetaColumn sticky aside"
```

---

## Task 4: Create DecorColumn component

**Files:**
- Create: `src/components/DecorColumn.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/DecorColumn.tsx`:

```tsx
import type { JSX } from "react";
import type { ProfileIssue } from "../types";

interface DecorColumnProps {
  issue: ProfileIssue;
}

export function DecorColumn({ issue }: DecorColumnProps): JSX.Element {
  return (
    <aside className="decor-col" aria-hidden="true">
      <span className="decor-col__glyph">§</span>
      <span className="decor-col__rule" />
      <span className="decor-col__rotated">
        {issue.number} · {issue.year}
      </span>
      <span className="decor-col__rule" />
      <span className="decor-col__glyph">¶</span>
      <span className="decor-col__rule" />
      <span className="decor-col__glyph">◆</span>
    </aside>
  );
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/DecorColumn.tsx
rtk git commit -m "feat(ui): add DecorColumn desktop ornament aside"
```

---

## Task 5: Rewrite LinkRow

**Files:**
- Modify: `src/components/LinkRow.tsx`

- [ ] **Step 1: Replace LinkRow contents**

Replace the entire file `src/components/LinkRow.tsx` with:

```tsx
import type { JSX } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Item } from "../types";
import { techIcons } from "./TechIcons";

interface LinkRowProps {
  item: Item;
  index: number;
}

function formatIndex(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function LinkRow({ item, index }: LinkRowProps): JSX.Element {
  const techStack = item.techStack ?? [];
  const isFeatured = item.tag.toLowerCase() === "live";
  const cls = `link-row animate-fade-up${isFeatured ? " link-row--featured" : ""}`;

  return (
    <a
      href={item.url}
      target={item.external ? "_blank" : "_self"}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cls}
      style={{ animationDelay: `${400 + index * 70}ms` }}
    >
      <span className="link-row__index" aria-hidden="true">
        {formatIndex(index + 1)}
      </span>
      <span className="link-row__body">
        <span className="link-row__tag">{item.tag}</span>
        <span className="link-row__label">{item.label}</span>
        {techStack.length > 0 ? (
          <span className="link-row__tech" aria-label={`Built with ${techStack.join(", ")}`}>
            {techStack.map((tech) => {
              const t = techIcons[tech.toLowerCase()];
              if (!t) return null;
              return (
                <span
                  key={tech}
                  className="link-row__tech-icon"
                  title={t.name}
                  aria-hidden="true"
                >
                  <t.Component />
                </span>
              );
            })}
          </span>
        ) : null}
      </span>
      <span className="link-row__arrow" aria-hidden="true">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/LinkRow.tsx
rtk git commit -m "refactor(ui): rebuild LinkRow as numbered editorial row"
```

---

## Task 6: Rewrite Section

**Files:**
- Modify: `src/components/Section.tsx`

- [ ] **Step 1: Replace Section contents**

Replace the entire file `src/components/Section.tsx` with:

```tsx
import type { JSX } from "react";
import type { Section as SectionData } from "../types";
import { LinkRow } from "./LinkRow";

interface SectionProps {
  section: SectionData;
  sectionIndex: number;
  className?: string;
}

function formatSectionNumber(i: number): string {
  return i < 9 ? `0${i + 1}` : `${i + 1}`;
}

export function Section({ section, sectionIndex, className = "" }: SectionProps): JSX.Element {
  return (
    <section className={`section ${className}`.trim()} aria-labelledby={`section-${sectionIndex}`}>
      <header className="section__header">
        <span className="section__number animate-fade-up" style={{ animationDelay: "0ms" }}>
          § {formatSectionNumber(sectionIndex)}
        </span>
        <h2 id={`section-${sectionIndex}`} className="section__title animate-fade-up" style={{ animationDelay: "60ms" }}>
          {section.title}
        </h2>
        <span className="section__rule animate-reveal-line" style={{ animationDelay: "180ms" }} />
      </header>

      {section.intro ? (
        <p className="section__intro animate-fade-up" style={{ animationDelay: "260ms" }}>
          {section.intro}
        </p>
      ) : null}

      <div className="section__list">
        {section.items.map((item, i) => (
          <LinkRow key={item.url + item.label} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/Section.tsx
rtk git commit -m "refactor(ui): rebuild Section with drop-cap intro and numbered header"
```

---

## Task 7: Create PullQuote and rewrite ProfileFooter

**Files:**
- Create: `src/components/PullQuote.tsx`
- Modify: `src/components/ProfileFooter.tsx`

- [ ] **Step 1: Create PullQuote**

Create `src/components/PullQuote.tsx`:

```tsx
import type { JSX } from "react";

interface PullQuoteProps {
  text: string;
}

export function PullQuote({ text }: PullQuoteProps): JSX.Element {
  return (
    <aside className="pull-quote animate-fade-up" aria-hidden="true">
      <p className="pull-quote__text">{text}</p>
    </aside>
  );
}
```

- [ ] **Step 2: Rewrite ProfileFooter**

Replace entire `src/components/ProfileFooter.tsx` with:

```tsx
"use client";

import type { JSX } from "react";
import type { Profile } from "../types";

interface ProfileFooterProps {
  profile: Profile;
}

function handleScrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function ProfileFooter({ profile }: ProfileFooterProps): JSX.Element {
  return (
    <footer className="profile-footer">
      <span>© {profile.issue.year} · {profile.name.toUpperCase()} · KCMON.ID</span>
      <button type="button" onClick={handleScrollToTop} className="profile-footer__top">
        <span>Top</span>
        <span aria-hidden="true">↑</span>
      </button>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
rtk git add src/components/PullQuote.tsx src/components/ProfileFooter.tsx
rtk git commit -m "feat(ui): add PullQuote, rebuild ProfileFooter"
```

---

## Task 8: Wire body grid into page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update page.tsx**

Replace the entire `src/app/page.tsx` with:

```tsx
"use client";

import { useEffect, useState } from "react";
import data from "../data/data.json";
import { DecorColumn } from "../components/DecorColumn";
import { Masthead } from "../components/Masthead";
import { MetaColumn } from "../components/MetaColumn";
import { PaperGrain } from "../components/PaperGrain";
import { ProfileFooter } from "../components/ProfileFooter";
import { PullQuote } from "../components/PullQuote";
import { Section } from "../components/Section";
import type { Data } from "../types";

const { profile, sections } = data as Data;

export default function App(): React.JSX.Element | null {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" || current === "dark" ? current : "dark";
    setTheme(next);
    document.documentElement.style.colorScheme = next;
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(
      ".animate-fade-up, .animate-slide-left, .animate-reveal-line",
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleTheme = (): void => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("kcmon-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <PaperGrain />
      <Masthead profile={profile} theme={theme} onToggleTheme={toggleTheme} />

      <div className="body-grid">
        <MetaColumn profile={profile} />
        <div className="body-grid__center">
          {sections.map((section, idx) => (
            <Section key={section.title} section={section} sectionIndex={idx} />
          ))}
        </div>
        <DecorColumn issue={profile.issue} />
      </div>

      <PullQuote text={profile.tagline} />
      <ProfileFooter profile={profile} />
    </main>
  );
}
```

- [ ] **Step 2: Lint + dev render**

Run: `bun run lint`
Expected: PASS.

Run: `bun run dev` and load `http://localhost:3000`.
Expected:
- Body grid: meta column left, content center, decor column visible at ≥1280px
- Sections numbered `§ 01 / § 02 / § 03` with drop-cap intros
- Link rows numbered `01–05`, italic serif labels, underline-draw on hover
- Tech icons inline (after labels), background lifts on hover
- Pull-quote band big italic tagline mid-page
- Footer mono row with back-to-top

Kill dev server.

- [ ] **Step 3: Responsive sweep**

In DevTools device toolbar verify:

| Width | Expected |
| --- | --- |
| 360px | Single col. Meta column visible above content (non-sticky). Drop caps smaller. Link tech icons wrap below label. |
| 768px | 2-col grid (meta narrow + content). Decor col hidden. |
| 1024px | Same as 768. |
| 1280px | 3-col grid with decor col + rotated text. |
| 1440px | Same as 1280, more breathing room. |

- [ ] **Step 4: Commit**

```bash
rtk git add src/app/page.tsx
rtk git commit -m "feat(landing): assemble 3-col body grid with new sections"
```

---

## Plan 2 Done When

- `MetaColumn`, `DecorColumn`, `PullQuote` exist
- `Section`, `LinkRow`, `ProfileFooter` rewritten with new editorial markup
- Page renders correctly across 360/768/1024/1280/1440
- No lint errors
- All commits use conventional commits
- No motion regressions (entrance animations still fire)
