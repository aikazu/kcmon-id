# AI Agent Guardrails

This document establishes strict guardrails for AI agents working on this Next.js codebase. All agents must adhere to these standards to ensure code quality, maintainability, and security.

## 1. Project Overview & Commands

*   **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.
*   **Note**: The project structure has migrated from Vite to Next.js. The README references outdated files (e.g., `src/App.jsx`, `src/index.css`). Use the actual file structure (`src/app/`, `src/app/globals.css`).
*   **Package Manager**: `bun`.
*   **Key Commands**:
    *   **Dev Server**: `bun run dev`
    *   **Build**: `bun run build`
    *   **Lint**: `bun run lint`
    *   **Test**: (No test scripts currently configured. If adding tests, prefer Vitest).

## 2. Code Quality & Style

*   **TypeScript**:
    *   **Strictness**: `tsconfig.json` may have `strict: false`, but **AI Agents MUST write strict TypeScript**.
    *   **No `any`**: Use `unknown` or specific types. Avoid `any`.
    *   **Explicit Types**:
        *   **Return Types**: MANDATORY for all components and functions (e.g., `: React.JSX.Element`, `: void`).
        *   **Hooks**: Use explicit generics (e.g., `useState<string>('dark')`).
        *   **Props**: Define explicit interfaces for component props.
    *   **Type Assertions**: Minimize `as unknown as Type`. Use Zod or proper type guards for data validation where possible.

*   **Formatting**:
    *   **Indentation**: 2 spaces.
    *   **Semicolons**: Always use semicolons.
    *   **Quotes**: Prefer double quotes `"` for JSX attributes and strings (unless consistency dictates otherwise).
    *   **Sorting**: Sort imports (React/Next first, then internal components, then types/styles).

*   **Naming Conventions**:
    *   **Components**: PascalCase (e.g., `ProfileHeader.tsx`, `function ProfileHeader`).
    *   **Functions/Variables**: camelCase (e.g., `toggleTheme`, `isMounted`).
    *   **Files**:
        *   Components: PascalCase (`src/components/Section.tsx`).
        *   App Routes: kebab-case/standard Next.js (`page.tsx`, `layout.tsx`).

## 3. Framework Specifics (Next.js 16 & React 19)

*   **App Router**:
    *   Use `src/app` directory structure.
    *   **Server vs Client**: Default to Server Components. Add `"use client"` at the very top only when state (`useState`), effects (`useEffect`), or event listeners are needed.
    *   **Note on `page.tsx`**: The main landing page is currently `"use client"` due to global theme state. When adding new pages, prefer Server Components if possible.

*   **Styling (Tailwind CSS 4)**:
    *   **Utility First**: Use Tailwind utility classes directly in JSX.
    *   **Variables**: Use CSS variables for themes (e.g., `var(--background)`, `var(--foreground)`).
    *   **Animations**: Use `src/app/globals.css` or Tailwind config for custom animations (e.g., `animate-scale-in`).

*   **Icons**:
    *   Use `lucide-react` for all icons.

## 4. Data Management

*   **Static Data**: Content is driven by `src/data/data.json`.
*   **Modifying Content**: Do not hardcode text in components if it belongs in the data file. Update `data.json` and the corresponding types in `src/types/` if adding new fields.

## 5. Security & Best Practices

*   **Secrets**: No hardcoded secrets. Use `.env` and `process.env`.
*   **Deps**: Do not add new dependencies without explicit user request. Use existing `lucide-react`, `framer-motion` (if present), etc.
*   **Clean Code**: Remove unused imports and variables before committing.

## 6. Testing (Future Proofing)

*   If asked to write tests, assume **Vitest** + **React Testing Library** setup (due to Vite presence in devDeps), or standard Jest.
*   Ensure components are testable by keeping logic separate from view where possible.
