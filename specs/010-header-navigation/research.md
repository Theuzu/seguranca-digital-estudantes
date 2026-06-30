# Research: Header Navigation

## Decision 1: Use native fragment links as the navigation baseline

**Decision**: Header destinations use ordinary anchor/hash semantics for page
parts and topics, with smooth scrolling treated as progressive enhancement.

**Rationale**: Native anchors keep navigation functional if JavaScript, Motion,
or the smooth-scroll wrapper fails. The local Next.js `Link` docs confirm that
hash navigation is supported and that sticky headers should be handled with
`scroll-padding-top` or target-level `scroll-margin-top`.

**Alternatives considered**:

- Button handlers calling `scrollIntoView`: rejected because these are
  navigation actions and should remain links.
- Router-only navigation: rejected because the project must remain one page and
  does not need route transitions.
- Smooth-scroll-only behavior: rejected because reduced motion and failure-safe
  behavior require static navigation.

## Decision 2: Add global and target-level header offsets

**Decision**: Define a durable header offset using global scroll padding and
verify or add target scroll margins for topic, overview, and evaluation
regions.

**Rationale**: The header is sticky/fixed and must not cover anchor targets.
CSS offsets work with hash links and remain valid without JavaScript.

**Alternatives considered**:

- Calculating offsets in JavaScript for every click: rejected because it is
  fragile, unnecessary, and weaker without JavaScript.
- Adding top padding to every section: rejected because it changes visual
  spacing rather than solving scroll positioning directly.

## Decision 3: Keep the header in a small Client Component

**Decision**: Implement the header as a focused client component while keeping
the page composition and static text sections server-rendered.

**Rationale**: The header needs browser behavior: compact panel state, Escape
handling, focus return, current-section detection, and reduced-motion-aware
enhancements. The local Next.js Server/Client Components docs recommend adding
`"use client"` only to specific interactive components to avoid inflating the
client bundle.

**Alternatives considered**:

- Make `page.tsx` a Client Component: rejected because the page mostly renders
  static academic content and should not move all children into the client
  bundle.
- Build a fully static header with no active state or mobile panel: rejected
  because the spec requires orientation while reading and accessible compact
  topics behavior when used.

## Decision 4: Source topic navigation from existing content data

**Decision**: Generate topic navigation entries from existing `data/content.ts`
topic IDs, titles, descriptions, and order.

**Rationale**: The constitution requires five topics to remain data-driven
rather than duplicated in unrelated components. Reusing existing IDs also keeps
TopicChooser, TopicDetailSection, and the header aligned.

**Alternatives considered**:

- Hardcode the five header topics: rejected because it would violate the
  data-driven topic model and increase copy drift.
- Add a new header-only data file: rejected because current data already owns
  the topic order and destination IDs.

## Decision 5: Mobile `Temas` opens a compact panel

**Decision**: Use a small accessible topics panel on mobile instead of only
jumping to the overview.

**Rationale**: The user requested a header with topic division, and the spec
requires reaching each topic from the header or panel in no more than two
interactions. A compact panel satisfies that without creating a complex
full-screen navigation.

**Alternatives considered**:

- Make `Temas` jump only to the topic overview: rejected because it hides direct
  topic access behind additional page scanning.
- Full-screen mobile menu: rejected by `design.md` unless the project already
  has one or explicitly approves it.

## Decision 6: Active state uses viewport observation with safe fallback

**Decision**: Use current-section/topic observation as an enhancement, with all
links remaining usable if active-state detection is delayed or unavailable.

**Rationale**: The active indicator improves orientation, but it is not
essential content. This keeps the header resilient and avoids tying navigation
correctness to scroll observers.

**Alternatives considered**:

- No active state: rejected because the spec asks students to stay oriented
  while reading.
- High-frequency scroll state updates: rejected because it risks performance
  and is unnecessary for a compact navigation state.

## Decision 7: Reuse existing Motion and Lenis, add no dependency

**Decision**: Reuse existing Motion for small state transitions and respect the
existing Lenis wrapper; do not add a new scrolling or menu dependency.

**Rationale**: The project already includes Motion and Lenis, and the
constitution forbids new dependencies without approval. Header transitions can
be implemented with transform/opacity and reduced-motion fallbacks.

**Alternatives considered**:

- Install another smooth-scroll or menu package: rejected because current
  dependencies cover the need.
- Use heavy scroll-driven animation for header state: rejected because the
  header must remain visually quiet and content-first.
