# Research: Topic Chooser Fit Refresh

## Decision 1: Replace chooser CSS Module styling with inline Tailwind-driven markup

**Decision**: Move chooser presentation styling from `TopicChooser.module.css`
into inline utility classes inside `TopicChooser.tsx`, keeping only small inline
`style` objects for the dark background layers that are cumbersome to express as
static utility classes.

**Rationale**: The user explicitly requested inline Tailwind styling for this
refresh. Next.js 16 App Router docs recommend Tailwind utilities for most
component styling and reserve CSS Modules for cases where utilities are not
sufficient. The chooser is a single component with self-contained styles, so
keeping the design in markup avoids split ownership.

**Alternatives considered**:

- Keep `TopicChooser.module.css` and patch its geometry only: rejected because it
  conflicts with the explicit inline-styling request.
- Move chooser rules into `app/globals.css`: rejected because the change is not
  truly global and would expand global scope unnecessarily.

## Decision 2: Keep drag behavior and split snap alignment by viewport

**Decision**: Preserve the current drag, swipe, click-suppression, and
reduced-motion behavior, but change snapping so mobile remains center-aligned
while tablet/desktop snaps from the rail's inline start edge.

**Rationale**: The current implementation centers cards at all widths, which
helps mobile but contributes to the "cut edge" look on wider screens. Start
alignment on larger widths lets the first and last visible cards meet the
section boundary cleanly while keeping the mobile centered-card composition from
the reference.

**Alternatives considered**:

- Keep center snapping everywhere: rejected because it preserves the current
  desktop edge-fit problem.
- Use start snapping everywhere: rejected because it weakens the intended mobile
  centered-card composition and side previews.

## Decision 3: Structure chooser title content as two text rows plus one accent token

**Decision**: Replace the chooser heading literal string with a structured title
object containing `lineOne`, `lineTwo`, and `accent`.

**Rationale**: The requested title treatment is not only style; it changes the
reading order and line composition. Keeping that structure in `data/content.ts`
preserves the repository rule that public content belongs in typed data files
and lets the component render the last-line accent without hard-coded text.

**Alternatives considered**:

- Keep a single heading string and split it inside the component: rejected
  because it would hide user-facing copy structure in presentation logic.
- Hard-code the whole title layout inside the component: rejected because it
  breaks the `data/*.ts` content ownership rule.

## Decision 4: Use the existing project fonts and palette for the title refresh

**Decision**: Keep `Space Grotesk` for the main title, `Silkscreen` for the
pixel accent, `#09112A` for the section surface, `#F5F6FA` for cards, `#4F7CFF`
for card interaction color, and `#7EDB8A` for the title accent.

**Rationale**: These fonts and colors are already wired into the project and
match `design.md` better than copying the reference's neon-green/crypto
look. Using the existing palette keeps the section recognizable as part of the
same website while still making the final title line feel distinct.

**Alternatives considered**:

- Introduce a new pixel font or highlight color: rejected because the current
  stack already satisfies the design need and new dependencies are not approved.
- Reuse blue for both hover and title accent: rejected because a second accent
  color separates heading emphasis from interaction emphasis more clearly.

## Decision 5: Keep manual validation centered on overflow, title fit, and drag-vs-click behavior

**Decision**: Validate the feature with lint/build plus targeted manual checks
for mobile title fit, card-edge alignment, hover simplification, keyboard focus,
reduced motion, and page-body overflow.

**Rationale**: The feature is mostly layout and interaction polish inside an
existing client component. The highest-risk regressions are visual clipping,
incorrect snap geometry, and accidental navigation during drag, not data or API
behavior.

**Alternatives considered**:

- Add automated browser tests first: rejected because the project does not
  already rely on an E2E harness for this area, and the change can be validated
  proportionally with existing checks plus targeted manual scenarios.
