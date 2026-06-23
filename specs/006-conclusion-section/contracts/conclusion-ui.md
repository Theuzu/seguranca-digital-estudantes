# UI Contract: Responsive Conclusion Section

## Composition Contract

`app/page.tsx` renders exactly this top-level order:

1. Hero
2. Content (`ScrollExpandingSection` and its current children)
3. Conclusion (`ConclusionSection`)

Conclusion contains this DOM and reading order:

1. Finalization label and main heading
2. Two closing paragraphs
3. Evaluation heading, two paragraphs, and one form action
4. Thank-you heading and two paragraphs
5. Nested academic footer note

CSS may create desktop columns but must not reorder these groups.

## Content Contract

- Component receives one serializable `ConclusionContent` prop.
- Every visible string and the Google Forms destination come from
  `data/conclusion.ts`.
- Presentation markup contains no duplicate fallback copy.
- Exact pt-BR strings follow `spec.md` FR-002 through FR-011.

## Google Forms Contract

### Configured State

- Render a native anchor labeled `Responder ao formulário`.
- `href` is an absolute HTTPS URL hosted by supported Google Forms domains.
- Navigation uses the current tab.
- Link supports pointer activation, Enter activation, context menu, and visible
  keyboard focus.
- Site performs no submission, tracking, validation, or success confirmation.

### Pending State

- Render the CTA's layout-preserving unavailable presentation.
- Expose `aria-disabled="true"`.
- Render no `href`, click handler, fake `#` destination, or placeholder URL.
- Visual treatment clearly differs from enabled hover/focus states.

## Responsive Contract

### Mobile (390x844 baseline)

- 24px minimum inline page padding.
- One-column DOM order.
- Heading wraps without overflow.
- Evaluation action remains full-label readable and at least 44px tall.
- Footer note wraps within viewport.

### Tablet (768x1024 baseline)

- Content may use wider measures but must stack if columns would compress body
  copy.
- Evaluation action never overlaps copy.

### Desktop (1280x720 baseline)

- Container uses up to 48px inline padding and never exceeds 1440px.
- Closing and evaluation groups may use the 12-column rhythm from
  `theme-vibe.md`.
- Paragraph measures remain readable; empty decorative space is allowed and
  intentional.

### Zoom

- At 200%, layout reflows without content loss, control clipping, overlap, or
  body-level horizontal scrolling.

## Motion Contract

- Animate only closing, evaluation, and thank-you groups as whole blocks.
- Maximum translate distance: 16px.
- Maximum duration: 300ms entrance, 250ms interaction.
- Each block reveals once; no scroll-linked motion loop.
- Reduced motion shows final state immediately with no transform or stagger.
- Footer content does not require entrance animation.

## Accessibility Contract

- Conclusion uses a semantic section named by its `h2`.
- Evaluation and thank-you headings form a logical subordinate hierarchy.
- Academic note uses a semantic footer inside Conclusion.
- Decorative symbols use `aria-hidden="true"`.
- Enabled CTA meets WCAG AA contrast and has a visible focus outline.
- Interactivity never depends on hover alone.
- No heading, paragraph, or action is hidden until animation completes.

## Visual Contract

- Use existing cloud gray, light surface, dark surface, primary text, secondary
  text, and educational blue tokens.
- Use Space Grotesk for major headings, Inter for body copy, and Silkscreen only
  for compact labels or marks.
- Adapt references' editorial spacing, large heading, rounded CTA panel, and
  contrasting close.
- Do not reproduce reference branding, logos, client rows, side badges,
  navigation, neon/cyberpunk motifs, or unrelated content.

