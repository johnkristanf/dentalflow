# Sanity Studio — Agent Guidelines (`studio/`)

Headless CMS backend for DentalFlow, managing content for dental clinic landing pages, practitioner profiles, treatments, and patient showcases.

---

## 1. Tech Stack & Environment

- **Framework**: Sanity v3 / v6 (`sanity`, `@sanity/vision`, `structureTool`)
- **UI & Runtime**: React 19, Styled Components, Node.js LTS
- **Language**: TypeScript (Strict mode)
- **Project Configuration**:
  - Project ID: `lcbbbb1a`
  - Dataset: `production`
  - Config File: `sanity.config.ts`
  - CLI Config: `sanity.cli.ts`

---

## 2. Essential Commands

Run all commands from the `studio/` directory:

```bash
# Start local Studio dev server (http://localhost:3333)
npm run dev

# Build production Studio bundle
npm run build

# Deploy Studio to Sanity hosting (*.sanity.studio)
npm run deploy

# Deploy GraphQL API schema (if configured)
npm run deploy-graphql

# Run linting
npm run lint
```

---

## 3. Code & Schema Conventions

Established engineering conventions enforced across all Sanity Studio code:

### Naming & File Conventions
- **Schema Files**: Use **kebab-case** for schema file names (e.g., `clinic.ts`, `dentist.ts`, `before-after.ts`, `block-content.ts`).
- **Schema Names & Field Names**: Use **camelCase** for Sanity schema identifiers and field names (`name: 'dentist'`, `name: 'emergencyPhone'`, `name: 'beforeImage'`).
- **Schema Titles**: Use clean, human-readable Title Case for studio labels (`title: 'Dentist'`, `title: 'Emergency Phone'`).
- **Components & Custom Previews**: Use **kebab-case** for component files, with function identifiers in **PascalCase**.

### Import & Export Conventions
- **Top-Level Static Imports Only**: Never import modules inside function bodies or schema definition closures unless resolving a rare circular dependency.
- **Grouped Imports**: Order imports into standard blocks:
  1. Sanity core helper methods (`defineType`, `defineField`, `defineArrayMember`)
  2. External plugins & icons
  3. Internal schema types and objects
  4. Type-only imports (`import type { ... } from 'sanity'`)
- **Named Exports Preferred**: Export each schema definition as a named export (`export const dentist = defineType(...)`), and aggregate them in `schemaTypes/index.ts`.

### Schema Design & Validation
1. **Type-Safe Definitions**: Always use Sanity's `defineType`, `defineField`, and `defineArrayMember` helper functions for full TypeScript autocomplete and type checking.
2. **Explicit Validation**: Apply explicit validation rules (`Rule.required()`, `Rule.min()`, `Rule.max()`) on critical clinic fields (names, slugs, contact information).
3. **Media & Assets**: Always enable `options: { hotspot: true }` on image fields, and pair with an accessible `alt` text string field.
4. **Document Previews**: Provide an explicit `preview` object with `select` and `prepare` functions for every document schema to ensure clean, scannable lists for clinic staff.
5. **Strict Service Boundaries**: Keep schema definitions self-contained within `studio/`. Never cross-import from `web/`.
