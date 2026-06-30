# Research: Update Design Palette

## Decision: Amend constitution and design spec before app styles

The implementation will update `.specify/memory/constitution.md` and
`design.md` before changing application styles.

**Rationale**: The current constitution still requires a restrained dark-sky
palette with one primary accent color, while the clarified feature requires a
dark neutral palette with three non-neutral support colors. Updating governance
first prevents the implementation from knowingly violating project rules.

**Alternatives considered**:

- Update only `design.md`: rejected because the constitution has higher
  precedence and would keep an active conflict.
- Document the conflict without changing governance: rejected because the user
  selected constitution update as in-scope during clarification.

## Decision: Keep Tailwind v4 CSS-first token architecture

The palette will be defined in `app/globals.css` using `:root` semantic CSS
variables and `@theme inline` Tailwind mappings.

**Rationale**: The current app already uses Tailwind v4 through
`@import "tailwindcss"` and `@theme inline`. Local memory and the current
stylesheet confirm this repo does not need a `tailwind.config.*` file for the
active token layer.

**Alternatives considered**:

- Add `tailwind.config.*`: rejected because the project is already working with
  Tailwind v4 CSS-first theme tokens.
- Use component-local constants: rejected because the spec explicitly requires
  global Tailwind CSS variables.
- Use inline hex styles: rejected because it would make palette validation and
  future changes harder.

## Decision: Preserve semantic token names where their meaning remains clear

Existing token names such as `--color-bg`, `--color-text`, `--color-accent`,
`--color-border`, and Tailwind utilities such as `bg-page`, `text-copy`,
`text-muted`, and `border-line` should remain unless a new role is required.
New support-role aliases may be added for Dusk Blue, Rosy Copper, and Saffron.

**Rationale**: Keeping stable semantic names limits churn in the current
components and keeps the feature focused on palette behavior, not a redesign.
The important change is the color value and role mapping, not renaming every
class.

**Alternatives considered**:

- Rename all color utilities to reference color names: rejected because it
  increases churn and couples components to palette names instead of roles.
- Keep only one `--color-accent`: rejected because the feature requires three
  non-neutral support colors.

## Decision: Treat Rosy Copper as caution/support, not global danger

Rosy Copper (`#DB504A`) will be documented as a warm support color for emphasis,
caution, suspicious-link cues, and selected high-priority accents, while not
being used as decoration everywhere.

**Rationale**: The color resembles a red warning tone, but the requested
palette makes it one of the three support colors. A role distinction avoids
turning the whole UI into a warning state while still preserving useful danger
semantics.

**Alternatives considered**:

- Use Rosy Copper as the only danger token: rejected because the feature asks
  for support colors beyond error states.
- Keep the old red danger color: rejected unless implementation finds a
  contrast/accessibility need and documents it, because the spec asks to remove
  old active brand colors.

## Decision: Use Saffron for emphasis and CTA highlights with contrast checks

Saffron (`#E3B505`) should be used for progress, CTA emphasis, focus details,
small markers, or high-visibility accents, but not as long-form text on light
surfaces.

**Rationale**: Saffron is bright and expressive, but it can fail contrast in
the wrong pairing. It works best as a support color against Ink Black or as a
small visual priority marker.

**Alternatives considered**:

- Use Saffron as body text: rejected because it risks readability and contrast.
- Reserve Saffron only for decoration: rejected because the reference palette
  needs visible support-color presence.

## Decision: Keep Next.js styling in global CSS, CSS Modules, and existing components

The update will not add providers, runtime theme switching, or new client
components.

**Rationale**: Local Next docs confirm global CSS should be imported at the app
root for truly global styles, Tailwind utilities should handle most component
styling, and CSS Modules are appropriate for scoped custom CSS. Server and
Client Component docs reinforce avoiding new client boundaries for CSS-only
work.

**Alternatives considered**:

- Add a theme provider: rejected because there is only one required dark theme.
- Move palette logic into JavaScript: rejected because CSS variables already
  solve the requirement without runtime work.
