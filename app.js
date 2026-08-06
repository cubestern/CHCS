// ============================================================
// CHCS - Can't Handle Choosing Stuff
// ============================================================

// Data loaded from data/meals.js and data/movies.js

// ========== CATEGORY CONFIG ==========
const CATEGORIES = {
  food:   { id: 'food',   name: 'Food',   question: 'What should I eat?',      desc: 'Tonight or plan your whole week',    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`, color: '#FF6B35', cssClass: 'cat-food',   active: true },
  movies: { id: 'movies', name: 'Movies', question: 'What should I watch?',    desc: 'Spin for a random movie pick',        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>`, color: '#E53935', cssClass: 'cat-movies', active: true },
  music:  { id: 'music',  name: 'Music',  question: 'What should I listen to?', desc: 'Curated playlists for every mood',     icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`, color: '#1DB954', cssClass: 'cat-music',  active: true },
  books:  { id: 'books',  name: 'Books',  question: 'What should I read?',      desc: 'Random book recommendations',         icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`, color: '#2196F3', cssClass: 'cat-books',  active: true },
  travel: { id: 'travel', name: 'Travel', question: 'Where should I go?',       desc: 'Random destinations worldwide',       icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`, color: '#00BCD4', cssClass: 'cat-travel', active: true },
  other:  { id: 'other',  name: 'Other',  question: 'Help me choose',           desc: 'Custom options to randomize',         icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`, color: '#9C27B0', cssClass: 'cat-other',  active: true }
};

const FREE_SWIPE_LIMIT = 25; // "Nah, next" swipes per day for free users; accepting is always free
// Friend codes only — paying customers are unlocked by /api/verify-plus after
// Stripe redirects them back, so there is no shared code that can circulate.
const PLUS_CODE_HASHES = ['60d51bda', 'c7fee8bb', 'fb0a462d'];
const PLUS_BUY_URL = ''; // paste the Stripe Payment Link here to show a buy button on the Plus screen
const HISTORY_MAX = 60;

// ── Language ──────────────────────────────────────────────
// English strings are the source; I18N_NL (data/i18n.js) maps them to Dutch.
// t() falls back to the English key, so missing entries never break the UI.
let LANG = localStorage.getItem('chcs_lang') ||
  ((navigator.language || '').toLowerCase().startsWith('nl') ? 'nl' : 'en');
function t(s) {
  return (LANG === 'nl' && typeof I18N_NL !== 'undefined' && I18N_NL[s]) || s;
}
function tf(s, vars) {
  let out = t(s);
  for (const k in vars) out = out.split(`{${k}}`).join(vars[k]);
  return out;
}

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DESIGNS = ['elegant', 'quiet'];

// Emoji, including skin-tone modifiers, ZWJ sequences, keycaps and flags.
// The quiet design strips these; see CHCSApp.stripEmoji.
const EMOJI_PART = '\\p{Extended_Pictographic}(?:\\p{Emoji_Modifier}|\\uFE0F|\\u20E3)*';
const EMOJI_RE = new RegExp(`\\p{RI}\\p{RI}|${EMOJI_PART}(?:\\u200D${EMOJI_PART})*`, 'gu');
// Monochrome glyphs that read as typography rather than emoji, so they stay:
// ♥/♡ mark favourites, and ✓ ✗ → ✦ are not pictographic to begin with.
const EMOJI_KEEP = new Set(['♥', '♡']);
const CUISINES = [...new Set(MEALS.map(m => m.cuisine))].sort();
const GENRES = [...new Set(MOVIES.map(m => m.genre))].sort();
const MOODS = [...new Set(MOVIES.map(m => m.mood))];
const MOOD_LABELS = { light: 'Light', intense: 'Intense', 'thought-provoking': 'Thought-provoking', funny: 'Funny' };
const MOOD_EMOJI = { light: '🌤️', intense: '🔥', 'thought-provoking': '🧠', funny: '😂' };
const EFFORT_EMOJI = { easy: '🟢', medium: '🟡', involved: '🔴' };
const DIETARY_EMOJI = { vegetarian: '🌿', fish: '🐟', meat: '🥩', vegan: '🌱' };

// ============================================================
class CHCSApp {
  constructor() {
    this.theme = localStorage.getItem('chcs_theme') || 'light';
    this.design = CHCSApp.resolveDesign(localStorage.getItem('chcs_design'));
    this.userName = localStorage.getItem('chcs_name') || '';
    this.plus = localStorage.getItem('chcs_plus') === '1';
    this.history = JSON.parse(localStorage.getItem('chcs_history') || '[]');
    this.customOptions = JSON.parse(localStorage.getItem('chcs_custom_options') || '[]');
    this.customLists = JSON.parse(localStorage.getItem('chcs_custom_lists') || '[]');
    this.duo = null;
    this.stats = this.loadStats();
    this.favorites = new Set(JSON.parse(localStorage.getItem('chcs_favorites') || '[]'));
    this.foodFilters = { effort: null, cuisine: null, dietary: null, effortList: null, dietaryList: null, maxPrepTime: null };
    this.movieFilters = { mood: null, genre: null, maxRuntime: null, moodList: null };
    this.foodMode = null;
    this.weekPlan = [];
    this.weekDay = 0;
    this.currentMeal = null;
    this.currentMovie = null;
    this.usedMealIds = new Set();
    this.usedMovieIds = new Set();
    this.currentPlaylist = null;
    this.selectedPlaylistMood = null;
    this.usedPlaylistIds = new Set();
    this.currentTravel = null;
    this.selectedTravelMood = null;
    this.selectedContinents = [];
    this.travelFilters = { mood: null, continents: null };
    this.usedTravelIds = new Set();
    this.currentBook = null;
    this.selectedBookMood = null;
    this.usedBookIds = new Set();
    this.isSpinning = false;
    this.checkedItems = new Set(JSON.parse(localStorage.getItem('chcs_checked') || '[]'));
    document.documentElement.setAttribute('data-theme', this.theme);
    document.documentElement.setAttribute('data-design', this.design);
    localStorage.setItem('chcs_design', this.design);
    this._applyStaticLang();
    // A buyer coming back from Stripe lands on /?plus=<session id>; that takes
    // priority over the normal home/onboarding route.
    if (this._pendingPlusSession()) this._redeemPlusSession();
    else if (!localStorage.getItem('chcs_onboarded')) this.renderOnboarding();
    else this.renderHome();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('chcs_theme', this.theme);
  }

  setLang(lang) {
    LANG = lang;
    localStorage.setItem('chcs_lang', lang);
    this._applyStaticLang();
    this.renderAccount();
  }

  // Translates the static shell (nav labels, <html lang>) outside #mainContent.
  _applyStaticLang() {
    document.documentElement.setAttribute('lang', LANG);
    const nav = { 'nav-home': 'Home', 'nav-search': 'Search', 'nav-favorites': 'Saved', 'nav-account': 'Account' };
    Object.entries(nav).forEach(([id, label]) => {
      const el = document.querySelector(`#${id} span`);
      if (el) el.textContent = t(label);
    });
  }

  // 'classic' was retired; anyone still on it lands back on the default.
  static resolveDesign(stored) {
    return DESIGNS.includes(stored) ? stored : 'elegant';
  }

  // Removes emoji from rendered text. Works on text nodes rather than on the
  // HTML string so attributes, URLs and ids are never touched. Emoji live in
  // ~90 places across the templates and in some playlist titles; doing this
  // once at paint time covers all of them, content included.
  static stripEmoji(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
    for (const node of nodes) {
      let out = node.nodeValue.replace(EMOJI_RE, m => EMOJI_KEEP.has(m) ? m : '');
      if (out === node.nodeValue) continue;
      // Close the gap the emoji left behind.
      out = out.replace(/[ \t]{2,}/g, ' ');
      if (!node.previousSibling) out = out.replace(/^[ \t]+/, '');
      if (!node.nextSibling) out = out.replace(/[ \t]+$/, '');
      node.nodeValue = out;
    }
  }

  _paintInto(el, html) {
    if (!el) return el;
    el.innerHTML = html;
    if (this.design === 'quiet') CHCSApp.stripEmoji(el);
    return el;
  }

  // Every view paints through here instead of touching #mainContent directly,
  // which gives the quiet design a single place to strip emoji from all of them.
  get _screen() {
    const app = this;
    return {
      set innerHTML(html) { app._paintInto(document.getElementById('mainContent'), html); },
    };
  }

  setDesign(design) {
    this.design = CHCSApp.resolveDesign(design);
    design = this.design;
    document.documentElement.setAttribute('data-design', design);
    localStorage.setItem('chcs_design', design);
    // Quiet strips emoji at paint time, so the current view has to be redrawn
    // for the switch to show up rather than waiting for the next navigation.
    this.renderAccount();
  }

  // ── Stats ──────────────────────────────────────────────
  loadStats() {
    const s = localStorage.getItem('chcs_stats');
    return s ? JSON.parse(s) : { choices: 0, weekPlans: 0, streak: 0, lastDate: null };
  }
  saveStats() { localStorage.setItem('chcs_stats', JSON.stringify(this.stats)); }

  recordChoice() {
    const today = new Date().toDateString();
    this.stats.choices++;
    if (this.stats.lastDate !== today) {
      const last = this.stats.lastDate ? new Date(this.stats.lastDate) : null;
      const diff = last ? Math.floor((new Date(today) - last) / 86400000) : 0;
      this.stats.streak = diff <= 1 ? this.stats.streak + 1 : 1;
      this.stats.lastDate = today;
    }
    this.saveStats();
    this._statsDirty = true;
  }

  // ── Choice history ─────────────────────────────────────
  _addHistory(type, label, id = null) {
    this.history.unshift({ t: type, n: label, id, ts: Date.now() });
    if (this.history.length > HISTORY_MAX) this.history.length = HISTORY_MAX;
    localStorage.setItem('chcs_history', JSON.stringify(this.history));
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem('chcs_history');
    this.renderAccount();
  }

  // ── Swipe metering (free vs Plus) ──────────────────────
  _todayKey() { return new Date().toISOString().slice(0, 10); }

  _swipesToday() {
    const s = JSON.parse(localStorage.getItem('chcs_swipes') || '{}');
    return s.date === this._todayKey() ? s.count : 0;
  }

  swipesLeft() { return Math.max(0, FREE_SWIPE_LIMIT - this._swipesToday()); }

  // Returns true if the swipe may proceed. Counts one swipe for free users;
  // when the daily budget is spent, shows the Plus screen instead.
  _gateSwipe() {
    if (this.plus) return true;
    if (this.swipesLeft() <= 0) { this.renderPlus(true); return false; }
    localStorage.setItem('chcs_swipes', JSON.stringify({ date: this._todayKey(), count: this._swipesToday() + 1 }));
    return true;
  }

  _swipesLeftHint() {
    if (this.plus) return '';
    const left = this.swipesLeft();
    if (left > 5) return '';
    const msg = left === 0 ? t('No free swipes left today') : left === 1 ? t('1 free swipe left today') : tf('{n} free swipes left today', { n: left });
    return `<p class="swipes-left-hint">${msg} · <a href="#" onclick="event.preventDefault();app.renderPlus()">${t('Go unlimited')}</a></p>`;
  }

  // ── Food logic ─────────────────────────────────────────
  getFilteredMeals() {
    let pool = MEALS.filter(m => !this.usedMealIds.has(m.id));
    const f = this.foodFilters;
    if (f.effort)      pool = pool.filter(m => m.effort === f.effort);
    if (f.effortList)  pool = pool.filter(m => f.effortList.includes(m.effort));
    if (f.cuisine)     pool = pool.filter(m => m.cuisine === f.cuisine);
    if (f.dietary)     pool = pool.filter(m => m.dietary === f.dietary);
    if (f.dietaryList) pool = pool.filter(m => f.dietaryList.includes(m.dietary));
    if (f.maxPrepTime) pool = pool.filter(m => m.prepTime <= f.maxPrepTime);
    // expand filter if too few results
    if (pool.length < 3 && (f.effort || f.effortList || f.dietary || f.dietaryList || f.maxPrepTime)) {
      const relaxed = MEALS.filter(m => !this.usedMealIds.has(m.id));
      if (relaxed.length >= 3) return relaxed;
    }
    if (pool.length === 0) { this.usedMealIds.clear(); return this.getFilteredMeals(); }
    return pool;
  }
  pickMeal() { const p = this.getFilteredMeals(); return p[Math.floor(Math.random() * p.length)]; }

