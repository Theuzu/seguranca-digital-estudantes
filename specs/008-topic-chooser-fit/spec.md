# Feature Specification: Topic Chooser Fit Refresh

**Feature Branch**: `[008-topic-chooser-fit]`

**Created**: 2026-06-23

**Status**: Draft

**Input**: User description: "Lets improve the \"Escolha um tema\" section. It is not fitting the screen corectly and the cards are too big. Reduce their size to matches the reference, and make the desktop ones a little bit bolder. The text needs to appear at the entire screen. The card should not be cutted, it needs to touch the end of the screen (fisrst 2 pictures). Use the Inline styles with tailwind CSS. Remove the other hover effects, keep only the change of color. The title should be different, the arrows need to be at the last line of the title, do this, use a different color and the pixelated font for it. The entire section needs to be responsive."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scan Full Title and Cards Cleanly (Priority: P1)

A student reaches the topic chooser and can read the full section title and each visible card without cropped text, oversized cards, or broken spacing.

**Why this priority**: The current problem is layout fit. Students must be able to read the section immediately before interaction polish matters.

**Independent Test**: Open the chooser on mobile and desktop and confirm that the full title stays inside the viewport, visible cards are fully readable, and the rail reaches the screen edges without cut cards.

**Acceptance Scenarios**:

1. **Given** the student enters the Content section, **When** the chooser title appears, **Then** the complete title is visible inside the viewport without being cut at the top, sides, or bottom.
2. **Given** the first or last visible card is shown, **When** the rail settles in place, **Then** the card edge aligns with the screen edge or section boundary rather than being unintentionally cropped.
3. **Given** the student scans the visible cards, **When** card titles and descriptions wrap, **Then** the text remains readable without clipping or horizontal page overflow.

---

### User Story 2 - Browse Smaller, Stronger Desktop Cards (Priority: P2)

A student on desktop sees a tighter rail with slightly bolder cards that matches the supplied reference rhythm and leaves more room for the title and surrounding layout.

**Why this priority**: The desktop version currently feels oversized and visually heavy in the wrong places.

**Independent Test**: Compare the desktop chooser against the supplied reference and confirm that the cards are smaller, proportionally stronger, and all visible content still fits the section width.

**Acceptance Scenarios**:

1. **Given** a desktop viewport, **When** the chooser renders, **Then** the cards occupy less width and height than the current version while remaining tall portrait cards.
2. **Given** the desktop rail is visible, **When** the student scans it, **Then** the cards appear slightly bolder through typography, spacing, or surface weight rather than through extra effects.
3. **Given** multiple cards are visible on desktop, **When** the rail is at rest, **Then** the section still communicates that the card row continues horizontally without clipping text or producing body overflow.

---

### User Story 3 - Use Simple Responsive Interaction States (Priority: P3)

A student on mouse, touch, or keyboard can use the topic cards in a responsive layout where the only hover emphasis is the color change and the title ends with a highlighted pixel-font arrow line.

**Why this priority**: The user wants the section visually simplified while keeping the interaction clear across devices.

**Independent Test**: Hover, focus, drag, and tap the chooser on mobile and desktop and confirm that only the color state changes on hover, the title uses the revised two-line treatment, and the layout stays responsive.

**Acceptance Scenarios**:

1. **Given** a pointer-capable device, **When** the student hovers a card, **Then** the card changes color without extra scale, shadow, tilt, or secondary hover effects.
2. **Given** the chooser title is shown, **When** the student reads it, **Then** it uses the approved copy "Explore um tema" and the final line contains the arrow treatment in a contrasting color and pixel-style accent.
3. **Given** a mobile viewport, **When** the student drags or swipes the rail, **Then** the centered-card composition remains readable and no title, card, or indicator element is clipped.

### Edge Cases

