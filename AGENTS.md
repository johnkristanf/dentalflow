# AGENTS.md — DentalFlow Monorepo Guidelines

DentalFlow is a monorepo content management system (CMS) and front-end engine for high-converting, SEO-optimized landing pages and multi-location web presences for dental clinics.

---

## 1. Monorepo Architecture & Workspaces

The repository is organized into two independent workspaces:

```
dentalflow/
├── studio/             # Headless Sanity CMS Studio (v3/v6)
├── web/                # Next.js 16 + React 19 + Tailwind CSS v4 Frontend
└── AGENTS.md           # Monorepo root guidelines (this file)
```

### Workspaces & Service Documentation

| Workspace | Technology Stack | Purpose | Service Guidelines |
| :--- | :--- | :--- | :--- |
| **`studio/`** | Sanity v3/v6, React 19, TypeScript | CMS backend for clinic operators to manage dental services, dentists, reviews, and page builder blocks. | [`studio/AGENTS.md`](./studio/AGENTS.md) |
| **`web/`** | Next.js 16 (App Router), React 19, Tailwind CSS v4 | High-performance, SEO-optimized dental clinic landing page frontend with Schema.org structured data. | [`web/AGENTS.md`](./web/AGENTS.md) |

---

## 2. Quick Command Reference

Always run commands inside the respective package directory:

```bash
# Studio (Sanity CMS)
cd studio
npm run dev        # Run Studio on http://localhost:3333
npm run build      # Build Studio bundle
npm run deploy     # Deploy Studio to Sanity hosting

# Web (Next.js Frontend)
cd web
npm run dev        # Run Next.js on http://localhost:3000
npm run build      # Build production Next.js bundle
npm run lint       # Run ESLint
```

---

## 3. Core Monorepo Rules for AI Agents

1. **Service Boundaries**:
   - Keep CMS schemas, desk structure, and Sanity plugins strictly inside `studio/`.
   - Keep frontend components, pages, styling, and data fetching strictly inside `web/`.
   - **Never** cross-import code between packages (e.g., no `import ... from '../../studio/...'`).

2. **Schema First, Presentation Second**:
   - When adding a new dental section or data feature, first implement and export the schema definition in `studio/schemaTypes/`.
   - Then implement the corresponding GROQ query and typed React component in `web/`.

3. **Strict Typing**:
   - TypeScript strict mode is enabled across all packages.
   - Do not use `any`. Define explicit types or interfaces for all props and query results.

4. **Detailed Service Instructions**:
   - Refer to [`studio/AGENTS.md`](./studio/AGENTS.md) for Sanity schema patterns, field validation, and studio workflows.
   - Refer to [`web/AGENTS.md`](./web/AGENTS.md) for Next.js App Router conventions, Tailwind v4 styling, dental UX/accessibility, and local SEO standards.
