# Feature Specification: Draggable Topic Card Redesign

**Feature Branch**: `[005-draggable-topic-cards]`

**Created**: 2026-06-21

**Status**: Ready for Planning

**Input**: User description: "Improve the styles of the cards and the second section using the supplied desktop and mobile references. Use a primary color, change card color on hover, let users drag the card area with mouse or finger, remove the separate button, make the whole card clickable, add smooth animations, simplify the text, and allow topic icons from a React icon library such as Lucide. Copy the layout idea while adapting colors to the existing design."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover the Interactive Topic Rail (Priority: P1)

A student reaches the topic chooser and immediately recognizes a dark, focused learning area with a horizontal row of tall cards, topic icons, concise copy, and a clear primary-color interaction state.

**Why this priority**: The redesign must first make the available themes easier to scan and visually stronger while remaining part of the existing Content section.

**Independent Test**: Open the chooser on desktop and mobile and confirm that all five themes appear in the supplied order, the section follows the current visual system, and each card is understandable without a separate call-to-action button.

**Acceptance Scenarios**:

1. **Given** the student finishes the scroll-expanding introduction, **When** the topic chooser enters view, **Then** it appears as a dark-surface continuation of the Content section with the heading "Escolha um tema" and a horizontal card rail.
2. **Given** the rail is visible, **When** the student scans the cards, **Then** each card presents one consistent topic icon, one short title, and one simplified description.
3. **Given** no card is being hovered, focused, or pressed, **When** the chooser first appears, **Then** cards share the same neutral visual hierarchy and none is presented as a recommendation.

---

### User Story 2 - Drag Through Topics (Priority: P2)

A student drags the rail horizontally with a mouse or finger, releases it, and sees the nearest card settle smoothly into a stable position.

**Why this priority**: Direct manipulation is the defining interaction requested for the redesigned cards, especially on mobile.

**Independent Test**: Drag the rail forward and backward with pointer and touch input, including fast and slow gestures, and confirm predictable movement, snapping, boundary behavior, and no accidental card activation.

**Acceptance Scenarios**:

1. **Given** more cards exist beyond the visible rail, **When** the student grabs and drags horizontally, **Then** the cards follow the gesture and settle at the nearest valid card position after release.
2. **Given** the student drags across a card, **When** the pointer or finger is released, **Then** the drag does not open that card's destination.
3. **Given** the rail is at its first or last card, **When** the student drags beyond the boundary, **Then** the rail does not reveal an empty end state or become stuck.
4. **Given** a wide viewport fits every card without overflow, **When** the student views the rail, **Then** all cards remain stable and no artificial dragging is required.

---

### User Story 3 - Open a Topic from the Whole Card (Priority: P3)

A student intentionally clicks, taps, or keyboard-activates any non-dragged card and moves to the matching guidance destination within the same Content section.

**Why this priority**: Removing the inner button simplifies the visual hierarchy only if the complete card remains an obvious and accessible navigation target.

**Independent Test**: Activate each card with pointer, touch, Enter, and Space where applicable, then confirm it reaches only its matching destination and exposes a visible focus state.

**Acceptance Scenarios**:

1. **Given** a card is at rest, **When** the student clicks or taps it without dragging, **Then** the matching topic destination opens within the same Content section.
2. **Given** a keyboard user tabs through the rail, **When** a card receives focus, **Then** the whole card shows the same primary-color emphasis used for hover and can be activated from the keyboard.
3. **Given** a pointer-capable device, **When** the student hovers a card, **Then** its surface changes smoothly to the primary interaction color while text and icon remain readable.

### Edge Cases

- A small pointer movement during a click must not be mistaken for a drag, while a clear drag must never activate navigation.
- Fast flicks must settle on a valid card without skipping beyond the first or last item.
- Long translated text or 200% text zoom must not clip titles, descriptions, icons, focus outlines, or card edges.
- The horizontal rail must not create horizontal scrolling on the page body.
- Keyboard focus moving to a partially hidden card must bring that card into a readable rail position.
- Touch devices without hover must still expose clear pressed, focused, and current-position feedback.
- If an icon is unavailable, the card title and description must remain complete and understandable.
- Reduced-motion preferences must remove inertial or animated settling while preserving horizontal navigation and card activation.
- Card destinations must remain unique after titles and descriptions are simplified.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The redesign MUST replace the existing topic-card presentation inside the second top-level Content section without changing the Hero or Conclusion sections.
- **FR-002**: The existing scroll-expanding problem introduction MUST remain the lead-in to the chooser.
- **FR-003**: The chooser MUST keep the visible heading "Escolha um tema".
- **FR-004**: The chooser MUST present exactly five cards in this order with the following simplified public copy:

  1. **Senhas e verificação em duas etapas** — "Use senhas fortes e ative uma camada extra de proteção."
  2. **Cyberbullying e ética digital** — "Comunique-se com respeito e saiba agir diante de abusos."
  3. **Computadores compartilhados** — "Proteja suas contas e arquivos em laboratórios e bibliotecas."
  4. **Trabalhos na nuvem** — "Compartilhe com cuidado e mantenha cópias seguras."
  5. **Golpes e links falsos** — "Reconheça mensagens e oportunidades suspeitas antes de clicar."

