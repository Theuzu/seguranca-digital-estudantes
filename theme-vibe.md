# Cybersecurity Education Design System

## Overview

You are designing a cybersecurity education platform targeted at:

* University students
* High school students
* Cybersecurity beginners
* Technology enthusiasts

The website should feel:

* Educational
* Trustworthy
* Technical
* Modern
* Approachable

Avoid:

* Corporate enterprise security aesthetics
* Hacker stereotypes
* Green-on-black terminal overload
* Aggressive cyberpunk visuals

The design should communicate:

> "Learn cybersecurity through curiosity, experimentation, and modern digital literacy."

---

# Design Identity

## Core Concept

Modern educational platform +
Retro computing inspiration +
Digital security culture

Visual inspiration:

* Early internet culture
* Vintage operating systems
* Computer laboratories
* Security awareness training
* Pixel-art interfaces
* Modern SaaS dashboards

---

# Visual Ratio

Use:

80% Modern UI

20% Retro Computing

Avoid turning the entire website into a retro interface.

Retro elements should enhance the experience, not reduce usability.

---

# Color Palette

## Main Background

```css
#C9CBD8
```

Soft cloud gray.

Used for:

* Hero backgrounds
* Page backgrounds
* Large sections

---

## Surface

```css
#F5F6FA
```

Used for:

* Cards
* Learning modules
* Information panels

---

## Dark Surface

```css
#09112A
```

Used for:

* Navigation
* Footer
* Security lab sections

---

## Primary Text

```css
#141826
```

---

## Secondary Text

```css
#4E5568
```

---

## Educational Blue

```css
#4F7CFF
```

Used for:

* Links
* Interactive elements
* CTAs

---

## Security Green

```css
#7EDB8A
```

Used for:

* Safe practices
* Success states
* Learning completion

---

## Warning Orange

```css
#FFB84D
```

Used for:

* Security warnings
* Awareness notices

---

## Danger Red

```css
#FF5A5A
```

Used sparingly for:

* Vulnerabilities
* Threat indicators

---

# Typography

## Primary Font

Recommended:

### Inter

or

### Satoshi

Used for:

* Body text
* Navigation
* Educational content
* Articles

---

## Secondary Font

Recommended:

### Space Grotesk

Used for:

* Headlines
* Major sections
* Hero content

Creates a more technical feel.

---

## Pixel Font

Recommended:

### PP NeueBit

Alternatives:

* Pixelify Sans
* Silkscreen

Used only for:

* Labels
* Security levels
* Section identifiers
* Retro accents

Never use for paragraphs.

---

# Typography Scale

## Hero Title

```css
font-size: clamp(64px, 8vw, 120px);
line-height: 0.95;
font-weight: 600;
```

---

## Section Title

```css
56px
```

Desktop

```css
40px
```

Tablet

```css
32px
```

Mobile

---

## Body

```css
18px
```

Desktop

```css
16px
```

Mobile

---

## Labels

```css
12px
```

Uppercase

Pixel font

Letter spacing:

```css
0.08em
```

---

# Layout System

## Grid

Desktop:

```css
12 columns
24px gap
```

Tablet:

```css
8 columns
```

Mobile:

```css
4 columns
```

---

## Container

```css
max-width: 1440px;
padding-inline: 48px;
```

Mobile:

```css
24px;
```

---

# Section Types

## Hero

Purpose:

Introduce cybersecurity in an approachable way.

Examples:

* Learn Cybersecurity
* Stay Safe Online
* Understanding Digital Threats
* Building Better Security Habits

---

## Learning Modules

Card-based layout.

Example modules:

* Password Security
* Phishing Awareness
* Social Engineering
* Network Security
* Encryption Basics
* Malware Fundamentals

---

## Security Tips

Display short actionable advice.

Examples:

* Enable MFA
* Update Software
* Verify Links
* Use Password Managers

---

## Interactive Lab Section

Optional challenge section.

Could include:

* Quizzes
* Mini exercises
* Security simulations
* CTF introductions

Use dark backgrounds here.

---

# Card Design

Structure:

1. Category Label
2. Title
3. Description
4. Learn More CTA

Card Style:

```css
padding: 32px;
border-radius: 24px;
background: #F5F6FA;
```

---

# Retro Elements

Allowed:

* Pixel icons
* CRT grain
* Scanline overlays
* Pixel labels
* Vintage computer illustrations

Avoid:

* Excessive glitch effects
* Constant animations
* Fake terminal interfaces everywhere

---

# Motion Design

Hover:

```css
transform: translateY(-4px);
transition: 250ms ease;
```

Card Hover:

```css
scale(1.02);
```

---

# Accessibility

Must maintain:

* WCAG AA contrast
* Readable typography
* Keyboard navigation
* Mobile responsiveness

Educational content always takes priority over visual effects.

---

# Homepage Structure

1. Hero
2. Featured Cybersecurity Topics
3. Security Awareness Tips
4. Interactive Learning Modules
5. Resources & Tools
6. FAQ
7. Footer

---

# Design Goal

Students should feel:

* Curious
* Safe
* Empowered
* Interested in learning cybersecurity

The website should feel like a modern cybersecurity learning hub with subtle retro-computing influences rather than a hacking-themed website.
