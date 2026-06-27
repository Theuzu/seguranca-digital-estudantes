# Implementation Plan: Responsive Conclusion Section

**Branch**: `[006-conclusion-section]` | **Date**: 2026-06-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/006-conclusion-section/spec.md`

## Summary

Add the third and final top-level Conclusion after the current Content flow. A
typed `data/conclusion.ts` module owns all pt-BR closing copy and the nullable
Google Forms URL. A focused `ConclusionSection` Client Component renders the
closing message, evaluation callout, thank-you block, and nested academic
footer; it uses the installed Motion package only for short block-level
entrance transitions and reduced-motion handling. A scoped CSS Module adapts
the references' spacious editorial close and contrasting footer to the current
palette, typography, container, accessibility, and responsive rules. No route,
backend, global theme rewrite, or dependency is required.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.6

**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, Tailwind CSS 4,
Motion 12.40.0; existing Lenis, React Icons, and font setup remain unchanged

**Storage**: Immutable build-time Conclusion content in `data/conclusion.ts`;
no persistent, remote, or user-submitted data

**Testing**: `npm run lint`, `npm run build`, `git diff --check`, source checks,
and browser validation at 390x844, 768x1024, and 1280x720 plus 200% zoom,
keyboard use, reduced motion, contrast, external-link behavior, and body
overflow

**Target Platform**: Static App Router presentation page in modern mobile and
desktop browsers

**Project Type**: Next.js academic website

**Performance Goals**: Conclusion content exists in initial HTML; block-level
entrance motion completes in 300 milliseconds or less; no layout shift,
scroll-triggered state loop, form script, or external resource is introduced

**Constraints**: pt-BR public copy; English docs; approved single-page
narrative architecture; content in `data/*.ts`; Google Forms via direct external link only;
placeholder must not navigate; WCAG AA; 24px mobile and 48px desktop inline
container padding; simple motion no longer than 350ms; no new dependency;
existing Hero and Content behavior preserved

**Scale/Scope**: One typed content object, one focused component, one scoped CSS
Module, one page-composition change, one external URL, and no backend or runtime
data flow

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- **Website/docs language split**: Exact user-facing copy remains pt-BR in
  `data/conclusion.ts`; all Feature 006 documents remain English.
- **Single-page narrative architecture**: `app/page.tsx` composes the
  conclusion/evaluation flow once after the current educational journey without
  adding new routes, modals, or unrelated page regions. The academic footer stays
  nested inside the ending flow.
- **Data-driven topic content**: `data/conclusion.ts` owns label, headings,
  paragraphs, CTA label, nullable form URL, thank-you copy, and footer note.
- **Design compliance**: Cloud gray/light surfaces support the editorial body,
  educational blue distinguishes the evaluation callout, dark surface closes
  the page, Space Grotesk handles display copy, Inter handles paragraphs, and
  Silkscreen is limited to the small uppercase label/retro mark. The result
  keeps the 80/20 modern-retro balance.
- **Accessible motion**: Motion applies one short opacity/vertical transition to
  each major content block, never to individual paragraph lines. Duration is
  300ms or less; `useReducedMotion` removes transforms and delays.
- **Next.js discipline**: Checked local Next.js 16 guides for Server and Client
  Components, CSS, Linking and Navigating, and Accessibility. `app/page.tsx`
  stays a Server Component; only the motion-bearing Conclusion is a Client
  Component; a native anchor handles the external Google Forms destination;
  scoped styling uses a CSS Module.
- **Dependency restraint**: No dependency is added. Installed Motion and native
  HTML/CSS cover all behavior.
- **Google Forms scope**: A validated HTTPS Google Forms URL produces one native
  external link. A null placeholder produces a visible disabled state. No form
  is embedded, proxied, submitted, tracked, or stored by the site.
- **Responsible cybersecurity framing**: Supplied copy reinforces defensive
  habits, verification, account safety, and respectful digital conduct without
  operational abuse instructions.

## Project Structure

### Documentation (this feature)

```text
specs/006-conclusion-section/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- conclusion-ui.md
|-- spec.md
|-- checklists/
|   |-- requirements.md
|-- tasks.md                       # created by /speckit-tasks
```

### Source Code (repository root)

```text
app/
|-- page.tsx                       # append conclusion/evaluation flow
|-- components/
|   |-- ConclusionSection.tsx      # new focused motion/semantic boundary
|   |-- ConclusionSection.module.css # new responsive component styling

data/
|-- content.ts                     # existing Content data, unchanged
|-- conclusion.ts                  # new typed Conclusion copy and form URL
```

**Structure Decision**: Keep `app/page.tsx` as the Server Component composition
root and add Conclusion after the existing Content wrapper. Put all new public
copy and form configuration in `data/conclusion.ts`. Use one Client Component
because viewport entrance motion and reduced-motion detection require client
capabilities; keep its props serializable. Use a CSS Module for component-owned
grid, panel, footer, responsive, focus, and decorative styles instead of adding
Conclusion selectors to `app/globals.css`. Do not modify `Reveal.tsx`: its
900ms wipe effect exceeds this feature's 350ms ceiling and its broad visual
treatment does not match the requested simple close.

## Implementation Design

- Define a closed `ConclusionContent` type with `id`, label, title, fixed
  two-paragraph tuples, evaluation group, thank-you group, and footer note.
- Represent the pending Google Forms destination as `formUrl: null`; replace it
  with an approved absolute HTTPS `docs.google.com/forms` or `forms.gle` URL
  before release. Never ship the literal placeholder as an `href`.
- Render one semantic `<section id="conclusao">` with a labeled `h2`, then
  grouped closing, evaluation, and thank-you blocks. Render one contextual
  `<footer>` at the section end for the academic-purpose note.
- Render the CTA as a native `<a>` only when `formUrl` is valid. While null,
  render the same visual treatment as non-interactive text with
  `aria-disabled="true"` and a clear unavailable state; do not create a broken
  link or fake button.
- Keep external navigation in the current tab. This avoids an unexpected new
  browsing context and needs no custom new-tab warning. Do not use Next.js
  `Link` for an external Google Forms URL.
- Use a light editorial body with large Space Grotesk heading and restrained
  Silkscreen label. Split closing title/copy across the desktop grid and stack
  them in DOM order on narrower layouts.
- Use an educational-blue rounded evaluation panel with its copy grouped on the
  left and a high-contrast pill action on the right. Collapse to a vertical
  panel when available width would reduce readable line length.
- Give the thank-you block clear breathing room and a quieter hierarchy after
  the action. Finish with a dark-surface footer carrying the academic-purpose
  note and one decorative retro mark hidden from assistive technology.
- Follow the existing maximum 1440px container with 48px desktop and 24px
  mobile inline padding. Use fluid type and spacing while preserving readable
  paragraph measures.
- Animate only the three major body blocks as units with opacity and at most
  16px vertical movement, once on viewport entry, with 250-300ms transitions.
  The footer may appear statically. Reduced motion renders final states
  immediately with no translation or stagger.
- Keep CTA hover/focus/active transitions at 250ms or less. Provide a
  three-pixel visible focus outline with sufficient offset and contrast.
- Add no images, logos, client strips, badges, extra navigation, tracking,
  analytics, or embedded third-party scripts from the references.

## Complexity Tracking

No constitution violation. Existing packages, static content, a narrow Client
Component, native external navigation, and scoped CSS cover the feature.
