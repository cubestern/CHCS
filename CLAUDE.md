# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

CHCS ("Can't Handle Choosing Stuff") is a zero-dependency static web app — no build step, no package manager, no framework. Open `index.html` directly in a browser or serve with any static file server. Deployed via Vercel (config in [vercel.json](vercel.json) — just `{"version": 2}`, no functions or rewrites).

## Running the app

```bash
# Any of these work:
npx serve .
python -m http.server 8080
# or just open index.html directly in a browser
```

Cache-busting is manual: bump the `?v=N` query string on `<script>` and `<link>` tags in `index.html` when making CSS/JS/data changes that need to bypass browser cache. Data files (`data/*.js`) are loaded with `?v=N` and are NOT pre-cached by the service worker — bumping the version string is sufficient. Only bump the `CACHE` constant in [sw.js](sw.js) when the shell file list itself changes (adding/removing entries from `SHELL`).

## Architecture

- **`app.js`** — the entire application. One class (`CHCSApp`) that renders all views by setting `#mainContent.innerHTML`. No routing library, no virtual DOM. Categories: Food, Movies, Music (playlists), Travel. Plus Favorites, Search, Account, and a week planner.
- **`index.html`** — shell with sticky header, `#mainContent` mount point, fixed bottom bar, footer. Instantiates `app` on load.
- **`style.css`** — all styles. CSS custom properties handle light/dark theming via `[data-theme]` on `<html>`.
- **`data/*.js`** — content as top-level `const` arrays. Loaded via `<script>` tags in `index.html` so each global is available to `app.js`.
- **`sw.js`** + **`manifest.json`** — PWA support. Service worker is network-first for HTML (so deploys are visible immediately) and cache-first for assets.

### Data

Content lives in four data files, each exporting a top-level `const`:

| File | Global | Schema |
|---|---|---|
| [data/meals.js](data/meals.js) | `MEALS` | `{ id, name, cuisine, effort, prepTime, dietary, description, ingredients }` |
| [data/movies.js](data/movies.js) | `MOVIES` | `{ id, title, year, genre, mood, runtime, pitch, streaming }` |
| [data/travel.js](data/travel.js) | `TRAVEL` | `{ id, name, country, continent, mood, type, budget, duration, best_season, pitch }` |
| [data/playlists.js](data/playlists.js) | `PLAYLISTS` | `{ id, name, curator, mood, vibe, tags, spotifyUrl, trackCount, featured }` |
| [data/books.js](data/books.js) | `BOOKS` | `{ id, title, author, year, mood, pages, pitch }` |
| [data/i18n.js](data/i18n.js) | `I18N_NL` | UI translations: English source string → Dutch |

IDs follow the pattern `<type>-NNN`, sequential, no gaps. The running app reads from these arrays directly — there are no separate JSON files anymore.

After any data edit, run **`node check-data.js`** to verify no duplicate IDs, no numbering gaps, no missing required fields, and no sparse-array holes (stray commas). Output must be `All data files clean.` before committing.

### Languages (i18n)

UI is bilingual (English/Dutch). English strings in `app.js`/`index.html` are the source of truth; `data/i18n.js` maps them verbatim to Dutch (`I18N_NL`). Every user-visible string in a render method must go through `t('…')` (exact-match lookup, falls back to English) or `tf('… {n} …', { n })` for interpolation. Language is `chcs_lang` in localStorage, auto-detected from `navigator.language` on first visit, switchable under Account. **Gotcha:** dictionary keys must match the source string byte-for-byte, including curly vs straight apostrophes. Never name a local variable or arrow parameter `t` in a scope that calls `t()` (the travel code uses `tr` for this reason). Content data (meal names, pitches) is not translated — UI only.

### State

All persistent state is `localStorage`:
- `chcs_theme` — `'light'` or `'dark'`
- `chcs_design` — `'elegant'` or `'quiet'` (see Theming; unknown values fall back to `'elegant'`)
- `chcs_stats` — `{ choices, weekPlans, streak, lastDate }`
- `chcs_checked` — JSON array of checked shopping list item strings
- Plus favorites and last-selected-mood per category

### Theming

Two themes driven by `data-theme="light|dark"` on `<html>`. CSS variables are defined in `:root` (light) and `[data-theme="dark"]`. The header uses hardcoded `rgba()` values for backdrop-filter glass effect — if the light-mode background colour `--bg` ever changes from `#F3EDE5`, update `style.css` line ~185 manually.

