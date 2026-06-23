# Feature Specification: Update Hero Page

**Feature Branch**: `[002-update-hero-page]`

**Created**: 2026-06-17

**Status**: Draft

**Input**: User description: "Update the hero page and do a few alterations. It needs to be full screen and responsive. The design should follow the reference image. The spec needs to make clear that the fonts and design should copy the design reference, but maintain the texts that are current on the page."

## Clarifications

### Session 2026-06-17

- Q: Which current page text must remain after the hero redesign? -> A: Keep only the current title and subtitle.
- Q: What does fullscreen mean for the hero stage? -> A: The hero stage itself touches all viewport edges.
- Q: How closely should font matching follow the reference? -> A: Add or import font assets if needed for a closer match.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View a Fullscreen Hero (Priority: P1)

A visitor opens the homepage and sees a fullscreen hero stage that fills the first viewport edge-to-edge with the current project title and subtitle clearly presented.

**Why this priority**: The requested alteration is centered on the hero becoming a complete first-screen experience.

**Independent Test**: Open the homepage on desktop and mobile viewports and confirm the hero stage reaches all viewport edges without requiring scroll to understand the page identity.

**Acceptance Scenarios**:

1. **Given** a desktop visitor opens the homepage, **When** the first viewport loads, **Then** the hero stage touches all viewport edges and presents the required current text without clipping.
2. **Given** a mobile visitor opens the homepage, **When** the first viewport loads, **Then** the hero stage touches all viewport edges and the required current text remains readable.

---

### User Story 2 - Match the Reference Design Direction (Priority: P2)

A visitor sees a hero whose layout, typography feel, spacing, and visual hierarchy clearly follow the provided reference image.

**Why this priority**: The user explicitly wants the fonts and design to copy the reference direction while keeping the current page copy.

**Independent Test**: Compare the hero against the reference image and confirm the page uses the same overall composition logic: large centered stage, small top label, strong display title, centered subtitle, and supporting footer accents.

**Acceptance Scenarios**:

1. **Given** the reference image is available, **When** the hero is reviewed, **Then** the layout and visual hierarchy should visibly copy the reference direction.
2. **Given** the hero is reviewed for typography, **When** the current page text is displayed, **Then** the font style, scale, and spacing should copy the reference feel as closely as possible within the project theme.

---

### User Story 3 - Keep Required Current Text (Priority: P3)

A visitor sees the current title and subtitle after the hero redesign, with other label or footer accent text allowed to change or be removed for fit.

**Why this priority**: The update is visual and layout-focused; copy changes are not part of this alteration.

**Independent Test**: Compare the required hero text before and after the update and confirm the title and subtitle remain unchanged.

**Acceptance Scenarios**:

1. **Given** the current homepage contains the title "Seguranca Digital para Estudantes", **When** the hero update is complete, **Then** that title remains unchanged.
2. **Given** the current homepage contains the subtitle "UNIFBV Wyden - Matheus Maranhao", **When** the hero update is complete, **Then** that subtitle remains unchanged.

### Edge Cases

- Very small screens must not cut off the main title or subtitle.
- Wide screens must keep the hero composition centered and intentional instead of stretching text too far.
- The reference-copy direction must not override accessibility, readability, or responsive behavior.
- If exact font matching requires extra font assets or imports, those additions are allowed when they materially improve the reference match.
- Motion must stay simple and must respect reduced-motion preferences.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Site MUST keep the current hero title and subtitle unchanged for the hero update.
- **FR-002**: The hero stage MUST be fullscreen on initial load and touch all viewport edges across supported viewport sizes.
- **FR-003**: The hero MUST be responsive across mobile, tablet, and desktop screens.
- **FR-004**: The hero layout MUST copy the provided reference image direction, including centered composition, oversized display title, centered supporting text, and reference-inspired supporting accents where appropriate, while adapting the stage to touch all viewport edges.
- **FR-005**: The hero font treatment MUST copy the reference image direction as closely as possible, including strong display scale, retro-computing influence, compact label styling, and added or imported font assets when needed for a closer match.
- **FR-006**: The design MUST continue to respect the project theme: educational, trustworthy, modern, approachable, and lightly retro.
- **FR-007**: The design MUST avoid copying reference logos, brand names, or unrelated imagery.
- **FR-008**: The hero MUST include simple, purposeful animation that supports the first-screen presentation without reducing readability.
- **FR-009**: The hero MUST maintain readable contrast for all visible text.
- **FR-010**: The feature MAY add or import font assets when needed to match the reference design more closely; other new dependencies still require explicit user approval.
- **FR-011**: Project documentation for this feature MUST be written in English.

### Key Entities *(include if feature involves data)*

- **Hero**: Fullscreen first viewport containing the required current text and the visual presentation inspired by the reference.
- **Required Current Text**: The existing hero title and subtitle that must remain unchanged during this update.
- **Reference Design**: The provided visual image used as the source for layout, font direction, visual hierarchy, and animation mood, excluding copied logos or unrelated brand content.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The hero stage fills 100% of the first viewport width and height on desktop and mobile test sizes.
- **SC-002**: 100% of required current hero text remains present after the visual update.
- **SC-003**: No tested viewport requires horizontal scrolling to read the hero.
- **SC-004**: A reviewer can identify the reference image influence in layout and typography within 5 seconds.
- **SC-005**: Initial hero animation completes in under 2 seconds and does not block reading.
- **SC-006**: The feature passes the agreed lint and build checks for the project when implemented.

## Assumptions

- "Current page text" means only the current hero title and subtitle for this update.
- The reference image is a visual direction source for layout, font feel, spacing, and composition, not a source for logos or brand-specific content.
- Exact font copying may use added or imported font assets if needed for a closer reference match.
- This update affects only the Hero section; Content and Conclusion remain out of scope for this spec.
- The reference layout should be adapted from an inset rounded stage into a full-bleed stage without losing the reference composition.
