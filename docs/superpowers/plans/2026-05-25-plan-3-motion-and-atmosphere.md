# Plan 3 — Motion + Atmosphere Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Layer the cinematic motion + atmospheric polish on top of the Plan 2 layout: page-turn masthead reveal, parallax meta column, magnetic links, custom serif cursor, drop-cap reveal animation. All motion is fully gated by `prefers-reduced-motion` and `(hover: hover) and (pointer: fine)`.

**Architecture:** Add three new client components (`MagneticLink`, `CustomCursor`) and a `useParallax` helper hook inside `MetaColumn`. CSS extensions for page-turn keyframe, drop-cap reveal, cursor markup, and motion guards. `page.tsx` mounts `CustomCursor` once at the root and wraps each `LinkRow` rendered from `Section` in `MagneticLink`. No new npm dependencies — all motion uses RAF + plain CSS.

**Tech Stack:** Next.js 16, React 19 (`useEffect`, `useRef`, `useState`), TypeScript 5, CSS keyframes, `requestAnimationFrame`, `matchMedia`.

---

## File Structure

| File | Action | Responsibility |
| --- | --- | --- |
| `src/app/globals.css` | append | Page-turn keyframe, drop-cap reveal, custom-cursor markup, magnetic helper, motion guards. |
| `src/components/MagneticLink.tsx` | create | Wraps a child element. Applies pointer-proximity `translate3d` via RAF. No-op on touch / reduced-motion. |
| `src/components/CustomCursor.tsx` | create | Custom cursor (dot + ring). RAF lerp toward pointer. Scales on `[data-cursor="link"]` hover. Mounted once. |
| `src/components/Section.tsx` | modify | Wrap each `LinkRow` with `MagneticLink`. Add `data-cursor="link"` attribute. |
| `src/components/LinkRow.tsx` | modify | Add `data-cursor="link"` attribute. |
| `src/components/Masthead.tsx` | modify | Add `masthead--reveal` class + JS trigger for page-turn on first mount. |
| `src/components/MetaColumn.tsx` | modify | Add parallax: ref + RAF + scroll listener with reduced-motion guard. |
| `src/app/page.tsx` | modify | Mount `<CustomCursor />` once. |

---

## Task 1: Append motion CSS — page-turn, drop-cap reveal, cursor, magnetic guards

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append CSS block**

Append the following to the bottom of `src/app/globals.css`:

```css
/* ───────────── PAGE-TURN REVEAL ───────────── */

@keyframes page-turn {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.masthead--reveal {
  animation: page-turn 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* ───────────── DROP-CAP REVEAL ───────────── */

@keyframes dropcap-pop {
  from {
    opacity: 0;
    transform: scale(0.55) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.section__intro::first-letter {
  animation: dropcap-pop 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-play-state: paused;
}

.section__intro.in-view::first-letter {
  animation-play-state: running;
}

/* ───────────── MAGNETIC LINK ───────────── */

.magnetic {
  display: contents;
}

.magnetic > * {
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

/* Reduced-motion: hard reset (component also bails out in JS) */
@media (prefers-reduced-motion: reduce) {
  .magnetic > * {
    transform: none !important;
    transition: none !important;
  }
}

/* ───────────── CUSTOM CURSOR ───────────── */

.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}

.custom-cursor__dot {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--foreground);
  transform: translate3d(0, 0, 0);
}

.custom-cursor__ring {
  position: absolute;
  top: -14px;
  left: -14px;
  width: 28px;
  height: 28px;
  border: 1px solid var(--foreground);
  border-radius: 50%;
  transform: translate3d(0, 0, 0) scale(1);
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    width 0.25s ease,
    height 0.25s ease;
}

.custom-cursor.is-link .custom-cursor__ring {
  transform: translate3d(0, 0, 0) scale(1.7);
  border-color: var(--primary);
}

.custom-cursor.is-link .custom-cursor__dot {
  background: var(--primary);
}

@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
  .custom-cursor {
    display: none !important;
  }
}

.cursor-active {
  cursor: none;
}

/* ───────────── PARALLAX META ───────────── */

.meta-col[data-parallax] {
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .meta-col[data-parallax] {
    transform: none !important;
    will-change: auto;
  }
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/app/globals.css
rtk git commit -m "feat(css): add motion utilities — page-turn, drop-cap, cursor, magnetic"
```

---

## Task 2: Create MagneticLink component

**Files:**
- Create: `src/components/MagneticLink.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/MagneticLink.tsx`:

