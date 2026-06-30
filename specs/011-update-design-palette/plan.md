# Implementation Plan: Update Design Palette

**Branch**: `main` (Spec Kit branch field empty) | **Date**: 2026-06-30 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/011-update-design-palette/spec.md`

## Summary

Replace the current dark-sky/green-accent design system with the supplied dark
palette while keeping the website readable, academic, and token-driven. The
plan updates the constitution, `design.md`, global Tailwind CSS variables in
`app/globals.css`, and existing color usages in the current app surface so the
new palette is centralized and not scattered through inline styles.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, Tailwind CSS 4,
`@tailwindcss/postcss` 4, Motion 12.40.0, Lenis 1.3.23, React Icons 5.6.0

**Storage**: No storage changes. Existing static content remains in `data/*.ts`.

**Testing**: `npm run lint`, `npm run build`, source searches for old/new
palette values, WCAG contrast checks, and manual responsive/accessibility
checks from `design.md`

**Target Platform**: Static App Router educational website for modern browsers

**Project Type**: Next.js academic website

**Performance Goals**: Palette update must not add JavaScript, dependencies,
large paint effects, layout shift, or animation work. Existing scroll and
interaction behavior must remain as fast as before.

**Constraints**: Brazilian Portuguese website copy, English documentation,
single-page narrative architecture, existing content in `data/*.ts`, Google
Forms remains the only external connection, no new dependencies, no backend,
global Tailwind/CSS tokens only for palette values, no scattered inline hex
styles, no AppyCamper copying

**Scale/Scope**: Governance and color-system update across constitution,
`design.md`, `app/globals.css`, current app components, and `ConclusionSection`
CSS module. No content rewrite, component redesign, route split, or new visual
asset work is included.

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: Public website copy stays Brazilian
  Portuguese. All new planning, governance, and validation artifacts are
  English.
- **Single-page narrative architecture**: The feature only changes palette
  governance and color usage. It preserves the existing header, hero,
  introduction, topic overview, five topic chapters, conclusion/evaluation,
  acknowledgment, and footer flow.
- **Data-driven topic content**: `data/content.ts` continues to own topic
  order, topic copy, guidance entries, and checklists. `data/conclusion.ts`
  continues to own conclusion/evaluation copy and Google Forms link data.
- **Design compliance**: The feature updates the hard color constraints in
  `design.md` section 8 and related summary/CTA references so the binding
  design document matches the new palette before app styles are changed.
- **Accessible motion**: No new motion is planned. Existing
  `prefers-reduced-motion` and Motion behavior must remain intact, and
  palette changes must not hide content that currently remains readable without
  animation.
- **Responsive/accessibility coverage**: Validate 360x800, 390x844,
  768x1024, 1024x768, 1280x800, 1440x900, 1920x1080, keyboard focus, skip
  link, topic anchors, sticky guidance cards, evaluation CTA, 44px touch
  targets, 200% zoom, and no horizontal overflow.
- **Next.js discipline**: Checked
  `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` for global
  CSS, Tailwind CSS, CSS Modules, and production CSS ordering, and
  `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  to keep this CSS-only work out of unnecessary client boundaries.
- **Dependency restraint**: No dependency is added. Use existing Tailwind v4,
  global CSS, CSS Modules, and current React components.
- **Google Forms scope**: The feature may recolor the final CTA, but keeps the
  existing Google Forms link/embed behavior and does not add backend
  integration.
- **Responsible cybersecurity framing**: No security content changes are
  planned. Existing defensive digital-literacy framing remains unchanged.

## Project Structure

### Documentation (this feature)

```text
specs/011-update-design-palette/
|-- spec.md
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- palette-token-contract.md
|-- checklists/
|   |-- requirements.md
```

### Source Code (repository root)

```text
.specify/
|-- memory/
|   |-- constitution.md          # Replace old single-accent palette rule

design.md                       # Binding palette, token, CTA, and summary rules

app/
|-- globals.css                  # :root and @theme inline Tailwind token layer
|-- components/
|   |-- HeroSection.tsx          # Token-based gradients/decorative color usage
|   |-- SiteHeader.tsx           # Header/background/focus/accent token usage
|   |-- TopicChooser.tsx         # Topic overview/tokenized support colors
|   |-- TopicDetailSection.tsx   # Topic chapter/card/checklist token usage
|   |-- ScrollExpandingSection.tsx # Tokenized intro card colors
|   |-- ConclusionSection.tsx    # Existing conclusion structure
|   |-- ConclusionSection.module.css # Final summary and evaluation CTA palette

data/
|-- content.ts                   # No content change planned
|-- conclusion.ts                # No URL/copy change planned unless needed for labels
```

**Structure Decision**: Keep the palette work in the existing global token
system and current components. `app/globals.css` remains the only active source
of palette hex values for application code, with `@theme inline` mapping
semantic Tailwind utilities to CSS variables. `design.md` and the constitution
are updated first so implementation follows project governance.

## Complexity Tracking

No constitution violations after the planned governance update. The existing
constitution currently conflicts with the requested palette, but the feature
explicitly includes a constitution amendment to resolve that before app changes.

## Phase 0: Research

Research complete. See [research.md](./research.md).

## Phase 1: Design

### Data Model

See [data-model.md](./data-model.md).

### Contracts

See [contracts/palette-token-contract.md](./contracts/palette-token-contract.md).

### Quickstart Validation

See [quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- **Website/docs language split**: Passed. Documentation artifacts are English;
  no student-facing copy changes are required.
- **Single-page narrative architecture**: Passed. The feature keeps the
  existing single-page educational journey and only changes color semantics.
- **Data-driven topic content**: Passed. `data/content.ts` and
  `data/conclusion.ts` remain the content sources of truth.
- **Design compliance**: Passed with planned amendment. `design.md` must be
  updated from the old dark-sky/green-accent language to the new
  Ink Black/Ghost White neutral base and Dusk Blue/Rosy Copper/Saffron support
  colors.
- **Accessible motion**: Passed. No new animation is introduced; reduced-motion
  behavior remains required during validation.
- **Responsive/accessibility coverage**: Passed. Quickstart includes required
  viewport, zoom, keyboard, focus, contrast, and overflow checks.
- **Next.js discipline**: Passed. Local Next CSS and Server/Client Component
  docs were checked. CSS remains global/CSS-module based without unnecessary
  client boundaries.
- **Dependency restraint**: Passed. No new dependency is planned.
- **Google Forms scope**: Passed. Evaluation CTA remains prominent and
  accessible with the existing Forms destination.
- **Responsible cybersecurity framing**: Passed. No offensive or new security
  instructional content is introduced.
