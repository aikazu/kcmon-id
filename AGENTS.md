# AI Agent Guardrails

This document establishes strict guardrails for AI agents working on this codebase. All agents must adhere to these standards to ensure code quality, maintainability, and security.

## 1. Code Quality

*   **Type Safety**:
    *   **Strict No `any`**: Never use `any` type in TypeScript. Use `unknown` if the type is truly uncertain, and narrow it down with type guards.
    *   **No Suppressions**: `// @ts-ignore` and `// @ts-nocheck` are strictly forbidden unless explicitly authorized by a human reviewer for a specific edge case.
    *   **Return Types**: Explicitly define return types for all public functions and methods.

*   **Linting & Formatting**:
    *   **Automated Checks**: All code must pass the project's linter (e.g., ESLint) and formatter (e.g., Prettier) configurations without errors or warnings.
    *   **No Unused Code**: Remove unused variables, imports, and functions. Do not comment out unused code; delete it.

*   **Testing**:
    *   **Unit Tests**: New logic must be accompanied by unit tests covering positive and negative cases.
    *   **Regression**: Ensure existing tests pass before submitting changes.
    *   **Mocking**: specific external dependencies should be mocked to ensure tests are deterministic and fast.

## 2. Code Maintainability

*   **Readability**:
    *   **Self-Documenting Code**: Variable and function names must be descriptive and meaningful (e.g., `isUserLoggedIn` instead of `flag`).
    *   **Complex Logic**: Add comments *only* to explain "why" complex logic exists, not "what" it does.
    *   **Small Functions**: Keep functions small and focused on a single responsibility (SRP).

*   **Structure**:
    *   **File Organization**: Follow the existing project directory structure. Do not create new top-level directories without permission.
    *   **DRY (Don't Repeat Yourself)**: Abstract repeated logic into reusable utility functions or components.

*   **Dependencies**:
    *   **Minimal additions**: Avoid adding new npm/pip packages if standard library or existing dependencies can solve the problem efficiently.
    *   **Version Pinning**: Use exact versions or strictly semver-compatible ranges to prevent drift.

## 3. Code Security

*   **Input Validation**:
    *   **Sanitization**: All external inputs (API params, query strings, user content) must be validated and sanitized (e.g., using Zod, Joi, or similar libraries).
    *   **No SQL Injection**: Use parameterized queries or ORM methods. Never concatenate strings into SQL queries.

*   **Secrets Management**:
    *   **No Hardcoded Secrets**: NEVER commit API keys, passwords, or tokens to git. Use environment variables (`.env`).
    *   **Leak Prevention**: Do not log sensitive data (PII, tokens) to the console or log files.

*   **Dependencies**:
    *   **Audit**: Check for known vulnerabilities in added dependencies.
    *   **Least Privilege**: Scripts and agents should run with the minimum necessary permissions.

## 4. Framework & Stack Specifics

*   **Next.js / React**:
    *   **Server vs Client**: Default to Server Components. Add `"use client"` only when interactivity (hooks, event listeners) is required.
    *   **Prop Types**: Always define explicit interfaces for component props (e.g., `interface MyComponentProps`).
    *   **No Dangerous HTML**: Avoid `dangerouslySetInnerHTML`. If necessary for SVGs, use component-based SVG icons. For other content, use a sanitization library.
    *   **Functional Components**: Use React Functional Components (`React.FC` or explicitly typed functions).

*   **Styling (Tailwind CSS)**:
    *   **Utility First**: Prefer Tailwind utility classes over custom CSS in `globals.css`.
    *   **Consistency**: Use the defined color variables (e.g., `var(--background)`) for theming support.

*   **Project Structure**:
    *   **`src/app/`**: Routes, layouts, and page-level orchestration only. Keep logic minimal.
    *   **`src/components/`**: Reusable UI components. Small, focused, and typed.
    *   **`src/data/`**: Static data and configuration files (JSON).
    *   **`src/types/`**: Shared TypeScript interfaces and type definitions.

