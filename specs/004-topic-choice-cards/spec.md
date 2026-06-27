# Feature Specification: Content Topic Choice Cards

**Feature Branch**: `[004-topic-choice-cards]`

**Created**: 2026-06-18

**Status**: Ready for Planning

**Input**: User description: "Define the content portion of the website's second section. Preserve the simplified problem statement already shown in the scroll-expanding frame, then present five student cybersecurity themes as interactive cards with buttons. Base the layout on the supplied editorial and card references while following the current website theme. Do not define animation, icons, illustrations, or decorative elements."

## Clarifications

### Session 2026-06-18

- Q: Where should each "Ver orientações" control lead? → A: To the matching guidance within the same Content section.
- Q: What must each guidance destination contain in this feature? → A: Only the matching theme heading and anchor; detailed guidance comes later.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the Problem and Next Step (Priority: P1)

A student finishes the scroll-expanding introduction, understands that everyday academic tools can expose accounts, files, personal information, and peer relationships, then immediately sees a clear invitation to choose a relevant theme.

**Why this priority**: The topic cards only make sense when the existing problem statement and the new choice are perceived as one continuous learning flow.

**Independent Test**: Read the expanded introduction and continue into the topic chooser. Confirm that the original problem statement remains unchanged, is not unnecessarily repeated, and leads directly to the heading "Escolha um tema".

**Acceptance Scenarios**:

1. **Given** the student reaches the expanded Content section, **When** the introductory text is visible, **Then** the two existing paragraphs present the problem and practical purpose in their original order and wording.
2. **Given** the student continues past the introduction, **When** the next content group enters view, **Then** "Escolha um tema" clearly identifies the next action without requiring instructions or prior cybersecurity knowledge.
3. **Given** the introduction and chooser are viewed together, **When** the student scans the section, **Then** they read as one continuous educational-journey flow rather than unrelated page regions.

---

### User Story 2 - Compare the Available Themes (Priority: P2)

A student scans five text-first cards, compares their titles and descriptions, and identifies the theme most relevant to their current concern.

**Why this priority**: The feature's core value is turning a broad digital-security problem into five clear, practical entry points.

**Independent Test**: Review the chooser on desktop and mobile and confirm that all five cards use the supplied copy, preserve equal visual importance, and can be understood without icons or illustrations.

**Acceptance Scenarios**:

1. **Given** the chooser is visible, **When** the student scans the cards, **Then** all five supplied themes appear once, each with its matching description and a "Ver orientações" control.
2. **Given** no theme has been chosen, **When** the cards first appear, **Then** none is visually presented as the default, recommended, or most important choice.
3. **Given** the cards are viewed at different screen sizes, **When** their layout changes, **Then** their reading order remains the same as the supplied content order.

---

### User Story 3 - Open the Chosen Guidance (Priority: P3)

A student uses the control inside a card to move to the reserved destination for that card's theme farther down the same Content section.

**Why this priority**: Cards must demonstrate the intended in-page navigation without expanding this sketch into the full guidance experience.

**Independent Test**: Activate each "Ver orientações" control using pointer and keyboard input and confirm that it leads to the matching destination heading and unique in-page anchor.

**Acceptance Scenarios**:

1. **Given** a student chooses a card, **When** they activate "Ver orientações", **Then** the page moves to the matching theme heading and anchor within the same Content section and not another theme.
2. **Given** a student navigates by keyboard, **When** focus reaches a card control, **Then** focus is clearly visible and the control can be activated without pointer input.
3. **Given** detailed guidance has not been authored yet, **When** a destination is reached, **Then** the matching theme heading identifies the reserved location without fabricated guidance copy.

### Edge Cases

- Long Portuguese titles must wrap without colliding with descriptions or controls.
- At narrow widths and 200% text zoom, cards must remain readable without horizontal page scrolling or clipped text.
- At short viewport heights, no fixed-height card may hide its control or description.
- If one description occupies more lines than the others, card actions must remain easy to locate without truncating copy.
- Keyboard focus must not be hidden by card borders, viewport edges, or neighboring cards.
- Missing or invalid theme anchors must not create dead controls or send students to unrelated destinations.
- The chooser must remain understandable when hover is unavailable on touch devices.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The experience MUST remain within the existing Content section, after the scroll-expanding introduction and before the Conclusion section.
- **FR-002**: The existing problem statement MUST remain the contextual lead-in and MUST preserve this public copy exactly:

  > Durante a faculdade, utilizamos senhas, plataformas acadêmicas, computadores compartilhados, serviços de armazenamento em nuvem e grupos de comunicação. Pequenos descuidos nesses ambientes podem causar perda de arquivos, exposição de informações e conflitos entre estudantes.
  >
  > Este guia apresenta orientações práticas que podem ser aplicadas no dia a dia.

- **FR-003**: The chooser MUST follow the introduction without duplicating the complete problem statement.
- **FR-004**: The chooser MUST use "Escolha um tema" as its visible heading.
- **FR-005**: The chooser MUST present exactly five cards in this order:

  1. **Senhas e autenticação em duas etapas** — "Proteja suas contas acadêmicas e pessoais contra acessos não autorizados."
  2. **Cyberbullying e ética nos grupos de turma** — "Contribua para uma comunicação mais respeitosa, responsável e segura nos ambientes digitais."
  3. **Computadores da biblioteca e laboratório** — "Evite deixar contas abertas, arquivos salvos ou informações pessoais em dispositivos compartilhados."
  4. **Proteção de trabalhos na nuvem** — "Organize, compartilhe e mantenha cópias seguras dos seus trabalhos acadêmicos."
  5. **Golpes de estágio, cursos e links falsos** — "Aprenda a reconhecer oportunidades suspeitas antes de fornecer informações ou realizar pagamentos."