Independently of theme, `data-design="elegant|quiet"` on `<html>` selects a **design layer** — both are override blocks at the bottom of [style.css](style.css), stacked on the base styles, and both work in either theme:

- **elegant** (default) — refined and editorial: italic serif headings, dark hero card, soft shadows.
- **quiet** — minimal and calm: no shadows, no hover motion, hairline borders, light hero panel, roman headings, and **no emoji**. Same colour palette as elegant.

Quiet's emoji removal is not CSS — emoji sit in the templates (~90 places) and in some playlist titles. Instead every view paints through `this._screen.innerHTML` (or `_paintInto(el, html)` for the search results and share card) rather than touching `#mainContent` directly, and that choke point calls `CHCSApp.stripEmoji()` when the design is quiet. It walks text nodes, so attributes, URLs and ids are never touched. Monochrome marks that read as typography are kept via `EMOJI_KEEP` (♥ ♡; ✓ ✗ → ✦ are not pictographic and never match). Wrapper elements that only held an emoji are hidden in the CSS layer so they don't leave gaps. **When adding a view, assign to `this._screen.innerHTML`, not to `#mainContent` directly**, or it will keep its emoji in quiet.

The valid values live in the `DESIGNS` array in [app.js](app.js); `CHCSApp.resolveDesign()` maps anything else back to `'elegant'`, which is how the retired `'classic'` option is migrated. Adding a design means adding it to `DESIGNS`, adding a `[data-design="…"]` block, and adding a button in `renderAccount()`.

## Design language

Visual decisions follow the **steven-design** skill (`~/.claude/skills/steven-design/`). Key constraints:
- Fonts: Fraunces (display/serif) + DM Sans (body) — loaded from Google Fonts
- Colours: warm cream bg, teal primary, gold accent — all via CSS custom properties
- Radius: `--radius-xl: 20px` (cards), `--radius-pill: 50px` (buttons)
- Shadows: warm-tinted, never harsh

## Adding content

**New meal** — add to the `MEALS` array in [data/meals.js](data/meals.js):
```js
{ id: "meal-NNN", name: "…", cuisine: "…", effort: "easy|medium|involved",
  prepTime: 30, dietary: "vegetarian|fish|meat|vegan",
  description: "…", ingredients: ["…"] }
```

**New movie** — add to `MOVIES` in [data/movies.js](data/movies.js):
```js
{ id: "movie-NNN", title: "…", year: 2024, genre: "…",
  mood: "light|intense|thought-provoking|funny",
  runtime: 110, pitch: "…", streaming: ["Netflix"] }
```

**New travel destination** — add to `TRAVEL` in [data/travel.js](data/travel.js):
```js
{ id: "travel-NNN", name: "…", country: "…", continent: "Europe|Asia|…",
  mood: "culture|adventure|unwind|romance|cozy", type: "city trip|beach & coast|nature|road trip",
  budget: "budget|moderate|expensive", duration: "…", best_season: "spring|summer|autumn|winter",
  pitch: "…" }
```

**New playlist** — add to `PLAYLISTS` in [data/playlists.js](data/playlists.js):
```js
{ id: "playlist-NNN", name: "…", curator: "…", mood: "chill|energy|focus|melancholy|light",
  vibe: "…", tags: ["…"], spotifyUrl: "https://open.spotify.com/playlist/…",
  trackCount: 100, featured: false }
```

After any addition: bump the `?v=N` for that data file in [index.html](index.html), run `node check-data.js`, and confirm `All data files clean.`

## Routines

The monthly content-batch routine prompt lives in [routines/monthly-content-batch.md](routines/monthly-content-batch.md). Activated via the `schedule` skill / `/schedule` command.

## Key rendering methods

| Method | What it renders |
|---|---|
| `renderHome()` | Hero card, stats row, category grid |
| `renderFoodMoodScreen()` / `renderMovieMoodScreen()` / `renderMusicMoodScreen()` / `renderTravelMoodScreen()` | Mood selection per category |
| `renderMealCard()` / `renderMovieCard()` / `renderPlaylistCard()` / `renderTravelCard()` | Individual swipe cards / result cards |
| `renderFavorites()` | Saved items across categories |
| `renderSearch()` | Cross-category search |
| `renderWeekPlan()` | 5-day meal plan builder |
| `renderAccount()` | Stats and settings |

The share image feature uses `html2canvas` (loaded from CDN in `index.html`) to screenshot a hidden `.share-card` div, then `navigator.share()` with fallback to direct download.
