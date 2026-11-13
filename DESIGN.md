---
name: CHCS (Can't Handle Choosing Stuff)
description: A calm one-column app that narrows food, film, music, book and travel choices down to a single pick.
colors:
  cream-field: "#F3EDE5"
  paper-card: "#FEFCF9"
  paper-card-hover: "#FAF6F1"
  warm-ink: "#1A1814"
  stone-text: "#6B6359"
  faded-stone: "#6C6863"
  sand-border: "#DDD6CC"
  sand-hairline: "#EBE5DC"
  deep-teal: "#1B6B6D"
  deep-teal-hover: "#15585A"
  antique-gold: "#C4993C"
  antique-gold-hover: "#B08830"
  antique-gold-text: "#9F7C31"
  espresso-slab: "#1A1714"
  night-slab: "#211D18"
  night-field: "#121110"
  night-card: "#1C1A17"
  night-text: "#F0EBE4"
  night-stone: "#9E9589"
  night-teal: "#2DBAB8"
  night-gold: "#D4A843"
  quiet-field: "#F2F2F2"
  quiet-card: "#FFFFFF"
  quiet-ink: "#111111"
  quiet-secondary: "#6D6D72"
  quiet-hairline: "#E0E0E0"
  quiet-night-field: "#000000"
  quiet-night-card: "#1C1C1E"
  quiet-night-hairline: "#2C2C2E"
typography:
  display:
    fontFamily: "Fraunces, 'Cormorant Garamond', Georgia, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.3px"
  headline:
    fontFamily: "Fraunces, 'Cormorant Garamond', Georgia, serif"
    fontSize: "1.95rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.3px"
  title:
    fontFamily: "Fraunces, 'Cormorant Garamond', Georgia, serif"
    fontSize: "1.15rem"
    fontWeight: 500
  body:
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    letterSpacing: "3px"
  quiet-display:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "1.9rem"
    fontWeight: 600
    lineHeight: 1.06
  quiet-body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  xs: "6px"
  sm: "10px"
  md: "16px"
  xl: "22px"
  pill: "50px"
  quiet-xs: "8px"
  quiet-sm: "12px"
  quiet-md: "16px"
  quiet-xl: "18px"
spacing:
  grid-gap: "12px"
  gutter: "26px"
  quiet-gutter: "20px"
  card-padding: "22px"
  hero-padding: "40px"
  nav-height: "44px"
components:
  hero-card:
    backgroundColor: "{colors.espresso-slab}"
    textColor: "#FFF8F0"
    rounded: "{rounded.xl}"
    padding: "40px 30px 34px"
  button-hero:
    backgroundColor: "{colors.antique-gold}"
    textColor: "{colors.espresso-slab}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  button-hero-hover:
    backgroundColor: "{colors.antique-gold-hover}"
  button-accept:
    backgroundColor: "{colors.deep-teal}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
  button-accept-hover:
    backgroundColor: "{colors.deep-teal-hover}"
  chip-active:
    backgroundColor: "{colors.deep-teal}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  card-category:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.warm-ink}"
    rounded: "{rounded.md}"
    padding: "22px 20px"
  nav-item:
    backgroundColor: "{colors.cream-field}"
    textColor: "{colors.stone-text}"
    rounded: "{rounded.pill}"
    size: "44px"
  hero-card-quiet:
    backgroundColor: "{colors.quiet-ink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.quiet-xl}"
  button-hero-quiet:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.quiet-ink}"
    rounded: "{rounded.pill}"
  card-category-quiet:
    backgroundColor: "{colors.quiet-card}"
    textColor: "{colors.quiet-ink}"
    rounded: "{rounded.quiet-xl}"
---

# Design System: CHCS (Can't Handle Choosing Stuff)

## Overview

**Creative North Star: "The Quiet Concierge"**

