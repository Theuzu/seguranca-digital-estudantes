# Feature Specification: Scroll-Expanding Content Section

**Feature Branch**: `[003-scroll-expanding-section]`

**Created**: 2026-06-17

**Status**: Ready for Planning

**Input**: User description: "Make a spec to start building the next section. It needs to appear as a card at the bottom like the reference. It will use a simple scroll animation: as the user scrolls, the card gets bigger and occupies the full screen. The supplied Portuguese text must be centered in the second section. Framer Motion is explicitly requested for the later implementation. Revise the interaction so the initial card is smaller, its bottom corners are square and continue below the viewport, the Hero remains fixed while the card overlaps it, and the text appears earlier."

## Clarifications

### Session 2026-06-17

- Q: How should the card behave while expanding? -> A: The card stays pinned while scroll progress expands it.
- Q: When should the section text appear? -> A: The revised timing starts the fade at 50% expansion and completes it by 70%.
- Q: What should reduced-motion users experience? -> A: The complete full-size section and text appear immediately when the section enters view, with no scaling transition.

### Revision 2026-06-17

- Q: Which card corners are rounded in the initial preview? -> A: Only the two top corners are rounded; the bottom edge remains square, flush with the viewport bottom, and visually continues below it.
- Q: How much smaller should the initial preview be? -> A: It occupies about 10% of the viewport height and uses larger side insets than the current screenshots.
- Q: How should the Hero behave during expansion? -> A: The Hero remains fixed in the viewport while the Content card stays pinned above it and progressively covers it.
- Q: When should the section text now appear? -> A: The text begins fading in at 50% expansion and is fully visible by 70%.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover the Next Section (Priority: P1)

A student viewing the hero can see a shallow preview of the next section at the bottom of the first viewport, making it clear that more content is available without covering too much of the Hero.

**Why this priority**: The visible card creates the transition from the existing Hero into the Content section and gives the page a clear continuation cue.

**Independent Test**: Open the homepage on desktop and mobile and confirm that the next section appears as a shallow, inset card with rounded top corners, square bottom corners, and no visible gap below it.

**Acceptance Scenarios**:

1. **Given** a student opens the homepage, **When** the initial viewport is visible, **Then** a preview approximately 10% of the viewport height appears inset at the bottom of the Hero.
2. **Given** the card is partially visible, **When** the student has not started scrolling, **Then** the existing hero remains the primary first-screen content.
3. **Given** the initial card preview is visible, **When** its shape is inspected, **Then** only its top corners are rounded and its square bottom edge continues beyond the viewport without a visible gap.

---

### User Story 2 - Expand the Card Through Scrolling (Priority: P2)

A student scrolls down while the Hero remains fixed and the Content card stays pinned above it, progressively covering the Hero until the card fills the viewport as the complete second section.

**Why this priority**: The scroll-driven expansion is the defining interaction requested for the transition between sections.

**Independent Test**: Scroll forward and backward through the hero-to-content transition and confirm that the Hero does not move, the card overlaps it, the card reaches a full-viewport state, and the transition reverses predictably.

**Acceptance Scenarios**:

1. **Given** the card is inset at the bottom of the Hero, **When** the student scrolls toward the Content section, **Then** the Hero remains fixed while the card stays pinned above it and grows continuously until it occupies the full viewport.
2. **Given** the card has expanded, **When** the student scrolls back toward the hero, **Then** the card returns toward its inset state without a sudden jump.
3. **Given** the expansion is complete, **When** the Content section becomes the active viewport, **Then** its corners and outer spacing no longer prevent it from visually filling the screen.

---

### User Story 3 - Read the Introductory Guidance (Priority: P3)

A student reaches the expanded section and reads a centered introduction explaining common academic digital-security risks and the practical purpose of the guide.

**Why this priority**: The animation supports the content, but the academic message is the section's actual value.

**Independent Test**: Complete the scroll transition and verify that both supplied paragraphs are present, centered, readable, and unchanged.

**Acceptance Scenarios**:

1. **Given** the card reaches 50% of its expansion, **When** the student continues scrolling, **Then** both required Portuguese paragraphs begin fading into the center in the supplied order and are fully visible by 70% expansion.
2. **Given** the page is viewed on a small screen, **When** the section expands, **Then** the text wraps naturally without clipping or horizontal scrolling.
3. **Given** reduced motion is enabled, **When** the student reaches the section, **Then** the complete full-size section and text appear immediately without scaling.

### Edge Cases

