# Data Model: Draggable Topic Card Redesign

## Overview

Feature keeps immutable editorial data in `data/content.ts`. Browser state is
transient and derives from pointer gestures or rail position. No database, API,
browser storage, or server mutation exists.

## Entity: TopicChooserContent

| Field | Type | Rules |
|---|---|---|
| `id` | literal string | Stable chooser group identifier |
| `heading` | string | Exact public copy: `Escolha um tema` |
| `topics` | readonly five-item tuple of `TopicChoice` | Exactly five entries in approved order |

## Entity: TopicChoice

| Field | Type | Rules |
|---|---|---|
| `id` | `TopicId` | Unique, stable, ASCII-safe fragment identifier |
| `icon` | `TopicIconKey` | One of five supported presentation keys |
| `title` | string | Simplified pt-BR card title; reused by destination heading |
| `description` | string | Simplified pt-BR preventive guidance summary |

## Value: TopicId

Closed union, order controlled by tuple:

1. `senhas-autenticacao`
2. `cyberbullying-etica`
3. `computadores-compartilhados`
4. `trabalhos-na-nuvem`
5. `golpes-links-falsos`

## Value: TopicIconKey

Closed union mapped by presentation code:

1. `key`
2. `comments`
3. `computer`
4. `cloud`
5. `link`

## Transient Entity: RailInteractionState

| Field | Type | Rules |
|---|---|---|
| `currentIndex` | integer `0..4` | Nearest card to viewport center |
| `pointerId` | integer or null | Active pointer only |
| `startX` | number | Pointer origin for gesture threshold |
| `startScrollLeft` | number | Rail origin for direct manipulation |
| `isDragging` | boolean | True only after horizontal threshold passes |
| `suppressNextClick` | boolean | Set after confirmed drag; consumed once |
| `animationFrame` | frame handle or null | Cancelled on new gesture or unmount |

This state is not persisted and is not editorial content.

## Relationships

- One `TopicChooserContent` owns exactly five `TopicChoice` records.
- Each `TopicChoice.id` maps one card link to one destination in the same
  Content section.
- Each `TopicChoice.icon` maps to one decorative React Icons component.
- Tuple position maps to `currentIndex` and one mobile status marker.
- Destination heading derives from `TopicChoice.title`; no duplicate copy field
  exists.

## Validation Rules

- Exactly five topics exist; IDs and icon keys are valid and non-empty.
- Topic IDs are unique and destination IDs match one-to-one.
- Titles and descriptions use approved simplified pt-BR copy.
- No CTA label remains.
- No featured/default topic field exists.
- Icon absence must not remove or weaken title/description meaning.
- `currentIndex` is always clamped from `0` through `topics.length - 1`.

## Interaction State Transitions

```text
idle
  -> pointer-down
  -> click-candidate (movement < 8px)
  -> native fragment activation

pointer-down
  -> dragging (horizontal-dominant movement >= 8px)
  -> settling (nearest valid card, 280ms)
  -> idle (currentIndex updated, next click suppressed once)

idle
  -> keyboard-focus
  -> settling or immediate alignment
  -> native Enter activation
```

With reduced motion, `settling` becomes an immediate position assignment.
