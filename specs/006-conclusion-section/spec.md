# Feature Specification: Responsive Conclusion Section

**Feature Branch**: `[006-conclusion-section]`

**Created**: 2026-06-22

**Status**: Ready for Planning

**Input**: User description: "Create the final website section from the supplied references, adapt the provided closing, evaluation, academic-purpose, and thank-you copy to the existing design system, connect the evaluation button to Google Forms, use simple smooth animations, and make the section responsive."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Finish the Learning Journey (Priority: P1)

A student reaches the end of the cybersecurity presentation and reads a clear closing message that reinforces practical digital-safety habits and respectful online conduct.

**Why this priority**: The section must complete the site's educational narrative before asking the student to take another action.

**Independent Test**: Reach the Conclusion section on desktop and mobile and confirm that the finalization label, main heading, and two approved explanatory paragraphs are readable in the intended order without requiring interaction.

**Acceptance Scenarios**:

1. **Given** a student has reviewed the Content section, **When** the Conclusion enters view, **Then** the student sees "FINALIZAÇÃO", "Pequenos cuidados fazem diferença", and the two approved safety paragraphs in a clear closing hierarchy.
2. **Given** the Conclusion is viewed at any supported viewport, **When** the student reads the copy, **Then** no text is clipped, overlapped, hidden behind decoration, or forced into horizontal scrolling.
3. **Given** the student prefers reduced motion, **When** the Conclusion enters view, **Then** all content appears without entrance movement and remains fully readable.

---

### User Story 2 - Evaluate the Academic Project (Priority: P2)

A student understands why feedback is requested and can open the connected Google Form through one prominent action.

**Why this priority**: Collecting academic feedback is the required action of the final section and supports evaluation of the extension activity.

**Independent Test**: Review the evaluation panel, activate "Responder ao formulário" with pointer and keyboard, and confirm it opens the configured Google Form without submitting or collecting data inside the website.

**Acceptance Scenarios**:

1. **Given** a valid Google Forms URL is configured, **When** the student activates "Responder ao formulário", **Then** the connected form opens and the website performs no local submission.
2. **Given** the student uses only a keyboard, **When** focus reaches the form action, **Then** a visible focus state appears and Enter activates the same destination as a pointer click.
3. **Given** the evaluation panel is visible, **When** the student scans it, **Then** the purpose, expected effort, and exclusively academic use of responses are stated before the action.

---

### User Story 3 - Understand Context and Leave with a Thank You (Priority: P3)

A student sees a brief academic-purpose note in the footer and a final thank-you message that encourages responsible sharing of the guidance.

**Why this priority**: This context closes the experience transparently while keeping the primary conclusion and evaluation action focused.

**Independent Test**: Reach the page footer and confirm the academic-purpose statement and approved thank-you copy are present, visually secondary to the main conclusion, and readable on mobile and desktop.

**Acceptance Scenarios**:

1. **Given** the student reaches the end of the page, **When** the footer is visible, **Then** it identifies the site as an academic extension activity about digital security in the university environment.
2. **Given** the student reads the closing content, **When** they reach the thank-you block, **Then** they see the approved acknowledgment and invitation to share the guidance with other students.
3. **Given** the viewport becomes narrow, **When** the footer and thank-you content reflow, **Then** their reading order remains logical and no information depends on a desktop-only side-by-side layout.

### Edge Cases

- Until the final Google Forms URL replaces the supplied placeholder, the action must not lead to an empty, malformed, or misleading destination.
- Long Portuguese words, browser font substitution, and 200% text zoom must not clip headings, paragraphs, or the action label.
- At very narrow widths, all columns and callout layouts must collapse into one logical reading sequence with comfortable spacing.
- Decorative reference-inspired marks must not be announced by assistive technology or compete with the content hierarchy.
- Hover-only effects must not be the sole indication that the Google Forms action is interactive.
- If animation cannot run, content and the external action must remain present and usable.
- The final section must not create vertical traps or horizontal page overflow when reached through scrolling or a direct fragment link.
- If the external form is unavailable after navigation, the website must not claim that feedback was submitted.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The feature MUST add the third and final top-level Conclusion section after the existing Content section without changing the Hero or Content narratives.
- **FR-002**: Public copy MUST remain in Brazilian Portuguese and use the following label and heading exactly: "FINALIZAÇÃO" and "Pequenos cuidados fazem diferença".
- **FR-003**: The main closing message MUST present these two supplied paragraphs in this order:

  1. "A segurança digital não depende apenas de ferramentas avançadas. Hábitos simples, como utilizar senhas diferentes, sair das contas em computadores compartilhados e verificar uma oportunidade antes de clicar, ajudam a proteger dados pessoais e acadêmicos."
  2. "Além de proteger suas próprias informações, uma convivência digital respeitosa contribui para um ambiente universitário mais seguro para todos."
- **FR-004**: The section MUST include an evaluation callout titled "Ajude a avaliar este projeto".
- **FR-005**: After moving the academic-purpose statement to the footer, the evaluation callout MUST present these two supplied paragraphs in this order:

  1. "Sua opinião é importante para avaliar se o conteúdo foi útil, claro e aplicável ao cotidiano dos estudantes."
  2. "O formulário é rápido e suas respostas serão utilizadas exclusivamente para fins acadêmicos."
- **FR-006**: The evaluation callout MUST provide one prominent action labeled "Responder ao formulário" connected directly to a valid Google Forms URL.
- **FR-007**: The Google Forms connection MUST be a direct external entry point and MUST NOT introduce an on-site form, authentication, database, response storage, or backend integration.
- **FR-008**: The supplied `[INSERIR LINK DO GOOGLE FORMS]` value MUST be treated as a configuration placeholder and replaced with a valid URL before release.
- **FR-009**: While the Google Forms URL is still a placeholder, the action MUST remain visibly unavailable or otherwise avoid navigating to a broken destination.
- **FR-010**: The section MUST include a thank-you block titled "Agradecimento" with these two supplied paragraphs in this order:

  1. "Obrigado por acessar o conteúdo e contribuir com esta atividade."
  2. "Compartilhe estas orientações com outros estudantes e ajude a promover práticas digitais mais seguras e responsáveis."
