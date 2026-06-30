# Data Model: Update Design Palette

This feature does not add runtime data, persistence, APIs, or user-generated
state. The model below documents the design-system entities that must remain
consistent across governance, documentation, and app styling.

## Entity: Reference Palette

**Purpose**: Defines the five approved colors supplied by the user.

**Fields**:

- `inkBlack`: `#0E1116`, dominant dark neutral background
- `duskBlue`: `#374A67`, cool support color
- `rosyCopper`: `#DB504A`, warm support/caution color
- `saffron`: `#E3B505`, high-visibility support/accent color
- `ghostWhite`: `#F0EFF4`, light neutral text/base color

**Validation Rules**:

- All five values must appear in documentation.
- In application code, raw hex values must be centralized in the global token
  layer only.
- The palette must preserve dark-mode readability.

## Entity: Semantic Color Role

**Purpose**: Maps palette colors to stable UI responsibilities.

**Fields**:

- `name`: semantic role name, such as page, page-deep, surface, copy, muted,
  support-blue, support-copper, support-saffron, accent, line, focus, shadow
- `paletteSource`: one or more reference palette colors or derived
  `color-mix()` expression
- `usage`: allowed UI usage, such as background, text, border, focus, CTA,
  progress, or decorative detail
- `contrastExpectation`: WCAG AA target for text and required non-text states

**Validation Rules**:

- Roles must be documented in `design.md`.
- Role names should be semantic, not tied only to a component name.
- Components must consume roles through Tailwind token utilities or CSS
  variables.
- Support colors must not replace Ink Black/Ghost White as the readability
  foundation.

## Entity: Global Tailwind Token

**Purpose**: Exposes semantic color roles through Tailwind v4 CSS-first tokens.

**Fields**:

- `cssVariable`: global `:root` variable, for example `--color-bg`
- `tailwindVariable`: `@theme inline` variable, for example `--color-page`
- `utility`: generated Tailwind utility, for example `bg-page`
- `sourceValue`: reference palette value or semantic CSS variable

**Validation Rules**:

- Token declarations live in `app/globals.css`.
- `@theme inline` color variables should reference semantic `:root` variables
  where practical.
- No component should duplicate palette hex values.
- Existing token utilities may remain if their semantic role is still accurate.

## Entity: Governed Design Document

**Purpose**: Keeps durable project guidance aligned with implementation.

**Fields**:

- `constitutionRule`: palette/design-system rule in
  `.specify/memory/constitution.md`
- `designSpecRules`: detailed palette roles and usage rules in `design.md`
- `implementationTokens`: concrete token layer in `app/globals.css`

**Validation Rules**:

- Constitution and `design.md` must not contradict each other after the update.
- `design.md` must not retain old active guidance for a green single-accent
  palette.
- Any old palette values may appear only as historical/replacement notes where
  useful, not as active implementation guidance.

## Entity: Palette Usage Audit

**Purpose**: Defines the source checks needed to prove color centralization.

**Fields**:

- `oldPaletteSearch`: old active values from `design.md` and `app/globals.css`
- `newPaletteSearch`: new reference palette values
- `inlineStyleSearch`: component inline styles that set color, background,
  border, or shadow values
- `result`: pass/fail notes for active usage

**Validation Rules**:

- Old active palette values must be removed from app source unless documented as
  historical notes.
- New palette hex values must appear only in global tokens and approved docs.
- Inline styles may remain for Motion numeric values, layout values, z-index,
  or CSS-variable references, but not for scattered palette hex values.