  // ── Movie logic ────────────────────────────────────────
  getFilteredMovies() {
    let pool = MOVIES.filter(m => !this.usedMovieIds.has(m.id));
    const f = this.movieFilters;
    if (f.mood)       pool = pool.filter(m => m.mood === f.mood);
    if (f.moodList)   pool = pool.filter(m => f.moodList.includes(m.mood));
    if (f.genre)      pool = pool.filter(m => m.genre === f.genre);
    if (f.maxRuntime) pool = pool.filter(m => m.runtime <= f.maxRuntime);
    if (pool.length < 3 && (f.mood || f.moodList || f.maxRuntime)) {
      const relaxed = MOVIES.filter(m => !this.usedMovieIds.has(m.id));
      if (relaxed.length >= 3) return relaxed;
    }
    if (pool.length === 0) { this.usedMovieIds.clear(); return this.getFilteredMovies(); }
    return pool;
  }
  pickMovie() { const p = this.getFilteredMovies(); return p[Math.floor(Math.random() * p.length)]; }

  // ── Surprise Me ────────────────────────────────────────
  surpriseMe() {
    if (Math.random() > 0.5) {
      this.foodFilters = { effort: null, cuisine: null, dietary: null, effortList: null, dietaryList: null, maxPrepTime: null };
      this.foodMode = 'tonight';
      this.currentMeal = this.pickMeal();
      this.renderMealCard();
    } else {
      this.movieFilters = { mood: null, genre: null, maxRuntime: null, moodList: null };
      this.currentMovie = this.pickMovie();
      this.renderMovieCard();
    }
  }

  // ══════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════

