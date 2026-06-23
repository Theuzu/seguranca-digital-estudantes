# Data Model: Scroll-Expanding Content Section

## ContentIntro

Static, serializable content consumed by the second top-level section.

| Field | Type | Rules |
|-------|------|-------|
| `id` | `"content-intro"` | Stable section identifier; unique within page content |
| `paragraphs` | `readonly [string, string]` | Exactly two non-empty pt-BR paragraphs in supplied order |

## Type Contract

```ts
export type ContentIntro = {
  id: "content-intro";
  paragraphs: readonly [string, string];
};
```

## Ownership

- Source file: `data/content.ts`
- Owner: Content section
- Consumer: `app/page.tsx`, passed as a serializable prop to `ScrollExpandingSection`
- Persistence: source-controlled static TypeScript only

## Validation Rules

- Preserve exact accents, punctuation, and paragraph order from feature spec.
- Do not duplicate copy in JSX or CSS.
- Do not add presentation values or animation configuration to content data.

## State Model

Content itself has no mutable state. Visual section state derives from scroll progress:

| Progress | Card state | Copy state |
|----------|------------|------------|
| `0` | `10svh` bottom preview, `8vw` inset, rounded top corners, square bottom corners; Hero pinned behind | Hidden |
| `0 < p < 0.5` | Pinned above stationary Hero and expanding | Hidden |
| `0.5 <= p < 0.7` | Expanding above stationary Hero; top radii shrinking | Fading in |
| `0.7 <= p < 1` | Expanding toward full viewport | Fully visible |
| `1` | Full viewport, zero inset, square edges; Hero fully covered | Fully visible |
| Reduced motion | Full viewport immediately | Fully visible immediately |

Reverse scrolling traverses the same states in reverse order.