CHCS is a host that narrows the field and hands you one thing. It never shows a feed or a leaderboard, and it never counts anything on your behalf. The screen is a single 480px column, and every view is built so the eye lands on exactly one decision: tonight's pick, a mood, a card to accept. Everything else is set back, lower in contrast, smaller, and wider in tracking, so that choosing is the only emphatic act on the page.

The default system, **elegant**, is warm and editorial. A cream field, paper-white cards with hairline borders, an italic serif voice for names and headlines, and one dark espresso slab for the daily pick. Deep teal carries action and state, antique gold carries the single moment of invitation on the dark slab. A variant system, **quiet**, strips the hue out entirely and rebuilds the same layouts in native-feeling greyscale. Both layers work in light and dark, giving four renderings of every screen, and each must hold up on its own.

The app speaks with the confidence of someone who has already decided for you. Copy is short and warm ("What are we deciding today?", "A new pick every day"). Retention comes from something new appearing, never from a counter, a streak or a badge.

**Key Characteristics:**
- One column, 480px maximum, one dominant element per screen.
- Warm and literary in elegant, monochrome and native in quiet.
- Italic serif for names and the single largest line, sans for everything structural.
- Depth by hairline border first, shadow second, motion last.
- Emphasis is rationed: gold or ink marks the act of choosing and nothing else.

## Colors

A warm neutral field with two inks. Teal acts, gold invites. In quiet both collapse to a single ink.

