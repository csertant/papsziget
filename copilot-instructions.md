# Copilot instructions (papsziget)

These instructions are for GitHub Copilot / AI-assisted coding in this repository.

## Project snapshot

- **Stack:** Next.js (App Router) + React + TypeScript (strict)
- **Package manager:** `pnpm`
- **Styling:** Tailwind CSS v4 + a few global utility classes in `src/app/globals.css`
- **Linting:** ESLint (`eslint-config-next` core-web-vitals + TypeScript)
- **Language/tone:** UI copy is primarily **Hungarian** (keep accents and wording unless asked to change).

## Commands (use these)

- Dev: `pnpm dev`
- Lint: `pnpm lint`
- Build: `pnpm build`
- Start (prod): `pnpm start`

## Architecture & conventions

### Next.js / React

- Default to **Server Components** in `src/app/*`.
- Add `"use client"` **only** when you need hooks, browser APIs, state, or event handlers.
- Keep `layout.tsx` focused on:
  - metadata/SEO
  - global styles imports
  - providers (e.g. `WebshopProvider`)
  - global scripts (analytics)

### State management

- Global app state lives in `src/lib/state.tsx` as a reducer + context.
- Prefer adding new behavior as:
  1) a new `Action` variant
  2) a reducer case
  3) a typed dispatch from UI
- Persisted state uses `localStorage`; keep writes **small and stable** (don't store derived UI state).

### Domain model

- Types and seed data live in `src/data/domain.ts`.
- Keep types **strict and explicit**.
- If you change a type, update all dependent UI/state logic in the same PR.

### Imports

- Follow existing style: **relative imports** within `src/` (e.g. `../lib/state`).
- Avoid introducing new path-alias usage unless you also refactor consistently.

## Styling rules

- Prefer Tailwind utility classes.
- Use the existing CSS variables for colors:
  - `var(--background)`, `var(--foreground)`, `var(--border)`, `var(--accent)`
- When adding borders/backgrounds in Tailwind, match existing patterns:
  - `border-[color:var(--border)]`
  - `bg-[color:var(--accent)]`
- Reuse global utility classes where appropriate:
  - `btn-ghost`, `pill`, `pill-filled`, `display-font`, `no-scrollbar`
- Don't add new global CSS unless:
  - the style is reused in multiple places, **and**
  - Tailwind utilities are insufficient.

## UX / content

- Keep UX text concise and **Hungarian-first**.
- Preserve the project's "art-installation / imaginary webshop" framing.
- Don't change analytics rewrites (`/stats.js`, `/stats/api/*`) unless explicitly requested.

## TypeScript & quality bar

- TypeScript is **strict**: no implicit `any`, no unsafe casts.
- If you must use a cast, keep it localized and explain in code via the smallest possible scope (avoid broad `as any`).
- Prefer small, composable helpers over large components.
- Keep components accessible:
  - meaningful `alt` text
  - `aria-hidden` for decorative icons
  - `sr-only` for non-visual labels

## What to do before finishing a change

- Run `pnpm lint` for any TS/React changes.
- Run `pnpm build` if you touched routing/layout/data fetching.
- Ensure no accidental copy changes (especially Hungarian labels/descriptions).