- **FR-006**: Every card MUST contain only its theme title, description, and one control labeled "Ver orientações".
- **FR-007**: Cards MUST NOT contain icons, illustrations, photographs, badges, numbers, decorative shapes, or unrelated metadata.
- **FR-008**: Every "Ver orientações" control MUST lead to a unique destination for its card's theme farther down the same Content section.
- **FR-009**: Each destination in this feature MUST contain only a unique in-page anchor and the exact matching theme heading; detailed guidance copy MUST remain outside this feature.
- **FR-010**: The whole card MUST NOT behave as a second competing control when the explicit in-page link is present.
- **FR-011**: Card controls MUST support pointer, keyboard, and touch use with a visible focus state.
- **FR-012**: Hover, focus, and active states MUST communicate interactivity through immediate color, border, or emphasis changes without movement-based animation.
- **FR-013**: The layout MUST preserve the supplied card order across all responsive arrangements.
- **FR-014**: Public copy MUST remain Brazilian Portuguese and understandable to students and cybersecurity beginners.
- **FR-015**: Theme content MUST follow the project's centralized content ownership rule and MUST NOT be duplicated across presentation surfaces.
- **FR-016**: The experience MUST preserve accessible contrast, readable typography, and clear heading structure.
- **FR-017**: The feature MUST remain preventive and educational; it MUST NOT include operational attack instructions.
- **FR-018**: The feature MUST NOT add a separate route, unrelated page region, or modify the conclusion/evaluation flow and its Google Forms responsibility.
- **FR-019**: The feature MUST NOT introduce animation choreography, modals, carousels, filters, search, progress tracking, authentication, data collection, or detailed guidance copy.

### Experience and Layout Requirements

- **LR-001**: The chooser MUST use an editorial, text-led composition inspired by the references: a large left-aligned heading area followed by a clearly separated card field.
- **LR-002**: On wide screens, the heading and short transition into the chooser MUST use an asymmetric composition within the current page container, leaving deliberate open space rather than centering every element.
- **LR-003**: On wide screens where all cards remain readable, the five cards MUST form one equal-width row. At intermediate widths, they MAY wrap into two columns; on narrow screens, they MUST form one column.
- **LR-004**: The card field MUST avoid horizontal page scrolling. A horizontal carousel is outside scope.
- **LR-005**: Cards MUST share equal visual importance, consistent internal structure, and enough flexible height for complete copy.
- **LR-006**: The visual system MUST reuse the current soft cloud-gray background, light surface, dark text, educational blue interaction color, modern rounded cards, and restrained retro-computing influence.
- **LR-007**: Retro influence MUST come from typography, firm borders, and compact control treatment rather than extra decoration.
- **LR-008**: No card may be pre-highlighted. Interaction states MAY distinguish the card currently hovered, focused, or activated, but MUST return to equal hierarchy afterward.
- **LR-009**: The heading, titles, descriptions, and controls MUST establish a clear reading hierarchy through type scale, weight, spacing, and alignment alone.
- **LR-010**: This specification MUST define static layout and interaction states only; motion timing and scroll animation behavior remain outside scope.

### Key Entities

- **Problem Statement**: The existing two-paragraph introduction that frames common academic digital-security risks and the guide's practical purpose.
- **Topic Chooser**: The text-led content group headed "Escolha um tema" that organizes all available themes.
- **Topic Card**: A single theme entry containing one title, one description, and one associated guidance control.
- **Guidance Destination**: A reserved location farther down the same Content section containing a unique in-page anchor and the matching theme heading only.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the existing problem statement and five supplied topic entries appear with the approved wording and order.
- **SC-002**: In a five-person comprehension check, at least four students can explain the purpose of the chooser and name at least four available themes after a 15-second scan.
- **SC-003**: On a 1280-pixel-wide viewport, all five cards are visible in one row without horizontal page scrolling and each complete description remains readable.
- **SC-004**: On a 390-pixel-wide viewport, all five cards remain readable in the supplied order with no clipped text or horizontal page scrolling.
- **SC-005**: At 200% text zoom, every title, description, and control remains visible and usable.
- **SC-006**: 100% of card controls can be reached and activated with keyboard input, and each shows a visible focus state.
- **SC-007**: Activating any card control reaches the matching theme heading and unique anchor within the same Content section in every tested case; no active-looking control is a dead end.
- **SC-008**: A visual review finds zero icons, illustrations, decorative shapes, numbered markers, carousels, or motion choreography in the chooser.
- **SC-009**: Reviewers can recognize the references' editorial heading and repeated card rhythm while still identifying the existing educational cybersecurity palette and typography.

## Assumptions

- The scroll-expanding introduction from feature 003 remains in place and supplies the problem context for this chooser.
- The chooser is a continuation inside the educational-journey flow, not a separate route or unrelated page region.
- Detailed orientation copy and its final presentation are separate work; this feature creates only the five matching destination headings and anchors within the Content section.
- Each destination has a stable, unique association with one of the five supplied themes before its control is exposed as active.
- All five themes have equal editorial priority, so no card is featured by default.
- The supplied titles, descriptions, heading, and control label are final public copy.
- Existing project typography, colors, spacing language, and content ownership rules remain the source of truth.
- No new dependency or external service is needed for this layout specification.
