# Feature Specification: Update Design Palette

**Feature Branch**: `[011-update-design-palette]`

**Created**: 2026-06-30

**Status**: Draft

**Input**: User description: "Create a spec for updating the design. We will change the website color palette, there is a reference image. These are the colors: 0E1116, 374A67, DB504A, E3B505, F0EFF4. The website must use a dark mode, black background and light letters. Use non-neutral colors, the three in the center of the image, as support to the neutral palette. The spec must cover the changes that need to be applied to DESIGN.md and the current colors that we have in the website. It needs to be explicit that the colors MUST be used as global Tailwind CSS variables and not as inline styles."

## Clarifications

### Session 2026-06-30

- Q: Should the palette feature update the constitution because it currently requires a dark-sky palette with one primary accent color? -> A: Update the constitution plus `design.md` and app tokens.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Apply the new dark palette consistently (Priority: P1)

As a student visiting the academic website, I want the page to use the new dark reference palette consistently so the experience feels cohesive, readable, and intentionally designed.

**Why this priority**: The palette is the requested design change and affects the whole website experience.

**Independent Test**: Review the rendered website from top to bottom and confirm the page background, text, surfaces, accents, links, focus states, cards, and final evaluation CTA all use the new palette roles without old green/navy colors appearing.

**Acceptance Scenarios**:

1. **Given** the website is loaded, **When** a student scans the first viewport, **Then** the page uses Ink Black (`#0E1116`) as the dominant dark background and Ghost White (`#F0EFF4`) for primary readable text.
2. **Given** a student scrolls through all sections, **When** they encounter navigation, topic cards, sticky guidance cards, checklist areas, and the evaluation CTA, **Then** Dusk Blue (`#374A67`), Rosy Copper (`#DB504A`), and Saffron (`#E3B505`) appear as supporting colors with consistent semantic roles.

---

### User Story 2 - Update the binding design document (Priority: P2)

As a future contributor or coding agent, I want the constitution and `design.md` to describe the new palette and replace the previous color system so implementation decisions do not drift back to the old design.

**Why this priority**: The constitution and `design.md` are binding project guidance, so the implementation must not carry a known governance conflict before code changes.

**Independent Test**: Inspect the constitution and `design.md` and confirm the old palette rule is replaced with the new reference palette direction, semantic usage rules, accessibility notes, and explicit global token requirements.

**Acceptance Scenarios**:

1. **Given** a contributor reads the constitution and `design.md`, **When** they reach palette and design-system guidance, **Then** they see the new palette direction instead of the old dark-sky/green single-accent rule.
2. **Given** a contributor reads the color usage rules, **When** they choose a color for any section or state, **Then** they can determine whether it should use Ink Black, Ghost White, Dusk Blue, Rosy Copper, or Saffron.

---

### User Story 3 - Prevent scattered color implementation (Priority: P3)

As a maintainer, I want all palette values centralized as global Tailwind CSS variables so future design updates can be made safely without chasing inline hex values through components.

**Why this priority**: The user explicitly requires global Tailwind variables and prohibits inline styles for palette values.

**Independent Test**: Search the application source for hardcoded palette hex values and inline color declarations after implementation; only the global token definition should contain the palette hex values.

**Acceptance Scenarios**:

1. **Given** the implementation is complete, **When** the source is searched for `#0E1116`, `#374A67`, `#DB504A`, `#E3B505`, and `#F0EFF4`, **Then** those values appear only in the global Tailwind/CSS token definition and approved documentation.
2. **Given** a component needs a palette color, **When** it is styled, **Then** it uses semantic Tailwind token classes or CSS variables rather than inline styles or arbitrary hex values.

---

### Edge Cases

- The previous design uses green (`#7edb8a`) as a positive accent and red (`#ff6b6b`) as danger; the new palette must remove these as active brand colors unless a legacy warning color is explicitly retained and documented.
- Rosy Copper (`#DB504A`) resembles a warning/red tone. Its role must be documented so it supports hierarchy without turning every decorative accent into an error or danger cue.
- Saffron (`#E3B505`) is bright and may fail contrast on light surfaces or when used as body text. It should be used for accents, markers, and emphasis only where contrast is verified.
- Ghost White (`#F0EFF4`) should not become a large page background unless the section intentionally inverts the palette and maintains readable contrast.
- Existing gradients, `color-mix()` usages, shadows, borders, image overlays, hover states, and focus rings must be reviewed because they may still visually preserve the old palette even when token names remain the same.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The website MUST adopt the provided palette as the active design palette:
  - Ink Black: `#0E1116`
  - Dusk Blue: `#374A67`
  - Rosy Copper: `#DB504A`
  - Saffron: `#E3B505`
  - Ghost White: `#F0EFF4`
