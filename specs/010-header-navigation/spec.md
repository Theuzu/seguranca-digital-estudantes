# Feature Specification: Header Navigation

**Feature Branch**: `[010-header-navigation]`

**Created**: 2026-06-30

**Status**: Draft

**Input**: User description: "Create a spec about a header for the project. Divide the website in parts following the constitution. look into the reference https://appycamper.com/ and create a similar style header, with the topics division of the website. Create a scrolling animation to hit the choosen location on the page, using motion."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand and Use the Site Map (Priority: P1)

A student arrives at the site and uses the header to understand the main parts of the single-page educational journey: introduction, topics, and evaluation.

**Why this priority**: The header is the main orientation layer for a long educational page. It must make the site feel organized without turning it into a multi-page app.

**Independent Test**: Open the page at the top and confirm the header identifies the project, exposes the main page parts, and makes the evaluation action visible without reading the whole page first.

**Acceptance Scenarios**:

1. **Given** the student opens the first viewport, **When** they inspect the header, **Then** they see the project identity and direct navigation to the topic area, project context, and evaluation.
2. **Given** the student wants to evaluate the project, **When** they use the header's evaluation action, **Then** they are taken to the final evaluation area without needing to manually scroll through all chapters.
3. **Given** the student is scanning the site structure, **When** they activate the topics navigation, **Then** the five cybersecurity topics are discoverable in their educational order.

---

### User Story 2 - Navigate Directly to a Topic (Priority: P2)

A student chooses one of the five cybersecurity topics from the header or topic navigation panel and lands at the matching chapter without losing context.

**Why this priority**: The constitution requires all five topics to be directly discoverable and navigable. Topic navigation also makes the long page easier to use during presentation and review.

**Independent Test**: From the header, select each topic destination and verify the page lands on the correct chapter with its title, number, and problem section visible below the header.

**Acceptance Scenarios**:

1. **Given** the student opens the topics navigation, **When** they choose "Senhas e autenticação em duas etapas", **Then** the page scrolls to Topic 01 and the chapter heading is visible.
2. **Given** the student chooses Topic 05, **When** the scroll completes, **Then** "Golpes de estágio, cursos e links falsos" is visible and not hidden behind the header.
3. **Given** the student has reduced motion enabled, **When** they choose a topic, **Then** the location change happens without a decorative smooth-scroll animation while preserving the same destination.

---

### User Story 3 - Stay Oriented While Reading (Priority: P3)

As the student scrolls through the page, the header remains visually quiet but shows enough state to confirm which part of the journey they are reading.

**Why this priority**: The AppyCamper-inspired direction depends on editorial pacing, large sections, and numbered progression. The header should reinforce progression without competing with content.

**Independent Test**: Scroll through the introduction, topic overview, all topic chapters, final summary, and evaluation CTA; confirm the header remains usable, readable, and context-aware.

**Acceptance Scenarios**:

1. **Given** the student scrolls away from the hero, **When** the header passes over content, **Then** it gains enough contrast and separation to remain readable.
2. **Given** the student reaches a topic chapter, **When** the active location is indicated, **Then** the state communicates the current topic or page part without relying only on color.
3. **Given** the page is viewed on mobile, **When** the header is used, **Then** the compact navigation remains accessible and does not create a complex full-screen menu.

---

### Edge Cases