### Primary
- **Deep Teal** (#1B6B6D light, #2DBAB8 dark): Action and state. The accept button, the active nav glyph, the active mood pill and filter chip, outline buttons, focus-like hover borders. Brighter in dark so it holds contrast on the near-black field.

### Secondary
- **Antique Gold** (#C4993C light, #D4A843 dark): Invitation. The label and button on the dark hero slab, the italic accent word in the home greeting, and the food category glyph. Gold never fills a surface larger than a button. Where gold is set as text on the cream field it uses **Antique Gold Text** (#9F7C31), because the fill gold is only 2.3:1 there. In dark the two are the same.

### Neutral
- **Cream Field** (#F3EDE5): The page background in elegant light. Warm enough to feel like paper, light enough not to tint the cards.
- **Paper Card** (#FEFCF9): Card and list surfaces, with **Paper Card Hover** (#FAF6F1) for the pressed or hovered state.
- **Warm Ink** (#1A1814): Primary text. Secondary text is **Stone Text** (#6B6359) and the quietest labels use **Faded Stone** (#6C6863), which is 4.75:1 on the cream field and sits only a step lighter than secondary, so labels separate by size and tracking more than by tone.
- **Sand Border** (#DDD6CC) and **Sand Hairline** (#EBE5DC): The two edge weights. Cards in elegant use the hairline, inputs and chips use the border.
- **Espresso Slab** (#1A1714): The hero card, rendered as a subtle warm gradient that deepens toward one corner. In dark theme it is lifted to **Night Slab** (#211D18) at its mid stop, because the page field is almost the same value and the slab must still read as a surface.
- **Night Field** (#121110), **Night Card** (#1C1A17), **Night Text** (#F0EBE4), **Night Stone** (#9E9589): The dark theme counterparts, still warm, never pure black.

### The Quiet Variant
Quiet replaces the whole palette with greyscale and sets both accents to ink.
- **Quiet Ink** (#111111 light, #FFFFFF dark): The only emphatic colour. Fills the hero slab, the primary button, the accept action and every active control.
- **Quiet Field** (#F2F2F2) with **Quiet Card** (#FFFFFF), and in dark **Quiet Night Field** (#000000) with **Quiet Night Card** (#1C1C1E).
- **Quiet Secondary** (#6D6D72) for supporting text, **Quiet Hairline** (#E0E0E0) and **Quiet Night Hairline** (#2C2C2E) for edges.

### Named Rules
**The Rationed Emphasis Rule.** Per screen, exactly one thing is gold (elegant) or ink-filled (quiet). If two things compete for it, one of them is wrong.

**The Ink Flip Rule.** In quiet, teal and gold are the same token as ink, so any rule that sets a label or button colour from them must be checked on the ink slab, where it would otherwise go black on black.

## Typography

**Display Font:** Fraunces, with Cormorant Garamond and Georgia behind it
**Body Font:** DM Sans, with the system sans behind it
**Quiet Display Font:** Source Serif 4, used only in the quiet layer

**Character:** A literary serif voice for the things you choose between, a plain geometric sans for the machinery around them. In quiet the serif is quieter still, a book italic that sits beside system sans instead of competing with it.

### Hierarchy
- **Display** (Fraunces 400, 2rem, 1.2): The hero pick's title, in italic, on the espresso slab.
- **Headline** (Fraunces 400, 1.95rem, 1.2): The home greeting, with one word in italic gold ("deciding"). Mood and result headings use the same scale.
- **Title** (Fraunces italic 500, 1.15rem): Category names on the home grid.
- **Body** (DM Sans 400, 0.85rem to 1rem, 1.5 to 1.65): Descriptions and pitches. Muted to 55 percent white on the dark slab.
- **Label** (DM Sans 700, 0.7rem, 3px tracking, uppercase): Section markers such as BROWSE and the hero kicker. The quietest text on any screen, but never below 11px or 4.5:1.
- **Quiet Display** (Source Serif 4 italic 600, 1.9rem, 1.06): The greeting, the hero title, the result title and the swipe card title, and nothing else.
- **Quiet Body** (system sans, 0.85rem, 1.5): All structural text in quiet. Row titles such as category names are sans at 0.92rem and semibold, with their detail line at 0.73rem.

### Named Rules
**The One Serif Line Rule.** In quiet, only the single largest line on a screen is serif. Category titles, duo banner titles, stats and small headings go back to sans.

**The Quiet Label Rule.** Labels get quieter through tracking and size, never through a lighter weight. They stay bold and small.

## Layout

A single centred column capped at 480px, with a 26px side gutter in elegant and 20px in quiet. The page clears a fixed bottom bar with 84px of bottom padding plus the safe-area inset, and the top padding clears the status bar on notched phones. Vertical rhythm is generous in elegant and tighter in quiet.

Home runs greeting, hero slab, then BROWSE. In elegant, BROWSE is a two-column grid of cards with a 12px gap, followed by a full-width duo banner. In quiet the same content becomes a single-column grouped list, one row per category, with a circular outlined glyph on the left and a chevron on the right. Below 360px the grid gap tightens to 8px and the hero title drops to 1.5rem. Above 481px the column gains a 20px top margin and nothing else.

## Elevation & Depth

Depth is conveyed by edge before shadow. Elegant cards are flat at rest with a hairline border, and gain a soft warm shadow only on hover. The hero is the one deep surface: a dark slab on a light page, with a faint diagonal weave and a soft gold glow in its top corner. In dark theme the slab is lifted and given an inset hairline so it keeps an edge against the near-black field. Quiet allows a single 1px shadow in light and none in dark, where the hairline border carries the edge.

### Shadow Vocabulary
- **Rest** (`0 1px 3px rgba(90, 70, 40, 0.05)`): The barely-there lift on elegant surfaces, tinted warm rather than grey.
- **Lift** (`0 12px 40px rgba(90, 70, 40, 0.08), 0 2px 6px rgba(90, 70, 40, 0.04)`): Hover and the swipe card.
- **Dark Hero Hairline** (`inset 0 0 0 1px rgba(255, 248, 240, 0.09)`): The edge of the hero slab in elegant dark.
- **Quiet Hairline** (`0 1px 2px rgba(0, 0, 0, 0.05)`): The whole shadow budget of the quiet layer in light. None in dark.

### Named Rules
**The Hairline Before Shadow Rule.** A card that needs to separate from its field gets a border before it gets a shadow. Shadows appear on state, not at rest.

## Shapes

Generously rounded and soft. Cards use 16px, the hero and result cards 22px, small controls 10px, and every action and chip is a full pill (50px). Navigation glyphs are 44px circles. Quiet rounds slightly tighter and slightly more uniform (18px cards, 16px rows, 12px small, 8px smallest). Category glyphs sit in circles in both layers: a tinted disc in elegant, an outlined ring in quiet.

## Components

### Buttons
- **Shape:** Full pill (50px).
- **Hero action:** Antique gold fill, espresso text, 12px by 28px padding, label plus arrow ("Show me ->"). Lifts 2px with a gold glow on hover. In quiet it becomes a white fill with ink text on the ink slab.
- **Accept:** Deep teal fill with white text and a 1.5px teal border. Hover lifts 2px with a teal glow. In quiet it takes the ink fill, and the white label must flip to ink in dark.
- **Outline:** Transparent with a teal border and teal text, filling teal on hover.
- **Reject ("nah, next"):** Transparent with a 1.5px sand border and muted text, turning a soft red only on hover.

### Chips
- **Style:** Pill, 8px by 18px, 0.76rem semibold, on a tinted surface.
- **State:** Idle is quiet text on the tinted surface, hover adds a teal border, active fills teal (ink in quiet) with white text.

### Cards / Containers
- **Corner Style:** 16px, 22px on result and swipe cards.
- **Background:** Paper card on the cream field, with a hairline border and no shadow at rest.
- **Internal Padding:** 22px by 20px, left-aligned in elegant.
- **Mood pill:** A card variant, centred, whose active state gains a teal border, a soft teal wash and a 3px teal glow ring.
- **Category cards and the Duo banner on home are real links** (`<a href="/food">`), so Tab, Enter and screen readers reach them. They take a 2px teal focus ring offset 3px (ink in quiet). A coming-soon card is not interactive and stays a plain container.

### Navigation
A fixed bottom bar capped at 480px with five 44px circular glyph buttons: home, search, saved, account and the theme toggle. The bar is translucent with a blur. Elegant outlines each glyph in a 1.5px ring and marks the active one with a teal ring and soft teal fill. Quiet drops the rings and marks the active glyph by ink weight alone. The theme toggle is a control and is never marked active.

### Hero Card (signature)
The espresso slab that carries the daily pick: a gold kicker, an italic serif title, a muted description, one gold action and a small hint line ("A new pick every day"). It is the same for everyone on a given day. In quiet it is a flat ink slab, and in dark quiet it lifts to the card grey with a hairline border.

### Category Row (signature, quiet)
A grouped-list row: outlined circular glyph, sans title over a muted detail line, and a trailing chevron. The chevron is drawn by a pseudo-element, so no markup changes between layers.

## Do's and Don'ts

### Do:
- **Do** let one element per screen carry the emphasis: the hero action, the accept button or the active mood.
- **Do** build every view so it holds up in all four renderings: elegant and quiet, each in light and dark.
- **Do** route every colour through the tokens, and check both layers when a rule touches teal or gold.
- **Do** keep labels small, bold and widely tracked, and let size and tracking, not weight, do the quieting.
- **Do** keep functional text at 11px or larger and at 4.5:1 (3:1 for large text), measured on the real background and not on the flat token.
- **Do** make anything that behaves like a button or link a real `<button>` or `<a>`, so it is reachable without a mouse.
- **Do** reward a returning user with something new, such as a fresh daily pick, rather than a count.

### Don't:
- **Don't** add streaks, badges, "don't break the chain" mechanics or stat tiles to the home screen. These are confirmed rejections, not preferences.
- **Don't** introduce any hue in quiet. Its only emphasis is ink.
- **Don't** use emoji in quiet. Views must paint through the shared screen setter so emoji are stripped there.
- **Don't** put a shadow on a card at rest in elegant, or any shadow at all on dark quiet.
- **Don't** set a second serif line on a quiet screen. Category titles and small headings are sans.
- **Don't** use em-dashes in any copy, comment or doc.
