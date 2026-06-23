# Research: Update Hero Page

## Decision: Use full-bleed stage, not inset card

**Rationale**: Clarification says the hero stage itself must touch all viewport edges. The reference composition should be adapted into a full-bleed stage by keeping centered hierarchy, texture, atmospheric background, and strong title scale without outer page padding.

**Alternatives considered**: Inset rounded stage like the source image; rejected because the clarified fullscreen requirement says edge-to-edge.

## Decision: Preserve only title and subtitle

**Rationale**: Clarification chose keeping only the current title and subtitle. Supporting labels, badges, or footer accents may change or be removed when needed for responsive fit.

**Alternatives considered**: Preserve all visible current copy; rejected because it over-constrains the visual redesign.

## Decision: Split title typography

**Rationale**: Use a smooth display treatment for "Seguranca" and a pixel/block display treatment for "Digital para Estudantes" to mirror the reference hierarchy while keeping readability.

**Alternatives considered**: All-pixel title; rejected as more likely to hurt mobile readability. All-smooth title; rejected as weaker reference match.

## Decision: Use `next/font` for font handling

**Rationale**: Local Next docs state `next/font` self-hosts and optimizes fonts. Existing project already uses `Inter`, `Space_Grotesk`, and `Pixelify_Sans`; implementation should start there and add/import a closer font asset only if needed for the reference match.

**Alternatives considered**: External runtime font links; rejected because `next/font` avoids layout shift and external browser font requests.

## Decision: CSS-only animation

**Rationale**: The feature needs simple motion only. CSS keyframes cover entrance, light drift, and texture motion without runtime animation libraries.

**Alternatives considered**: JS animation library; rejected as unnecessary dependency and larger scope.

## Decision: No data model beyond UI contract

**Rationale**: This is a static hero visual update. There are no stored entities, lifecycle states, backend flows, or user input.

**Alternatives considered**: Move hero copy into `data/*.ts`; rejected because the constitution's data-file rule applies to website content topics, and this feature only preserves fixed hero identity text.
