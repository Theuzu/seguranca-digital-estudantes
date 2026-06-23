# Implementation Plan: Update Hero Page

**Branch**: `[002-update-hero-page]` | **Date**: 2026-06-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-update-hero-page/spec.md`

## Summary

Update the homepage hero into a full-bleed, responsive first viewport that visually follows the provided reference image while preserving only the current title and subtitle. Implementation stays inside the existing Next.js App Router page and global CSS, with CSS-only motion and `next/font` font handling.

## Technical Context

**Language/Version**: TypeScript, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js, React, Tailwind CSS 4, `next/font`

**Storage**: No storage or data files needed for this hero-only update

**Testing**: `npm run lint`, `npm run build`, manual responsive checks at desktop and mobile sizes, reduced-motion check

**Target Platform**: Static web presentation for modern browsers

**Project Type**: Next.js academic website

**Performance Goals**: First viewport readable immediately; initial animation completes under 2 seconds; no horizontal scroll on tested mobile/desktop viewports

**Constraints**: Keep required title and subtitle unchanged, keep documentation in English, follow `theme-vibe.md`, use responsible academic cybersecurity framing, avoid backend/auth/database, and only add/import font assets for closer reference font match

**Scale/Scope**: Hero section only; Content and Conclusion remain out of scope

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- Website/docs language split: Website text stays Brazilian Portuguese-style with exact title/subtitle; docs stay English.
- Three-section structure: Feature maps only to Hero and does not alter Content or Conclusion.
- Data-file content model: No new content data is introduced; required text remains inline because the feature is only the fixed hero identity copy.
- Theme compliance: Uses `theme-vibe.md` palette, readable typography, 80% modern UI / 20% retro influence, cloud/CRT texture, and approachable cybersecurity tone.
- Clean animation: CSS-only entrance/drift effects, short reveal timing, and `prefers-reduced-motion` override.
- Next.js discipline: Checked local Next docs for App pages/layouts, CSS, and font optimization under `node_modules/next/dist/docs/01-app/01-getting-started/`.
- Dependency restraint: No general dependency additions. Font additions/imports are allowed by clarification only when needed for closer reference match.
- Google Forms scope: Feature does not touch Conclusion or Google Forms.
- Responsible cybersecurity framing: No instructional attack content; hero remains academic identity/visual presentation only.

## Project Structure

### Documentation (this feature)

```text
specs/002-update-hero-page/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- hero-ui.md
|-- spec.md
```

### Source Code (repository root)

```text
app/
|-- layout.tsx      # Font imports and page metadata
|-- page.tsx        # Hero markup and required text
|-- globals.css     # Fullscreen layout, typography, background, motion

public/
|-- [font/assets]   # Only if needed for closer reference font match
```

**Structure Decision**: Keep implementation in the existing app shell and homepage styles. Do not add routes, backend code, data files, or reusable components unless the later implementation discovers repeated hero logic.

## Complexity Tracking

No constitution violations. Optional font asset/import is allowed by clarification and limited to matching the reference typography.