- **FR-002**: The website MUST remain a dark-mode experience, with Ink Black as the dominant page background and Ghost White as the primary text color.
- **FR-003**: Dusk Blue, Rosy Copper, and Saffron MUST be used as supporting colors for hierarchy, accents, progress, state, illustration/detail, and call-to-action emphasis; they MUST NOT replace the neutral dark/light readability foundation.
- **FR-004**: `design.md` MUST be updated to replace the current website palette:
  - `--color-bg-deep: #060b1d`
  - `--color-bg: #09112a`
  - `--color-surface: #0d1425`
  - `--color-surface-elevated: #111b34`
  - `--color-text: #f5f6fa`
  - `--color-text-muted: #c9cbd8`
  - `--color-accent: #7edb8a`
  - `--color-danger: #ff6b6b`
  - `--color-border: rgb(245 246 250 / 0.2)`
  - `--color-border-strong: rgb(245 246 250 / 0.38)`
  - `--color-shadow: rgb(1 5 18 / 0.38)`
- **FR-005**: The implementation MUST replace active website color tokens and old palette usages in the current app styles, including the global token definitions, Tailwind theme variables, component classes, CSS modules, gradients, borders, shadows, focus states, and `color-mix()` expressions where they rely on the previous palette.
- **FR-006**: The palette colors MUST be defined as global Tailwind CSS variables and semantic CSS variables in the global stylesheet; components MUST consume semantic token classes or variables.
- **FR-007**: Palette colors MUST NOT be applied through inline styles, scattered arbitrary hex classes, or component-local duplicated color constants.
- **FR-008**: `design.md` MUST explicitly document the new semantic roles, including background, deep background, surface, elevated surface, primary text, muted text, support/accent colors, border, focus, shadow, warning/caution, and CTA usage.
- **FR-009**: The new palette MUST preserve WCAG AA contrast for normal text, large text, focus indicators, controls, navigation, topic cards, sticky guidance cards, and the evaluation CTA.
- **FR-010**: The final design MUST preserve the existing academic cybersecurity scope, Brazilian Portuguese interface copy, English documentation, single-page journey, data-driven content model, responsive behavior, reduced-motion support, and no-new-dependencies rule.
- **FR-011**: The constitution MUST be updated to replace the previous "restrained dark-sky cybersecurity palette with one primary accent color" rule with the new dark neutral palette and three non-neutral support colors.
- **FR-012**: The implementation MUST include a source check for old palette values and direct palette hex usage before completion.
- **FR-013**: `design.md` and the constitution MUST remain aligned after the palette update, with no remaining active rule that requires the old green single-accent palette.

### Key Entities

- **Reference Palette**: The five-color palette supplied by the user and shown in the reference image: Ink Black, Dusk Blue, Rosy Copper, Saffron, and Ghost White.
- **Current Website Palette**: The existing tokenized palette currently documented in `design.md` and defined in `app/globals.css`, centered on deep navy backgrounds, off-white text, green accent, and red danger.
- **Semantic Color Role**: A named purpose for a color, such as page background, surface, elevated surface, primary text, muted text, accent/support, focus, border, shadow, warning/caution, or CTA.
- **Global Tailwind Token**: A globally defined Tailwind CSS color variable or semantic CSS variable consumed by components instead of inline or duplicated color values.
- **Page Region**: A visible part of the single-page journey, including header, hero, topic overview, topic chapters, sticky guidance cards, checklist, final summary, evaluation CTA, acknowledgment, and footer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of active palette hex values are defined in the global token layer, with no component-local duplicate definitions.
- **SC-002**: Searches for the old active palette values return no active app usage after implementation, excluding historical specs or intentional documentation notes.
- **SC-003**: Searches for the new palette hex values return only the global token definition and approved documentation, not scattered component styles.
- **SC-004**: Normal body text and primary controls meet WCAG AA contrast in all major page regions.
- **SC-005**: A reviewer can identify the new palette direction in the constitution and the new palette roles in `design.md` in under 2 minutes without reading source code.
- **SC-006**: At least the required viewport matrix from `design.md` is visually checked for readability, color consistency, focus visibility, and no horizontal overflow.
- **SC-007**: `npm run lint` and `npm run build` complete successfully after implementation, or any unavailable script/failure is reported with exact cause.

## Constitution and Design Amendment Note

The existing constitution and `design.md` describe a restrained dark-sky cybersecurity palette with one primary green accent and reserve red for warning/danger. This feature intentionally changes that direction because the user explicitly requested a new reference palette with three non-neutral support colors.

Planning and implementation must treat this as a deliberate governance and design-system update, not a silent exception. The constitution, `design.md`, and app tokens are all in scope for the palette change.

## Assumptions

- The reference image is authoritative only for the five listed colors and their dark-to-light relationship, not for layout, ads, typography, or page composition.
- Documentation remains English; public website copy remains Brazilian Portuguese.
- Color names from the reference image may be used in documentation for clarity: Ink Black, Dusk Blue, Rosy Copper, Saffron, and Ghost White.
- The implementation should keep existing token names where practical if semantic meaning remains clear, but the final token roles must point to the new palette.
- No new dependency is needed for the palette update.