- Very long Portuguese titles or descriptions must wrap cleanly without cutting off the first or last line.
- The section title must remain fully visible on short mobile heights and at 200% zoom.
- The first and last card positions must avoid showing a partially chopped card edge that looks like layout breakage.
- If only part of the next card is shown on mobile, that preview must look intentional rather than clipped by missing padding logic.
- Hover-only effects must not be required for touch users to understand the cards.
- The card rail must not create horizontal page scrolling outside the rail itself.
- Focus outlines and indicator controls must remain visible after the card size reduction.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The refresh MUST update the existing topic chooser inside the Content section without changing the Hero or Conclusion top-level sections.
- **FR-002**: The visible heading text MUST change from the current treatment to the Brazilian Portuguese title `Explore um tema`.
- **FR-003**: The heading MUST place the arrow accent on the final line of that title so the final visible line reads as `tema` plus the arrow treatment, rather than showing the arrows on a separate line above it.
- **FR-004**: The arrow accent MUST use a contrasting approved color and a pixel-style display treatment that matches the project's restrained retro direction.
- **FR-005**: The full heading MUST remain visible inside the viewport on supported mobile, tablet, and desktop sizes.
- **FR-006**: The topic rail MUST preserve the existing five-topic order and keep the cards as the section's primary interactive elements.
- **FR-007**: Topic cards MUST be smaller than the current implemented version while preserving a tall portrait-card reading rhythm inspired by the supplied references.
- **FR-008**: Desktop cards MUST feel slightly bolder than the current implemented version through layout and typography adjustments that preserve readability.
- **FR-009**: Card content MUST remain fully readable after the size reduction, including icon, title, description, and focus outline.
- **FR-010**: The first and last rail states MUST align cards with the section edge so the card surface appears to reach the end of the screen instead of looking accidentally cut off.
- **FR-011**: The rail MUST keep horizontal movement contained inside the chooser and MUST NOT create horizontal page-body overflow.
- **FR-012**: The mobile layout MUST preserve one dominant centered card with partial neighboring cards visible, following the supplied mobile reference.
- **FR-013**: The desktop layout MUST preserve a multi-card horizontal rail that matches the supplied desktop rhythm more closely than the current implementation.
- **FR-014**: Hover feedback on cards MUST be limited to color change only.
- **FR-015**: The chooser MUST remove other decorative hover effects, including size change, exaggerated motion, shadow emphasis, or similar secondary hover treatments.
- **FR-016**: Focus and pressed states MAY remain distinct for accessibility, but they MUST stay visually consistent with the simplified interaction direction.
- **FR-017**: The section MUST remain responsive across mobile, tablet, and desktop viewports without clipped title text, clipped card text, or broken card spacing.
- **FR-018**: Public website copy for the chooser MUST remain Brazilian Portuguese, while specification and planning artifacts remain English.
- **FR-019**: Visual choices MUST follow `theme-vibe.md`, keeping the modern educational cybersecurity direction with restrained retro accents.
- **FR-020**: The feature MUST continue using centralized structured topic content rather than duplicating topic copy in presentation markup.
- **FR-021**: The implementation plan for this feature MUST keep the chooser-specific styling inline within the component markup rather than moving this refresh into new global style layers.
- **FR-022**: The feature MUST NOT add new dependencies unless the user explicitly approves them.
- **FR-023**: Existing drag, swipe, keyboard access, and card activation behavior MUST remain compatible with the refreshed layout.

### Key Entities

- **Topic Chooser Section**: The full Content-section area containing the heading, rail, and position feedback for topic selection.
- **Chooser Title**: The section heading, including the final-line arrow accent and its contrasting pixel-style treatment.
- **Topic Rail**: The horizontal card track that controls visible card position and edge alignment.
- **Topic Card**: One clickable topic surface containing icon, title, and simplified description.
- **Rail Edge State**: The first and last resting positions that determine whether cards visually meet the section boundary without accidental cropping.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a 360-pixel-wide mobile viewport, the full title `Explore um tema` is readable without cropped lines, and the final line includes the arrow accent.
- **SC-002**: On a 390-pixel-wide mobile viewport, one dominant card is centered, adjacent cards are partially previewed intentionally, and no visible card surface appears accidentally chopped.
- **SC-003**: On a 1280-pixel-wide desktop viewport, at least four cards are visible with smaller overall card dimensions than the current implementation and without clipped text.
- **SC-004**: On tested mobile, tablet, and desktop viewports, the first and last rail positions show card edges aligned with the section boundary rather than an unintended cut surface.
- **SC-005**: In hover review across all cards, the only persistent hover emphasis is the approved color change.
- **SC-006**: At 200% browser zoom, the title, card text, icons, indicators, and focus outlines remain readable and visible.
- **SC-007**: The page body shows zero horizontal overflow on tested viewports; horizontal movement occurs only inside the topic rail.
- **SC-008**: A visual review confirms that the refreshed section is closer to the supplied references while still matching the site's color system and educational tone.

## Assumptions

- This feature refines the existing chooser behavior and composition rather than replacing the underlying topic set or in-page destinations.
- The current simplified topic copy remains acceptable unless later changed in a separate content-specific request.
- The user-provided request to keep chooser styling inline is treated as an approved implementation constraint for planning.
- The existing dark section direction, icon usage, drag behavior, and mobile indicator concept remain in scope unless they conflict with the new fit and sizing requirements.
- The pixel-style accent applies to the title highlight only, not to paragraph text or card descriptions.
