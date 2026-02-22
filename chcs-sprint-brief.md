# CHCS Sprint Brief — Swipe Cards, Mood Entry, Shareable Results

## Context
CHCS is a decision-fatigue app with 6 categories (Food, Movies, Music, Books, Travel, Other). 
We're focusing on Food and Movies only for now. The app currently has app.js, index.html, style.css 
and JSON data files for meals and movies. The other 4 categories should be visually dimmed with 
"Coming soon" labels.

This sprint adds 3 features that make the app feel alive and shareable.

---

## Feature 1: Swipe Cards

### What
Replace or supplement the current recommendation flow with Tinder-style swipeable cards. 
When a user enters Food or Movies, they see a card with the recommendation. They can:
- **Swipe right** (or tap ✓) → Accept this choice
- **Swipe left** (or tap ✗) → Reject, show next card
- Cards should have a slight rotation on drag for that satisfying Tinder feel

### Food Card Layout
```
┌─────────────────────────┐
│  🍝  (large emoji)      │
│                         │
│  Pasta Aglio e Olio     │  ← name, large
│  Italian · 15 min       │  ← cuisine + prep time
│  ○ Easy                 │  ← effort dots (○ ○○ ○○○)
│                         │
│  "Garlic, chili flakes, │  ← description, smaller
│   olive oil, parmesan.  │
│   Embarrassingly simple,│
│   unreasonably good."   │
│                         │
│  🌿 Vegetarian          │  ← dietary badge
│                         │
│    ✗         ✓          │  ← reject / accept buttons
└─────────────────────────┘
```

### Movie Card Layout
```
┌─────────────────────────┐
│  🎬  (large emoji)      │
│                         │
│  The Grand Budapest     │  ← title, large
│  Hotel                  │
│  2014 · Comedy · 99min  │  ← year + genre + runtime
│                         │
│  "A concierge and his   │  ← pitch, smaller
│   lobby boy get tangled │
│   in art theft, murder, │
│   and pastry."          │
│                         │
│  😌 Light               │  ← mood badge
│  📺 Disney+             │  ← streaming platform
│                         │
│    ✗         ✓          │  ← reject / accept buttons
└─────────────────────────┘
```

### Technical Notes
- Use CSS transforms for the swipe animation (translateX + rotate)
- Add touch event listeners for mobile swipe AND click/drag for desktop
- On swipe right (accept): show the "result" screen with shareable card (Feature 3)
- On swipe left (reject): animate card off-screen left, show next card from filtered pool
- Card should tilt slightly in the drag direction (max ~15deg rotation)
- Show a faint green glow on right-drag, red glow on left-drag
- Stack 2-3 cards visually (next card peeks behind current)
- Keep accept/reject buttons below the card as an alternative to swiping

### Data
- Food cards pull from the meals JSON (has: id, name, cuisine, effort, prepTime, dietary, description, ingredients)
- Movie cards pull from the movies JSON (has: id, title, year, genre, mood, runtime, pitch, streaming)
- Randomize order but don't repeat within a session
- Respect any active filters (from mood selection — see Feature 2)

---

## Feature 2: Mood-Based Entry

### What
When the user taps on Food or Movies from the home screen, show a mood selection screen 
BEFORE the swipe cards. This filters the card pool so suggestions feel intentional, not random.

### Mood Options for Food
```
How are you feeling?

[ 😴 Lazy ]        → filters to effort: "easy" AND prepTime <= 20
[ 🙂 Normal ]      → filters to effort: "easy" or "medium"  
[ 👨‍🍳 Adventurous ] → no filter, includes "involved" recipes
[ 🌱 Light ]       → filters to dietary: "vegetarian" or "fish"
[ 🍖 Meaty ]       → filters to dietary: "meat"

[ 🎲 Surprise me ] → no filters, full random
```

### Mood Options for Movies  
```
What's the vibe?

[ 😌 Chill ]          → mood: "light" or "funny"
[ 🔥 Intense ]        → mood: "intense"
[ 🧠 Make me think ]  → mood: "thought-provoking"  
[ 😂 Make me laugh ]  → mood: "funny"
[ ⏱️ Under 2 hours ]  → runtime <= 120

[ 🎲 Surprise me ]    → no filters, full random
```

### Design
- Show as a grid of pill-shaped buttons or rounded cards
- Allow selecting ONE mood (single select, not multi)
- "Surprise me" is always available and slightly visually different (maybe outlined instead of filled)
- After selecting, transition to the swipe card stack with filtered results
- Show a small back arrow or "Change mood" link on the swipe screen to go back

### Technical Notes  
- Mood selection is a simple filter on the JSON data before shuffling
- If a filter returns fewer than 3 results, quietly expand the filter 
  (e.g., if "Lazy" only gives 2 meals, include some "medium" effort ones too)
- Store last selected mood in localStorage so it's pre-selected next time

---

## Feature 3: Shareable Result Cards

### What
When the user accepts a choice (swipes right or taps ✓), show a beautiful "result" screen 
with a card that's designed to be screenshot-worthy and shareable.