- Header links must not obscure anchor targets, especially topic titles and the evaluation CTA.
- The header must remain usable at 200% browser zoom without overlapping content or clipping labels.
- Keyboard users must be able to open and close any compact topics panel, move through links, and return focus to the trigger.
- Reduced-motion users must receive direct, readable navigation without long animated scrolling.
- Long Portuguese topic titles must wrap or abbreviate intentionally on small screens without hiding the destination meaning.
- If current-location detection is unavailable or delayed, all links must still work as plain anchor navigation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The header MUST present public-facing labels in clear Brazilian Portuguese.
- **FR-002**: The header MUST preserve the single-page educational journey and MUST NOT introduce separate routes for the topics.
- **FR-003**: The header MUST divide the website into the page parts defined by the constitution and `design.md`: project introduction, topic overview, five topic chapters, final summary/evaluation, acknowledgment, and footer.
- **FR-004**: The primary desktop header structure MUST include the project identity, a topics entry point, a project/about entry point, and a visually prioritized evaluation action.
- **FR-005**: The topics entry point MUST expose all five data-driven topics in their existing educational order.
- **FR-006**: Topic labels and destination metadata MUST be sourced from the existing topic content model whenever practical, instead of duplicating the five topic names in unrelated header-only content.
- **FR-007**: Selecting a header destination MUST move the visitor to the matching page location and leave the destination heading or region visible below the header.
- **FR-008**: Destination regions MUST provide sufficient header offset so the sticky or fixed header does not cover headings, focus outlines, or primary CTA text.
- **FR-009**: Pointer-based navigation MAY use smooth scroll animation, but the same destinations MUST remain functional without animation.
- **FR-010**: Reduced-motion preferences MUST disable decorative smooth-scroll behavior and any nonessential header motion while keeping all navigation available.
- **FR-011**: The header MUST provide visible focus states for every interactive item.
- **FR-012**: Any compact mobile topics panel MUST close with Escape, support keyboard navigation, and return focus to the opening control after closing.
- **FR-013**: The mobile header MUST remain compact and MUST NOT become a complex full-screen navigation unless explicitly approved later.
- **FR-014**: The evaluation action MUST be visually stronger than secondary navigation and MUST clearly lead to the academic evaluation form area.
- **FR-015**: The header MUST be visually inspired by the AppyCamper reference through quiet fixed navigation, editorial spacing, strong section labels, and numbered progression, but MUST NOT copy AppyCamper branding, assets, source code, exact composition, or illustrations.
- **FR-016**: The header MUST remain readable after the hero by using sufficient background contrast and a subtle separator.
- **FR-017**: The header MUST not use large blur layers, excessive neon effects, dashboard-style widgets, or hover-only essential information.
- **FR-018**: Header interactions MUST preserve the page's academic and responsible cybersecurity tone.
- **FR-019**: The header MUST not add authentication, user accounts, backend behavior, analytics requirements, or new external service integrations.
- **FR-020**: The feature MUST comply with applicable hard constraints in `design.md`, including accessibility, responsive behavior, design tokens, reduced motion, and scroll-to-section behavior.

### Key Entities *(include if feature involves data)*

- **Header Navigation**: Persistent or sticky orientation layer containing project identity, page-part navigation, topic access, active-location feedback, and evaluation action.
- **Page Part**: A navigable region of the single-page journey, including hero/introduction, project context, topic overview, each topic chapter, final summary, evaluation CTA, acknowledgment, and footer.
- **Topic Destination**: One of the five data-driven cybersecurity chapters, identified by number, title, short label, and anchor target.
- **Evaluation Destination**: The final academic evaluation area that leads students to the Google Forms response flow.
- **Navigation State**: The visible indication of the current page part or current topic while the student scrolls.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of tested desktop and mobile viewports show the project identity and at least one clear path to topics or evaluation in the header.
- **SC-002**: A reviewer can reach each of the five topic chapters from the header or its topics panel in no more than two interactions.
- **SC-003**: After activating any topic, project/about, or evaluation destination, the target heading or primary region is visible and not covered by the header in 100% of tested viewports.
- **SC-004**: Keyboard-only navigation can reach every header link, open and close any compact panel, and continue into page content without a trap.
- **SC-005**: With reduced motion enabled, all header navigation reaches the same destinations without decorative smooth-scroll animation.
- **SC-006**: At 200% browser zoom, the header remains usable and does not require horizontal page scrolling on the required test viewports.
- **SC-007**: The evaluation action is identifiable as the primary header action by at least one non-color visual cue such as placement, shape, label, or icon.
- **SC-008**: Visual review confirms the header uses an original project style and does not copy AppyCamper branding, artwork, exact layout, or source-specific assets.

## Assumptions

- The header labels shown to students will be Brazilian Portuguese, while this specification remains in English.
- The current single-page information architecture from `design.md` is the source of truth for page divisions.
- The five cybersecurity topics already exist in project content data and remain in the current order.
- The mobile "Temas" control may either jump to the topic overview or open a small accessible topics panel; the planning phase can choose the smaller implementation that satisfies the user experience.
- Smooth scrolling is an enhancement for pointer users, not a requirement for understanding the page.
- The existing approved motion system can be reused during implementation without adding a new animation dependency.
- AppyCamper is used only as a design-principle reference for quiet fixed navigation, editorial rhythm, and numbered progression.
