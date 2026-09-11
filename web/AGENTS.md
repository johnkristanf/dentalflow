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

## 3. Code & Engineering Conventions

Established software engineering practices enforced across all frontend code:

### Naming Conventions
- **Components**: Use **kebab-case** for file and folder names (e.g., `hero-section.tsx`, `dentist-card.tsx`, `booking-modal.tsx`). Component function identifiers in code must remain **PascalCase** (`export function HeroSection()`).
- **Custom Hooks**: Use **camelCase** prefixed with `use` for both file names and function identifiers (e.g., `useMediaQuery.ts`, `useScrollLock.ts`, `useActiveSection.ts`).
- **Utilities & Helpers**: Use **kebab-case** for utility files (e.g., `format-phone.ts`, `sanity-image.ts`, `date-helpers.ts`). Function exports use **camelCase** (`export function formatPhone()`).
- **Types & Interfaces**: Use **kebab-case** for type declaration files (e.g., `dental-types.ts`). Type and interface names in code must use **PascalCase** (`interface ClinicLocation`, `type ServiceCategory`).
- **Constants**: Use **kebab-case** for constant definition files (e.g., `clinic-constants.ts`). Constant identifiers in code must use **SCREAMING_SNAKE_CASE** (`export const DEFAULT_BOOKING_URL = ...`).

### Import & Export Conventions
- **Top-Level Static Imports Only**: Never import modules inside function bodies or component scopes. Dynamic `import()` or scoped imports are strictly restricted to resolving genuine circular dependencies or explicit Next.js dynamic code-splitting (`next/dynamic`).
- **Deterministic Import Ordering**: Organize imports into distinct, alphabetized blocks separated by a single newline:
  1. Node standard library & React core (`react`, `react-dom`)
  2. Next.js modules (`next/image`, `next/link`, `next/navigation`)
  3. External third-party packages
  4. Internal path aliases (`@/components/...`, `@/lib/...`, `@/hooks/...`)
  5. Relative imports (`./...`, `../...`)
  6. Type-only imports (`import type { ... } from '...'`)
- **Type-Only Imports**: Always use `import type { ... }` when importing types or interfaces to ensure zero-cost tree-shaking and avoid circular runtime dependencies.
- **Named Exports Preferred**: Prefer explicit named exports for components, hooks, and utilities (`export function DentistCard()`). Reserve `default` exports exclusively for Next.js App Router route entrypoints (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).

### Component Architecture & State
- **Server Components (RSC) First**: Default to React Server Components for all data fetching and layout rendering.
- **Leaf-Level `'use client'`**: Only declare `'use client'` on leaf interactive components that require browser events, DOM APIs, or React hooks (e.g., modals, mobile menus, sliders, accordions). Never mark an entire page or data-fetching wrapper as client.
- **Explicit Props Typing**: Declare an explicit interface or type for every component's props (`interface DentistCardProps { ... }`). Never use inline anonymous object types for complex component props.
- **Prop Destructuring**: Destructure props directly in the function signature with explicit default values where applicable.
- **Single Responsibility & Composition**: Keep components focused on a single responsibility. Decompose complex sections into smaller, reusable kebab-case components instead of monolithic multi-hundred-line files.
- **Defensive CMS Data Handling**: All Sanity CMS fields can be optional or empty. Always use optional chaining (`clinic?.emergencyPhone`) and provide resilient fallback values to prevent runtime crashes.

---

## 4. Frontend & Design Guidelines

Dental practices rely heavily on **trust, cleanliness, professionalism, and accessibility**:

1. **Design Aesthetics & Brand Feel**:
   - **Color Palette**: Clinical yet welcoming (calm medical blues, soothing teals, soft mints, warm whites, slate neutrals). Avoid harsh neon tones or aggressive clinical greens.
   - **Typography**: Clean, readable sans-serif (Geist, Inter, Plus Jakarta Sans, Outfit).
   - **Visual Hierarchy**: Prominent, sticky emergency and "Book Appointment" call-to-actions (phone click-to-call for mobile users).
   - **Micro-interactions**: Subtle hover states, smooth accordion transitions, and interactive before/after image sliders.

2. **Performance & Core Web Vitals**:
   - Optimize Sanity images using `@sanity/image-url` (request WebP format, explicit width, and quality parameters). Never render full-resolution raw CMS images.
   - Always supply `sizes` and `priority` to above-the-fold hero images to keep Largest Contentful Paint (LCP) under 2.5s.

3. **SEO & Structured Data**:
   - Generate Schema.org JSON-LD structured data on landing pages:
     - `@type: "DentalClinic"` or `"Dentist"`
     - Attributes: `name`, `telephone`, `address`, `geo`, `openingHoursSpecification`, `medicalSpecialty`, `priceRange`.
   - Include dynamic metadata (`title`, `description`, `openGraph`, `twitter`) tailored to local dental search intents (e.g., "Family & Cosmetic Dentist in [City], [State]").

4. **Accessibility & Healthcare Compliance**:
   - WCAG 2.1 AA compliance: Ensure contrast ratios meet accessibility standards.
   - Phone numbers must use standard `tel:+1...` links for one-tap mobile calling.
   - **HIPAA / Privacy**: Never collect protected health information (PHI) via simple public contact forms without HIPAA-compliant transport or disclaimers.

5. **Tailwind CSS v4 Standards**:
   - Use standard Tailwind v4 utility classes.
   - Configure custom brand colors and design tokens via `@theme` variables in `src/app/globals.css`.
   - Never import code from `studio/` or relative paths outside `web/`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
