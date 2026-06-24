# Data Model: Reusable Topic Detail Layout

## Entity: TopicContentCollection

**Description**: The typed Content-section data exported from
`data/content.ts`.

**Fields**:

- `contentIntro: ContentIntro` - Existing two-paragraph Content introduction.
- `topicChooser: TopicChooserContent` - Existing topic-card rail data.
- `topicDetails: readonly TopicDetailContent[]` - New ordered collection of
  detailed topic sections.

**Relationships**:

- `topicDetails[].id` must match an existing `TopicId` used by
  `topicChooser.topics`.
- `topicChooser.topics` can contain topics before their full details are added,
  but every rendered topic detail must have a unique ID.

**Validation Rules**:

- Topic IDs are unique inside `topicDetails`.
- Topic details render in array order.
- Public copy is Brazilian Portuguese.

## Entity: TopicDetailContent

**Description**: One complete reusable topic-detail section.

**Fields**:

- `id: TopicId` - Stable anchor ID shared with chooser cards.
- `eyebrow: string` - Short topic label, for example `TEMA 3`.
- `title: string` - Full public topic title.
- `problem: TopicProblemContent` - Problem presentation part.
- `guidance: readonly TopicGuidanceEntry[]` - Ordered protection guidance part.
- `checklist: readonly TopicChecklistItem[]` - Ordered practical checklist part.

**Relationships**:

- Contains exactly one `problem`.
- Contains one or more `guidance` entries.
- Contains one or more `checklist` items.

**Validation Rules**:

- `id` must be safe as an in-page anchor and match `TopicId`.
- `guidance.length >= 1`.
- `checklist.length >= 1`.
- `title`, headings, paragraphs, guidance entries, and checklist items must not
  be empty.
- The article must render problem, guidance, and checklist in that order.

## Entity: TopicProblemContent

**Description**: The text-led opening that explains why the topic matters.

**Fields**:

- `heading: string` - Public heading, e.g. `O problema`.
- `paragraphs: readonly [string, ...string[]]` - One or more paragraphs.

**Validation Rules**:

- At least one paragraph is required.
- Paragraphs should explain risk before instructions.
- Paragraphs must wrap cleanly and remain readable at mobile widths and 200%
  zoom.

## Entity: TopicGuidanceEntry

**Description**: One sequential instruction in the sticky guidance flow.

**Fields**:

- `id: string` - Stable per-topic entry key.
- `label: string` - Short sequence label, e.g. `01`.
- `title: string` - Short instruction title.
- `body: string` - Complete guidance text.

**Relationships**:

- Belongs to one `TopicDetailContent.guidance` array.
- Its array index determines sequence order and scroll activation order.

**Validation Rules**:

- IDs are unique within a topic.
- Labels remain short enough for compact UI.
- Body text must be defensive, practical, and appropriate for students.

**State Transitions**:

- `inactive` -> `active`: entry reaches the sticky focus position while
  scrolling.
- `active` -> `outgoing`: next entry replaces it with a cut/clip transition.
- `active/outgoing` -> `inactive`: entry leaves the focused visual state.
- Reduced motion bypasses visual state changes and renders all entries stacked.

## Entity: TopicChecklistItem

**Description**: One practical action statement in the checklist.

**Fields**:

- `id: string` - Stable per-topic item key.
- `text: string` - Public checklist statement.

**Relationships**:

- Belongs to one `TopicDetailContent.checklist` array.

**Validation Rules**:

- IDs are unique within a topic.
- Text is concise, actionable, and presentational.
- Items do not collect user data and do not require persistence.

## Initial Topic 3 Data

```text
id: computadores-compartilhados
eyebrow: TEMA 3
title: COMPUTADORES DA BIBLIOTECA E LABORATÓRIO
problem.heading: O problema
guidance heading in UI: Como se proteger
checklist heading in UI: Checklist rápido
guidance entries: 3
checklist items: 5
```

The supplied copy in `spec.md` is the source for this initial topic detail.