  renderHome() {
    localStorage.setItem('chcs_onboarded', '1'); // any route to home counts as onboarded
    const dailyMeal = MEALS[Math.floor(Date.now() / 86400000) % MEALS.length];
    const hour = new Date().getHours();
    const daypart = t(hour < 6 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');
    const showFnFor = { food: 'showFood', movies: 'showMovies', music: 'showMusic', books: 'showBooks', travel: 'showTravel', other: 'showOther' };

    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="home-greeting">
          <span class="home-greeting-label">${daypart}${this.userName ? `, ${this.userName}` : ''}</span>
          <h1 class="home-greeting-title">${t('What are we <em>deciding</em> today?')}</h1>
        </div>
        <div class="hero-card">
          <span class="hero-label">${t('Surprise dinner')}</span>
          <h2 class="hero-title">${dailyMeal.name}</h2>
          <p class="hero-desc">${dailyMeal.description}</p>
          <button class="hero-btn" onclick="app.showDailyMeal()">${t('Show me')} &rarr;</button>
        </div>
        <h3 class="section-title">${t('Browse')}</h3>
        <div class="category-grid stagger-in">
          ${Object.values(CATEGORIES).map(c => `
            <div class="category-card ${c.cssClass}${c.active ? '' : ' coming-soon'}"
                 ${c.active ? `onclick="app.${showFnFor[c.id]}()"` : ''}>
              <div class="category-icon">${c.icon}</div>
              <h4>${t(c.name)}</h4>
              <p>${c.active ? t(c.question) : ''}</p>
              ${c.active ? '' : `<span class="coming-soon-badge">${t('Coming soon')}</span>`}
            </div>
          `).join('')}
        </div>
        <div class="duo-banner" onclick="app.showDuo()">
          <div class="duo-banner-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="duo-banner-text">
            <h4>${t('Duo mode')}</h4>
            <p>${t("Can't agree either? Swipe together, first match wins.")}</p>
          </div>
          <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <p class="home-footer-hint">${t('New features and suggestions added weekly.')}</p>
      </section>`;
    this._updateNav('home');
  }

  // ── Food: mood selection ──────────────────────────────
  showDailyMeal() {
    this.foodMode = 'tonight';
    this.currentMeal = MEALS[Math.floor(Date.now() / 86400000) % MEALS.length];
    this._renderFoodResult(this.currentMeal);
  }

  showFood() {
    this.usedMealIds.clear();
    this.selectedFoodMood = localStorage.getItem('chcs_food_mood_last') || null;
    this._renderFoodMoodScreen();
  }

  _applyFoodMood(mood) {
    this.selectedFoodMood = mood;
    if (mood) localStorage.setItem('chcs_food_mood_last', mood);
    else localStorage.removeItem('chcs_food_mood_last');

    this.foodFilters = { effort: null, cuisine: null, dietary: null, effortList: null, dietaryList: null, maxPrepTime: null };
    if (mood === 'lazy')        { this.foodFilters.effort = 'easy'; this.foodFilters.maxPrepTime = 20; }
    else if (mood === 'normal') { this.foodFilters.effortList = ['easy', 'medium']; }
    else if (mood === 'light')  { this.foodFilters.dietaryList = ['vegetarian', 'fish', 'vegan']; }
    else if (mood === 'meaty')  { this.foodFilters.dietary = 'meat'; }
    // 'adventurous' and 'surprise' → no filters
  }

  selectFoodMood(mood) {
    this._applyFoodMood(mood);
    this.startTonight();
  }

  _renderFoodMoodScreen() {
    const moods = [
      { key: 'lazy',        emoji: '😴', label: 'Lazy',        desc: 'Quick & easy meals' },
      { key: 'normal',      emoji: '🙂', label: 'Normal',      desc: 'Easy to medium effort' },
      { key: 'adventurous', emoji: '👨‍🍳', label: 'Adventurous', desc: 'Bring on the challenge' },
      { key: 'light',       emoji: '🌱', label: 'Light',       desc: 'Veggie, fish & vegan' },
      { key: 'meaty',       emoji: '🍖', label: 'Meaty',       desc: 'Carnivore mode' },
    ];
    const last = this.selectedFoodMood;
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">🍽️</span>
            <h2>${t('How are you feeling?')}</h2>
            <p>${t("Pick a vibe and we'll find something to eat")}</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectFoodMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${t(m.label)}</span>
                <span class="mood-pill-desc">${t(m.desc)}</span>
              </button>`).join('')}
          </div>
          <button class="mood-surprise" onclick="app.selectFoodMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">${t('Surprise me')}</span>
          </button>
        </div>
      </section>`;
  }

  _renderFoodModeScreen() {
    const count = this.getFilteredMeals().length;
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app._renderFoodMoodScreen()')}
        <div class="category-header">
          <div class="category-icon cat-food">${CATEGORIES.food.icon}</div>
          <div class="category-header-text"><h2>Food</h2><p>${count} meals match your vibe</p></div>
        </div>
        <div class="mode-cards">
          <div class="mode-card" onclick="app.startTonight()">
            <div class="mode-icon">🍽️</div>
            <div class="mode-text"><h4>Tonight</h4><p>One meal suggestion</p></div>
            <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div class="mode-card" onclick="app.startWeek()">
            <div class="mode-icon">📅</div>
            <div class="mode-text"><h4>This Week</h4><p>Plan 5 weekday dinners</p></div>
            <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </section>`;
  }

  startTonight() { this.foodMode = 'tonight'; this.currentMeal = this.pickMeal(); this.renderMealCard(); }
  startWeek()    { this.foodMode = 'week'; this.weekPlan = []; this.weekDay = 0; this.checkedItems.clear(); localStorage.removeItem('chcs_checked'); this.currentMeal = this.pickMeal(); this.renderMealCard(); }

  // ── Swipe card engine ────────────────────────────────
  _initSwipe(cardEl, onAccept, onReject) {
    let startX = 0, startY = 0, dx = 0, dragging = false, moved = false;
    const threshold = 80;

    const onStart = (x, y) => { startX = x; startY = y; dx = 0; dragging = true; moved = false; cardEl.style.transition = 'none'; };
    const onMove = (x) => {
      if (!dragging) return;
      dx = x - startX;
      if (Math.abs(dx) > 5) moved = true;
      const rotate = (dx / window.innerWidth) * 15;
      const opacity = Math.min(Math.abs(dx) / threshold, 1);
      cardEl.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
      cardEl.style.boxShadow = dx > 20 ? `0 0 ${20*opacity}px rgba(90,138,74,${0.3*opacity})` :
                                dx < -20 ? `0 0 ${20*opacity}px rgba(184,68,58,${0.3*opacity})` : 'var(--shadow)';
      const acceptHint = cardEl.querySelector('.swipe-hint-accept');
      const rejectHint = cardEl.querySelector('.swipe-hint-reject');
      if (acceptHint) acceptHint.style.opacity = dx > 20 ? opacity : 0;
      if (rejectHint) rejectHint.style.opacity = dx < -20 ? opacity : 0;
    };
    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      cardEl.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease';
      if (dx > threshold) {
        cardEl.style.transform = `translateX(${window.innerWidth}px) rotate(15deg)`;
        cardEl.style.opacity = '0';
        setTimeout(onAccept, 300);
      } else if (dx < -threshold) {
        cardEl.style.transform = `translateX(-${window.innerWidth}px) rotate(-15deg)`;
        cardEl.style.opacity = '0';
        setTimeout(onReject, 300);
      } else {
        cardEl.style.transform = ''; cardEl.style.boxShadow = '';
        const acceptHint = cardEl.querySelector('.swipe-hint-accept');
        const rejectHint = cardEl.querySelector('.swipe-hint-reject');
        if (acceptHint) acceptHint.style.opacity = 0;
        if (rejectHint) rejectHint.style.opacity = 0;
      }
    };

    // Touch events
    cardEl.addEventListener('touchstart', e => { onStart(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    cardEl.addEventListener('touchmove', e => { onMove(e.touches[0].clientX); }, { passive: true });
    cardEl.addEventListener('touchend', onEnd);
    // Mouse events
    cardEl.addEventListener('mousedown', e => { e.preventDefault(); onStart(e.clientX, e.clientY); });
    const mouseMove = e => onMove(e.clientX);
    const mouseUp = () => { onEnd(); document.removeEventListener('mousemove', mouseMove); document.removeEventListener('mouseup', mouseUp); };
    cardEl.addEventListener('mousedown', () => { document.addEventListener('mousemove', mouseMove); document.addEventListener('mouseup', mouseUp); });
  }

  _swipeHints() {
    return `<div class="swipe-hint swipe-hint-accept">✓</div><div class="swipe-hint swipe-hint-reject">✗</div>`;
  }

  // ── Meal card (swipe) ────────────────────────────────
  renderMealCard() {
    const m = this.currentMeal;
    const next = this.pickMeal();
    const isWeek = this.foodMode === 'week';
    const effortDots = m.effort === 'easy' ? '○' : m.effort === 'medium' ? '○○' : '○○○';
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showFood()')}
        ${isWeek ? `
          <div class="week-progress">
            <div class="week-progress-label">${t(WEEKDAYS[this.weekDay])} <span class="week-progress-count">${this.weekDay+1}/5</span></div>
            <div class="week-progress-bar"><div class="week-progress-fill" style="width:${this.weekDay/5*100}%"></div></div>
          </div>` : ''}
        <div class="swipe-stack">
          ${next ? `<div class="swipe-card swipe-card-behind">${this._swipeMealInner(next)}</div>` : ''}
          <div class="swipe-card swipe-card-front" id="swipeCard">
            ${this._swipeHints()}
            ${this._swipeMealInner(m)}
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn action-reject" onclick="app.rejectMeal()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ${t('Nah, next')}
          </button>
          <button class="action-btn action-accept" onclick="app.acceptMeal()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${isWeek ? t("Let's eat this") : t('This one!')}
          </button>
        </div>
        ${!isWeek ? `<button class="plan-week-btn" onclick="app.startWeek()">📅 ${t('Plan this mood for the week — 5 dinners')}</button>` : ''}
        ${this._swipesLeftHint()}
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptMeal(), () => this.rejectMeal());
  }

  _swipeMealInner(m) {
    const effortDots = m.effort === 'easy' ? '○' : m.effort === 'medium' ? '○○' : '○○○';
    return `
      <div class="swipe-card-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
      <h3 class="swipe-card-title">${m.name}</h3>
      <div class="swipe-card-meta">${m.cuisine} · ${m.prepTime} min</div>
      <div class="swipe-card-effort"><span class="effort-dots">${effortDots}</span> ${t(m.effort)}</div>
      <p class="swipe-card-desc">"${m.description}"</p>
      <div class="swipe-card-badge">${DIETARY_EMOJI[m.dietary]} ${t(m.dietary)}</div>`;
  }

  rejectMeal() {
    if (!this._gateSwipe()) return;
    this.usedMealIds.add(this.currentMeal.id);
    this.currentMeal = this.pickMeal();
    this.renderMealCard();
  }

  acceptMeal() {
    this.recordChoice();
    this.usedMealIds.add(this.currentMeal.id);
    if (this.foodMode === 'week') {
      this.weekPlan.push({ day: WEEKDAYS[this.weekDay], meal: this.currentMeal });
      this.weekDay++;
      if (this.weekDay >= 5) { this.stats.weekPlans++; this.saveStats(); this._addHistory('week', 'Week plan · 5 dinners'); this.renderWeekPlan(); return; }
      this.currentMeal = this.pickMeal();
      this.renderMealCard();
    } else {
      this.checkedItems.clear();
      localStorage.removeItem('chcs_checked');
      this._addHistory('food', this.currentMeal.name, this.currentMeal.id);
      this._renderFoodResult(this.currentMeal);
    }
  }

  _renderFoodResult(m) {
    const effortLabel = t(m.effort === 'easy' ? 'Easy' : m.effort === 'medium' ? 'Medium' : 'Involved');
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="result-card result-food">
          <p class="result-label">${t("Tonight we're making")}</p>
          <h2 class="result-title">${m.name}</h2>
          <div class="result-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
          <div class="result-meta">${m.cuisine} · ${m.prepTime} min</div>
          <div class="result-meta">${effortLabel} · ${t(m.dietary)}</div>
          <div class="result-divider"></div>
          <div class="result-ingredients">
            <h4>${t('Ingredients')}</h4>
            <p>${m.ingredients.join(', ')}</p>
          </div>
          <div class="result-divider"></div>
          <div class="result-branding">CHCS</div>
        </div>
        ${this._checklistHTML(m.ingredients)}
        <div class="result-actions">
          ${this._favBtn('food', m.id)}
          <button class="result-action-btn" onclick="app.copyIngredients()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg> ${t('Copy list')}
          </button>
          <button class="result-action-btn" onclick="app.shareResult('food')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> ${t('Share')}
          </button>
          <button class="result-action-btn" onclick="app.startTonight()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg> ${t('Pick again')}
          </button>
        </div>
      </section>`;
    this._buildShareCard('food', m);
  }

  _mealCardHTML(m) {
    return `<div class="meal-card">
      <div class="meal-card-header"><span class="meal-cuisine">${m.cuisine}</span><span class="meal-effort effort-${m.effort}">${EFFORT_EMOJI[m.effort]} ${m.effort}</span></div>
      <h3 class="meal-name">${m.name}</h3><p class="meal-desc">${m.description}</p>
      <div class="meal-meta"><span class="meal-meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${m.prepTime} min</span><span class="meal-meta-item">${DIETARY_EMOJI[m.dietary]} ${m.dietary}</span></div>
      <div class="meal-ingredients"><h5>${t('Shopping list')}</h5><div class="ingredient-tags">${m.ingredients.map(i=>`<span class="ingredient-tag">${i}</span>`).join('')}</div></div>
    </div>`;
  }

  // ── Week plan ──────────────────────────────────────────
  renderWeekPlan() {
    const all = {};
    this.weekPlan.forEach(e => e.meal.ingredients.forEach(i => { all[i.toLowerCase()] = i; }));
    const list = Object.values(all).sort();

    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .4s ease">
        ${this._backBtn('app.showFood()')}
        <div class="accepted-state"><div class="accepted-icon">📅</div><h2>${t('Your week is set!')}</h2></div>
        <div class="week-plan-list">
          ${this.weekPlan.map(e => `
            <div class="week-plan-item">
              <div class="week-plan-day">${t(e.day)}</div>
              <div class="week-plan-meal">
                <span class="week-plan-meal-name">${e.meal.name}</span>
                <span class="week-plan-meal-meta">${e.meal.cuisine} · ${EFFORT_EMOJI[e.meal.effort]} ${t(e.meal.effort)} · ${e.meal.prepTime}m</span>
              </div>
            </div>`).join('')}
        </div>
        ${this._checklistHTML(list, t('Combined shopping list'))}
        <button class="btn btn-primary mt-20" style="width:100%" onclick="app.startWeek()">${t('Plan another week')}</button>
      </section>`;
  }

  // ── Movies: mood selection ─────────────────────────────
  showMovies() {
    this.usedMovieIds.clear();
    this.selectedMovieMood = localStorage.getItem('chcs_movie_mood_last') || null;
    this._renderMovieMoodScreen();
  }

  _applyMovieMood(mood) {
    this.selectedMovieMood = mood;
    if (mood) localStorage.setItem('chcs_movie_mood_last', mood);
    else localStorage.removeItem('chcs_movie_mood_last');

    this.movieFilters = { mood: null, genre: null, maxRuntime: null, moodList: null };
    if (mood === 'chill')         { this.movieFilters.moodList = ['light', 'funny']; }
    else if (mood === 'intense')  { this.movieFilters.mood = 'intense'; }
    else if (mood === 'think')    { this.movieFilters.mood = 'thought-provoking'; }
    else if (mood === 'laugh')    { this.movieFilters.mood = 'funny'; }
    else if (mood === 'short')    { this.movieFilters.maxRuntime = 120; }
    // 'surprise' → no filters
  }

  selectMovieMood(mood) {
    this._applyMovieMood(mood);
    this.currentMovie = this.pickMovie();
    this.renderMovieCard();
  }

  _renderMovieMoodScreen() {
    const moods = [
      { key: 'chill',   emoji: '😌', label: 'Chill',          desc: 'Light & easy vibes' },
      { key: 'intense', emoji: '🔥', label: 'Intense',        desc: 'Edge of your seat' },
      { key: 'think',   emoji: '🧠', label: 'Make me think',  desc: 'Thought-provoking' },
      { key: 'laugh',   emoji: '😂', label: 'Make me laugh',  desc: 'Comedy & fun' },
      { key: 'short',   emoji: '⏱️', label: 'Under 2 hours',  desc: 'Quick watch' },
    ];
    const last = this.selectedMovieMood;
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">🎬</span>
            <h2>${t("What's the vibe?")}</h2>
            <p>${t("Pick a mood and we'll find something to watch")}</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectMovieMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${t(m.label)}</span>
                <span class="mood-pill-desc">${t(m.desc)}</span>
              </button>`).join('')}
          </div>
          <button class="mood-surprise" onclick="app.selectMovieMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">${t('Surprise me')}</span>
          </button>
        </div>
      </section>`;
  }

  // ── Movie card (swipe) ──────────────────────────────────
  renderMovieCard() {
    const m = this.currentMovie;
    const next = this.pickMovie();
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showMovies()')}
        <div class="swipe-stack">
          ${next ? `<div class="swipe-card swipe-card-behind">${this._swipeMovieInner(next)}</div>` : ''}
          <div class="swipe-card swipe-card-front" id="swipeCard">
            ${this._swipeHints()}
            ${this._swipeMovieInner(m)}
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn action-reject" onclick="app.rejectMovie()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ${t('Nah, next')}
          </button>
          <button class="action-btn action-accept" onclick="app.acceptMovie()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${t('This one!')}
          </button>
        </div>
        ${this._swipesLeftHint()}
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptMovie(), () => this.rejectMovie());
  }

  _swipeMovieInner(m) {
    return `
      <div class="swipe-card-emoji">🎬</div>
      <h3 class="swipe-card-title">${m.title}</h3>
      <div class="swipe-card-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
      <p class="swipe-card-desc">"${m.pitch}"</p>
      <div class="swipe-card-badge">${MOOD_EMOJI[m.mood]} ${t(MOOD_LABELS[m.mood])}</div>
      <div class="swipe-card-streaming">${m.streaming.map(s=>`<span class="streaming-badge">${this._sIcon(s)} ${s}</span>`).join('')}</div>`;
  }

  _movieCardHTML(m, id) {
    return `<div class="movie-card"${id ? ` id="${id}"` : ''}>
      <div class="movie-mood-badge mood-${m.mood}">${MOOD_EMOJI[m.mood]} ${MOOD_LABELS[m.mood]}</div>
      <h3 class="movie-title">${m.title}</h3>
      <div class="movie-meta"><span>${m.year}</span><span class="meta-dot">·</span><span>${m.genre}</span><span class="meta-dot">·</span><span>${m.runtime} min</span></div>
      <p class="movie-pitch">${m.pitch}</p>
      <div class="movie-streaming">${m.streaming.map(s=>`<span class="streaming-badge">${this._sIcon(s)} ${s}</span>`).join('')}</div>
    </div>`;
  }

  rejectMovie() {
    if (!this._gateSwipe()) return;
    this.usedMovieIds.add(this.currentMovie.id);
    this.currentMovie = this.pickMovie();
    this.renderMovieCard();
  }

  acceptMovie() {
    this.recordChoice();
    this._addHistory('movie', this.currentMovie.title, this.currentMovie.id);
    this._renderMovieResult(this.currentMovie);
  }

  _renderMovieResult(m) {
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="result-card result-movie">
          <p class="result-label">${t("Tonight we're watching")}</p>
          <h2 class="result-title">${m.title}</h2>
          <div class="result-emoji">🎬</div>
          <div class="result-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
          <div class="result-divider"></div>
          <div class="result-details">
            <p>📺 ${t('Available on:')} ${m.streaming.join(', ')}</p>
            <p>🎭 ${m.genre} · ${MOOD_EMOJI[m.mood]} ${t(MOOD_LABELS[m.mood])}</p>
            <p>⏱️ ${m.runtime} ${t('minutes')}</p>
          </div>
          <div class="result-divider"></div>
          <div class="result-branding">CHCS</div>
        </div>
        <div class="result-actions">
          ${this._favBtn('movie', m.id)}
          <button class="result-action-btn" onclick="app.shareResult('movie')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> ${t('Share')}
          </button>
          <button class="result-action-btn" onclick="app.showMovies()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg> ${t('Pick again')}
          </button>
        </div>
      </section>`;
    this._buildShareCard('movie', m);
  }

  // ── Music: mood selection ──────────────────────────────
  showMusic() {
    this.usedPlaylistIds.clear();
    this.selectedPlaylistMood = localStorage.getItem('chcs_playlist_mood_last') || null;
    this._renderMusicMoodScreen();
  }

  _pickPlaylist(mood) {
    let pool = PLAYLISTS.filter(p => !this.usedPlaylistIds.has(p.id));
    if (mood) pool = pool.filter(p => p.mood === mood);
    if (pool.length === 0) { this.usedPlaylistIds.clear(); return this._pickPlaylist(mood); }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  selectPlaylistMood(mood) {
    this.selectedPlaylistMood = mood;
    if (mood && mood !== 'surprise') localStorage.setItem('chcs_playlist_mood_last', mood);
    else localStorage.removeItem('chcs_playlist_mood_last');
    this.currentPlaylist = this._pickPlaylist(mood === 'surprise' ? null : mood);
    this.renderPlaylistCard();
  }

  _renderMusicMoodScreen() {
    const moods = [
      { key: 'chill',      emoji: '😌', label: 'Chill',      desc: 'Relaxed & mellow' },
      { key: 'energy',     emoji: '⚡', label: 'Energy',     desc: 'High-octane & pumping' },
      { key: 'focus',      emoji: '🎯', label: 'Focus',      desc: 'Concentration mode' },
      { key: 'melancholy', emoji: '🌧️', label: 'Melancholy', desc: 'Feels & introspection' },
    ];
    const last = this.selectedPlaylistMood;
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">🎵</span>
            <h2>${t("What's the mood?")}</h2>
            <p>${t("Pick a vibe and we'll find a playlist")}</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectPlaylistMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${t(m.label)}</span>
                <span class="mood-pill-desc">${t(m.desc)}</span>
              </button>`).join('')}
          </div>
          <button class="mood-surprise" onclick="app.selectPlaylistMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">${t('Surprise me')}</span>
          </button>
        </div>
      </section>`;
  }

  renderPlaylistCard() {
    const p = this.currentPlaylist;
    const moodKey = this.selectedPlaylistMood === 'surprise' ? null : this.selectedPlaylistMood;
    const next = this._pickPlaylist(moodKey);
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showMusic()')}
        <div class="swipe-stack">
          ${next && next.id !== p.id ? `<div class="swipe-card swipe-card-behind">${this._swipePlaylistInner(next)}</div>` : ''}
          <div class="swipe-card swipe-card-front" id="swipeCard">
            ${this._swipeHints()}
            ${this._swipePlaylistInner(p)}
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn action-reject" onclick="app.rejectPlaylist()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ${t('Nah, next')}
          </button>
          <button class="action-btn action-accept" onclick="app.acceptPlaylist()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            ${t('Open in Spotify')}
          </button>
        </div>
        ${this._swipesLeftHint()}
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptPlaylist(), () => this.rejectPlaylist());
  }

  _swipePlaylistInner(p) {
    const moodEmoji = { chill: '😌', energy: '⚡', focus: '🎯', melancholy: '🌧️' };
    return `
      <div class="swipe-card-emoji">${moodEmoji[p.mood] || '🎵'}</div>
      <h3 class="swipe-card-title">${p.name}</h3>
      <div class="swipe-card-meta">${t('by')} ${p.curator} · ${p.trackCount} ${t('tracks')}</div>
      <p class="swipe-card-desc">"${p.vibe}"</p>
      <div class="swipe-card-streaming">${p.tags.slice(0, 3).map(t => `<span class="streaming-badge">${t}</span>`).join('')}</div>`;
  }

  rejectPlaylist() {
    if (!this._gateSwipe()) return;
    this.usedPlaylistIds.add(this.currentPlaylist.id);
    this.currentPlaylist = this._pickPlaylist(this.selectedPlaylistMood === 'surprise' ? null : this.selectedPlaylistMood);
    this.renderPlaylistCard();
  }

  acceptPlaylist() {
    this.recordChoice();
    this._addHistory('playlist', this.currentPlaylist.name, this.currentPlaylist.id);
    window.open(this.currentPlaylist.spotifyUrl, '_blank', 'noopener,noreferrer');
    this._toast(t('Opening in Spotify 🎵'));
  }

  // ── Travel: mood + continent selection ────────────────
  showTravel() {
    this.usedTravelIds.clear();
    this.selectedTravelMood = localStorage.getItem('chcs_travel_mood_last') || null;
    this.selectedContinents = JSON.parse(localStorage.getItem('chcs_travel_continents') || '[]');
    this._renderTravelMoodScreen();
  }

  _applyTravelMood(mood) {
    this.selectedTravelMood = mood;
    if (mood && mood !== 'surprise') localStorage.setItem('chcs_travel_mood_last', mood);
    else localStorage.removeItem('chcs_travel_mood_last');
    this.travelFilters = { mood: null, continents: this.selectedContinents.length ? this.selectedContinents : null };
    if (mood === 'culture')   this.travelFilters.mood = 'culture';
    else if (mood === 'adventure') this.travelFilters.mood = 'adventure';
    else if (mood === 'unwind')    this.travelFilters.mood = 'unwind';
    else if (mood === 'romance')   this.travelFilters.mood = 'romance';
    else if (mood === 'cozy')      this.travelFilters.mood = 'cozy';
    // 'surprise' → no mood filter
  }

  toggleContinent(continent) {
    const idx = this.selectedContinents.indexOf(continent);
    if (idx >= 0) this.selectedContinents.splice(idx, 1);
    else this.selectedContinents.push(continent);
    localStorage.setItem('chcs_travel_continents', JSON.stringify(this.selectedContinents));
    document.querySelectorAll('.continent-pill').forEach(b => {
      const c = b.getAttribute('data-continent');
      b.classList.toggle('active', this.selectedContinents.includes(c));
    });
    const hint = document.getElementById('continent-hint');
    const n = this.selectedContinents.length;
    if (hint) hint.textContent = n ? (n === 1 ? t('1 continent selected') : tf('{n} continents selected', { n })) : t('All continents');
  }

  selectTravelMood(mood) {
    this._applyTravelMood(mood);
    this.currentTravel = this._pickTravel();
    this.renderTravelCard();
  }

  _pickTravel() {
    let pool = TRAVEL.filter(t => !this.usedTravelIds.has(t.id));
    const f = this.travelFilters;
    if (f.mood) pool = pool.filter(t => t.mood === f.mood);
    if (f.continents && f.continents.length) pool = pool.filter(t => f.continents.includes(t.continent));
    // Fallback: relax mood only — continent filter is always respected
    if (pool.length < 3 && f.mood) {
      let relaxed = TRAVEL.filter(t => !this.usedTravelIds.has(t.id));
      if (f.continents && f.continents.length) relaxed = relaxed.filter(t => f.continents.includes(t.continent));
      if (relaxed.length >= 1) return relaxed[Math.floor(Math.random() * relaxed.length)];
    }
    if (pool.length === 0) { this.usedTravelIds.clear(); return this._pickTravel(); }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  _renderTravelMoodScreen() {
    const moods = [
      { key: 'culture',   emoji: '🏛️', label: 'Culture',    desc: 'History, cities & art' },
      { key: 'adventure', emoji: '🧗', label: 'Adventure',  desc: 'Hiking, wild & roads' },
      { key: 'unwind',    emoji: '🌊', label: 'Unwind',     desc: 'Beach, nature & chill' },
      { key: 'romance',   emoji: '💑', label: 'Romance',    desc: 'Dreamy & beautiful' },
      { key: 'cozy',      emoji: '🧣', label: 'Cozy',       desc: 'Gezellig & close to home' },
    ];
    const continents = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'];
    const last = this.selectedTravelMood;
    const sel = this.selectedContinents;
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">✈️</span>
            <h2>${t('Where do you want to go?')}</h2>
            <p>${t("Pick a vibe and we'll find a destination")}</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectTravelMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${t(m.label)}</span>
                <span class="mood-pill-desc">${t(m.desc)}</span>
              </button>`).join('')}
          </div>
          <div class="continent-filter">
            <div class="continent-filter-header">
              <span class="continent-filter-label">${t('Filter by continent')}</span>
              <span class="continent-hint" id="continent-hint">${sel.length ? (sel.length === 1 ? t('1 continent selected') : tf('{n} continents selected', { n: sel.length })) : t('All continents')}</span>
            </div>
            <div class="continent-pills">
              ${continents.map(c => `
                <button class="continent-pill${sel.includes(c)?' active':''}" data-continent="${c}" onclick="app.toggleContinent('${c}')">${t(c)}</button>`).join('')}
            </div>
          </div>
          <button class="mood-surprise" onclick="app.selectTravelMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">${t('Surprise me')}</span>
          </button>
        </div>
      </section>`;
  }

  renderTravelCard() {
    const tr = this.currentTravel;
    const next = this._pickTravel();
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showTravel()')}
        <div class="swipe-stack">
          ${next && next.id !== tr.id ? `<div class="swipe-card swipe-card-behind">${this._swipeTravelInner(next)}</div>` : ''}
          <div class="swipe-card swipe-card-front" id="swipeCard">
            ${this._swipeHints()}
            ${this._swipeTravelInner(tr)}
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn action-reject" onclick="app.rejectTravel()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ${t('Nah, next')}
          </button>
          <button class="action-btn action-accept" onclick="app.acceptTravel()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${t("I'm going!")}
          </button>
        </div>
        ${this._swipesLeftHint()}
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptTravel(), () => this.rejectTravel());
  }

  _swipeTravelInner(tr) {
    const typeEmoji = { 'city trip': '🏙️', 'nature': '🌲', 'beach & coast': '🏖️', 'road trip': '🚗', 'day trip': '🚶' };
    const budgetLabel = { budget: '€', moderate: '€€', expensive: '€€€' };
    return `
      <div class="swipe-card-emoji">${typeEmoji[tr.type] || '✈️'}</div>
      <h3 class="swipe-card-title">${tr.name}</h3>
      <div class="swipe-card-meta">${tr.country} · ${tr.duration}</div>
      <div class="swipe-card-meta">${t(tr.type)} · ${budgetLabel[tr.budget] || tr.budget}</div>
      <p class="swipe-card-desc">"${tr.pitch}"</p>
      <div class="swipe-card-badge">🗺️ ${t(tr.continent)}</div>`;
  }

  rejectTravel() {
    if (!this._gateSwipe()) return;
    this.usedTravelIds.add(this.currentTravel.id);
    this.currentTravel = this._pickTravel();
    this.renderTravelCard();
  }

  acceptTravel() {
    this.recordChoice();
    this.usedTravelIds.add(this.currentTravel.id);
    this._addHistory('travel', this.currentTravel.name, this.currentTravel.id);
    this._renderTravelResult(this.currentTravel);
  }

  _renderTravelResult(tr) {
    const typeEmoji = { 'city trip': '🏙️', 'nature': '🌲', 'beach & coast': '🏖️', 'road trip': '🚗', 'day trip': '🚶' };
    const budgetLabel = { budget: t('Budget (€)'), moderate: t('Moderate (€€)'), expensive: t('Splurge (€€€)') };
    const moodLabel = { culture: `🏛️ ${t('Culture')}`, adventure: `🧗 ${t('Adventure')}`, unwind: `🌊 ${t('Unwind')}`, romance: `💑 ${t('Romance')}`, cozy: `🧣 ${t('Cozy')}` };
    const mapQuery = encodeURIComponent(`${tr.name}, ${tr.country}`);
    const mapUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=7&ie=UTF8&iwloc=&output=embed`;
    const safeName = tr.name.replace(/'/g, "\\'");
    const savedFrom = (localStorage.getItem('chcs_travel_from') || '').replace(/"/g, '&quot;');
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="result-card result-travel">
          <p class="result-label">${t('Next stop')}</p>
          <h2 class="result-title">${tr.name}</h2>
          <div class="result-emoji">${typeEmoji[tr.type] || '✈️'}</div>
          <div class="result-meta">${tr.country} · ${t(tr.continent)}</div>
          <div class="result-meta">${t(tr.type)} · ${tr.duration}</div>
          <div class="result-divider"></div>
          <div class="result-details">
            <p>💰 ${budgetLabel[tr.budget] || tr.budget}</p>
            <p>📅 ${t('Best in:')} ${t(tr.best_season)}</p>
            <p>${moodLabel[tr.mood] || tr.mood}</p>
          </div>
          <div class="result-divider"></div>
          <div class="travel-map-wrap">
            <iframe class="travel-map" src="${mapUrl}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="result-branding">CHCS</div>
        </div>
        <div class="route-planner">
          <div class="route-planner-head">
            <h4>${t('Plan your route')}</h4>
            <span class="route-planner-via">via Rome2Rio</span>
          </div>
          <div class="route-step">
            <span class="route-step-num">1</span>
            <input class="travel-from-input" id="travelFrom" type="text"
              placeholder="${t('Where are you leaving from? e.g. Amsterdam')}"
              value="${savedFrom}" autocomplete="off" autocorrect="off" spellcheck="false"
              aria-label="Departure point">
          </div>
          <div class="route-step">
            <span class="route-step-num">2</span>
            <button class="route-btn" id="routeBtn" onclick="app.openRome2Rio('${safeName}')">
              ${tf('Show routes to {name}', { name: tr.name })}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
          <p class="route-hint" id="routeHint">${t("Enter your departure point, then we'll find trains, flights & driving options.")}</p>
        </div>
        <div class="result-actions">
          ${this._favBtn('travel', tr.id)}
          <button class="result-action-btn" onclick="app.rejectTravel();app.showTravel();">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg> ${t('Pick again')}
          </button>
        </div>
      </section>`;
    this._initRoutePlanner();
  }

  _initRoutePlanner() {
    const input = document.getElementById('travelFrom');
    const btn = document.getElementById('routeBtn');
    if (!input || !btn) return;
    const update = () => {
      const ready = !!input.value.trim();
      btn.classList.toggle('route-btn-ready', ready);
      const hint = document.getElementById('routeHint');
      if (hint) hint.textContent = ready
        ? t("Great — we'll open trains, flights & driving options on Rome2Rio.")
        : t("Enter your departure point, then we'll find trains, flights & driving options.");
    };
    input.addEventListener('input', update);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
    update();
  }

  openRome2Rio(name) {
    const input = document.getElementById('travelFrom');
    const from = (input?.value || '').trim();
    if (!from) {
      if (input) {
        input.focus();
        input.classList.add('input-attention');
        setTimeout(() => input.classList.remove('input-attention'), 700);
      }
      this._toast(t("First tell us where you're leaving from"));
      return;
    }
    localStorage.setItem('chcs_travel_from', from);
    const toSlug = s => s.replace(/\s+/g, '-');
    const url = `https://www.rome2rio.com/map/${encodeURIComponent(toSlug(from))}/${encodeURIComponent(name)}`;
    const win = window.open(url, '_blank');
    if (!win) window.location.href = url;
  }

  // ── Shopping checklist ─────────────────────────────────
  toggleCheck(item) {
    if (this.checkedItems.has(item)) this.checkedItems.delete(item);
    else this.checkedItems.add(item);
    localStorage.setItem('chcs_checked', JSON.stringify([...this.checkedItems]));
    const el = document.querySelector(`[data-item="${CSS.escape(item)}"]`);
    if (el) el.classList.toggle('checked');
  }

  clearChecklist() {
    this.checkedItems.clear();
    localStorage.removeItem('chcs_checked');
    document.querySelectorAll('.checklist-item.checked').forEach(el => el.classList.remove('checked'));
  }

  _checklistHTML(ingredients, title = null) {
    title = title || t('Shopping list');
    const items = ingredients.map(i => {
      const checked = this.checkedItems.has(i) ? ' checked' : '';
      return `<label class="checklist-item${checked}" data-item="${i}" onclick="app.toggleCheck('${i.replace(/'/g, "\\'")}')">
        <span class="checklist-box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
        <span class="checklist-text">${i}</span>
      </label>`;
    }).join('');
    const count = ingredients.filter(i => this.checkedItems.has(i)).length;
    return `<div class="shopping-checklist">
      <div class="checklist-header">
        <h4>${title}</h4>
        <span class="checklist-count">${count}/${ingredients.length}</span>
      </div>
      <div class="checklist-items">${items}</div>
      ${count > 0 ? `<button class="checklist-clear" onclick="app.clearChecklist()">${t('Uncheck all')}</button>` : ''}
    </div>`;
  }

  // ── Copy & Share ───────────────────────────────────────
  copyIngredients() {
    const text = this.currentMeal.ingredients.join('\n');
    navigator.clipboard.writeText(text).then(() => this._toast(t('Copied! ✓')));
  }

  _toast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = this.design === 'quiet'
      ? msg.replace(EMOJI_RE, m => EMOJI_KEEP.has(m) ? m : '').replace(/\s{2,}/g, ' ').trim()
      : msg;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('toast-visible'), 10);
    setTimeout(() => { el.classList.remove('toast-visible'); setTimeout(() => el.remove(), 300); }, 1800);
  }

  _buildShareCard(type, item) {
    const existing = document.getElementById('shareCard');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.id = 'shareCard';
    div.className = `share-card share-card-${type}`;
    if (type === 'food') {
      const m = item;
      this._paintInto(div, `
        <div class="share-card-inner">
          <p class="share-card-label">${t("Tonight we're making")}</p>
          <h2 class="share-card-title">${m.name}</h2>
          <div class="share-card-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
          <p class="share-card-meta">${m.cuisine} · ${m.prepTime} min</p>
          <p class="share-card-meta">${t(m.effort)} · ${t(m.dietary)}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-ingredients">${m.ingredients.join(', ')}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-brand">CHCS</p>
          <p class="share-card-tagline">Can't Handle Choosing Stuff</p>
        </div>`);
    } else {
      const m = item;
      this._paintInto(div, `
        <div class="share-card-inner">
          <p class="share-card-label">${t("Tonight we're watching")}</p>
          <h2 class="share-card-title">${m.title}</h2>
          <div class="share-card-emoji">🎬</div>
          <p class="share-card-meta">${m.year} · ${m.genre} · ${m.runtime} min</p>
          <p class="share-card-meta">${MOOD_EMOJI[m.mood]} ${t(MOOD_LABELS[m.mood])}</p>
          <p class="share-card-meta">📺 ${m.streaming.join(', ')}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-brand">CHCS</p>
          <p class="share-card-tagline">Can't Handle Choosing Stuff</p>
        </div>`);
    }
    document.body.appendChild(div);
  }

  async shareResult(type) {
    const shareEl = document.getElementById('shareCard');
    if (!shareEl || typeof html2canvas === 'undefined') { this._toast(t('Share unavailable')); return; }
    try {
      this._toast(t('Generating image...'));
      const canvas = await html2canvas(shareEl, { scale: 2, backgroundColor: null, useCORS: true });
      canvas.toBlob(async (blob) => {
        if (!blob) { this._toast(t('Failed to generate image')); return; }
        const file = new File([blob], `chcs-${type}-pick.png`, { type: 'image/png' });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: t('My CHCS Pick'), text: type === 'food' ? tf('Tonight I’m making {name}!', { name: this.currentMeal.name }) : tf('Tonight I’m watching {name}!', { name: this.currentMovie.title }) });
            this._toast(t('Shared! 🎉'));
          } catch (e) {
            if (e.name !== 'AbortError') this._downloadBlob(blob, `chcs-${type}-pick.png`);
          }
        } else {
          this._downloadBlob(blob, `chcs-${type}-pick.png`);
        }
      }, 'image/png');
    } catch (e) {
      this._toast(t('Failed to generate image'));
    }
  }

  _downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this._toast(t('Image downloaded! 📸'));
  }

  // ── Shared helpers ─────────────────────────────────────
  _backBtn(action) {
    return `<button class="back-btn" onclick="${action}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> ${t('Back')}</button>`;
  }



  // ── Nav ────────────────────────────────────────────────
  _updateNav(view) {
    document.querySelectorAll('.nav-item[id]').forEach(el => el.classList.remove('active'));
    const map = { home: 'nav-home', search: 'nav-search', favorites: 'nav-favorites', account: 'nav-account' };
    const el = map[view] && document.getElementById(map[view]);
    if (el) el.classList.add('active');
  }

  // ── Favorites ──────────────────────────────────────────
  toggleFavorite(type, id) {
    const key = `${type}:${id}`;
    if (this.favorites.has(key)) { this.favorites.delete(key); this._toast(t('Removed from saved')); }
    else { this.favorites.add(key); this._toast(t('Saved ♥')); }
    localStorage.setItem('chcs_favorites', JSON.stringify([...this.favorites]));
    const btn = document.getElementById('fav-btn');
    if (btn) {
      btn.classList.toggle('active', this.favorites.has(key));
      btn.querySelector('svg').setAttribute('fill', this.favorites.has(key) ? 'currentColor' : 'none');
    }
  }

  _favBtn(type, id) {
    const active = this.favorites.has(`${type}:${id}`);
    return `<button id="fav-btn" class="fav-btn${active ? ' active' : ''}" onclick="app.toggleFavorite('${type}','${id}')">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="${active ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      ${t(active ? 'Saved' : 'Save')}
    </button>`;
  }

  // ── Books: mood selection ──────────────────────────────
  showBooks() {
    this.usedBookIds.clear();
    // Book moods were renamed to English; drop a key stored by an older build.
    const stored = localStorage.getItem('chcs_book_mood_last');
    this.selectedBookMood = stored && BOOKS.some(b => b.mood === stored) ? stored : null;
    if (stored && !this.selectedBookMood) localStorage.removeItem('chcs_book_mood_last');
    this._renderBookMoodScreen();
  }

  _pickBook(mood) {
    let pool = BOOKS.filter(b => !this.usedBookIds.has(b.id));
    if (mood) pool = pool.filter(b => b.mood === mood);
    if (pool.length === 0) {
      this.usedBookIds.clear();
      // A mood matching nothing at all would recurse forever — widen instead.
      if (mood && !BOOKS.some(b => b.mood === mood)) return this._pickBook(null);
      return this._pickBook(mood);
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  selectBookMood(mood) {
    this.selectedBookMood = mood;
    if (mood && mood !== 'surprise') localStorage.setItem('chcs_book_mood_last', mood);
    else localStorage.removeItem('chcs_book_mood_last');
    this.currentBook = this._pickBook(mood === 'surprise' ? null : mood);
    this.renderBookCard();
  }

  _renderBookMoodScreen() {
    const moods = [
      { key: 'gripping',    emoji: '😰', label: 'Gripping',    desc: 'Thriller, crime & horror' },
      { key: 'funny',       emoji: '😂', label: 'Funny',       desc: 'Humour & satire' },
      { key: 'fantasy',     emoji: '🧙', label: 'Fantasy',     desc: 'Fantasy & sci-fi' },
      { key: 'moving',      emoji: '😢', label: 'Moving',      desc: 'Literary & heartfelt' },
      { key: 'non-fiction', emoji: '🔍', label: 'Non-fiction', desc: 'Ideas & memoir' },
    ];
    const last = this.selectedBookMood;
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">📚</span>
            <h2>${t('What should I read?')}</h2>
            <p>${t("Pick a mood and we'll find you a book")}</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectBookMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${t(m.label)}</span>
                <span class="mood-pill-desc">${t(m.desc)}</span>
              </button>`).join('')}
          </div>
          <button class="mood-surprise" onclick="app.selectBookMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">${t('Surprise me')}</span>
          </button>
        </div>
      </section>`;
  }

  renderBookCard() {
    const b = this.currentBook;
    const moodKey = this.selectedBookMood === 'surprise' ? null : this.selectedBookMood;
    const next = this._pickBook(moodKey);
    const moodEmoji = { gripping: '😰', funny: '😂', fantasy: '🧙', moving: '😢', 'non-fiction': '🔍' };
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showBooks()')}
        <div class="swipe-stack">
          ${next && next.id !== b.id ? `<div class="swipe-card swipe-card-behind">${this._swipeBookInner(next)}</div>` : ''}
          <div class="swipe-card swipe-card-front" id="swipeCard">
            ${this._swipeHints()}
            ${this._swipeBookInner(b)}
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn action-reject" onclick="app.rejectBook()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ${t('Nah, next')}
          </button>
          <button class="action-btn action-accept" onclick="app.acceptBook()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            ${t("I'll read this")}
          </button>
        </div>
        ${this._swipesLeftHint()}
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptBook(), () => this.rejectBook());
  }

  _swipeBookInner(b) {
    const moodEmoji = { gripping: '😰', funny: '😂', fantasy: '🧙', moving: '😢', 'non-fiction': '🔍' };
    return `
      <div class="swipe-card-emoji">${moodEmoji[b.mood] || '📚'}</div>
      <h3 class="swipe-card-title">${b.title}</h3>
      <div class="swipe-card-meta">${b.author} · ${b.year} · ${b.pages} p.</div>
      <p class="swipe-card-desc">${b.pitch}</p>`;
  }

  rejectBook() {
    if (!this._gateSwipe()) return;
    this.usedBookIds.add(this.currentBook.id);
    this.currentBook = this._pickBook(this.selectedBookMood === 'surprise' ? null : this.selectedBookMood);
    this.renderBookCard();
  }

  acceptBook() {
    this.recordChoice();
    this._addHistory('book', this.currentBook.title, this.currentBook.id);
    this._renderBookResult(this.currentBook);
  }

  _renderBookResult(b) {
    const moodEmoji = { gripping: '😰', funny: '😂', fantasy: '🧙', moving: '😢', 'non-fiction': '🔍' };
    const moodLabel = { gripping: 'Gripping', funny: 'Funny', fantasy: 'Fantasy', moving: 'Moving', 'non-fiction': 'Non-fiction' };
    const searchUrl = `https://www.goodreads.com/search?q=${encodeURIComponent(b.title + ' ' + b.author)}`;
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="result-card result-book">
          <p class="result-label">${t("You're reading this")}</p>
          <h2 class="result-title">${b.title}</h2>
          <div class="result-emoji">📚</div>
          <div class="result-meta">${b.author} · ${b.year}</div>
          <div class="result-divider"></div>
          <div class="result-details">
            <p>${moodEmoji[b.mood]} ${t(moodLabel[b.mood] || b.mood)}</p>
            <p>📖 ${b.pages} ${t('pages')}</p>
          </div>
          <div class="result-divider"></div>
          <div class="result-branding">CHCS</div>
        </div>
        <div class="result-actions">
          ${this._favBtn('book', b.id)}
          <button class="result-action-btn" onclick="window.open('${searchUrl}','_blank','noopener,noreferrer')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Goodreads
          </button>
          <button class="result-action-btn" onclick="app.showBooks()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg> ${t('Pick again')}
          </button>
        </div>
      </section>`;
  }

  // ── Search ─────────────────────────────────────────────
  renderSearch() {
    this._updateNav('search');
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="search-screen">
          <h2 class="section-title" style="margin-bottom:16px">${t('Search')}</h2>
          <div class="search-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="search-input" id="searchInput" placeholder="${t('Meals, movies, books, destinations…')}" oninput="app._doSearch(this.value)" autofocus>
          </div>
          <div class="search-results" id="searchResults">
            <p class="search-hint">${t('Start typing to explore meals, movies, playlists and destinations.')}</p>
          </div>
        </div>
      </section>`;
  }

  _doSearch(q) {
    const results = document.getElementById('searchResults');
    if (!q.trim()) { this._paintInto(results, `<p class="search-hint">${t('Start typing to explore meals, movies, books, playlists and destinations.')}</p>`); return; }
    const term = q.toLowerCase();
    const meals     = MEALS.filter(m => m.name.toLowerCase().includes(term) || m.cuisine.toLowerCase().includes(term) || (m.description && m.description.toLowerCase().includes(term)));
    const movies    = MOVIES.filter(m => m.title.toLowerCase().includes(term) || m.genre.toLowerCase().includes(term) || (m.pitch && m.pitch.toLowerCase().includes(term)));
    const books     = BOOKS.filter(b => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term) || b.mood.toLowerCase().includes(term) || (b.pitch && b.pitch.toLowerCase().includes(term)));
    const playlists = PLAYLISTS.filter(p => p.name.toLowerCase().includes(term) || p.mood.toLowerCase().includes(term) || (p.vibe && p.vibe.toLowerCase().includes(term)) || p.tags.some(t => t.toLowerCase().includes(term)));
    const travels   = TRAVEL.filter(t => t.name.toLowerCase().includes(term) || t.country.toLowerCase().includes(term) || t.continent.toLowerCase().includes(term) || t.type.toLowerCase().includes(term) || (t.pitch && t.pitch.toLowerCase().includes(term)));
    if (!meals.length && !movies.length && !books.length && !playlists.length && !travels.length) { this._paintInto(results, `<p class="search-hint">${t('No results found.')}</p>`); return; }
    const gap = (prev) => prev ? 'margin-top:20px' : '';
    this._paintInto(results, `
      ${meals.length ? `<h4 class="search-group-label">${t('Meals')} (${meals.length})</h4>${meals.map(m => `
        <div class="search-result-item" onclick="app._openMeal('${m.id}')">
          <div class="sri-title">${m.name}</div>
          <div class="sri-meta">${m.cuisine} · ${t(m.effort)} · ${m.prepTime} min</div>
        </div>`).join('')}` : ''}
      ${movies.length ? `<h4 class="search-group-label" style="${gap(meals.length)}">${t('Movies')} (${movies.length})</h4>${movies.map(m => `
        <div class="search-result-item" onclick="app._openMovie('${m.id}')">
          <div class="sri-title">${m.title}</div>
          <div class="sri-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
        </div>`).join('')}` : ''}
      ${books.length ? `<h4 class="search-group-label" style="${gap(meals.length || movies.length)}">${t('Books')} (${books.length})</h4>${books.map(b => `
        <div class="search-result-item" onclick="app._openBook('${b.id}')">
          <div class="sri-title">${b.title}</div>
          <div class="sri-meta">${b.author} · ${b.year} · ${b.pages} p.</div>
        </div>`).join('')}` : ''}
      ${playlists.length ? `<h4 class="search-group-label" style="${gap(meals.length || movies.length || books.length)}">${t('Playlists')} (${playlists.length})</h4>${playlists.map(p => `
        <div class="search-result-item" onclick="app._openPlaylist('${p.id}')">
          <div class="sri-title">${p.name}</div>
          <div class="sri-meta">${p.mood} · ${t('by')} ${p.curator} · ${p.trackCount} ${t('tracks')}</div>
        </div>`).join('')}` : ''}
      ${travels.length ? `<h4 class="search-group-label" style="${gap(meals.length || movies.length || books.length || playlists.length)}">${t('Destinations')} (${travels.length})</h4>${travels.map(x => `
        <div class="search-result-item" onclick="app._openTravel('${x.id}')">
          <div class="sri-title">${x.name}</div>
          <div class="sri-meta">${x.country} · ${t(x.continent)} · ${t(x.type)}</div>
        </div>`).join('')}` : ''}`);
  }

  // ── Favorites view ──────────────────────────────────────
  renderFavorites() {
    this._updateNav('favorites');
    const favItems = [...this.favorites].map(key => {
      const [type, id] = key.split(':');
      if (type === 'food')   { const m = MEALS.find(x => x.id === id);   return m ? { type, item: m } : null; }
      if (type === 'movie')  { const m = MOVIES.find(x => x.id === id);  return m ? { type, item: m } : null; }
      if (type === 'book')   { const b = BOOKS.find(x => x.id === id);   return b ? { type, item: b } : null; }
      if (type === 'travel') { const t = TRAVEL.find(x => x.id === id);  return t ? { type, item: t } : null; }
      return null;
    }).filter(Boolean);

    const iconFor  = type => ({ food: '🍽️', movie: '🎬', book: '📚', travel: '✈️' }[type] || '📌');
    const titleFor = ({ type, item }) => type === 'movie' ? item.title : type === 'book' ? item.title : item.name;
    const metaFor  = ({ type, item }) => type === 'food' ? `${item.cuisine} · ${item.prepTime} min` : type === 'movie' ? `${item.year} · ${item.genre}` : type === 'book' ? `${item.author} · ${item.year}` : `${item.country} · ${t(item.type)}`;
    const openFn   = ({ type, item }) => type === 'food' ? `app._openMeal('${item.id}')` : type === 'movie' ? `app._openMovie('${item.id}')` : type === 'book' ? `app._openBook('${item.id}')` : `app._openTravel('${item.id}')`;

    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <h2 class="section-title" style="margin-bottom:24px">${t('Saved')}</h2>
        ${favItems.length ? `<div class="fav-list">${favItems.map(fav => `
          <div class="fav-item" onclick="${openFn(fav)}">
            <div class="fav-icon">${iconFor(fav.type)}</div>
            <div class="fav-info">
              <div class="fav-title">${titleFor(fav)}</div>
              <div class="fav-meta">${metaFor(fav)}</div>
            </div>
            <button class="fav-remove" onclick="event.stopPropagation();app.toggleFavorite('${fav.type}','${fav.item.id}');app.renderFavorites()" title="Remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>`).join('')}</div>`
        : `<div class="fav-empty">
            <div class="fav-empty-icon">♡</div>
            <p>${t('Nothing saved yet.')}</p>
            <p class="fav-empty-hint">${t('Tap the heart on any result to save it here.')}</p>
          </div>`}
      </section>`;
  }

  // ── Account ─────────────────────────────────────────────
  _esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  renderAccount() {
    this._updateNav('account');
    const s = this.stats;
    const histIcon = { food: '🍽️', movie: '🎬', book: '📚', travel: '✈️', playlist: '🎵', other: '🎲', week: '📅', duo: '👥' };
    const recent = this.history.slice(0, 8);
    const fmtDate = ts => new Date(ts).toLocaleDateString(LANG === 'nl' ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'short' });
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="account-head">
          <div class="account-avatar account-avatar-sm">${this.userName ? this._esc(this.userName[0].toUpperCase()) : '👤'}</div>
          <div class="account-head-text">
            <input class="account-name-input" id="accountName" type="text" placeholder="${t('Add your name')}"
              value="${this._esc(this.userName)}" maxlength="20" autocomplete="off"
              onchange="app.saveName(this.value)">
            <p class="account-sub">${t(this.plus ? '✦ CHCS Plus member' : 'Free plan · data stays on this device')}</p>
          </div>
        </div>

        ${this.plus
          ? `<div class="plus-active-card">✦ <strong>CHCS Plus</strong> — unlimited swipes. Thanks for the support!</div>`
          : `<div class="plus-cta-card" onclick="app.renderPlus()">
              <div class="plus-cta-text">
                <h4>${t('Go unlimited with CHCS <em>Plus</em>')}</h4>
                <p>${tf('{left} of {max} free swipes left today', { left: this.swipesLeft(), max: FREE_SWIPE_LIMIT })}</p>
              </div>
              <svg class="mode-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>`}

        <h3 class="section-title">${t('Your stats')}</h3>
        <div class="stats-row">
          <div class="stat-card"><span class="stat-number">${s.choices}</span><span class="stat-label">${t('Choices made')}</span></div>
          <div class="stat-card"><span class="stat-number">${s.weekPlans}</span><span class="stat-label">${t('Weeks planned')}</span></div>
          <div class="stat-card"><span class="stat-number">${s.streak}</span><span class="stat-label">${t('Day streak')}</span></div>
        </div>

        <h3 class="section-title">${t('Recent choices')}</h3>
        ${recent.length ? `
          <div class="history-list">
            ${recent.map(h => `
              <div class="history-item">
                <span class="history-icon">${histIcon[h.t] || '📌'}</span>
                <span class="history-name">${this._esc(h.n)}</span>
                <span class="history-date">${fmtDate(h.ts)}</span>
              </div>`).join('')}
          </div>
          <button class="link-btn" onclick="app.clearHistory()">${t('Clear history')}</button>`
        : `<p class="account-empty-hint">${t('Your accepted picks will show up here.')}</p>`}

        <h3 class="section-title">${t('Appearance')}</h3>
        <div class="settings-card">
          <div class="settings-row">
            <span class="settings-label">${t('Theme')}</span>
            <div class="seg">
              <button class="seg-btn${this.theme === 'light' ? ' active' : ''}" data-theme-opt="light" onclick="app.setThemeChoice('light')">${t('Light')}</button>
              <button class="seg-btn${this.theme === 'dark' ? ' active' : ''}" data-theme-opt="dark" onclick="app.setThemeChoice('dark')">${t('Dark')}</button>
            </div>
          </div>
          <div class="settings-row">
            <span class="settings-label">${t('Design')}</span>
            <div class="seg">
              <button class="seg-btn${this.design === 'elegant' ? ' active' : ''}" data-design-opt="elegant" onclick="app.setDesign('elegant')">${t('Elegant')}</button>
              <button class="seg-btn${this.design === 'quiet' ? ' active' : ''}" data-design-opt="quiet" onclick="app.setDesign('quiet')">${t('Quiet')}</button>
            </div>
          </div>
          <div class="settings-row">
            <span class="settings-label">${t('Language')}</span>
            <div class="seg">
              <button class="seg-btn${LANG === 'en' ? ' active' : ''}" onclick="app.setLang('en')">English</button>
              <button class="seg-btn${LANG === 'nl' ? ' active' : ''}" onclick="app.setLang('nl')">Nederlands</button>
            </div>
          </div>
        </div>

        <h3 class="section-title">${t('Sync & backup')}</h3>
        <div class="settings-card">
          <p class="sync-explain">${t('No account needed — everything lives on this device. Move your favorites, history and settings to another device with a sync code.')}</p>
          <div class="sync-actions">
            <button class="btn btn-primary" onclick="app.copySyncCode()">${t('Copy sync code')}</button>
            <button class="btn btn-primary" onclick="app.toggleImportBox()">${t('Import a code')}</button>
          </div>
          <div class="sync-import" id="syncImport" hidden>
            <textarea id="syncImportField" class="sync-textarea" rows="3" placeholder="${t('Paste the sync code from your other device…')}"></textarea>
            <button class="btn btn-primary" onclick="app.importSyncCode()">${t('Import')}</button>
          </div>
        </div>

        <button class="danger-link" onclick="app.resetAllData()">${t('Reset all data on this device')}</button>
      </section>`;
  }

  setThemeChoice(t) {
    this.theme = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('chcs_theme', t);
    document.querySelectorAll('.seg-btn[data-theme-opt]').forEach(b =>
      b.classList.toggle('active', b.getAttribute('data-theme-opt') === t));
  }

  saveName(v) {
    this.userName = v.trim().slice(0, 20);
    if (this.userName) localStorage.setItem('chcs_name', this.userName);
    else localStorage.removeItem('chcs_name');
    this._toast(this.userName ? tf('Hi, {name}! 👋', { name: this.userName }) : t('Name removed'));
  }

  // ── Sync codes (device-to-device, no backend) ──────────
  _syncPayload() {
    return { v: 1, f: [...this.favorites], n: this.userName, p: this.plus ? 1 : 0, s: this.stats, h: this.history };
  }

  copySyncCode() {
    const code = 'CHCS1.' + btoa(unescape(encodeURIComponent(JSON.stringify(this._syncPayload()))));
    navigator.clipboard.writeText(code)
      .then(() => this._toast(t('Sync code copied — paste it on your other device')))
      .catch(() => this._toast(t('Could not copy — try again')));
  }

  toggleImportBox() {
    const el = document.getElementById('syncImport');
    if (!el) return;
    el.hidden = !el.hidden;
    if (!el.hidden) document.getElementById('syncImportField').focus();
  }

  importSyncCode() {
    const raw = (document.getElementById('syncImportField')?.value || '').trim();
    if (!raw.startsWith('CHCS1.')) { this._toast(t("That doesn't look like a CHCS sync code")); return; }
    try {
      const data = JSON.parse(decodeURIComponent(escape(atob(raw.slice(6)))));
      (Array.isArray(data.f) ? data.f : []).forEach(k => this.favorites.add(k));
      localStorage.setItem('chcs_favorites', JSON.stringify([...this.favorites]));
      if (data.n && !this.userName) { this.userName = String(data.n).slice(0, 20); localStorage.setItem('chcs_name', this.userName); }
      if (data.p === 1) { this.plus = true; localStorage.setItem('chcs_plus', '1'); }
      if (data.s) {
        this.stats.choices = Math.max(this.stats.choices, data.s.choices || 0);
        this.stats.weekPlans = Math.max(this.stats.weekPlans, data.s.weekPlans || 0);
        this.stats.streak = Math.max(this.stats.streak, data.s.streak || 0);
        this.saveStats();
      }
      if (Array.isArray(data.h)) {
        const seen = new Set(this.history.map(h => h.ts));
        data.h.filter(h => h && h.ts && !seen.has(h.ts)).forEach(h => this.history.push(h));
        this.history.sort((a, b) => b.ts - a.ts);
        if (this.history.length > HISTORY_MAX) this.history.length = HISTORY_MAX;
        localStorage.setItem('chcs_history', JSON.stringify(this.history));
      }
      this._toast(t('Imported — welcome back ✓'));
      this.renderAccount();
    } catch (e) {
      this._toast(t('Invalid sync code'));
    }
  }

  resetAllData() {
    if (!confirm(t('This clears everything on this device: favorites, history, stats, Plus status and settings. Continue?'))) return;
    Object.keys(localStorage).filter(k => k.startsWith('chcs_')).forEach(k => localStorage.removeItem(k));
    location.reload();
  }

  // ── Onboarding ──────────────────────────────────────────
  renderOnboarding(step = 0) {
    const slides = [
      { emoji: '👋', title: t("Can't handle <em>choosing</em> stuff?"), text: t('Neither can we. CHCS decides what you eat, watch, read and hear — and where you go next. You just show up.') },
      { emoji: '🃏', title: t('Pick a mood, <em>swipe</em>, done'), text: t("Tell us the vibe, swipe away what you don't fancy, and accept the one that clicks. No more endless scrolling past 400 options.") },
      { emoji: '✦', title: t('Free to use, <em>Plus</em> for superfans'), text: tf('You get {n} “nah, next” swipes a day, free — accepting a pick never costs anything. CHCS Plus removes the limit; you’ll find it under Account.', { n: FREE_SWIPE_LIMIT }) },
    ];
    const sl = slides[step];
    const last = step === slides.length - 1;
    this._screen.innerHTML = `
      <section class="view onboarding" style="animation:fadeInUp .3s ease">
        ${last ? '<span class="ob-skip"></span>' : `<button class="ob-skip" onclick="app.finishOnboarding()">${t('Skip')}</button>`}
        <div class="ob-body">
          <div class="ob-emoji">${sl.emoji}</div>
          <h1 class="ob-title">${sl.title}</h1>
          <p class="ob-text">${sl.text}</p>
        </div>
        <div class="ob-footer">
          <div class="ob-dots">${slides.map((_, i) => `<span class="ob-dot${i === step ? ' active' : ''}"></span>`).join('')}</div>
          <button class="hero-btn ob-next" onclick="${last ? 'app.finishOnboarding()' : `app.renderOnboarding(${step + 1})`}">
            ${t(last ? 'Start choosing' : 'Next')} &rarr;
          </button>
        </div>
      </section>`;
  }

  finishOnboarding() {
    localStorage.setItem('chcs_onboarded', '1');
    this.renderHome();
  }

  // ── CHCS Plus ───────────────────────────────────────────
  _hash(s) {
    let x = 5381;
    for (const ch of s) x = (((x << 5) + x) ^ ch.codePointAt(0)) >>> 0;
    return x.toString(16).padStart(8, '0');
  }

  // ── Plus activation after a Stripe purchase ─────────────
  // Stripe returns buyers to /?plus=<checkout session id>. That id proves
  // nothing by itself, so /api/verify-plus asks Stripe whether it was paid —
  // the secret key stays on the server and nothing is stored anywhere.
  _pendingPlusSession() {
    return new URLSearchParams(location.search).get('plus') || '';
  }

  // Drops ?plus= from the address bar so a reload (or a shared screenshot of
  // the URL) does not replay the activation.
  _clearPlusParam() {
    const url = new URL(location.href);
    url.searchParams.delete('plus');
    history.replaceState({}, '', url.pathname + url.search + url.hash);
  }

  async _redeemPlusSession() {
    const id = this._pendingPlusSession();
    localStorage.setItem('chcs_onboarded', '1'); // buyers skip the intro
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="duo-handoff">
          <div class="ob-emoji">✦</div>
          <h2 class="ob-title">${t('Checking your payment…')}</h2>
          <p class="ob-text">${t('One moment — we’re confirming this with Stripe.')}</p>
        </div>
      </section>`;

    let data = {};
    try {
      const r = await fetch(`/api/verify-plus?session_id=${encodeURIComponent(id)}`);
      data = await r.json().catch(() => ({}));
    } catch (e) {
      data = { ok: false, error: 'offline' };
    }
    this._clearPlusParam();

    if (data.ok) {
      this.plus = true;
      localStorage.setItem('chcs_plus', '1');
      this.renderPlus();
      this._toast(t('Welcome to CHCS Plus ✦'));
    } else {
      this._renderPlusFailed(data.error);
    }
  }

  _renderPlusFailed(reason) {
    const hint = {
      not_paid: t('Stripe says this payment didn’t go through.'),
      expired: t('This link has expired. Already paid? Use a sync code from your other device, or send Steven a message.'),
      offline: t('We couldn’t reach the server. Check your connection and open the link again.'),
    }[reason] || t('Something went wrong on our side. If you paid, send Steven a message and he’ll sort it out — nothing is lost.');
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="duo-handoff">
          <div class="ob-emoji">🤔</div>
          <h2 class="ob-title">${t('We couldn’t confirm that payment')}</h2>
          <p class="ob-text">${hint}</p>
          <button class="hero-btn" onclick="app.renderPlus()">${t('Back to CHCS Plus')} &rarr;</button>
        </div>
      </section>`;
  }

  renderPlus(limitHit = false) {
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        ${limitHit ? `<div class="plus-limit-banner">${tf('That’s your {n} free swipes for today. Accepting picks is still free — or go unlimited below. Fresh swipes tomorrow!', { n: FREE_SWIPE_LIMIT })}</div>` : ''}
        <div class="plus-card">
          <p class="result-label">${t('Members only')}</p>
          <h2 class="plus-title">CHCS <em>Plus</em></h2>
          ${this.plus ? `
            <p class="plus-thanks">${t('You’re in ✦ Unlimited swipes, forever. Thanks for supporting a friend’s passion project.')}</p>`
          : `
            <ul class="plus-benefits">
              <li><span>∞</span> ${t('Unlimited “nah, next” swipes, every day')}</li>
              <li><span>✦</span> ${t('Every future perk, first')}</li>
              <li><span>♥</span> ${t('Supports a friend’s passion project')}</li>
            </ul>
            ${PLUS_BUY_URL ? `<a class="btn btn-primary plus-buy-btn" href="${PLUS_BUY_URL}" target="_blank" rel="noopener noreferrer" style="display:block;text-align:center;margin-bottom:14px">${t('Get CHCS Plus — €5, once')}</a>` : ''}
            <div class="plus-code-row">
              <input class="plus-code-input" id="plusCode" type="text" placeholder="${t('Friend code')}" autocomplete="off" autocapitalize="characters" spellcheck="false"
                onkeydown="if(event.key==='Enter')app.activatePlus()">
              <button class="plus-code-btn" onclick="app.activatePlus()">${t('Unlock')}</button>
            </div>
            <p class="plus-note">${t('Plus is invite-only for now — ask Steven for a code. Paid upgrades come later.')}</p>
            ${!limitHit ? `<p class="plus-usage">${tf('{left} of {max} free swipes left today', { left: this.swipesLeft(), max: FREE_SWIPE_LIMIT })}</p>` : ''}`}
        </div>
      </section>`;
  }

  activatePlus() {
    const input = document.getElementById('plusCode');
    const code = (input?.value || '').trim().toUpperCase();
    if (!code) { input?.focus(); return; }
    if (PLUS_CODE_HASHES.includes(this._hash(code))) {
      this.plus = true;
      localStorage.setItem('chcs_plus', '1');
      this._toast(t('Welcome to CHCS Plus ✦'));
      this.renderAccount();
    } else {
      input.classList.add('input-attention');
      setTimeout(() => input.classList.remove('input-attention'), 700);
      this._toast(t('That code doesn’t work — check for typos'));
    }
  }

  // ── Other: custom decision helper ───────────────────────
  showOther() {
    this._renderOtherScreen();
  }

  _saveCustomOptions() { localStorage.setItem('chcs_custom_options', JSON.stringify(this.customOptions)); }
  _saveCustomLists()   { localStorage.setItem('chcs_custom_lists', JSON.stringify(this.customLists)); }

  _renderOtherScreen() {
    const opts = this.customOptions;
    const ready = opts.length >= 2;
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">🎲</span>
            <h2>${t('Can’t decide? We got you.')}</h2>
            <p>${t('Type your own options — CHCS picks one')}</p>
          </div>
        </div>
        <div class="other-card">
          <div class="other-input-row">
            <input class="other-input" id="otherInput" type="text" maxlength="60"
              placeholder="${t(opts.length ? 'Add another option…' : 'e.g. Pizza at Luigi’s')}"
              autocomplete="off" onkeydown="if(event.key==='Enter')app.addCustomOption()">
            <button class="other-add-btn" onclick="app.addCustomOption()" aria-label="Add option">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          ${opts.length ? `
            <div class="other-chips">
              ${opts.map((o, i) => `
                <span class="other-chip">${this._esc(o)}
                  <button class="other-chip-x" onclick="app.removeCustomOption(${i})" aria-label="Remove">×</button>
                </span>`).join('')}
            </div>` : `<p class="other-empty">${t('Add at least two options — dinner spots, paint colours, who does the dishes…')}</p>`}
        </div>
        <button class="spin-btn other-decide${ready ? '' : ' disabled'}" onclick="app.decideOther()">🎲 ${t('Decide for me')}</button>
        ${ready ? `<button class="link-btn" onclick="app.promptSaveList()">${t('Save this list for later')}</button>` : ''}
        <div id="saveListRow"></div>
        ${this.customLists.length ? `
          <h3 class="section-title" style="margin-top:28px">${t('Saved lists')}</h3>
          <div class="saved-lists">
            ${this.customLists.map((l, i) => `
              <div class="saved-list-item" onclick="app.loadCustomList(${i})">
                <div class="fav-info">
                  <div class="fav-title">${this._esc(l.name)}</div>
                  <div class="fav-meta">${l.options.length} ${t('options')}</div>
                </div>
                <button class="fav-remove" onclick="event.stopPropagation();app.deleteCustomList(${i})" title="Delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>`).join('')}
          </div>` : ''}
      </section>`;
    if (!opts.length) document.getElementById('otherInput')?.focus();
  }

  addCustomOption() {
    const input = document.getElementById('otherInput');
    const v = (input?.value || '').trim();
    if (!v) return;
    if (this.customOptions.length >= 20) { this._toast(t('That’s plenty — 20 options max')); return; }
    if (this.customOptions.some(o => o.toLowerCase() === v.toLowerCase())) { this._toast(t('Already on the list')); return; }
    this.customOptions.push(v);
    this._saveCustomOptions();
    this._renderOtherScreen();
    const el = document.getElementById('otherInput');
    if (el) el.focus();
  }

  removeCustomOption(i) {
    this.customOptions.splice(i, 1);
    this._saveCustomOptions();
    this._renderOtherScreen();
  }

  promptSaveList() {
    const row = document.getElementById('saveListRow');
    if (!row) return;
    row.innerHTML = `
      <div class="other-input-row" style="margin-top:10px">
        <input class="other-input" id="listNameInput" type="text" maxlength="30" placeholder="${t('Name this list — e.g. Friday dinner spots')}"
          onkeydown="if(event.key==='Enter')app.confirmSaveList()">
        <button class="other-add-btn" onclick="app.confirmSaveList()" aria-label="Save list">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>`;
    document.getElementById('listNameInput').focus();
  }

  confirmSaveList() {
    const name = (document.getElementById('listNameInput')?.value || '').trim();
    if (!name) return;
    this.customLists.unshift({ name, options: [...this.customOptions] });
    if (this.customLists.length > 12) this.customLists.length = 12;
    this._saveCustomLists();
    this._toast(t('List saved ✓'));
    this._renderOtherScreen();
  }

  loadCustomList(i) {
    this.customOptions = [...this.customLists[i].options];
    this._saveCustomOptions();
    this._toast(tf('Loaded “{name}”', { name: this.customLists[i].name }));
    this._renderOtherScreen();
  }

  deleteCustomList(i) {
    this.customLists.splice(i, 1);
    this._saveCustomLists();
    this._renderOtherScreen();
  }

  decideOther() {
    const opts = [...this.customOptions];
    if (opts.length < 2) { this._toast(t('Add at least two options first')); return; }
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .2s ease">
        <div class="spin-container">
          <p class="result-label" style="margin-bottom:18px">${t('Deciding…')}</p>
          <div class="spin-reel"><div class="spin-title" id="spinTitle">${this._esc(opts[0])}</div></div>
        </div>
      </section>`;
    const el = document.getElementById('spinTitle');
    let delay = 70, elapsed = 0, i = 0;
    const tick = () => {
      i = (i + 1 + Math.floor(Math.random() * (opts.length - 1))) % opts.length;
      el.textContent = opts[i];
      el.classList.remove('spin-tick'); void el.offsetWidth; el.classList.add('spin-tick');
      elapsed += delay; delay *= 1.14;
      if (elapsed < 2400) setTimeout(tick, delay);
      else {
        el.classList.add('spin-final');
        setTimeout(() => this._renderOtherResult(opts[i]), 900);
      }
    };
    setTimeout(tick, delay);
  }

  _renderOtherResult(choice) {
    this.recordChoice();
    this._addHistory('other', choice);
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showOther()')}
        <div class="result-card result-other">
          <p class="result-label">${t('The decision is made')}</p>
          <h2 class="result-title">${this._esc(choice)}</h2>
          <div class="result-emoji">🎲</div>
          <p class="result-meta">${t('No takebacks — that’s the whole point.')}</p>
          <div class="result-divider"></div>
          <div class="result-branding">CHCS</div>
        </div>
        <div class="result-actions">
          <button class="result-action-btn" onclick="app.decideOther()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg> ${t('Spin again')}
          </button>
          <button class="result-action-btn" onclick="app.showOther()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> ${t('Edit options')}
          </button>
        </div>
      </section>`;
  }

  // ── Duo mode: swipe together, first match wins ──────────
  _duoConfig() {
    return {
      movies: { label: 'Movies', emoji: '🎬', desc: 'What are we watching?', pool: MOVIES, inner: m => this._swipeMovieInner(m), name: m => m.title,
                open: m => { this.currentMovie = m; this._renderMovieResult(m); } },
      food:   { label: 'Food', emoji: '🍽️', desc: 'What are we eating?', pool: MEALS, inner: m => this._swipeMealInner(m), name: m => m.name,
                open: m => { this.currentMeal = m; this.foodMode = 'tonight'; this._renderFoodResult(m); } },
      travel: { label: 'Travel', emoji: '✈️', desc: 'Where are we going?', pool: TRAVEL, inner: t => this._swipeTravelInner(t), name: t => t.name,
                open: t => { this.currentTravel = t; this._renderTravelResult(t); } },
    };
  }

  _sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  }

  showDuo() {
    const cfg = this._duoConfig();
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">👥</span>
            <h2>${t('Duo mode')}</h2>
            <p>${t('You both swipe the same 8 cards — a match decides')}</p>
          </div>
          <div class="mood-grid stagger-in" style="grid-template-columns:1fr">
            ${Object.entries(cfg).map(([key, c]) => `
              <button class="mood-pill duo-pick" onclick="app.startDuo('${key}')">
                <span class="mood-pill-emoji">${c.emoji}</span>
                <span class="mood-pill-label">${t(c.label)}</span>
                <span class="mood-pill-desc">${t(c.desc)}</span>
              </button>`).join('')}
          </div>
        </div>
        <div class="duo-how">
          <div class="duo-how-step"><span>1</span> ${t('Player 1 likes or passes 8 cards')}</div>
          <div class="duo-how-step"><span>2</span> ${t('Pass the phone — player 2 swipes the same cards')}</div>
          <div class="duo-how-step"><span>3</span> ${t('A shared like wins. No match? Rematch.')}</div>
        </div>
      </section>`;
  }

  startDuo(type) {
    const cfg = this._duoConfig()[type];
    this.duo = { type, deck: this._sample(cfg.pool, 8), phase: 1, idx: 0, likes: [new Set(), new Set()] };
    this._renderDuoRound();
  }

  _renderDuoRound() {
    const d = this.duo;
    const cfg = this._duoConfig()[d.type];
    const item = d.deck[d.idx];
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .25s ease">
        ${this._backBtn('app.showDuo()')}
        <div class="week-progress">
          <div class="week-progress-label">${tf('Player {n}', { n: d.phase })} <span class="week-progress-count">${tf('card {i}/{total}', { i: d.idx + 1, total: d.deck.length })}</span></div>
          <div class="week-progress-bar"><div class="week-progress-fill" style="width:${d.idx / d.deck.length * 100}%"></div></div>
        </div>
        <div class="swipe-stack">
          ${d.idx + 1 < d.deck.length ? `<div class="swipe-card swipe-card-behind">${cfg.inner(d.deck[d.idx + 1])}</div>` : ''}
          <div class="swipe-card swipe-card-front" id="swipeCard">
            ${this._swipeHints()}
            ${cfg.inner(item)}
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn action-reject" onclick="app.duoMark(false)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ${t('Pass')}
          </button>
          <button class="action-btn action-accept" onclick="app.duoMark(true)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ${t('Like')}
          </button>
        </div>
        <p class="duo-secret-hint">${t(d.phase === 2 ? 'No peeking at player 1’s likes — the match reveals itself' : 'Like as many as you want — player 2 never sees them')}</p>
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.duoMark(true), () => this.duoMark(false));
  }

  duoMark(liked) {
    const d = this.duo;
    if (!d) return;
    if (liked) d.likes[d.phase - 1].add(d.deck[d.idx].id);
    d.idx++;
    if (d.idx < d.deck.length) { this._renderDuoRound(); return; }
    if (d.phase === 1) { d.phase = 2; d.idx = 0; this._renderDuoHandoff(); }
    else this._renderDuoResults();
  }

  _renderDuoHandoff() {
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="duo-handoff">
          <div class="ob-emoji">🤝</div>
          <h2 class="ob-title">${t('Player 1 is done!')}</h2>
          <p class="ob-text">${tf('Pass the phone. Player 2 swipes the same {n} cards — first shared like wins.', { n: this.duo.deck.length })}</p>
          <button class="hero-btn" onclick="app._renderDuoRound()">${t('I’m player 2 — let’s go')} &rarr;</button>
        </div>
      </section>`;
  }

  _renderDuoResults() {
    const d = this.duo;
    const cfg = this._duoConfig()[d.type];
    const matches = d.deck.filter(item => d.likes[0].has(item.id) && d.likes[1].has(item.id));
    if (!matches.length) {
      this._screen.innerHTML = `
        <section class="view" style="animation:fadeInUp .3s ease">
          <div class="duo-handoff">
            <div class="ob-emoji">😅</div>
            <h2 class="ob-title">${t('No match…')}</h2>
            <p class="ob-text">${t('You two are officially impossible. New deck, new chance?')}</p>
            <button class="hero-btn" onclick="app.startDuo('${d.type}')">${t('Rematch')} &rarr;</button>
            <button class="link-btn" onclick="app.renderHome()">${t('Give up (go home)')}</button>
          </div>
        </section>`;
      return;
    }
    const winner = matches[Math.floor(Math.random() * matches.length)];
    this.recordChoice();
    this._addHistory('duo', `${cfg.name(winner)} (duo)`, winner.id);
    const others = matches.filter(m => m.id !== winner.id);
    this._screen.innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="duo-match-banner">${t('✨ It’s a match!')}</div>
        <div class="swipe-stack">
          <div class="swipe-card swipe-card-front duo-winner">${cfg.inner(winner)}</div>
        </div>
        ${others.length ? `<p class="duo-others">${t('You also both liked:')} ${others.map(m => this._esc(cfg.name(m))).join(', ')}</p>` : ''}
        <div class="card-actions" style="margin-top:14px">
          <button class="action-btn action-reject" onclick="app.startDuo('${d.type}')">
            ${t('Play again')}
          </button>
          <button class="action-btn action-accept" id="duoOpenBtn">
            ${t('See details')}
          </button>
        </div>
      </section>`;
    document.getElementById('duoOpenBtn').addEventListener('click', () => cfg.open(winner));
  }

  // ── Item openers (safe for onclick attributes) ─────────
  _openMeal(id) {
    this.currentMeal = MEALS.find(x => x.id === id);
    this.foodMode = 'tonight';
    this._renderFoodResult(this.currentMeal);
  }

  _openMovie(id) {
    this.currentMovie = MOVIES.find(x => x.id === id);
    this._renderMovieResult(this.currentMovie);
  }

  _openPlaylist(id) {
    this.currentPlaylist = PLAYLISTS.find(x => x.id === id);
    this.selectedPlaylistMood = null;
    this.renderPlaylistCard();
  }

  _openTravel(id) {
    this.currentTravel = TRAVEL.find(x => x.id === id);
    this._renderTravelResult(this.currentTravel);
  }

  _openBook(id) {
    this.currentBook = BOOKS.find(x => x.id === id);
    this.selectedBookMood = null;
    this._renderBookResult(this.currentBook);
  }

  _sIcon(p) {
    return { 'Netflix':'🔴', 'Disney+':'🏰', 'Amazon Prime':'📦', 'HBO Max':'🟪', 'MUBI':'🎞️' }[p] || '📺';
  }
}

const app = new CHCSApp();