- **FR-011**: The statement "Este site foi desenvolvido como parte de uma atividade acadêmica de extensão sobre segurança digital no ambiente universitário." MUST appear as visually secondary academic-purpose content in the footer.
- **FR-012**: Moving the academic-purpose statement to the footer MUST NOT separate the remaining evaluation explanation from its heading or action.
- **FR-013**: The visual composition MUST adapt the references' spacious editorial close, oversized heading, clear call-to-action area, and contrasting footer without copying their branding, logos, client strips, badges, or unrelated navigation.
- **FR-014**: Sizing, spacing, typography, colors, and surfaces MUST follow the existing design rules and `theme-vibe.md`, including the established container padding and responsive type scale.
- **FR-015**: The design MUST maintain the site's 80% modern and 20% retro-computing balance through restrained accents rather than terminal, glitch, or hacker imagery.
- **FR-016**: The Conclusion MUST adapt across mobile, tablet, desktop, 200% text zoom, and content wrapping without clipping, overlap, illegible line lengths, or horizontal page overflow.
- **FR-017**: When a multi-column layout no longer provides readable text widths, content MUST reflow into one logical column in this order: closing message, evaluation explanation and action, thank-you content, academic footer.
- **FR-018**: Paragraphs MUST retain readable line lengths and the primary Google Forms action MUST remain clearly visible without obscuring surrounding copy.
- **FR-019**: Entrance and interaction animations MUST be simple, smooth, purposeful, and limited to section comprehension or action feedback.
- **FR-020**: Animated state changes MUST complete within 350 milliseconds and MUST NOT animate paragraph text independently, delay access to content, or interfere with scrolling.
- **FR-021**: Reduced-motion preferences MUST remove nonessential entrance movement while preserving immediate visual states and full functionality.
- **FR-022**: The Google Forms action MUST be reachable and operable by keyboard, display a visible focus state, and maintain WCAG AA contrast in default, hover, focus, and active states.
- **FR-023**: Heading hierarchy and landmark structure MUST let assistive-technology users identify the Conclusion, evaluation callout, thank-you block, and footer in a logical order.
- **FR-024**: Decorative graphics and reference-inspired symbols MUST be ignored by assistive technology and MUST NOT carry required meaning.
- **FR-025**: Conclusion copy, labels, Google Forms URL, and action text MUST be centrally owned as structured content rather than duplicated in presentation markup.
- **FR-026**: The feature MUST use existing project capabilities and MUST NOT add a dependency without explicit user approval.
- **FR-027**: The feature MUST remain static and editorial; analytics, submission tracking, consent flows, quizzes, account features, and additional external integrations are outside scope.
- **FR-028**: Cybersecurity wording MUST remain preventive, practical, respectful, and appropriate for university students.

### Key Entities

- **Conclusion Content**: Structured final-section copy containing the label, main heading, closing paragraphs, evaluation content, action label, thank-you content, and academic-purpose statement.
- **Evaluation Callout**: Focused content group explaining the feedback request and presenting the single external action.
- **Google Forms Entry Point**: Valid external destination used to collect feedback outside the website.
- **Thank-You Block**: Final acknowledgment and invitation to share responsible digital-safety guidance.
- **Academic Footer**: Visually secondary closing area that identifies the extension activity's academic purpose.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the supplied closing, evaluation, thank-you, and academic-purpose messages appear once in the intended narrative order, with the academic-purpose statement located in the footer.
- **SC-002**: On tested 390-pixel mobile, 768-pixel tablet, and 1280-pixel desktop viewports, all Conclusion content is readable with zero clipping, overlap, or horizontal page overflow.
- **SC-003**: At 200% browser zoom, the reading order remains closing message, evaluation explanation and action, thank-you content, then academic footer, with no lost content or controls.
- **SC-004**: In five pointer activations and five keyboard activations, the configured action opens the intended Google Form every time and causes zero on-site submissions.
- **SC-005**: Before a valid form URL is configured, zero tests navigate to an empty or placeholder destination.
- **SC-006**: The form action has a visible state for keyboard focus and meets WCAG AA contrast in every interactive state.
- **SC-007**: All nonessential entrance and interaction motion completes within 350 milliseconds; reduced-motion mode shows the same content and functionality without entrance movement.
- **SC-008**: In a five-student review, at least four participants identify the principal safety takeaway and the feedback action within ten seconds of entering the Conclusion.
- **SC-009**: In the same review, at least four participants correctly understand that feedback is collected for academic purposes and that the form is external to the website.
- **SC-010**: A visual review identifies the references' spacious closing composition and contrasting footer while still recognizing the existing site's palette, typography, sizing rules, and educational cybersecurity identity.

## Assumptions

- The feature directory is independent of the active Git branch; no branch change is required for specification work.
- The user will provide the final Google Forms URL before release; until then, the placeholder remains explicit and non-navigable.
- "The form is quick" is presented as supplied editorial copy, not as a measured completion-time guarantee.
- The Google Form itself owns response collection, privacy notices, validation, confirmation, and availability.
- The Conclusion follows the existing topic content on the same one-page Hero, Content, and Conclusion experience.
- Exact responsive breakpoints and decorative details belong to planning, provided the measurable layout and accessibility outcomes remain satisfied.
- Existing project animation capabilities are sufficient; no new animation or form dependency is approved.
