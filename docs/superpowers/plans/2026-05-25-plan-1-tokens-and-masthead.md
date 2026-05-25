# Plan 1 — Tokens + Masthead Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace existing design tokens, fonts, metadata, and profile header with the new Editorial Magazine Noir foundation (cream/ink dual theme, Bricolage Grotesque + Fraunces + JetBrains Mono, new `Masthead` component, `PaperGrain` overlay).

**Architecture:** Surgically swap font loaders in `layout.tsx`, fully rewrite `globals.css` token + typography + utility layers, extend `data.json` + `types/index.ts` with new profile fields, delete `ProfileHeader.tsx` and introduce `Masthead.tsx` + `PaperGrain.tsx`. `page.tsx` keeps its current structure in this plan — only the import + render of the header changes. Body sections are untouched in Plan 1 (handled in Plan 2). Motion stays at the existing IntersectionObserver level (no parallax / magnetic / cursor yet — Plan 3).

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind 4, `next/font/google`, OKLCH CSS color, CSS variables, intersection-observer-based entrance animations.

---

## File Structure

| File | Action | Responsibility |
| --- | --- | --- |
| `src/app/layout.tsx` | modify | Load Bricolage Grotesque + Fraunces + JetBrains Mono via `next/font`. Update metadata to include new tagline. |
| `src/app/globals.css` | rewrite | Token system (cream/ink dual theme), typography scale, baseline + grain + masthead utilities, reduced-motion guards. |
| `src/data/data.json` | modify | Add `profile.tagline` (`Secure by Design, Ship with Intent.`), `profile.subtitle`, `profile.role`, `profile.issue`. |
| `src/types/index.ts` | modify | Extend `Profile` interface with new fields. |
| `src/components/Masthead.tsx` | create | Full-width top band: name, issue meta, tagline, theme toggle, status row. |
| `src/components/PaperGrain.tsx` | create | Inline SVG noise overlay, theme-aware blend mode, `aria-hidden`. |
| `src/components/ProfileHeader.tsx` | delete | Replaced by Masthead. |
| `src/app/page.tsx` | modify | Swap `<ProfileHeader>` for `<Masthead>`, mount `<PaperGrain>` once at root. Body sections untouched. |

---

## Task 1: Extend data model

**Files:**
- Modify: `src/data/data.json`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Update `Profile` type**

Edit `src/types/index.ts`:

```ts
export interface ProfileIssue {
  number: string;
  year: string;
}

export interface Profile {
  name: string;
  tagline: string;
  subtitle: string;
  location: string;
  status: string;
  role: string;
  issue: ProfileIssue;
}

export interface Item {
  tag: string;
  label: string;
  url: string;
  external: boolean;
  techStack?: string[];
}

export interface Section {
  title: string;
  intro?: string;
  items: Item[];
}

export interface Data {
  profile: Profile;
  sections: Section[];
}
```

- [ ] **Step 2: Update `data.json` profile block**

Replace the `profile` object in `src/data/data.json` with:

```json
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
  }
}
```

Keep the existing `sections` array unchanged.

- [ ] **Step 3: Type-check**

Run: `bun run lint`
Expected: PASS (no TS errors).

- [ ] **Step 4: Commit**

```bash
rtk git add src/types/index.ts src/data/data.json
rtk git commit -m "feat(data): extend profile with tagline, role, issue meta"
```

---

## Task 2: Swap fonts in layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace font imports**

Edit the top of `src/app/layout.tsx`. Replace the existing font imports and instances with:

```tsx
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-body",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
```

- [ ] **Step 2: Update metadata description**

Within the same file, update the `metadata` export so the description and openGraph/twitter descriptions read:

```ts
description: "Secure by Design, Ship with Intent. Cybersecurity enthusiast and part-time full-stack engineer based in Jakarta.",
```

Apply the same string to `openGraph.description` and `twitter.description`.

- [ ] **Step 3: Update body className**

Inside the `RootLayout` `<body>` tag, set:

