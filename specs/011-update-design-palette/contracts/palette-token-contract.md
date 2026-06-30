# UI Contract: Palette Token System

## Purpose

This contract defines the expected behavior of the updated palette system for
documentation, global Tailwind CSS variables, and current website components.

## Public User-Facing Contract

- The website presents a dark-mode experience.
- Ink Black (`#0E1116`) is the dominant background impression.
- Ghost White (`#F0EFF4`) is the primary readable text impression.
- Dusk Blue (`#374A67`), Rosy Copper (`#DB504A`), and Saffron (`#E3B505`) appear
  as support colors for hierarchy, progression, focus, CTA priority, and
  educational emphasis.
- The palette does not introduce horizontal overflow, unreadable text, hidden
  focus, or color-only meaning.

## Governance Contract

- `.specify/memory/constitution.md` must no longer require the old dark-sky
  palette with one primary green accent.
- `design.md` must define the new palette values and semantic usage roles.
- `design.md` must explicitly require palette values to be centralized in global
  Tailwind CSS variables, not inline component styles.
- The constitution, `design.md`, and `app/globals.css` must describe compatible
  active palette rules.

## Token Contract

The app token layer must satisfy these rules:

- Palette hex values are declared in `app/globals.css`.
- `:root` contains semantic CSS variables for active color roles.
- `@theme inline` maps Tailwind color utilities to semantic CSS variables.
- The final semantic mapping is:
  - `--color-bg` and `--color-bg-deep`: Ink Black background roles.
  - `--color-text`: Ghost White primary text.
  - `--color-text-muted`: muted Ghost White mixed with Dusk Blue.
  - `--color-surface`: derived dark surface mixed from Dusk Blue and Ink Black.
  - `--color-surface-elevated`: Dusk Blue raised surface.
  - `--color-accent`: Saffron focus, progress, and CTA emphasis.
  - `--color-support-blue`: Dusk Blue support/depth utility.
  - `--color-support-copper`: Rosy Copper caution/emphasis utility.
  - `--color-support-saffron`: Saffron support/highlight utility.
  - `--color-danger`: Rosy Copper warning/suspicious-behavior role.
  - `--color-border`, `--color-border-strong`, and `--color-shadow`: tokenized
    mixes derived from the neutral palette.
- Current utilities such as `bg-page`, `bg-page-deep`, `bg-surface`,
  `bg-surface-elevated`, `text-copy`, `text-muted`, `text-accent`,
  `border-line`, and `border-line-strong` remain valid if their semantic role
  still matches the updated palette.
- New support-color utilities may be added for Dusk Blue, Rosy Copper, and
  Saffron when a single `accent` role is not expressive enough.
- Component code must not contain raw palette hex values.

## Component Usage Contract

The implementation must audit and update these current surfaces:

- `app/globals.css`: global token definitions and Tailwind mappings
- `app/components/HeroSection.tsx`: tokenized gradient/decorative usage
- `app/components/SiteHeader.tsx`: header background, border, link, and focus
  usage
- `app/components/TopicChooser.tsx`: topic overview, grid, cards, and hover
  states
- `app/components/TopicDetailSection.tsx`: topic chapter, sticky guidance cards,
  checklist, and progress color usage
- `app/components/ScrollExpandingSection.tsx`: intro card color usage
- `app/components/ConclusionSection.tsx`: JSX token/class usage
- `app/components/ConclusionSection.module.css`: final summary, CTA, grids,
  borders, focus, and hover states

## Validation Contract

Implementation is acceptable only when:

- Old active palette values are not used in app styling.
- New palette hex values are centralized in global tokens and approved docs.
- WCAG AA contrast is met for normal text and primary controls.
- Focus indicators remain visible on dark and support-color surfaces.
- The final evaluation CTA remains visually prominent.
- `npm run lint` and `npm run build` pass, or failures are reported exactly.
