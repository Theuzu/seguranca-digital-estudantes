# Data Model: Content Topic Choice Cards

## Overview

Feature uses immutable, build-time content only. No database, API, browser storage, or runtime mutation exists.

## Entity: TopicChooserContent

Represents the complete chooser presented after the Content introduction.

| Field | Type | Rules |
|---|---|---|
| `id` | literal string | Stable value identifying the chooser content group |
| `heading` | string | Exact public copy: `Escolha um tema` |
| `ctaLabel` | string | Exact public copy: `Ver orientações` |
| `topics` | readonly five-item tuple of `TopicChoice` | Exactly five items in supplied editorial order |

## Entity: TopicChoice

Represents one card and its matching in-page destination.

| Field | Type | Rules |
|---|---|---|
| `id` | `TopicId` | Unique, stable, ASCII-safe fragment identifier |
| `title` | string | Exact supplied Brazilian Portuguese title; reused as destination heading |
| `description` | string | Exact supplied Brazilian Portuguese description |

## Value: TopicId

Closed union of five IDs:

1. `senhas-autenticacao`
2. `cyberbullying-etica`
3. `computadores-compartilhados`
4. `trabalhos-na-nuvem`
5. `golpes-links-falsos`

## Relationships

- One `TopicChooserContent` owns exactly five `TopicChoice` entries.
- Each `TopicChoice.id` identifies one card CTA fragment and one destination.
- Each destination heading is derived from `TopicChoice.title`; it is not stored separately.
- Topic order controls card order and destination order.

## Validation Rules

- IDs are unique across all topics.
- Tuple length is exactly five.
- Titles and descriptions are non-empty and preserve supplied wording.
- Shared heading and CTA label preserve supplied wording.
- No icon, image, badge, number, category label, detailed guidance, or external URL field is present.
- No topic receives a featured/default state.

## State Transitions

No persistent state exists. Activating a card link changes the document fragment and moves the viewport to the matching destination. Cards return no selected state and store no interaction history.

