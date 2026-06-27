# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: TypeScript, React, Next.js [version from package.json]

**Primary Dependencies**: Next.js, React, Tailwind CSS [confirm package.json]

**Storage**: Static content in `data/*.ts` files only unless explicitly approved

**Testing**: npm run lint, npm run build, plus manual responsive/accessibility checks

**Target Platform**: Static/web presentation for modern browsers

**Project Type**: Next.js academic website

**Performance Goals**: Smooth reading and clean animations on mobile and desktop

**Constraints**: Brazilian Portuguese website copy, English documentation,
`design.md` compliance, single-page narrative architecture, content in
`data/*.ts`, prominent Google Forms evaluation CTA near the end, no new
dependencies without explicit approval, no backend/auth/database unless approved

**Scale/Scope**: Responsive single-page academic website with Introduction,
educational journey, and conclusion/evaluation macro phases

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The plan MUST answer each gate before implementation work starts:

- Website/docs language split: How does the feature keep student-facing website
  content in Brazilian Portuguese and project documentation in English?
- Single-page narrative architecture: How does the feature preserve the
  Introduction, educational journey, and conclusion/evaluation macro phases while
  following the detailed order in `design.md`?
- Data-driven topic content: Which `data/*.ts` files own the website content,
  topic order, guidance entries, and checklists?
- Design compliance: Which hard constraints from `design.md` guide layout,
  visual hierarchy, sticky-card behavior, motion, responsive behavior, and
  accessibility?
- Accessible motion: How does the feature keep essential content readable
  without animation and provide `prefers-reduced-motion` behavior?
- Responsive/accessibility coverage: Which required viewports, keyboard paths,
  skip-link behavior, focus states, touch targets, and 200% zoom states must be
  checked?
- Next.js discipline: Which relevant guide under `node_modules/next/dist/docs/`
  was checked before code changes?
- Dependency restraint: Are new dependencies avoided? If not, record explicit
  user approval.
- Google Forms scope: If the feature touches the ending flow, how is the Google
  Forms link/embed kept prominent and accessible without backend integration?
- Responsible cybersecurity framing: Does the content educate defensive digital
  literacy without operational abuse instructions?

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- layout.tsx          # App shell and metadata
|-- page.tsx            # Main academic presentation page
|-- globals.css         # Global theme and responsive styles
|-- components/         # Reusable sections/components when needed

data/
|-- [content].ts        # Static cybersecurity topics and website copy

public/
|-- [assets]            # Static images or media assets
```

**Structure Decision**: [Document concrete files touched and why they fit the
simple academic website scope]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., new dependency] | [current need] | [why existing stack is insufficient] |
| [e.g., extra route] | [current need] | [why the single-page journey is insufficient] |
| [e.g., backend Forms integration] | [current need] | [why a Google Forms link/embed is insufficient] |
