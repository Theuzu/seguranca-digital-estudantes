# UI Contract: Header Navigation

## Purpose

Define the expected behavior for the responsive site header, topic panel,
anchor navigation, and reduced-motion fallback.

## Public Labels

Student-facing visible labels are Brazilian Portuguese:

- Project identity: `Segurança Digital`
- Topics trigger: `Temas`
- About/project link: `Sobre`
- Evaluation action: `Avaliação`

Topic labels must come from the existing topic data and preserve their current
educational order.

## DOM and Semantics

- Header is a landmark or labeled site navigation region.
- Project identity links to the top or hero destination.
- Page-part and topic destinations are anchors.
- The compact topics control is a button when it opens/closes a panel.
- The compact topics panel exposes links, not buttons, for topic destinations.
- The evaluation header action links to the in-page evaluation region.
- A skip link remains available before or near the header and reaches main
  content.

## Destinations

Required fragment targets:

| Destination | Expected target |
|---|---|
| Top/project identity | Hero or page top |
| Sobre | Project introduction/content intro region |
| Temas | Topic overview or topics panel |
| Topic 01 | `#senhas-autenticacao` |
| Topic 02 | `#cyberbullying-etica` |
| Topic 03 | `#computadores-compartilhados` |
| Topic 04 | `#trabalhos-na-nuvem` |
| Topic 05 | `#golpes-links-falsos` |
| Avaliação | `#conclusao` or a more specific evaluation target inside it |

All targets must use scroll offsets so their heading or primary content is not
hidden by the sticky/fixed header.

## Desktop Behavior

- Header height is no more than 72px.
- Header aligns to the page grid/gutter.
- Initial hero state may be transparent or quieter.
- Scrolled state uses enough opaque/dark contrast and a subtle bottom divider.
- Desktop exposes project identity, `Temas`, `Sobre`, and primary `Avaliação`.
- The primary evaluation action is visually stronger than secondary links.
- Active state may show current topic/page part through underline, `03 / 05`,
  or another non-color-only cue.

## Mobile Behavior

- Header remains compact: project identity plus `Temas` control at minimum.
- `Temas` opens a small accessible panel with the five topic links and, if
  space allows, the evaluation action.
- Touch targets are approximately 44px or larger.
- The panel closes when a destination is chosen.
- Escape closes the panel and returns focus to the `Temas` trigger.
- The design must not become a complex full-screen menu.

## Motion Contract

- Native hash navigation is the baseline.
- Smooth scrolling is allowed for pointer activation only as enhancement.
- Reduced-motion mode disables decorative smooth-scroll and nonessential header
  transitions.
- Header transitions use opacity/transform/color changes only; no layout,
  large blur, or expensive shadow animation.
- Essential content and destination reachability must not depend on Motion or
  Lenis.

## Accessibility Contract

- Keyboard-only users can reach every visible header control and link.
- Focus state is visible and at least as clear as hover state.
- Focus is not hidden beneath the sticky header after anchor navigation.
- The topics panel announces expanded/collapsed state through accessible button
  semantics.
- The current location cue does not rely on color alone.
- At 200% zoom, labels wrap or collapse intentionally without horizontal page
  overflow.
- If active-state observation fails, the header remains fully navigable.

## Failure-Safe Behavior

- Without JavaScript, links still navigate to existing fragment targets.
- Without Motion, content and links remain visible with no opacity-zero trap.
- If Lenis smooth scrolling is unavailable, browser scrolling still reaches the
  same destinations.
- If a destination ID is missing during implementation, validation fails.