### Result Screen Layout
```
┌─────────────────────────────┐
│                             │
│      Tonight we're making   │  ← small text
│                             │
│    Shakshuka                │  ← large, bold
│    🍳                       │
│                             │
│    Middle Eastern · 25 min  │
│    Easy · Vegetarian        │
│                             │
│  ─────────────────────────  │
│                             │
│  Ingredients:               │
│  eieren, tomatenblokjes,    │  ← (for food only)
│  ui, knoflook, komijn,      │
│  paprikapoeder, brood       │
│                             │
│  ─────────────────────────  │
│                             │
│    [ 📋 Copy list ]         │  ← (food only) copies ingredients
│    [ 📸 Share ]             │  ← generates shareable image
│    [ 🔄 Pick again ]        │  ← go back to swipe cards
│                             │
│         CHCS logo           │  ← small, bottom
│                             │
└─────────────────────────────┘
```

For movies, replace ingredients with:
```
│  📺 Available on: Disney+   │
│  🎭 Comedy · 😌 Light       │
│  ⏱️ 99 minutes              │
```

### Share Functionality
When the user taps "Share":
1. Use html2canvas (or a similar library) to render the result card as a PNG image
2. Use the Web Share API (navigator.share) if available — this opens the native share sheet on mobile
3. Fallback: download the image directly
4. The generated image should have:
   - A nice gradient background (warm for food, dark/cinematic for movies)
   - The meal/movie name prominently
   - Key details
   - CHCS branding at the bottom
   - Dimensions optimized for Instagram Stories (1080x1920) or WhatsApp

### Copy Ingredients (Food only)
- "Copy list" button copies the ingredients as a clean text list to clipboard
- Show a brief "Copied! ✓" toast/notification
- Format: one ingredient per line, with quantities if available

### Technical Notes
- html2canvas: `npm install html2canvas` or load from CDN
  https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
- Web Share API: check `navigator.share` exists before using, fallback to download
- The share card should be a hidden div that's rendered off-screen specifically for the screenshot
- Keep the visible result screen clean and functional, the share image is a separate styled version

---

## Visual Updates

### Dim Unused Categories
On the home Browse grid, the categories Music, Books, Travel, Other should be:
- Opacity reduced to 0.45
- Not clickable (or show a toast: "Coming soon!")
- Add a small "Coming soon" label below the subtitle
- Keep Food and Movies full opacity and interactive

### Color Palette Suggestions
- Food cards: warm tones (soft orange/terracotta backgrounds)
- Movie cards: cool/cinematic tones (deep blue/purple backgrounds)
- Accept button: soft green (#4CAF50 or similar)
- Reject button: soft red/grey (#ef5350 or similar)
- Mood pills: use the existing app accent colors

### Animations
- Card entrance: fade up + slight scale (0.95 → 1.0)
- Card swipe out: translateX(±150%) + rotate(±15deg) + fade
- Result screen: card slides up from bottom
- "Copied!" toast: fade in, hold 1.5s, fade out
- Stat counters on home: increment animation when returning from a choice

---

## State Management

### localStorage Keys
```javascript
{
  "chcs_choices_count": 42,          // total choices made (increment on accept)
  "chcs_streak_days": 3,             // consecutive days with at least 1 choice
  "chcs_last_choice_date": "2026-02-15",
  "chcs_food_mood_last": "lazy",     // last selected food mood
  "chcs_movie_mood_last": "chill",   // last selected movie mood
  "chcs_history": [                  // last 50 choices for "don't repeat" logic
    { "id": "meal-002", "type": "food", "date": "2026-02-15", "liked": true },
    { "id": "movie-004", "type": "movie", "date": "2026-02-14", "liked": true }
  ]
}
```

### Don't Repeat Logic
- Don't show items from the last 7 days of history in the swipe stack
- If the pool is too small after filtering (< 5 items), relax to last 3 days
- Rejected items (swiped left) can reappear after 3 days

---

## Implementation Order

1. **Mood selection screens** (Food + Movies) — simplest, sets up the filter pipeline
2. **Swipe card UI** — the core interaction, most impactful
3. **Result screen** — shown on accept
4. **Share image generation** — adds the viral loop
5. **Dim unused categories** — quick visual cleanup
6. **Animations and polish** — micro-interactions, transitions

---

## Libraries Needed
- `html2canvas` (CDN) — for generating share images
- No other external dependencies needed. Pure HTML/CSS/JS with touch events.

---

## Testing Checklist
- [ ] Swipe works on mobile (touch) and desktop (mouse drag)
- [ ] Accept/reject buttons work as swipe alternatives
- [ ] Mood filters correctly reduce the card pool
- [ ] "Surprise me" shows unfiltered results
- [ ] Result screen shows correct details for food vs movie
- [ ] Copy ingredients works and shows toast
- [ ] Share generates a clean image (check on iOS Safari and Chrome)
- [ ] Don't-repeat logic prevents same meal/movie within a week
- [ ] Stats update on home screen after making a choice
- [ ] Dimmed categories show "Coming soon" and aren't interactive
- [ ] Dark mode looks good for all new screens
- [ ] Back navigation from mood → home and swipe → mood works
