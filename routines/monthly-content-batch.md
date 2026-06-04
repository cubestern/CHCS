# Monthly Content Batch — Routine Prompt

Self-contained prompt for a scheduled Claude Code routine that adds 40 curated
entries to one CHCS data category per month. Rotate via month number.

Activate via `/schedule` with cron `0 9 1 * *` (first of the month, 09:00).

Iterate this prompt — content tasks always need 2–3 rounds of tuning before
output is consistent. Save changes back here so the routine stays in sync.

---

## Prompt

```
You are adding a monthly batch of curated entries to the CHCS app
(C:\Users\bloks\vibe_apps\CHCS). CHCS is Steven's personal "can't handle
choosing stuff" app — every entry should feel hand-picked, not algorithmic.

## Step 1 — Load context
Read these files in full before doing anything:
- CLAUDE.md (project conventions)
- data/meals.js (first 30 + last 10 entries — for voice)
- data/movies.js (first 30 + last 10 entries — for voice)
- data/travel.js (first 20 + last 10 entries — for voice)
- data/playlists.js (first 20 + last 10 entries — for voice)
- data/books.js (first 20 + last 10 entries — for voice)

## Step 2 — Pick the category for this run
Rotate by current month number (1=January):
- month % 5 == 1 → MOVIES
- month % 5 == 2 → MEALS
- month % 5 == 3 → TRAVEL
- month % 5 == 4 → PLAYLISTS
- month % 5 == 0 → BOOKS

Add exactly 40 new entries to ONE category.

## Step 3 — Find the next ID and existing items
Run `node check-data.js` to confirm the current range.
Continue numbering from the last ID + 1 (e.g. if range is 1–344, start at 345).
Grep the relevant data file for existing titles/names — your new entries
MUST NOT duplicate anything already in there.

## Step 4 — Generate entries

**Exact object shape** — copy from existing entries in the file. No new fields,
no missing fields. Run `node check-data.js` to confirm required fields.

**Tone & voice — CRITICAL**
Read 20 random existing entries before writing. Match the voice:
- Mix Dutch and English naturally, like the existing entries do
- Every pitch/description has ONE specific, memorable detail — not vague praise
- A specific scene ("the bridge scene"), a specific opinion ("better than X"),
  a sensory hook ("smoky"), or a sharp observation ("peasant cooking at its finest")
- Length: 1–2 sentences. Never longer.

**DO NOT WRITE**
- "A great film about..." / "Delicious and easy" / "Must-see"
- "Critically acclaimed" / "Highly rated" / "Award-winning"
- Anything that sounds like a streaming service blurb
- Obvious blockbuster picks already saturated in the data (check first):
  no Shawshank, Inception, Godfather, Pulp Fiction unless you verify they're
  genuinely missing AND you can write a non-obvious pitch
- For meals: no "perfect for any occasion", no generic pasta recipes
- For travel: no Paris/Rome/Barcelona unless a very specific angle

**DO write**
- Movies: hidden gems, 2024–2026 releases, international cinema, cult films
- Meals: ONE specific dish (not a vague "bowl"), with a clear technique or origin
- Travel: places Steven could actually go that aren't on every list
- Playlists: real Spotify playlists with working URLs (verify the URLs exist)

For playlists specifically: the spotifyUrl MUST be a real, working Spotify
playlist URL. Do not invent IDs. If you can't verify, skip playlists this round.

## Step 5 — Append to data file
Add entries directly to the relevant `data/*.js` file before the closing `];`.
Use the same indentation (2 spaces) and exact formatting as existing lines.

## Step 6 — Verify
Run `node check-data.js`. Output MUST be "All data files clean."
If there are issues, fix them. Common pitfalls:
- duplicate IDs (re-check numbering)
- missing required fields
- stray commas creating sparse-array holes

Also bump the `?v=N` cache version in index.html for the file you edited
(e.g. data/movies.js?v=4 → ?v=5).

## Step 7 — Open a PR
- Create branch: `content/[category]-[YYYY-MM]` (e.g. content/movies-2026-06)
- Commit message: `Add [Month YYYY] batch: 40 [category] entries (id-XXX to id-YYY)`
- Open PR with `gh pr create`. Body: short summary, mention that Steven should
  review the curation before merging. Do NOT auto-merge.

## Step 8 — Report
Reply with: PR URL, range of new IDs, and 3 sample entries so Steven can
sanity-check the voice before opening the PR in full.
```

---

## Tuning notes

Track what you change here so the routine stays predictable:

- _2026-05-31_ — initial draft.
