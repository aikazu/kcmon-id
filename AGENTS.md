# AI Agent Guardrails

## 1. Commands

- **Package Manager**: `bun` (not npm/yarn/pnpm)
- `bun run dev` — dev server
- `bun run build` — production build (Next.js Turbopack)
- `bun run lint` — **this is `tsc --noEmit`, not ESLint**. Uses `tsconfig.lint.json` which extends `tsconfig.json` but scopes to `src/**`.
- No test runner configured. If adding tests, use Vitest.

## 2. Stack

- Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS 4, Bun
- `@vercel/analytics` for page analytics
- `lucide-react` for icons — do not add other icon libraries
- No ESLint, no Prettier, no formatter configured

## 3. Architecture

Single-page personal landing site. All routes prerender as static (`○ Static`).

```
src/
  app/
    layout.tsx      — Root layout (Server Component), fonts, metadata, analytics, theme script
    page.tsx        — "use client" landing page, theme state, IntersectionObserver for animations
    globals.css     — All styles: OKLCH theme vars, animations, component styles
    error.tsx       — Error boundary (client)
    loading.tsx     — Loading spinner (server)
    not-found.tsx   — 404 page (server)
    robots.ts       — MetadataRoute.Robots
    sitemap.ts      — MetadataRoute.Sitemap
    manifest.ts     — MetadataRoute.Manifest (serves /manifest.webmanifest)
  components/       — PascalCase files: ProfileHeader, ProfileFooter, Section, LinkRow, TechStackIcon, TechIcons
  data/data.json    — All content (profile, sections with items). Components read from here.
  types/index.ts    — Profile, Item, Section, Data interfaces
```

### Key patterns an agent must know

- **Theme system**: `layout.tsx` injects an inline `<script dangerouslySetInnerHTML>` (not `next/script`) that reads `localStorage("kcmon-theme")` and sets `data-theme` on `<html>` before paint. `page.tsx` syncs this to React state. CSS uses `[data-theme="dark"]` / `[data-theme="light"]` selectors with OKLCH variables.
- **Animations are scroll-aware**: CSS classes (`animate-fade-up`, `animate-slide-left`, etc.) start with `animation-play-state: paused`. A single `IntersectionObserver` in `page.tsx` adds `.in-view` to trigger `animation-play-state: running`. Do not remove this observer or the `.in-view` CSS rules.
- **Content lives in `data.json`**: Do not hardcode text in components. Update `data.json` and `src/types/index.ts` if adding fields.
- **Tech icons**: `TechIcons.tsx` maps slug strings (from `data.json` `techStack` arrays) to inline SVG components. When adding a new tech to data.json, add the corresponding icon entry.

## 4. TypeScript

- `tsconfig.json` has `strict: true` — write strict TypeScript
- `moduleResolution: "bundler"` — use ESM imports, not CommonJS
- Path alias: `@/*` → `./src/*`
- Two tsconfig files: `tsconfig.json` (build) and `tsconfig.lint.json` (lint, scoped to `src/`)
- Next.js auto-corrects `jsx` from `"preserve"` to `"react-jsx"` during build — this is expected

### Type conventions

- **Return types**: MANDATORY on all functions and components (`: React.JSX.Element`, `: void`, etc.)
- **Hook generics**: Explicit (e.g., `useState<string>("dark")`)
- **Props**: Explicit interfaces
- **No `any`**: Use `unknown` or specific types
- **SVG icon components**: Type as `(props: React.SVGProps<SVGSVGElement>): React.JSX.Element`

## 5. Style

- 2-space indentation, semicolons always, double quotes preferred
- Import order: React/Next → internal components → types/styles
- Component files: PascalCase. Route files: Next.js conventions (`page.tsx`, `layout.tsx`)
- Tailwind utility-first. Theme colors via CSS variables (`var(--background)`, `var(--foreground)`, `var(--accent)`, `var(--border)`, `var(--muted-foreground)`)
- Custom animations defined in `globals.css` — do not duplicate in Tailwind config

## 6. Config & Security

- `next.config.ts` sets 7 security headers (CSP, HSTS, X-Frame-Options, etc.) via `headers()`. When adding external resources (scripts, fonts, APIs), update the CSP `Content-Security-Policy` value.
- `postcss.config.js` uses only `@tailwindcss/postcss` — no autoprefixer needed (Tailwind CSS 4 handles it via Lightning CSS)
- No `.env` files in use currently. If adding, they are gitignored.

## 7. Gotchas

- **README is outdated**: References Vite-era files (`src/App.jsx`, `src/index.css`). Ignore it — use actual file structure.
- **`bun.lock` is gitignored** but was previously tracked — it may show in diffs. This is intentional.
- **Do not add dependencies** without explicit user request.
- **`ProfileFooter.tsx` has a hardcoded year** (`2026`) instead of `new Date().getFullYear()` — this is intentional for static prerendering.
- **`layout.tsx` is a Server Component** despite containing a `<script>` tag — the script uses `dangerouslySetInnerHTML`, not React state, so no `"use client"` needed.
