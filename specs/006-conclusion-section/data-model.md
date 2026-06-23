# Data Model: Responsive Conclusion Section

## ConclusionContent

Static, immutable content object for the final top-level section.

| Field | Type | Rules |
|-------|------|-------|
| `id` | `"conclusao"` | Stable unique section fragment identifier |
| `label` | `"FINALIZAÇÃO"` | Exact supplied pt-BR label |
| `title` | string | Exact supplied main heading |
| `closingParagraphs` | readonly tuple of two strings | Exact supplied order; neither value empty |
| `evaluation` | `EvaluationContent` | Required evaluation group |
| `thanks` | `ThankYouContent` | Required acknowledgment group |
| `academicNote` | string | Exact supplied academic-purpose statement; rendered in footer |

## EvaluationContent

| Field | Type | Rules |
|-------|------|-------|
| `title` | string | Exact supplied evaluation heading |
| `paragraphs` | readonly tuple of two strings | Opinion/value statement first; quick-form/academic-use statement second |
| `actionLabel` | `"Responder ao formulário"` | Exact visible action label |
| `formUrl` | `string \| null` | Null during configuration; release value must be absolute HTTPS Google Forms URL |

### Form URL Validation

A release-ready URL must:

1. Parse as an absolute URL.
2. Use HTTPS.
3. Use `docs.google.com` with a Forms path or the `forms.gle` short-link host.
4. Never equal the literal placeholder, an empty string, or `#`.

When validation fails, presentation remains in the unavailable state and no
`href` is rendered.

## ThankYouContent

| Field | Type | Rules |
|-------|------|-------|
| `title` | `"Agradecimento"` | Exact supplied heading |
| `paragraphs` | readonly tuple of two strings | Thanks first; sharing invitation second |

## Relationships

```text
ConclusionContent
|-- 1 EvaluationContent
|-- 1 ThankYouContent
|-- 2 closing paragraphs
`-- 1 academic footer note
```

No entity has runtime mutation, persistence, submission state, analytics state,
or a relationship to backend data.

## Presentation States

### Google Forms Entry Point

```text
formUrl = null or invalid
  -> unavailable visual treatment
  -> aria-disabled="true"
  -> no href and no navigation

formUrl = valid Google Forms HTTPS URL
  -> native anchor
  -> default / hover / focus / active states
  -> current-tab external navigation
```

### Motion Preference

```text
standard motion
  -> block enters viewport
  -> opacity + <=16px vertical transition
  -> complete in <=300ms

reduced motion
  -> final visible state immediately
  -> no translation or stagger
```

