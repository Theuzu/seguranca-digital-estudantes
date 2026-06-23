# Research: Draggable Topic Card Redesign

## Decision 1: Use a narrow Client Component boundary

**Decision**: Convert `TopicChooser.tsx` to a Client Component while keeping
`app/page.tsx` server-rendered and passing serializable topic data as props.

**Rationale**: Pointer handlers, refs, browser scrolling APIs, animation-frame
coordination, and current-index state require a client boundary. Local Next.js
16 documentation recommends Client Components for event handlers and browser
APIs and keeping the boundary small to limit shipped JavaScript.

**Alternatives considered**:

- CSS-only native overflow: supports touch scrolling but not grab-to-drag mouse
  behavior or reliable drag-click suppression.
- Move the full Content section to the client: works but widens hydration scope
  without benefit.

## Decision 2: Use Pointer Events plus scroll-position dragging

**Decision**: Use one Pointer Events path for mouse, pen, and touch, an 8-pixel
horizontal-dominant threshold, pointer capture after drag recognition, and
direct `scrollLeft` updates.

**Rationale**: One input model avoids duplicate mouse/touch logic. Delayed
capture preserves ordinary clicks and vertical page scrolling. A concrete
threshold distinguishes intentional drag from minor click movement.

**Alternatives considered**:

- Separate mouse and touch handlers: more branches and inconsistent behavior.
- HTML Drag and Drop API: designed for moving data, not scrolling a rail, and
  weak on touch.
- Motion drag constraints: suitable for transforming one element, but native
  scroll position better preserves focus visibility and overflow semantics.

## Decision 3: Use deterministic center snapping

**Decision**: Calculate the card nearest the viewport center, clamp to valid
boundaries, and animate `scrollLeft` to that card over 280 ms using a cancellable
`requestAnimationFrame` loop.

**Rationale**: Deterministic duration satisfies the 350-millisecond requirement;
center calculations work across responsive card widths; explicit clamping
prevents blank end states. CSS scroll snap remains a layout aid, not the sole
timing mechanism.

**Alternatives considered**:

- `scrollTo({ behavior: "smooth" })`: browser-defined timing cannot guarantee
  the 350-millisecond limit.
- CSS scroll snap alone: useful for native scrolling but offers limited control
  over post-gesture timing and programmatic focus alignment.
- Transforming the whole track: requires duplicate focus/overflow bookkeeping
  and risks inaccessible off-screen links.

## Decision 4: Keep whole cards as native fragment links

**Decision**: Render one `<a href="#topic-id">` as each complete card and block
only the click immediately following a confirmed drag.

**Rationale**: Native links preserve semantics, Enter activation, URL fragments,
history, and no-router same-document navigation. One anchor per card meets the
no-nested-control requirement.

**Alternatives considered**:

- Button plus `scrollIntoView`: wrong navigation semantics and custom history.
- Clickable article with a hidden link: duplicate targets and weaker keyboard
  behavior.
- Next.js `<Link>`: unnecessary for a same-document fragment and adds client
  navigation behavior the feature does not need.

## Decision 5: Reuse React Icons through typed data keys

**Decision**: Add a `TopicIconKey` union to `data/content.ts`; map its five keys
to existing Font Awesome 6 exports from `react-icons/fa6` in the component.

**Rationale**: `react-icons` is already installed and approved. String keys keep
content serializable and centrally owned while presentation code owns React
components. Decorative icons do not replace labels.

**Alternatives considered**:

- Add Lucide: user allowed it, but a new package is unnecessary.
- Store React component references in data: breaks clean content/presentation
  separation and complicates serialization across the server/client boundary.
- Custom SVG assets: extra asset maintenance without user value.

## Decision 6: Use Tailwind plus one CSS Module

**Decision**: Keep palette, typography, spacing, and state classes in Tailwind;
add `TopicChooser.module.css` for card-basis calculations, scroll padding/snap,
touch action, scrollbar hiding, and drag-only selection/cursor rules.

**Rationale**: Local Next.js CSS guidance recommends Tailwind for common styling
and CSS Modules for scoped custom patterns. Complex responsive rail geometry is
clearer and safer in a component-owned stylesheet than in global CSS or long
arbitrary-value strings.

**Alternatives considered**:

- Global CSS: increases selector scope and unrelated regression risk.
- Tailwind-only arbitrary values: possible, but harder to audit for the exact
  mobile peek and desktop visibility requirements.

## Decision 7: Reduced motion removes settling animation

**Decision**: Use the existing Motion `useReducedMotion` hook for runtime
behavior and a `prefers-reduced-motion` CSS query for visual transitions. Snap
position changes immediately when reduction is requested.

**Rationale**: The project already uses Motion and the hook matches current
practice. Both programmatic motion and CSS transitions must honor the setting.

**Alternatives considered**:

- CSS query only: cannot control JavaScript snap duration.
- Always animate: violates the specification and constitution.
