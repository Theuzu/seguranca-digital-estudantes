# UI Contract: Topic Detail Layout

## Purpose

Define the user-visible contract for reusable topic-detail sections inside the
Content section.

## Placement

- The layout appears inside the existing Content section, after the topic
  chooser.
- It does not create a new route or top-level section.
- `app/page.tsx` composes:
  1. Hero
  2. Content intro and chooser
  3. Topic detail sections
  4. Conclusion

## Data Contract

The component receives:

```ts
type TopicDetailContent = {
  id: TopicId;
  eyebrow: string;
  title: string;
  problem: {
    heading: string;
    paragraphs: readonly [string, ...string[]];
  };
  guidance: readonly {
    id: string;
    label: string;
    title: string;
    body: string;
  }[];
  checklist: readonly {
    id: string;
    text: string;
  }[];
};
```

Required invariants:

- Every rendered detail has a unique `id`.
- Every rendered detail has one problem, one or more guidance entries, and one
  or more checklist items.
- Rendered detail IDs are valid in-page anchor targets for chooser card links.

## Render Contract

For each topic detail:

- Render one semantic article or section with `id={topic.id}`.
- Expose an accessible heading tied to the topic article.
- Render exactly three visible parts in this order:
  1. Problem presentation
  2. Protection guidance
  3. Practical checklist
- Keep public copy in Brazilian Portuguese.
- Do not render inputs, save buttons, form submission controls, or persistent
  checklist state.

## Guidance Motion Contract

Multi-entry guidance:

- The guidance region provides a sticky reading position.
- One guidance entry is visually emphasized as active during scroll.
- The outgoing entry is clipped/cut away while the incoming entry replaces it.
- Forward and backward scroll both produce predictable states.
- No fast-scroll state may leave two entries unreadably overlapped.

Single-entry guidance:

- Render a static guidance block.
- Do not add artificial scroll length or fake transition states.

Reduced motion:

- Render all guidance entries in order.
- Remove clip/transform dependency for understanding.
- Preserve all headings and copy.

## Responsive Contract

- 390px mobile: content stacks, no horizontal body overflow, no clipped copy.
- 768px tablet: content keeps readable line lengths and stable spacing.
- 1280px desktop: dark editorial layout may use multi-column spacing and sticky
  guidance, with no overlap into adjacent parts.
- 200% zoom: all problem, guidance, and checklist text remains readable.

## Accessibility Contract

- DOM order matches visual learning order.
- Keyboard users can reach anchors and continue through content without traps.
- Sticky elements do not hide required content behind fixed overlays.
- Focus outlines remain visible when a chooser card jumps to a detail section.
- Motion respects reduced-motion preferences.
- Text and marker contrast must meet WCAG AA.

## Non-Goals

- No new route per topic.
- No backend, storage, analytics, or form collection.
- No extra dependency.
- No full copywriting for topics beyond supplied content unless later provided.