```tsx
"use client";

import { useEffect, useRef, type JSX, type ReactNode } from "react";

interface MagneticLinkProps {
  children: ReactNode;
  radius?: number;
  strength?: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isHoverCapable(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function MagneticLink({
  children,
  radius = 80,
  strength = 0.35,
}: MagneticLinkProps): JSX.Element {
  const wrapRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !isHoverCapable()) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const target = wrap.firstElementChild as HTMLElement | null;
    if (!target) return;

    let raf = 0;
    let active = false;
    let tx = 0;
    let ty = 0;

    const onMove = (e: PointerEvent): void => {
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        active = true;
        tx = dx * strength;
        ty = dy * strength;
      } else if (active) {
        active = false;
        tx = 0;
        ty = 0;
      } else {
        return;
      }
      schedule();
    };

    const onLeave = (): void => {
      active = false;
      tx = 0;
      ty = 0;
      schedule();
    };

    const apply = (): void => {
      raf = 0;
      target.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
    };

    const schedule = (): void => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      if (raf !== 0) cancelAnimationFrame(raf);
      target.style.transform = "";
    };
  }, [radius, strength]);

  return (
    <span ref={wrapRef} className="magnetic">
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/MagneticLink.tsx
rtk git commit -m "feat(ui): add MagneticLink RAF-based pointer-proximity wrapper"
```

---

## Task 3: Create CustomCursor component

**Files:**
- Create: `src/components/CustomCursor.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/CustomCursor.tsx`:

```tsx
"use client";

import { useEffect, useRef, type JSX } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isPointerFine(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function CustomCursor(): JSX.Element | null {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !isPointerFine()) return;

    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("cursor-active");

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const onMove = (e: PointerEvent): void => {
      targetX = e.clientX;
      targetY = e.clientY;
      const t = e.target as HTMLElement | null;
      const isLink = !!t?.closest('[data-cursor="link"], a, button');
      root.classList.toggle("is-link", isLink);
      if (raf === 0) raf = requestAnimationFrame(tick);
    };

    const tick = (): void => {
      raf = 0;
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      root.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf !== 0) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  return (
    <div ref={rootRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__dot" />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/CustomCursor.tsx
rtk git commit -m "feat(ui): add CustomCursor with RAF lerp + link state"
```

---

## Task 4: Add `data-cursor` attribute to LinkRow

**Files:**
- Modify: `src/components/LinkRow.tsx`

- [ ] **Step 1: Add the attribute**

Open `src/components/LinkRow.tsx` and update the `<a>` tag opening to include `data-cursor="link"`:

```tsx
<a
  href={item.url}
  target={item.external ? "_blank" : "_self"}
  rel={item.external ? "noopener noreferrer" : undefined}
  className={cls}
  data-cursor="link"
  style={{ animationDelay: `${400 + index * 70}ms` }}
>
```

