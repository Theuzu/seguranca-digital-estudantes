# Implementation Plan: Reusable Topic Detail Layout

**Branch**: `[007-topic-detail-layout]` | **Date**: 2026-06-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/007-topic-detail-layout/spec.md`

## Summary

Add a reusable topic-detail layout inside the existing Content section. The
layout renders topic data as three ordered parts: a text-led problem
presentation, a sticky sequential guidance sequence with a smooth cut-style
transition, and a practical checklist. Content remains typed and centralized in
`data/content.ts`; the initial complete detail uses Topic 3, "Computadores da
biblioteca e laboratório". The page keeps the existing single-page educational
journey, uses the installed Motion package for scroll progress
and reduced-motion handling, and styles the new layout with inline Tailwind CSS
utilities as requested.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, Tailwind CSS 4,
Motion 12.40.0, Lenis 1.3.23, React Icons 5.6.0

**Storage**: Static typed topic content in `data/content.ts`; no persistent,
remote, or user-submitted data

**Testing**: `npm run lint`, `npm run build`, `git diff --check`, source checks,
and browser validation at 390x844, 768x1024, and 1280x720 plus 200% zoom,
keyboard navigation, reduced motion, body overflow, and scroll-forward/backward
passes through the sticky guidance sequence

**Target Platform**: Static App Router presentation page in modern mobile and
desktop browsers

**Project Type**: Next.js academic website

**Performance Goals**: Topic content remains part of the initial page render;
scroll-driven guidance updates stay contained to one focused Client Component;
motion uses transform/clip/opacity style changes, settles within the requested
350ms ceiling where timed animation is used, and creates no layout shift or body
overflow

**Constraints**: pt-BR public copy; English docs; approved single-page narrative
architecture; content in `data/*.ts`; inline Tailwind CSS
utilities for the new topic-detail layout; no new dependency; Google Forms stays
Conclusion-only; WCAG AA contrast; reduced-motion fallback; existing Hero,
Content intro, topic chooser, and Conclusion behavior preserved

**Scale/Scope**: Extend one data module, add one focused topic-detail component,
adjust page composition, remove placeholder topic destinations from the chooser
so card anchors target real detail sections, add one UI contract, and do not add
routes, backend, global theme rewrites, or unrelated topic copy

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: Public topic copy remains Brazilian
  Portuguese in `data/content.ts`; all generated planning artifacts stay in
  English.
- **Single-page narrative architecture**: Feature maps into the existing
  educational-journey flow. No new route or unrelated page region is introduced.
- **Data-driven topic content**: `data/content.ts` owns topic IDs, chooser copy,
  detailed topic copy, guidance entries, and checklist items.
- **Design compliance**: The dark editorial guidance/checklist treatment follows
  `design.md`: education first, subtle technical labels/markers only,
  trustworthy cybersecurity tone, readable typography, and accessible contrast.
- **Accessible motion**: Motion is limited to the guidance sequence and reduced
  when requested. The problem and checklist remain readable static content.
  Sticky behavior must never trap scroll or hide the reading order.
- **Next.js discipline**: Checked local Next.js 16 docs for Server and Client
  Components, CSS/Tailwind, and Accessibility under
  `node_modules/next/dist/docs/`. `app/page.tsx` remains a Server Component;
  the scroll-aware topic detail becomes the narrow Client Component boundary.
- **Dependency restraint**: No dependency is added. Existing Motion, Tailwind,
  React, and browser sticky/scroll behavior cover the feature.
- **Google Forms scope**: The feature does not touch Conclusion or Forms. The
  existing Conclusion Forms link behavior remains unchanged.
- **Responsible cybersecurity framing**: Topic 3 teaches defensive shared-device
  habits: sign out, avoid saved passwords, delete personal files, remove drives,
  and verify sessions. It gives no offensive instructions.

## Project Structure

### Documentation (this feature)

```text
specs/007-topic-detail-layout/
|-- spec.md
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- topic-detail-ui.md
|-- checklists/
|   |-- requirements.md
|-- tasks.md                       # created by /speckit-tasks
```

### Source Code (repository root)

```text
app/
|-- page.tsx                       # compose TopicDetailSection after chooser
|-- components/
|   |-- TopicChooser.tsx           # keep rail, remove placeholder destinations
|   |-- TopicChooser.module.css    # existing chooser styles, unchanged unless needed
|   |-- TopicDetailSection.tsx     # new Client Component for detail layout

data/
|-- content.ts                     # extend topic data types and Topic 3 detail
```

**Structure Decision**: Keep `app/page.tsx` as the Server Component composition
root and pass serializable static data into interactive child components. Add
`TopicDetailSection.tsx` as the only new component because scroll progress,
sticky cut transitions, and reduced-motion detection are browser concerns. Keep
the requested new layout styling in inline Tailwind `className` utilities inside
the new component rather than adding a new CSS Module or broad global CSS. Keep
`TopicChooser.tsx` focused on choosing topics; its current placeholder
destination headings should be removed so `href="#computadores-compartilhados"`
lands on the real detail section.

## Implementation Design

- Extend `data/content.ts` with `TopicDetailContent`, `TopicProblemContent`,
  `TopicGuidanceEntry`, and `TopicChecklistItem` types. Keep `TopicId` as the
  shared key between chooser cards and detail sections.
- Add `topicDetails` as a readonly array. Seed it with the supplied
  "computadores-compartilhados" content. The array shape supports additional
  topics later without changing the reusable layout.
- Keep the public title and headings in pt-BR:
  "TEMA 3 -- COMPUTADORES DA BIBLIOTECA E LABORATÓRIO", "O problema",
  "Como se proteger", and "Checklist rápido".
- Compose `<TopicDetailSection topics={topicDetails} />` immediately after
  `<TopicChooser content={topicChooser} />` inside the existing
  `ScrollExpandingSection` children.
- Remove the placeholder `.destinations` rendering from `TopicChooser.tsx`.
  Cards continue linking by `href="#${topic.id}"`; only detailed topics produce
  matching anchors in this feature.
- Implement `TopicDetailSection.tsx` as a Client Component because the guidance
  sequence needs `useScroll`, `useTransform`, and `useReducedMotion` from the
  installed Motion package.
- Render one semantic article per topic with `id={topic.id}`, an accessible
  heading, three ordered regions, and DOM order matching the visual order.
- Problem presentation: dark editorial opening with wide spacing, short label,
  large title, and two readable paragraphs. No animation required.
- Guidance sequence: for each topic, create one sticky viewport-height reading
  area and a scroll track sized from the number of guidance entries. Use scroll
  progress to determine the active entry and visually clip the outgoing entry
  while the incoming entry replaces it. For a single-entry topic, render a static
  guidance block without artificial scroll length.
- Reduced motion: render guidance entries as a normal stacked list in order,
  preserving all content and avoiding clip/transform transitions.
- Checklist: render a simple presentational list with stable row heights,
  visible markers, clear item copy, and no inputs, persistence, or data
  collection.
- Responsive behavior: stack all columns on mobile, preserve readable line
  lengths, keep sticky behavior only where viewport height and width can support
  it, and verify no horizontal body overflow.
- Accessibility: keep semantic headings, ordered DOM, visible focus targets,
  `aria-labelledby` per article/section, and no hidden content that is required
  for understanding.
- Do not add images for the base Topic 3 content. Future topics may add optional
  visual accents only if they preserve the data model and accessibility rules.

## Complexity Tracking

No constitution violation. Existing App Router composition, typed static data,
Tailwind utilities, and installed Motion package cover the feature without new
dependencies, new routes, or backend work.
