# Research: Responsive Conclusion Section

## Decision 1: Keep Page Composition Server-Owned

**Decision**: Keep `app/page.tsx` as a Server Component and pass the typed
Conclusion object to one focused Client Component.

**Rationale**: Local Next.js 16 guidance recommends Server Components by
default and a narrow client boundary only where state, effects, or browser
behavior is needed. The Conclusion needs viewport motion and reduced-motion
detection, but the rest of the page does not need to join its client bundle.

**Alternatives considered**:

- Make the full page a Client Component: rejected because it expands hydration
  scope without user value.
- Render the Conclusion entirely on the server with no entrance motion:
  technically simpler, but it would omit requested motion rather than use the
  already installed capability.

## Decision 2: Use Existing Motion for Block-Level Reveals

**Decision**: Use installed Motion primitives inside `ConclusionSection` for
one-time, block-level opacity/vertical reveals lasting at most 300ms, with
`useReducedMotion` switching directly to final states.

**Rationale**: Motion already exists in the project and supports the requested
smooth entry treatment and reduced-motion preference without a new dependency.
Animating whole content groups preserves paragraph readability and keeps motion
under the 350ms requirement.

**Alternatives considered**:

- Reuse `Reveal.tsx`: rejected because its 900ms overlay wipe exceeds the
  feature ceiling and is visually stronger than the requested simple motion.
- Add another animation library: rejected because current capabilities are
  sufficient and dependencies require approval.
- Animate every text line: rejected because it delays reading and conflicts
  with the specification.

## Decision 3: Use Native External Navigation

**Decision**: Render Google Forms as a native anchor in the current tab after a
valid HTTPS Google Forms URL is configured.

**Rationale**: The destination is external, so App Router prefetching and
internal routing provide no benefit. Native navigation preserves expected link
semantics, keyboard behavior, context-menu options, and progressive
enhancement.

**Alternatives considered**:

- Use Next.js `Link`: rejected because this is not an application route.
- Open a new tab: rejected because changing browsing context is unnecessary and
would require clearer user warning.
- Embed the form: rejected because it adds third-party layout/privacy concerns
  and is not needed to meet the direct-entry requirement.

## Decision 4: Model Missing URL as Null

**Decision**: Store `formUrl` as `string | null`, initialized to null. Render a
non-interactive unavailable treatment until a validated URL is supplied.

**Rationale**: Null represents configuration state explicitly and prevents the
literal placeholder, `#`, or an empty URL from becoming a misleading link.

**Alternatives considered**:

- Store `[INSERIR LINK DO GOOGLE FORMS]`: rejected because it could leak into
  an `href`.
- Use `#`: rejected because it navigates without completing the task.
- Hide the CTA: rejected because reviewers need to see the intended layout and
  understand the remaining release dependency.

## Decision 5: Use a Dedicated CSS Module

**Decision**: Put Conclusion layout, surfaces, responsive rules, decorations,
and interactive states in `ConclusionSection.module.css`; reuse global custom
properties and font variables.

**Rationale**: Local Next.js 16 CSS guidance supports CSS Modules for locally
scoped component styles. The layout has enough responsive and pseudo-element
detail to justify a dedicated module, while existing global theme tokens already
provide the palette.

**Alternatives considered**:

- Add all styles to `app/globals.css`: rejected because it increases unrelated
  global coupling.
- Use only inline utilities: rejected because the grid, pseudo-elements,
  interaction media queries, and reduced-motion rules are clearer as scoped
  CSS.

## Decision 6: Nest the Academic Footer in Conclusion

**Decision**: Place a semantic footer at the end of the Conclusion section,
after the thank-you block.

**Rationale**: This matches the second reference's contrasting close, makes the
academic note visually secondary, and preserves one coherent single-page
journey. DOM order remains the required reading order on every viewport.

**Alternatives considered**:

- Create a separate footer route or unrelated page region: rejected because the
  constitution requires one coherent single-page educational journey.
- Keep the academic note inside the evaluation panel: rejected because the user
  explicitly allowed and preferred footer treatment like the reference.