Leave the rest of the component unchanged.

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/LinkRow.tsx
rtk git commit -m "feat(ui): mark link rows with data-cursor link"
```

---

## Task 5: Wrap LinkRow with MagneticLink in Section

**Files:**
- Modify: `src/components/Section.tsx`

- [ ] **Step 1: Add intersection class to intro paragraph and wrap rows**

Replace the `Section` component body with:

```tsx
import type { JSX } from "react";
import type { Section as SectionData } from "../types";
import { LinkRow } from "./LinkRow";
import { MagneticLink } from "./MagneticLink";

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
        <h2
          id={`section-${sectionIndex}`}
          className="section__title animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          {section.title}
        </h2>
        <span
          className="section__rule animate-reveal-line"
          style={{ animationDelay: "180ms" }}
        />
      </header>

      {section.intro ? (
        <p
          className="section__intro animate-fade-up"
          style={{ animationDelay: "260ms" }}
        >
          {section.intro}
        </p>
      ) : null}

      <div className="section__list">
        {section.items.map((item, i) => (
          <MagneticLink key={item.url + item.label} radius={70} strength={0.18}>
            <LinkRow item={item} index={i} />
          </MagneticLink>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/Section.tsx
rtk git commit -m "feat(ui): wrap LinkRow with MagneticLink"
```

---

## Task 6: Page-turn reveal on Masthead

**Files:**
- Modify: `src/components/Masthead.tsx`

- [ ] **Step 1: Add reveal trigger**

Replace the top of `src/components/Masthead.tsx` to mark itself with `masthead--reveal` after mount (and only if reduced motion is off):

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, type JSX } from "react";
import type { Profile } from "../types";

interface MastheadProps {
  profile: Profile;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Masthead({ profile, theme, onToggleTheme }: MastheadProps): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const nameParts = profile.name.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Force reflow then trigger reveal so the keyframe restarts every mount
    el.classList.remove("masthead--reveal");
    void el.offsetWidth;
    el.classList.add("masthead--reveal");
  }, []);

  return (
    <header ref={ref} className="masthead">
      {/* ...rest of the existing JSX unchanged: topbar, grid, tagline, divider... */}
```

Keep the remaining JSX of the existing `Masthead` component identical from `<div className="masthead__topbar">` through to the closing `</header>`.

- [ ] **Step 2: Commit**

```bash
rtk git add src/components/Masthead.tsx
rtk git commit -m "feat(ui): trigger page-turn reveal on Masthead mount"
```

---

## Task 7: Parallax meta column

**Files:**
- Modify: `src/components/MetaColumn.tsx`

- [ ] **Step 1: Add parallax effect**

Replace the file contents of `src/components/MetaColumn.tsx` with:

```tsx
"use client";

import { useEffect, useRef, type JSX } from "react";
import type { Profile } from "../types";

interface MetaColumnProps {
  profile: Profile;
}

const SOCIALS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "GitHub", href: "https://github.com/aikazu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iqbalattila" },
  { label: "X / Twitter", href: "https://x.com/Vystkailash" },
];

const MAX_OFFSET = 32;

export function MetaColumn({ profile }: MetaColumnProps): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (reduce || !wide) return;

    let raf = 0;
    let lastY = window.scrollY;

    const apply = (): void => {
      raf = 0;
      const offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, lastY * -0.06));
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = (): void => {
      lastY = window.scrollY;
      if (raf === 0) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, []);

  return (
    <aside ref={ref} className="meta-col" data-parallax="" aria-label="Profile meta">
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
            data-cursor="link"
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
rtk git commit -m "feat(ui): add parallax + cursor hint to MetaColumn"
```

---

## Task 8: Mount CustomCursor in page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Insert CustomCursor**

In `src/app/page.tsx`, import `CustomCursor` and render it once inside `<main>` (above `<PaperGrain />`):

```tsx
import { CustomCursor } from "../components/CustomCursor";
// ...other imports unchanged
```

Then inside the return:

```tsx
<main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
  <CustomCursor />
  <PaperGrain />
  <Masthead profile={profile} theme={theme} onToggleTheme={toggleTheme} />
  {/* ...rest unchanged */}
```

- [ ] **Step 2: Lint + dev render verification**

Run: `bun run lint`
Expected: PASS.

Run: `bun run dev` and load `http://localhost:3000`.
Expected:
- Page-turn sweep on first paint over masthead
- Custom cursor visible on desktop with fine pointer; native cursor hidden
- Cursor ring scales + tints accent over link rows, meta column links, theme toggle
- Magnetic pull on hover of link rows (subtle)
- Meta column drifts slightly upward on scroll (parallax)
- Drop-cap fades in when section enters viewport
- DevTools → prefers-reduced-motion: emulate "reduce" → all motion stops; native cursor restored; magnetic disabled

Kill dev server.

- [ ] **Step 3: Touch device fallback**

In DevTools device toolbar, select an iPhone profile.
Expected:
- Custom cursor not rendered (CSS `(hover: none)` hides it)
- Magnetic disabled (JS bails out)
- Parallax disabled (JS guards on `(min-width: 768px)`)
- Tap targets ≥44px

- [ ] **Step 4: Commit**

```bash
rtk git add src/app/page.tsx
rtk git commit -m "feat(landing): mount CustomCursor at root"
```

---

## Task 9: Final cross-browser + accessibility pass

**Files:** none

- [ ] **Step 1: Lighthouse pass**

Run a Lighthouse audit (Chrome DevTools → Lighthouse panel) on desktop and mobile.
Targets:
- Accessibility ≥ 95
- Performance ≥ 90 on desktop, ≥ 80 on mobile
- Best Practices ≥ 95

If any target is missed, capture the recommendation and address it before considering Plan 3 done.

- [ ] **Step 2: Keyboard navigation**

Tab through the page with the keyboard.
Expected:
- Focus visible on theme toggle, every link row, meta links, footer top button
- Focus ring uses accent oxblood, outline-offset 4px
- Enter activates links

- [ ] **Step 3: Theme swap**

Toggle between dark + light. Verify:
- All custom motion elements (cursor, magnetic, parallax) keep working
- Drop caps recolor to new accent
- Paper grain blend mode swaps (`screen` ↔ `multiply`)

- [ ] **Step 4: Final commit (if cleanups needed)**

If everything is good, no commit. Otherwise stage and commit polish:

```bash
rtk git add -A
rtk git commit -m "polish: final motion + a11y tuning"
```

---

## Plan 3 Done When

- `MagneticLink`, `CustomCursor` exist
- `Masthead` triggers page-turn reveal
- `MetaColumn` parallax active on desktop, gated on mobile / reduced motion
- Drop caps animate on view
- Custom cursor swaps state on links
- Touch + reduced-motion users get a graceful static experience
- Lighthouse + keyboard pass
- All commits use conventional commits