```tsx
<body
  className={`${bricolage.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased`}
>
```

Remove references to `outfit`, `instrumentSerif` variables.

- [ ] **Step 4: Verify dev render**

Run: `bun run dev` (in another shell) and load `http://localhost:3000`.
Expected: page renders without console errors; Bricolage and Fraunces appear in DevTools → Network → Fonts. Kill dev server afterwards.

- [ ] **Step 5: Commit**

```bash
rtk git add src/app/layout.tsx
rtk git commit -m "feat(fonts): switch to Bricolage Grotesque + Fraunces + JetBrains Mono"
```

---

## Task 3: Rewrite globals.css — tokens + reset

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace token block**

Open `src/app/globals.css` and replace the contents from the top through the end of the `[data-theme="light"]` selector with:

```css
@import "tailwindcss";

:root,
[data-theme="dark"] {
  --background: oklch(0.13 0.012 70);
  --foreground: oklch(0.92 0.025 80);
  --card: oklch(0.16 0.014 70);
  --card-foreground: oklch(0.92 0.025 80);
  --muted: oklch(0.18 0.012 70);
  --muted-foreground: oklch(0.66 0.028 80);
  --rule: oklch(0.26 0.018 70);
  --rule-strong: oklch(0.34 0.022 70);
  --primary: oklch(0.62 0.16 25);
  --primary-foreground: oklch(0.13 0.012 70);
  --accent: var(--primary);
  --accent-foreground: var(--primary-foreground);
  --ring: var(--primary);
  --grain-blend: screen;
  --grain-opacity: 0.04;
  --radius: 0;
}

[data-theme="light"] {
  --background: oklch(0.93 0.025 80);
  --foreground: oklch(0.16 0.018 50);
  --card: oklch(0.91 0.028 80);
  --card-foreground: oklch(0.16 0.018 50);
  --muted: oklch(0.86 0.028 80);
  --muted-foreground: oklch(0.46 0.025 60);
  --rule: oklch(0.76 0.04 80);
  --rule-strong: oklch(0.66 0.05 80);
  --primary: oklch(0.41 0.15 30);
  --primary-foreground: oklch(0.93 0.025 80);
  --grain-blend: multiply;
  --grain-opacity: 0.035;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--rule) transparent;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  min-height: 100dvh;
  overflow-x: hidden;
  font-family: var(--font-body), Georgia, serif;
  font-feature-settings: "kern", "liga", "calt", "ss01";
  background-color: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
  transition:
    background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.font-display {
  font-family: var(--font-display), "Times New Roman", serif;
}

.font-body {
  font-family: var(--font-body), Georgia, serif;
}

.font-mono {
  font-family: var(--font-mono), "JetBrains Mono", monospace;
}
```

- [ ] **Step 2: Commit token block**

```bash
rtk git add src/app/globals.css
rtk git commit -m "feat(css): introduce magazine noir token system"
```

---

## Task 4: Add typography scale + masthead utilities to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append type scale + masthead utilities**

Append this block at the bottom of `src/app/globals.css`:

```css
/* ───────────── TYPE SCALE ───────────── */

:root {
  --type-name: clamp(3.5rem, 12vw, 11rem);
  --type-section: clamp(1.5rem, 4vw, 2.5rem);
  --type-pullquote: clamp(2rem, 6vw, 5rem);
  --type-body: clamp(0.95rem, 1.1vw, 1.05rem);
  --type-meta: 11px;
}

/* ───────────── MASTHEAD ───────────── */

.masthead {
  position: relative;
  z-index: 2;
  padding: clamp(28px, 5vw, 56px) clamp(20px, 5vw, 64px) clamp(40px, 7vw, 88px);
  border-bottom: 1px solid var(--rule);
}

.masthead__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-family: var(--font-mono), monospace;
  font-size: var(--type-meta);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted-foreground);
  padding-bottom: clamp(24px, 4vw, 48px);
  border-bottom: 1px solid var(--rule);
}

.masthead__topbar-meta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.masthead__topbar-rule {
  display: inline-block;
  width: 28px;
  height: 1px;
  background: var(--rule-strong);
  vertical-align: middle;
}

.masthead__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(28px, 5vw, 56px);
  margin-top: clamp(32px, 6vw, 72px);
}

@media (min-width: 1024px) {
  .masthead__grid {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: clamp(48px, 6vw, 96px);
    align-items: end;
  }
}

.masthead__name {
  font-family: var(--font-display), serif;
  font-weight: 600;
  font-size: var(--type-name);
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--foreground);
  font-variation-settings: "opsz" 144;
}

.masthead__name-line {
  display: block;
}

.masthead__name-line + .masthead__name-line {
  padding-left: clamp(8px, 3vw, 64px);
}

.masthead__name-accent {
  color: var(--primary);
  font-style: italic;
  font-family: var(--font-body), serif;
  font-variation-settings: "opsz" 96, "SOFT" 100;
  padding: 0 0.02em;
}

.masthead__meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(18px, 2.5vw, 26px);
  align-content: end;
}

.masthead__meta-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
  align-items: baseline;
  padding-top: 12px;
  border-top: 1px solid var(--rule);
}

.masthead__meta-key {
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

.masthead__meta-value {
  font-family: var(--font-body), serif;
  font-size: clamp(0.95rem, 1.1vw, 1.05rem);
  line-height: 1.45;
  color: var(--foreground);
  font-variation-settings: "opsz" 14;
}

.masthead__tagline {
  margin-top: clamp(28px, 5vw, 56px);
  font-family: var(--font-body), serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.35rem, 3vw, 2.4rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--foreground);
  font-variation-settings: "opsz" 72, "SOFT" 100;
  text-wrap: balance;
  max-width: 22ch;
}

.masthead__tagline::before {
  content: "\201C";
  color: var(--primary);
  margin-right: 0.08em;
}

.masthead__tagline::after {
  content: "\201D";
  color: var(--primary);
  margin-left: 0.04em;
}

.masthead__divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: clamp(24px, 4vw, 40px);
  font-family: var(--font-body), serif;
  color: var(--rule-strong);
}

.masthead__divider::before,
.masthead__divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--rule);
}

.masthead__divider-glyph {
  font-size: 18px;
  color: var(--primary);
  font-style: italic;
}

/* ───────────── STATUS ───────────── */

.status-row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 22%, transparent);
  animation: dot-pulse 2.4s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.55;
    transform: scale(0.78);
  }
}

/* ───────────── THEME TOGGLE ───────────── */

.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--foreground);
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.toggle-btn__caption {
  color: var(--muted-foreground);
}

.toggle-btn__track {
  position: relative;
  display: inline-flex;
  width: 48px;
  height: 22px;
  padding: 2px;
  border: 1px solid var(--rule);
  background: transparent;
  transition: border-color 0.3s ease;
}

.toggle-btn__thumb {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: var(--primary);
  color: var(--primary-foreground);
  transform: translateX(24px);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

[data-theme="light"] .toggle-btn__thumb {
  transform: translateX(0);
}

.toggle-btn:hover .toggle-btn__track {
  border-color: var(--primary);
}

/* ───────────── PAPER GRAIN ───────────── */

.paper-grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: var(--grain-opacity);
  mix-blend-mode: var(--grain-blend);
  background-image: var(--grain-url);
  background-size: 220px 220px;
}

/* ───────────── ENTRANCE ANIMATIONS ───────────── */

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-22px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes reveal-line {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.animate-fade-up {
  animation: fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-play-state: paused;
  opacity: 0;
}

.animate-fade-up.in-view {
  animation-play-state: running;
}

.animate-slide-left {
  animation: slide-in-left 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-play-state: paused;
  opacity: 0;
}

.animate-slide-left.in-view {
  animation-play-state: running;
}

.animate-reveal-line {
  animation: reveal-line 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-play-state: paused;
  transform-origin: left;
  transform: scaleX(0);
}

.animate-reveal-line.in-view {
  animation-play-state: running;
}

/* ───────────── REDUCED MOTION ───────────── */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-fade-up,
  .animate-slide-left {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }

  .animate-reveal-line {
    transform: scaleX(1) !important;
    animation: none !important;
  }

  .status-dot,
  .paper-grain {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Commit utilities**

```bash
rtk git add src/app/globals.css
rtk git commit -m "feat(css): add masthead, status, toggle, grain, motion utilities"
```

---

## Task 5: Create PaperGrain component

**Files:**
- Create: `src/components/PaperGrain.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/PaperGrain.tsx` with:

```tsx
import type { JSX } from "react";

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='4' stitchTiles='stitch' />
    <feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0' />
  </filter>
  <rect width='100%' height='100%' filter='url(%23n)' />
</svg>`;

const NOISE_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG).replace(/'/g, "%27")}")`;

export function PaperGrain(): JSX.Element {
  return (
    <div
      className="paper-grain"
      aria-hidden="true"
      style={{
        // CSS custom property consumed by .paper-grain rule
        ["--grain-url" as string]: NOISE_URL,
      }}
    />
  );
}
```

- [ ] **Step 2: Type-check**

Run: `bun run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
rtk git add src/components/PaperGrain.tsx
rtk git commit -m "feat(ui): add PaperGrain SVG noise overlay"
```

---

## Task 6: Create Masthead component

**Files:**
- Create: `src/components/Masthead.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/Masthead.tsx`:

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import type { JSX } from "react";
import type { Profile } from "../types";

interface MastheadProps {
  profile: Profile;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Masthead({ profile, theme, onToggleTheme }: MastheadProps): JSX.Element {
  const nameParts = profile.name.split(" ");

  return (
    <header className="masthead">
      <div className="masthead__topbar">
        <span className="masthead__topbar-meta">
          <span>ISSUE {profile.issue.number}</span>
          <span className="masthead__topbar-rule" aria-hidden="true" />
          <span>{profile.issue.year}</span>
          <span className="masthead__topbar-rule" aria-hidden="true" />
          <span>{profile.location.toUpperCase()}</span>
        </span>
        <button
          type="button"
          onClick={onToggleTheme}
          className="toggle-btn"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-pressed={theme === "light"}
        >
          <span className="toggle-btn__caption">Theme</span>
          <span className="toggle-btn__track" aria-hidden="true">
            <span className="toggle-btn__thumb">
              {theme === "dark" ? (
                <Moon className="h-3.5 w-3.5" />
              ) : (
                <Sun className="h-3.5 w-3.5" />
              )}
            </span>
          </span>
        </button>
      </div>

      <div className="masthead__grid">
        <h1 className="masthead__name">
          {nameParts.map((part, i) => (
            <span
              key={part}
              className="masthead__name-line animate-slide-left"
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              <span className="masthead__name-accent">{part[0]}</span>
              {part.slice(1)}
              {i === nameParts.length - 1 ? "." : ""}
            </span>
          ))}
        </h1>

        <div className="masthead__meta">
          <div className="masthead__meta-row animate-fade-up" style={{ animationDelay: "260ms" }}>
            <span className="masthead__meta-key">Status</span>
            <span className="masthead__meta-value">
              <span className="status-row">
                <span className="status-dot" aria-hidden="true" />
                {profile.status}
              </span>
            </span>
          </div>
          <div className="masthead__meta-row animate-fade-up" style={{ animationDelay: "320ms" }}>
            <span className="masthead__meta-key">Role</span>
            <span className="masthead__meta-value">{profile.role}</span>
          </div>
          <div className="masthead__meta-row animate-fade-up" style={{ animationDelay: "380ms" }}>
            <span className="masthead__meta-key">Subject</span>
            <span className="masthead__meta-value">{profile.subtitle}</span>
          </div>
        </div>
      </div>

      <p className="masthead__tagline animate-fade-up" style={{ animationDelay: "440ms" }}>
        {profile.tagline}
      </p>

      <div className="masthead__divider" aria-hidden="true">
        <span className="masthead__divider-glyph">§</span>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `bun run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
rtk git add src/components/Masthead.tsx
rtk git commit -m "feat(ui): add Masthead component"
```

---

## Task 7: Wire Masthead + PaperGrain into page.tsx

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/ProfileHeader.tsx`

- [ ] **Step 1: Replace `page.tsx`**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
"use client";

import { useEffect, useState } from "react";
import data from "../data/data.json";
import { Masthead } from "../components/Masthead";
import { PaperGrain } from "../components/PaperGrain";
import { ProfileFooter } from "../components/ProfileFooter";
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

      {/* Plan 2 will replace this section block with the editorial body grid. */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        {sections.map((section, idx) => (
          <Section key={section.title} section={section} sectionIndex={idx} />
        ))}
        <ProfileFooter profile={profile} />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Delete obsolete header**

Run: `rm src/components/ProfileHeader.tsx`

- [ ] **Step 3: Verify build + lint**

Run: `bun run lint`
Expected: PASS (no references to deleted file).

Run: `bun run dev` and load `http://localhost:3000`.
Expected:
- Cream paper (light) or deep ink (dark) background
- Bricolage Grotesque huge name with oxblood first letters
- Issue Nº 04 · MMXXVI · JAKARTA, INDONESIA top bar
- Italic Fraunces tagline `“Secure by Design, Ship with Intent.”`
- Theme toggle still works
- Sections below still render (old styling, untouched)
- Paper grain visible at low opacity

Kill dev server after verification.

- [ ] **Step 4: Commit**

```bash
rtk git add src/app/page.tsx src/components/ProfileHeader.tsx
rtk git commit -m "feat(landing): mount Masthead and PaperGrain, drop ProfileHeader"
```

---

## Task 8: Snapshot review at all breakpoints

**Files:** none

- [ ] **Step 1: Manual render check**

Run: `bun run dev`

Open `http://localhost:3000` and verify in DevTools device toolbar:

| Width | Expected |
| --- | --- |
| 360px | Masthead stacks; name fits without overflow; meta rows readable; tagline ≤ 22ch. |
| 768px | 1-col grid still; spacing increases. |
| 1024px | 2-col grid: name left wide, meta right. |
| 1440px | Same as 1024px; meta column hugs right. |

Confirm no console errors. Toggle theme — colors swap smoothly.

- [ ] **Step 2: Stop dev server**

- [ ] **Step 3: Final commit (if any cleanups needed)**

If everything is good, no commit needed. Otherwise stage and commit the polish.

---

## Plan 1 Done When

- `Masthead.tsx` and `PaperGrain.tsx` exist; `ProfileHeader.tsx` deleted
- `globals.css` token + utility rewrite landed
- `layout.tsx` uses Bricolage + Fraunces + JetBrains Mono
- Page renders without errors across 360/768/1024/1440
- All commits use conventional commits prefix
- Linter passes
