# Research: Reusable Topic Detail Layout

## Decision: Keep the feature inside the existing Content section

**Rationale**: The constitution requires exactly Hero, Content, and Conclusion.
The topic-detail flow is detailed cybersecurity content, so it belongs below the
topic chooser inside Content rather than in a new route or fourth section.

**Alternatives considered**:

- New route per topic: rejected because the current site is a one-page academic
  presentation and the chooser already uses in-page anchors.
- Separate top-level section: rejected because it would break the three-section
  constitution.

## Decision: Extend `data/content.ts` with typed topic-detail content

**Rationale**: Existing Content copy and chooser topics already live in
`data/content.ts`. Extending the same module keeps topic IDs, chooser cards, and
detail sections in one typed source of truth.

**Alternatives considered**:

- New `data/topic-details.ts`: possible, but adds another content source while
  the current Content section is already centralized in `data/content.ts`.
- Inline component copy: rejected because the spec and constitution require
  typed `data/*.ts` ownership.

## Decision: Add one focused Client Component for topic details

**Rationale**: Local Next.js docs say pages/layouts are Server Components by
default and Client Components are appropriate for browser APIs, hooks, and
interactive behavior. The detail layout needs scroll progress and reduced-motion
state, so only `TopicDetailSection.tsx` should be client-side while
`app/page.tsx` remains a Server Component.

**Alternatives considered**:

- Make `app/page.tsx` a Client Component: rejected because it would increase the
  client boundary unnecessarily.
- Pure static CSS sticky without a Client Component: rejected because the
  requested active cut transition and reduced-motion branching need more
  control than static markup alone.

## Decision: Use installed Motion for scroll progress and reduced motion

**Rationale**: Motion is already installed and used by existing Content and
Conclusion components. Reusing it avoids new dependencies and gives access to
`useScroll`, `useTransform`, and `useReducedMotion`.

**Alternatives considered**:

- Add another scroll animation dependency: rejected because no dependency was
  approved and existing Motion covers the need.
- Manual scroll listeners only: rejected because the existing codebase already
  uses Motion for scroll-driven work and reduced-motion handling.

## Decision: Style the new topic-detail layout with inline Tailwind utilities

**Rationale**: The user explicitly requested inline Tailwind CSS. The local
Next.js CSS guide confirms Tailwind utility classes are supported in App Router
components, and the project already has Tailwind configured.

**Alternatives considered**:

- New CSS Module: rejected for this feature because it conflicts with the user's
  inline Tailwind constraint, although existing CSS Modules can remain for
  existing components.
- Global CSS selectors: rejected because they create broader styling churn and
  are not needed for this contained layout.

## Decision: Remove chooser placeholder destinations and anchor to real details

**Rationale**: `TopicChooser.tsx` currently renders placeholder headings with
matching IDs. The new detail sections should own those destination anchors so
students land on complete content instead of empty placeholders.

**Alternatives considered**:

- Keep placeholder destinations and add details below them: rejected because it
  would duplicate anchors or send students to empty content first.
- Move the detail layout inside each card: rejected because the card rail should
  remain a chooser, not the full learning flow.

## Decision: Flatten guidance for single-entry or reduced-motion cases

**Rationale**: The spec requires no fake scroll animation for one guidance entry
and full access for reduced-motion users. A static stacked layout preserves
reading order and removes unnecessary scroll distance.

**Alternatives considered**:

- Always use the sticky sequence: rejected because it creates empty animation
  states for one-entry topics and may reduce accessibility for motion-sensitive
  users.
- Hide inactive guidance entries from assistive tech: rejected because the DOM
  reading order must stay complete and logical.
