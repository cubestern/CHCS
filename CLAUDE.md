# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

CHCS ("Can't Handle Choosing Stuff") is a zero-dependency static web app — no build step, no package manager, no framework. Open `index.html` directly in a browser or serve with any static file server.

## Running the app

```bash
# Any of these work:
npx serve .
python -m http.server 8080
# or just open index.html directly in a browser
```

Cache-busting is manual: bump the `?v=N` query string on `<script>` and `<link>` tags in the HTML when making CSS/JS changes that need to bypass browser cache.

## Architecture

Everything lives in three files:

- **`app.js`** — the entire application. One class (`CHCSApp`) that renders all views by setting `#mainContent.innerHTML`. No routing library, no virtual DOM. Views are: Home, FoodCategory (mood → swipe → result), MovieCategory (mood → swipe → result).
- **`index.html`** — shell with sticky header, `#mainContent` mount point, fixed bottom bar, footer. Instantiates `app` on load.
- **`style.css`** — all styles. CSS custom properties handle light/dark theming via `[data-theme]` on `<html>`.

### Data

`app.js` contains the authoritative data as top-level constants — **`MEALS` and `MOVIES` arrays**. This is what the running app uses.

`meals.json` and `movies.json` are reference files and should be kept in sync with `app.js`. **When adding a new meal or movie, update `app.js` first** — edits to the JSON files alone have no effect at runtime.

`movies-extra-100.json` is a staging file, not yet imported into `app.js`.

### State

All persistent state is `localStorage`:
- `chcs_theme` — `'light'` or `'dark'`
- `chcs_stats` — `{ choices, weekPlans, streak, lastDate }`
- `chcs_checked` — JSON array of checked shopping list item strings

### Theming

Two themes driven by `data-theme="light|dark"` on `<html>`. CSS variables are defined in `:root` (light) and `[data-theme="dark"]`. The header uses hardcoded `rgba()` values for backdrop-filter glass effect — if the light-mode background colour `--bg` ever changes from `#F3EDE5`, update `style.css` line ~185 manually.

## Design language

Visual decisions follow the **steven-design** skill (`~/.claude/skills/steven-design/`). Key constraints:
- Fonts: Fraunces (display/serif) + DM Sans (body) — loaded from Google Fonts
- Colours: warm cream bg, teal primary, gold accent — all via CSS custom properties
- Radius: `--radius-xl: 20px` (cards), `--radius-pill: 50px` (buttons)
- Shadows: warm-tinted, never harsh

## Alternative skin

`index2.html` + `style2.css` is an experimental dark/precision variant (Barlow Condensed, amber accent, near-square radius). It uses the same `app.js`. Not the primary version — `index.html` is.

## Adding content

**New meal** — add an object to the `MEALS` array in `app.js` and mirror it in `meals.json`:
```js
{ id: "meal-NNN", name: "…", cuisine: "…", effort: "easy|medium|involved",
  prepTime: 30, dietary: "vegetarian|fish|meat|vegan",
  description: "…", ingredients: ["…"] }
```

**New movie** — add to `MOVIES` in `app.js` and mirror in `movies.json`:
```js
{ id: "movie-NNN", title: "…", year: 2024, genre: "…",
  mood: "light|intense|thought-provoking|funny",
  runtime: 110, pitch: "…", streaming: ["Netflix"] }
```

## Key rendering methods

| Method | What it renders |
|---|---|
| `renderHome()` | Hero card, stats row, category grid |
| `renderFoodCategory()` | Mood selection → swipe stack → result |
| `renderMovieCategory()` | Mood selection → swipe stack → result |
| `renderSwipeStack(items, type)` | The card stack + accept/reject buttons |
| `renderResult(item, type)` | Accepted result card with share actions |
| `renderWeekPlanner()` | 5-day meal plan builder |
| `surpriseMe()` | Global "Surprise me" — picks random category and item |

The share image feature uses `html2canvas` (loaded from CDN in `index.html`) to screenshot a hidden `.share-card` div, then `navigator.share()` with fallback to direct download.