- Very short or narrow viewports must keep the card, transition, and centered text within the visible page without horizontal overflow.
- Fast scrolling or large trackpad movements must not leave the card in a visually broken intermediate state.
- Scrolling backward must restore the inset-card appearance predictably.
- The Hero must not drift, jump, or expose a blank background while the Content card expands over it.
- The initial preview must not expose rounded bottom corners or a strip of page background below the card.
- The section must remain readable when browser text is enlarged.
- Reduced-motion preferences must bypass the continuous transformation and immediately present the complete full-size section and text.
- The Content section must remain understandable if animation does not run.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST add this experience as the second top-level section, mapped to the existing Content section.
- **FR-002**: The Content section MUST first appear as a shallow inset card approximately 10% of the viewport height, with at least 8% horizontal inset on desktop and at least 5% on mobile.
- **FR-003**: The Hero MUST remain fixed in the viewport while the card stays pinned above it and increases in size in direct response to forward scroll progress until it visually occupies the full viewport.
- **FR-004**: The card expansion MUST reverse in response to backward scroll progress.
- **FR-005**: The transition MUST preserve a clear visual relationship between the inset card and the final full-screen section while progressively covering, rather than moving, the Hero.
- **FR-006**: The section MUST center the following text while preserving paragraph order and wording:

  > Durante a faculdade, utilizamos senhas, plataformas acadêmicas, computadores compartilhados, serviços de armazenamento em nuvem e grupos de comunicação. Pequenos descuidos nesses ambientes podem causar perda de arquivos, exposição de informações e conflitos entre estudantes.
  >
  > Este guia apresenta orientações práticas que podem ser aplicadas no dia a dia.

- **FR-007**: The section MUST keep the supplied Portuguese copy readable on mobile, tablet, and desktop viewports.
- **FR-008**: The page MUST NOT introduce horizontal scrolling, clipped copy, or overlapping text during any stage of the transition.
- **FR-009**: The initial card MUST have rounded top-left and top-right corners, square bottom corners, and a bottom edge that is flush with and visually continues below the viewport.
- **FR-010**: The section MUST use clean, purposeful motion that does not delay access to the text or reduce readability.
- **FR-011**: When reduced motion is enabled, the experience MUST bypass card scaling and immediately show the complete full-size section and text when the section enters view.
- **FR-012**: The section copy MUST be owned through a typed content file under `data/` rather than duplicated across presentation code.
- **FR-013**: The existing Hero content and visual identity MUST remain intact and visually stationary behind the overlapping Content card for the full transition.
- **FR-014**: The Conclusion section and its future Google Forms connection MUST remain outside this feature's scope.
- **FR-015**: Project documentation for this feature MUST be written in English while public website copy remains Brazilian Portuguese.
- **FR-016**: Cybersecurity framing MUST remain preventive, practical, and appropriate for students.
- **FR-017**: The section text MUST begin fading in at 50% of card expansion and MUST be fully visible by 70%.

### Key Entities

- **Content Section**: The second top-level page section, initially shown as an inset card and ultimately presented as a full-viewport reading surface.
- **Introductory Copy**: The two supplied Portuguese paragraphs explaining student digital environments, common consequences, and the guide's practical purpose.
- **Scroll Progress**: The visitor's position through the hero-to-content transition, determining how far the card has expanded.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On tested mobile and desktop viewports, a reviewer can identify a shallow next-section preview at the bottom of the initial viewport without scrolling; its visible height stays within 8% to 12% of the viewport.
- **SC-002**: The card reaches a full-viewport presentation by the end of the hero-to-content scroll transition.
- **SC-003**: Forward and backward scrolling produces a continuous, reversible transition with no visible jumps, Hero movement, or blank background exposure.
- **SC-004**: 100% of the supplied Portuguese copy is present, centered, and readable by 70% expansion, with its reveal beginning at 50%.
- **SC-005**: No tested mobile, tablet, or desktop viewport shows horizontal scrolling, clipped copy, or incoherent overlap during the transition.
- **SC-006**: Visitors using reduced-motion settings see the complete full-size section and text immediately upon reaching it, with no scaling transition.
- **SC-007**: A reviewer can recognize the reference image's inset-card-to-full-section composition within five seconds while still identifying the established site theme.
- **SC-008**: At initial load, reviewers see rounded top corners, square bottom corners, and no visible page-background strip beneath the card on every tested viewport.

## Assumptions

- The card is a preview of the Content section itself, not a separate decorative element or navigation control.
- The initial viewport shows a shallow card preview approximately 10% of viewport height, with larger side insets than the current screenshots.
- The Hero and expanding card remain pinned in the same viewport; the card overlaps and progressively covers the Hero.
- The card is visually continuous below the viewport, so only its top corners are rounded in the preview state.
- The introductory copy remains hidden during the first half of expansion, fades in from 50%, and is fully visible by 70%.
- Reduced-motion mode skips both progressive scaling and delayed text reveal.
- The final expanded state fills the viewport visually; additional Content-section material may continue below in later features.
- The exact copy supplied by the user is final for this introductory section.
- Framer Motion is explicitly approved for this feature's later planning and implementation; no other new dependency is approved by this specification.
- The existing Hero remains the first section, and the Conclusion remains the third top-level section.
