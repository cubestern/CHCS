// ============================================================
// CHCS - Can't Handle Choosing Stuff
// ============================================================

// Data loaded from data/meals.js and data/movies.js

// ========== CATEGORY CONFIG ==========
const CATEGORIES = {
  food:   { id: 'food',   name: 'Food',   question: 'What should I eat?',      desc: 'Tonight or plan your whole week',    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`, color: '#FF6B35', cssClass: 'cat-food',   active: true },
  movies: { id: 'movies', name: 'Movies', question: 'What should I watch?',    desc: 'Spin for a random movie pick',        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>`, color: '#E53935', cssClass: 'cat-movies', active: true },
  music:  { id: 'music',  name: 'Music',  question: 'What should I listen to?', desc: 'Curated playlists for every mood',     icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`, color: '#1DB954', cssClass: 'cat-music',  active: false },
  books:  { id: 'books',  name: 'Books',  question: 'What should I read?',      desc: 'Random book recommendations',         icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`, color: '#2196F3', cssClass: 'cat-books',  active: false },
  travel: { id: 'travel', name: 'Travel', question: 'Where should I go?',       desc: 'Random destinations worldwide',       icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`, color: '#00BCD4', cssClass: 'cat-travel', active: false },
  other:  { id: 'other',  name: 'Other',  question: 'Help me choose',           desc: 'Custom options to randomize',         icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`, color: '#9C27B0', cssClass: 'cat-other',  active: false }
};

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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
    this.isSpinning = false;
    this.checkedItems = new Set(JSON.parse(localStorage.getItem('chcs_checked') || '[]'));
    document.documentElement.setAttribute('data-theme', this.theme);
    this.renderHome();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('chcs_theme', this.theme);
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
    const picks = [
      { cat: 'food',   title: 'Cooking Adventure', desc: 'Try a random recipe tonight or plan your whole week.' },
      { cat: 'movies', title: 'Movie Night',       desc: 'Spin the wheel and find something great to watch.' },
      { cat: 'food',   title: 'Surprise Dinner',   desc: 'A gentle nudge towards something delicious.' },
      { cat: 'movies', title: 'Cinema Roulette',   desc: 'Let fate pick your evening entertainment.' },
    ];
    const pick = picks[Math.floor(Date.now() / 86400000) % picks.length];

    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="hero-card">
          <span class="hero-label">TODAY'S PICK</span>
          <h2 class="hero-title">${pick.title}</h2>
          <p class="hero-desc">${pick.desc}</p>
          <button class="hero-btn" onclick="app.${pick.cat === 'food' ? 'showFood' : 'showMovies'}()">Start now &rarr;</button>
        </div>
        <div class="stats-row">
          <div class="stat-card"><span class="stat-number">${this.stats.choices}</span><span class="stat-label">Choices made</span></div>
          <div class="stat-card"><span class="stat-number">${this.stats.streak}</span><span class="stat-label">Day streak</span></div>
        </div>
        <h3 class="section-title">Browse</h3>
        <div class="category-grid stagger-in">
          ${Object.values(CATEGORIES).map(c => `
            <div class="category-card ${c.cssClass}${c.active ? '' : ' coming-soon'}"
                 ${c.active ? `onclick="app.${c.id === 'food' ? 'showFood' : 'showMovies'}()"` : ''}>
              <div class="category-icon">${c.icon}</div>
              <h4>${c.name}</h4>
              <p>${c.active ? c.question : ''}</p>
              ${c.active ? '' : '<span class="coming-soon-badge">Coming soon</span>'}
            </div>
          `).join('')}
        </div>
      </section>`;
    this._updateNav('home');
    if (this._statsDirty) {
      this._statsDirty = false;
      document.querySelectorAll('.stat-number').forEach(el => el.classList.add('stat-pop'));
    }
  }

  // ── Food: mood selection ──────────────────────────────
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
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">🍽️</span>
            <h2>How are you feeling?</h2>
            <p>Pick a vibe and we'll find something to eat</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectFoodMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${m.label}</span>
                <span class="mood-pill-desc">${m.desc}</span>
              </button>`).join('')}
          </div>
          <button class="mood-surprise" onclick="app.selectFoodMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">Surprise me</span>
          </button>
        </div>
      </section>`;
  }

  _renderFoodModeScreen() {
    const count = this.getFilteredMeals().length;
    document.getElementById('mainContent').innerHTML = `
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
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.showFood()')}
        ${isWeek ? `
          <div class="week-progress">
            <div class="week-progress-label">${WEEKDAYS[this.weekDay]} <span class="week-progress-count">${this.weekDay+1}/5</span></div>
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
            Nah, next
          </button>
          <button class="action-btn action-accept" onclick="app.acceptMeal()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${isWeek ? "Let's eat this" : "This one!"}
          </button>
        </div>
        ${!isWeek ? `<button class="plan-week-btn" onclick="app.startWeek()">📅 Plan this mood for the week — 5 dinners</button>` : ''}
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptMeal(), () => this.rejectMeal());
  }

  _swipeMealInner(m) {
    const effortDots = m.effort === 'easy' ? '○' : m.effort === 'medium' ? '○○' : '○○○';
    return `
      <div class="swipe-card-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
      <h3 class="swipe-card-title">${m.name}</h3>
      <div class="swipe-card-meta">${m.cuisine} · ${m.prepTime} min</div>
      <div class="swipe-card-effort"><span class="effort-dots">${effortDots}</span> ${m.effort}</div>
      <p class="swipe-card-desc">"${m.description}"</p>
      <div class="swipe-card-badge">${DIETARY_EMOJI[m.dietary]} ${m.dietary}</div>`;
  }

  rejectMeal() {
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
      if (this.weekDay >= 5) { this.stats.weekPlans++; this.saveStats(); this.renderWeekPlan(); return; }
      this.currentMeal = this.pickMeal();
      this.renderMealCard();
    } else {
      this.checkedItems.clear();
      localStorage.removeItem('chcs_checked');
      this._renderFoodResult(this.currentMeal);
    }
  }

  _renderFoodResult(m) {
    const effortLabel = m.effort === 'easy' ? 'Easy' : m.effort === 'medium' ? 'Medium' : 'Involved';
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="result-card result-food">
          <p class="result-label">Tonight we're making</p>
          <h2 class="result-title">${m.name}</h2>
          <div class="result-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
          <div class="result-meta">${m.cuisine} · ${m.prepTime} min</div>
          <div class="result-meta">${effortLabel} · ${m.dietary}</div>
          <div class="result-divider"></div>
          <div class="result-ingredients">
            <h4>Ingredients</h4>
            <p>${m.ingredients.join(', ')}</p>
          </div>
          <div class="result-divider"></div>
          <div class="result-branding">CHCS</div>
        </div>
        ${this._checklistHTML(m.ingredients)}
        <div class="result-actions">
          ${this._favBtn('food', m.id)}
          <button class="result-action-btn" onclick="app.copyIngredients()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg> Copy list
          </button>
          <button class="result-action-btn" onclick="app.shareResult('food')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share
          </button>
          <button class="result-action-btn" onclick="app.startTonight()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg> Pick again
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
      <div class="meal-ingredients"><h5>Shopping list</h5><div class="ingredient-tags">${m.ingredients.map(i=>`<span class="ingredient-tag">${i}</span>`).join('')}</div></div>
    </div>`;
  }

  // ── Week plan ──────────────────────────────────────────
  renderWeekPlan() {
    const all = {};
    this.weekPlan.forEach(e => e.meal.ingredients.forEach(i => { all[i.toLowerCase()] = i; }));
    const list = Object.values(all).sort();

    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .4s ease">
        ${this._backBtn('app.showFood()')}
        <div class="accepted-state"><div class="accepted-icon">📅</div><h2>Your week is set!</h2></div>
        <div class="week-plan-list">
          ${this.weekPlan.map(e => `
            <div class="week-plan-item">
              <div class="week-plan-day">${e.day}</div>
              <div class="week-plan-meal">
                <span class="week-plan-meal-name">${e.meal.name}</span>
                <span class="week-plan-meal-meta">${e.meal.cuisine} · ${EFFORT_EMOJI[e.meal.effort]} ${e.meal.effort} · ${e.meal.prepTime}m</span>
              </div>
            </div>`).join('')}
        </div>
        ${this._checklistHTML(list, 'Combined shopping list')}
        <button class="btn btn-primary mt-20" style="width:100%" onclick="app.startWeek()">Plan another week</button>
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
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="mood-screen">
          <div class="mood-header">
            <span class="mood-header-icon">🎬</span>
            <h2>What's the vibe?</h2>
            <p>Pick a mood and we'll find something to watch</p>
          </div>
          <div class="mood-grid stagger-in">
            ${moods.map(m => `
              <button class="mood-pill${last===m.key?' active':''}" onclick="app.selectMovieMood('${m.key}')">
                <span class="mood-pill-emoji">${m.emoji}</span>
                <span class="mood-pill-label">${m.label}</span>
                <span class="mood-pill-desc">${m.desc}</span>
              </button>`).join('')}
          </div>
          <button class="mood-surprise" onclick="app.selectMovieMood('surprise')">
            <span class="mood-pill-emoji">🎲</span>
            <span class="mood-pill-label">Surprise me</span>
          </button>
        </div>
      </section>`;
  }

  // ── Movie card (swipe) ──────────────────────────────────
  renderMovieCard() {
    const m = this.currentMovie;
    const next = this.pickMovie();
    document.getElementById('mainContent').innerHTML = `
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
            Nah, next
          </button>
          <button class="action-btn action-accept" onclick="app.acceptMovie()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            This one!
          </button>
        </div>
      </section>`;
    this._initSwipe(document.getElementById('swipeCard'), () => this.acceptMovie(), () => this.rejectMovie());
  }

  _swipeMovieInner(m) {
    return `
      <div class="swipe-card-emoji">🎬</div>
      <h3 class="swipe-card-title">${m.title}</h3>
      <div class="swipe-card-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
      <p class="swipe-card-desc">"${m.pitch}"</p>
      <div class="swipe-card-badge">${MOOD_EMOJI[m.mood]} ${MOOD_LABELS[m.mood]}</div>
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
    this.usedMovieIds.add(this.currentMovie.id);
    this.currentMovie = this.pickMovie();
    this.renderMovieCard();
  }

  acceptMovie() {
    this.recordChoice();
    this._renderMovieResult(this.currentMovie);
  }

  _renderMovieResult(m) {
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        ${this._backBtn('app.renderHome()')}
        <div class="result-card result-movie">
          <p class="result-label">Tonight we're watching</p>
          <h2 class="result-title">${m.title}</h2>
          <div class="result-emoji">🎬</div>
          <div class="result-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
          <div class="result-divider"></div>
          <div class="result-details">
            <p>📺 Available on: ${m.streaming.join(', ')}</p>
            <p>🎭 ${m.genre} · ${MOOD_EMOJI[m.mood]} ${MOOD_LABELS[m.mood]}</p>
            <p>⏱️ ${m.runtime} minutes</p>
          </div>
          <div class="result-divider"></div>
          <div class="result-branding">CHCS</div>
        </div>
        <div class="result-actions">
          ${this._favBtn('movie', m.id)}
          <button class="result-action-btn" onclick="app.shareResult('movie')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share
          </button>
          <button class="result-action-btn" onclick="app.showMovies()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg> Pick again
          </button>
        </div>
      </section>`;
    this._buildShareCard('movie', m);
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

  _checklistHTML(ingredients, title = 'Shopping list') {
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
      ${count > 0 ? `<button class="checklist-clear" onclick="app.clearChecklist()">Uncheck all</button>` : ''}
    </div>`;
  }

  // ── Copy & Share ───────────────────────────────────────
  copyIngredients() {
    const text = this.currentMeal.ingredients.join('\n');
    navigator.clipboard.writeText(text).then(() => this._toast('Copied! ✓'));
  }

  _toast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
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
      div.innerHTML = `
        <div class="share-card-inner">
          <p class="share-card-label">Tonight we're making</p>
          <h2 class="share-card-title">${m.name}</h2>
          <div class="share-card-emoji">${DIETARY_EMOJI[m.dietary] === '🐟' ? '🐟' : DIETARY_EMOJI[m.dietary] === '🌱' ? '🥗' : '🍽️'}</div>
          <p class="share-card-meta">${m.cuisine} · ${m.prepTime} min</p>
          <p class="share-card-meta">${m.effort} · ${m.dietary}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-ingredients">${m.ingredients.join(', ')}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-brand">CHCS</p>
          <p class="share-card-tagline">Can't Handle Choosing Stuff</p>
        </div>`;
    } else {
      const m = item;
      div.innerHTML = `
        <div class="share-card-inner">
          <p class="share-card-label">Tonight we're watching</p>
          <h2 class="share-card-title">${m.title}</h2>
          <div class="share-card-emoji">🎬</div>
          <p class="share-card-meta">${m.year} · ${m.genre} · ${m.runtime} min</p>
          <p class="share-card-meta">${MOOD_EMOJI[m.mood]} ${MOOD_LABELS[m.mood]}</p>
          <p class="share-card-meta">📺 ${m.streaming.join(', ')}</p>
          <div class="share-card-divider"></div>
          <p class="share-card-brand">CHCS</p>
          <p class="share-card-tagline">Can't Handle Choosing Stuff</p>
        </div>`;
    }
    document.body.appendChild(div);
  }

  async shareResult(type) {
    const shareEl = document.getElementById('shareCard');
    if (!shareEl || typeof html2canvas === 'undefined') { this._toast('Share unavailable'); return; }
    try {
      this._toast('Generating image...');
      const canvas = await html2canvas(shareEl, { scale: 2, backgroundColor: null, useCORS: true });
      canvas.toBlob(async (blob) => {
        if (!blob) { this._toast('Failed to generate image'); return; }
        const file = new File([blob], `chcs-${type}-pick.png`, { type: 'image/png' });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: 'My CHCS Pick', text: type === 'food' ? `Tonight I'm making ${this.currentMeal.name}!` : `Tonight I'm watching ${this.currentMovie.title}!` });
            this._toast('Shared! 🎉');
          } catch (e) {
            if (e.name !== 'AbortError') this._downloadBlob(blob, `chcs-${type}-pick.png`);
          }
        } else {
          this._downloadBlob(blob, `chcs-${type}-pick.png`);
        }
      }, 'image/png');
    } catch (e) {
      this._toast('Failed to generate image');
    }
  }

  _downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this._toast('Image downloaded! 📸');
  }

  // ── Shared helpers ─────────────────────────────────────
  _backBtn(action) {
    return `<button class="back-btn" onclick="${action}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back</button>`;
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
    if (this.favorites.has(key)) { this.favorites.delete(key); this._toast('Removed from saved'); }
    else { this.favorites.add(key); this._toast('Saved ♥'); }
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
      ${active ? 'Saved' : 'Save'}
    </button>`;
  }

  // ── Search ─────────────────────────────────────────────
  renderSearch() {
    this._updateNav('search');
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <div class="search-screen">
          <h2 class="section-title" style="margin-bottom:16px">Search</h2>
          <div class="search-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="search-input" id="searchInput" placeholder="Meals, movies…" oninput="app._doSearch(this.value)" autofocus>
          </div>
          <div class="search-results" id="searchResults">
            <p class="search-hint">Start typing to explore meals and movies.</p>
          </div>
        </div>
      </section>`;
  }

  _doSearch(q) {
    const results = document.getElementById('searchResults');
    if (!q.trim()) { results.innerHTML = '<p class="search-hint">Start typing to explore meals and movies.</p>'; return; }
    const term = q.toLowerCase();
    const meals = MEALS.filter(m => m.name.toLowerCase().includes(term) || m.cuisine.toLowerCase().includes(term) || (m.description && m.description.toLowerCase().includes(term)));
    const movies = MOVIES.filter(m => m.title.toLowerCase().includes(term) || m.genre.toLowerCase().includes(term) || (m.pitch && m.pitch.toLowerCase().includes(term)));
    if (!meals.length && !movies.length) { results.innerHTML = '<p class="search-hint">No results found.</p>'; return; }
    results.innerHTML = `
      ${meals.length ? `<h4 class="search-group-label">Meals (${meals.length})</h4>${meals.map(m => `
        <div class="search-result-item" onclick="app.currentMeal=MEALS.find(x=>x.id===${JSON.stringify(m.id)});app.foodMode='tonight';app._renderFoodResult(app.currentMeal)">
          <div class="sri-title">${m.name}</div>
          <div class="sri-meta">${m.cuisine} · ${m.effort} · ${m.prepTime} min</div>
        </div>`).join('')}` : ''}
      ${movies.length ? `<h4 class="search-group-label" style="margin-top:${meals.length ? '20px' : '0'}">Movies (${movies.length})</h4>${movies.map(m => `
        <div class="search-result-item" onclick="app.currentMovie=MOVIES.find(x=>x.id===${JSON.stringify(m.id)});app._renderMovieResult(app.currentMovie)">
          <div class="sri-title">${m.title}</div>
          <div class="sri-meta">${m.year} · ${m.genre} · ${m.runtime} min</div>
        </div>`).join('')}` : ''}`;
  }

  // ── Favorites view ──────────────────────────────────────
  renderFavorites() {
    this._updateNav('favorites');
    const favItems = [...this.favorites].map(key => {
      const [type, id] = key.split(':');
      if (type === 'food') { const m = MEALS.find(x => x.id === id); return m ? { type, item: m } : null; }
      if (type === 'movie') { const m = MOVIES.find(x => x.id === id); return m ? { type, item: m } : null; }
      return null;
    }).filter(Boolean);

    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <h2 class="section-title" style="margin-bottom:24px">Saved</h2>
        ${favItems.length ? `<div class="fav-list">${favItems.map(({ type, item }) => `
          <div class="fav-item" onclick="app.${type === 'food' ? `currentMeal=MEALS.find(x=>x.id===${JSON.stringify(item.id)});app.foodMode='tonight';app._renderFoodResult(app.currentMeal)` : `currentMovie=MOVIES.find(x=>x.id===${JSON.stringify(item.id)});app._renderMovieResult(app.currentMovie)`}">
            <div class="fav-icon">${type === 'food' ? '🍽️' : '🎬'}</div>
            <div class="fav-info">
              <div class="fav-title">${type === 'food' ? item.name : item.title}</div>
              <div class="fav-meta">${type === 'food' ? `${item.cuisine} · ${item.prepTime} min` : `${item.year} · ${item.genre}`}</div>
            </div>
            <button class="fav-remove" onclick="event.stopPropagation();app.toggleFavorite('${type}','${item.id}');app.renderFavorites()" title="Remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>`).join('')}</div>`
        : `<div class="fav-empty">
            <div class="fav-empty-icon">♡</div>
            <p>Nothing saved yet.</p>
            <p class="fav-empty-hint">Tap the heart on any result to save it here.</p>
          </div>`}
      </section>`;
  }

  // ── Account ─────────────────────────────────────────────
  renderAccount() {
    this._updateNav('account');
    document.getElementById('mainContent').innerHTML = `
      <section class="view" style="animation:fadeInUp .3s ease">
        <h2 class="section-title" style="margin-bottom:24px">Account</h2>
        <div class="account-placeholder">
          <div class="account-avatar">👤</div>
          <p class="account-coming">Account settings</p>
          <p class="account-hint">Coming soon — sync your picks, manage preferences, and more.</p>
        </div>
      </section>`;
  }

  _sIcon(p) {
    return { 'Netflix':'🔴', 'Disney+':'🏰', 'Amazon Prime':'📦', 'HBO Max':'🟪', 'MUBI':'🎞️' }[p] || '📺';
  }
}

const app = new CHCSApp();