- **FR-005**: Every card MUST contain one topic-relevant icon, one title, and one description using a consistent icon style and visual hierarchy.
- **FR-006**: The separate "Ver orientações" control MUST be removed.
- **FR-007**: The complete card surface MUST act as one navigation target for its matching in-page topic destination.
- **FR-008**: Cards MUST NOT contain nested links, buttons, or competing activation targets.
- **FR-009**: The card rail MUST support horizontal dragging with a mouse and horizontal swiping with a finger whenever its content exceeds the visible width.
- **FR-010**: Cards MUST follow the drag gesture and settle to the nearest valid card position after release.
- **FR-011**: A drag gesture MUST NOT activate the card that receives the release event.
- **FR-012**: The first and last cards MUST define the rail boundaries without exposing blank overscroll areas.
- **FR-013**: On pointer hover and keyboard focus, the card surface MUST transition to the site's primary educational blue or an equivalent approved primary treatment.
- **FR-014**: Hover, focus, press, drag, and snap feedback MUST use smooth, purposeful motion that keeps text readable.
- **FR-015**: Motion feedback MUST settle within 350 milliseconds after the student's interaction ends.
- **FR-016**: Reduced-motion users MUST receive immediate state changes and non-animated positioning rather than inertial or animated settling.
- **FR-017**: Desktop layouts MUST show multiple tall portrait cards in one horizontal rail, following the rhythm and proportions of the first reference without copying its brand or colors.
- **FR-018**: Mobile layouts MUST show one dominant centered card with partial neighboring cards visible at the sides, following the composition of the second reference.
- **FR-019**: Mobile layouts MUST include a compact position indicator with one marker per card and a clearly distinguished current marker.
- **FR-020**: Position indicators MUST reflect rail position but MUST NOT introduce a second competing action inside the card.
- **FR-021**: The rail MUST preserve card order on every viewport and provide visual evidence that additional cards exist when not all are visible.
- **FR-022**: Cards MUST support keyboard focus and activation, visible focus indication, pointer input, and touch input.
- **FR-023**: Moving keyboard focus to an off-screen card MUST bring it into a readable position within the rail.
- **FR-024**: The chooser MUST use the existing dark surface, light surface, primary text, secondary text, and educational blue palette with WCAG AA contrast for text and focus states.
- **FR-025**: The chooser MUST preserve the project's modern educational identity with restrained retro influence and MUST NOT copy the reference brand, logo, neon green, or cryptocurrency imagery.
- **FR-026**: Horizontal movement MUST remain contained inside the rail and MUST NOT cause horizontal page-body overflow.
- **FR-027**: Topic titles, descriptions, icon identifiers, ordering, and destination identifiers MUST remain centrally owned as structured content rather than duplicated in presentation markup.
- **FR-028**: The five destination anchors MUST remain in the same Content section and continue matching their respective cards after copy simplification.
- **FR-029**: Detailed guidance copy, new routes, filters, search, authentication, data collection, and Conclusion changes MUST remain outside this feature.
- **FR-030**: Public website copy MUST remain Brazilian Portuguese, and cybersecurity framing MUST stay preventive, practical, and appropriate for students.

### Key Entities

- **Topic Rail**: The horizontally draggable collection that owns card order, visible position, boundaries, and current-position feedback.
- **Topic Card**: A complete interactive destination containing one icon, simplified title, and simplified description.
- **Topic Destination**: The unique in-page anchor associated with one topic card inside the Content section.
- **Rail Position Indicator**: The mobile marker group showing the current snapped card among the five topics.
- **Interaction State**: A card's neutral, hovered, focused, pressed, dragged, or settled presentation state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All five simplified topics appear once, in the approved order, with one consistent icon and no separate CTA button.
- **SC-002**: On a 390-pixel-wide viewport, the dominant card occupies 78% to 86% of the available width, both sides communicate neighboring content where available, and five position markers are visible.
- **SC-003**: On a 1280-pixel-wide viewport, at least four cards are visible at once without card-text clipping or horizontal page-body scrolling.
- **SC-004**: In ten drag attempts across mouse and touch input, every gesture moves the rail, settles on a valid card within 350 milliseconds, and causes zero unintended navigations.
- **SC-005**: In ten click or tap attempts performed without dragging, every selected card reaches its matching destination.
- **SC-006**: All five cards are reachable and activatable by keyboard, and each focused card is fully readable with a visible focus state.
- **SC-007**: Hover and focus apply the approved primary-color state to 100% of cards while maintaining WCAG AA text contrast.
- **SC-008**: Reduced-motion mode presents immediate color changes and stable rail positioning without inertial or animated settling.
- **SC-009**: At 200% browser zoom and on tested mobile, tablet, and desktop viewports, no card content, icon, focus outline, or position indicator is clipped.
- **SC-010**: The page body shows zero horizontal overflow on all tested viewports; horizontal movement occurs only inside the topic rail.
- **SC-011**: In a five-person review, at least four students recognize within five seconds that the rail can be dragged and that the entire card can be opened.
- **SC-012**: A visual review recognizes the references' tall-card rail and mobile centered-card composition while still identifying the existing site's colors, typography, and educational tone.

## Assumptions

- This feature supersedes the static grid, button-based activation, and no-animation constraints from feature 004 only for the topic-card chooser.
- The five existing in-page destinations remain the activation result; detailed guidance remains separate work.
- The educational blue is the default primary interaction color; planning may adjust the exact shade only to preserve contrast within the existing palette.
- On very wide screens where every card fits, the rail may remain stationary because no hidden content exists to drag.
- Mobile position markers are status indicators rather than required navigation controls.
- Icons reinforce topic recognition but do not replace titles or descriptions.
- Use of one consistent icon library is explicitly approved; final library selection and icon mapping belong to planning.
- Existing animation and smooth-scroll capabilities may be reused when appropriate; no unrelated dependency is approved.
- The chooser remains part of the current one-page Hero, Content, and Conclusion structure.
