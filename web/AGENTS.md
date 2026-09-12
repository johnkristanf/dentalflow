# Web Frontend — Agent Guidelines (`web/`)

High-performance, SEO-optimized landing page frontend for dental clinics and oral healthcare providers, powered by Next.js 16 and Tailwind CSS v4.

---

## 1. Tech Stack & Environment

- **Framework**: Next.js 16.3+ (App Router)
- **UI & Runtime**: React 19, Node.js LTS
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Language**: TypeScript 5.x (Strict mode)
- **Path Aliases**: `@/*` maps to `./src/*`

---

## 2. Essential Commands

Run all commands from the `web/` directory:

```bash
# Start local Next.js dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint check
npm run lint
```

---

## 3. Source Directory Layout

```
web/src/
├── app/                        # Next.js App Router entrypoints only
│   ├── page.tsx                # Default export — route handler
│   ├── layout.tsx              # Default export — root layout
│   └── globals.css             # @theme tokens, base styles
│
├── components/                 # UI components (kebab-case filenames)
│   ├── hero-section.tsx
│   ├── services-section.tsx
│   └── ...
│
├── api/                        # Domain-based data fetching
│   └── sanity/
│       ├── client.ts           # Shared sanityFetch<T>() helper
│       ├── clinic.ts           # getClinic()
│       ├── services.ts         # getServices()
│       ├── dentist.ts          # getDentist()
│       ├── reviews.ts          # getReviews()
│       └── faqs.ts             # getFaqs()
│
├── types/                      # Shared TypeScript interfaces
│   └── dental-types.ts         # SanityClinic, SanityService, etc.
│
├── constants/                  # Static lookup data (SCREAMING_SNAKE_CASE exports)
│   └── service-categories.ts   # CATEGORY_META
│
└── utils/                      # Pure, side-effect-free helper functions
    ├── format-phone.ts          # formatPhoneHref()
    └── group-by-category.ts    # groupByCategory()
```

### Directory Rules

- **`api/sanity/`** — one file per Sanity document type. Each file exports a single async fetcher. All HTTP details live in `client.ts` only; domain files never construct URLs.
- **`types/`** — interfaces and types only, no runtime code. Always import with `import type { ... }`.
- **`constants/`** — module-level `const` declarations that never change at runtime. No functions, no classes.
- **`utils/`** — pure functions with no side effects and no framework imports. If it touches React or Next.js, it belongs in a hook or component instead.
- **`components/`** — UI only. Components must not contain fetch logic; data always flows in via props from Server Component parents.
- **`app/`** — App Router entrypoints only (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`). Never add shared utilities here.

---

## 4. Code & Engineering Conventions

### Naming Conventions
- **Components**: **kebab-case** filenames (e.g., `hero-section.tsx`). Function identifiers **PascalCase** (`export function HeroSection()`).
- **Custom Hooks**: **camelCase** prefixed with `use` for both filename and identifier (e.g., `useMediaQuery.ts`).
- **Utilities & Helpers**: **kebab-case** filenames (e.g., `format-phone.ts`). Function exports **camelCase** (`export function formatPhoneHref()`).
- **Types & Interfaces**: **kebab-case** filenames (e.g., `dental-types.ts`). Type/interface names **PascalCase** (`interface SanityClinic`).
- **Constants**: **kebab-case** filenames (e.g., `service-categories.ts`). Identifiers **SCREAMING_SNAKE_CASE** (`export const CATEGORY_META = ...`).

### Import & Export Conventions
- **Top-Level Static Imports Only**: Never import inside function bodies. Dynamic `import()` only for genuine circular deps or `next/dynamic` code-splitting.
- **Deterministic Import Ordering** — four blocks, each alphabetized, separated by a blank line:
  1. React core (`react`, `react-dom`)
  2. Next.js modules (`next/image`, `next/link`, `next/navigation`)
  3. External third-party packages
  4. Internal aliases — in this order: `@/api/...`, `@/components/...`, `@/constants/...`, `@/types/...`, `@/utils/...`
- **Type-Only Imports**: Always `import type { ... }` for interfaces and types.
- **Named Exports Preferred**: `export function` for everything. `default` export only for App Router entrypoints.
- **Canonical Import Paths**: Always import from the deepest canonical location, never from a re-export barrel:
  - ✅ `import type { SanityClinic } from "@/types/dental-types"`
  - ✅ `import { getClinic } from "@/api/sanity/clinic"`
  - ❌ `import { ... } from "@/lib/sanity"` — `lib/sanity.ts` has been deleted

### Component Architecture & State
- **Server Components (RSC) First**: Default to RSC for all data fetching and layout.
- **Leaf-Level `'use client'`**: Only on interactive leaf components (modals, accordions, sliders). Never mark a page or data-fetching wrapper as client.
- **Parallel Data Fetching**: In `page.tsx`, always fetch all domains in parallel with `Promise.all([getClinic(), getServices(), ...])`.
- **Explicit Props Typing**: Every component declares an explicit `interface XxxProps { ... }`. No inline anonymous object types.
- **Prop Destructuring**: Destructure in the function signature with explicit defaults.
- **Single Responsibility**: One job per component. Decompose large sections into smaller kebab-case files.
- **Defensive CMS Data Handling**: All Sanity fields are optional. Use optional chaining (`clinic?.phone`) and nullish fallbacks everywhere.

---

## 5. Frontend & Design Guidelines

Dental practices rely heavily on **trust, cleanliness, professionalism, and accessibility**:

1. **Design Aesthetics & Brand Feel**:
   - **Color Palette**: Clinical yet welcoming (calm medical blues, soothing teals, soft mints, warm whites, slate neutrals). Avoid harsh neon or aggressive greens.
   - **Typography**: Clean, readable sans-serif (Geist, Inter, Plus Jakarta Sans, Outfit).
   - **Visual Hierarchy**: Prominent, sticky emergency and "Book Appointment" CTAs; phone numbers as click-to-call links on mobile.
   - **Micro-interactions**: Subtle hover states, smooth accordion transitions.

2. **Performance & Core Web Vitals**:
   - Optimize Sanity images via `@sanity/image-url` (WebP, explicit width + quality). Never render raw full-resolution CMS images.
   - Supply `sizes` and `priority` on all above-the-fold hero images (LCP target: < 2.5 s).

3. **SEO & Structured Data**:
   - Generate Schema.org JSON-LD on every page: `@type: "DentalClinic"` with `name`, `telephone`, `address`, `medicalSpecialty`, `priceRange`, `aggregateRating`.
   - Include dynamic `<Metadata>` (`title`, `description`, `openGraph`) per route, targeting local dental search intents.

4. **Accessibility & Healthcare Compliance**:
   - WCAG 2.1 AA: all interactive elements must meet contrast and focus requirements.
   - Phone numbers must use `tel:` href links for one-tap mobile calling — use `formatPhoneHref()` from `@/utils/format-phone`.
   - **HIPAA / Privacy**: Never collect PHI via public contact forms without HIPAA-compliant transport or disclaimers.

5. **Tailwind CSS v4 Standards**:
   - Standard Tailwind v4 utility classes only.
   - Custom brand tokens via `@theme` in `src/app/globals.css`.
   - Never cross-import from `studio/` or any path outside `web/`.
