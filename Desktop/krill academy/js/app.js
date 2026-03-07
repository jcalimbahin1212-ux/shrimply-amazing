/* ============================================
   krill academy — main engine
   the fourth flagship of shrimpify
   ============================================ */
(function () {
  'use strict';

  // ── global namespace ──────────────────────────────────────────────
  window.KRILL = window.KRILL || {};
  var K = window.KRILL;
  K.lessons = K.lessons || {};
  K.data    = K.data    || {};

  // ── quotes ────────────────────────────────────────────────────────
  var QUOTES = [
    'why my shrimp here',
    'she shrimp on my shrimp till i shrimp',
    'shrimp-based learning is the future',
    'the shrimp council has spoken',
    'you just got krilled',
    'krill or be krilled',
    'shrimply the best academy',
    '404: shrimp not found',
    'powered by pure shrimp energy',
    'krill vibes only',
    'shrimp happens',
    'certified krill moment',
    'respect the krill protocol',
    'shrimp mode activated',
    'the krill curriculum awaits',
    'shrimp your way to an a+',
    'every krill counts',
    'no shrimp left behind',
    'shrimpify your study habits',
    'enter the krillverse',
    'shrimp responsibly',
    'the ocean called — it wants you to study',
    'you have been krilled successfully',
    'shrimp-pilled and krill-maxxing',
    'brine and grind',
    'plankton has nothing on us',
    'this is peak krill performance',
    'may the krill be with you',
    'decapod energy detected',
    'crustacean education at its finest',
    'shrimplicity is key',
    'the krill never stops',
    'knowledge is stored in the shrimp',
    'shrimply built different',
  ];

  // ── nav pages definition ──────────────────────────────────────────
  var NAV_PAGES = [
    { id: 'home',       label: 'home',         icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10"/></svg>' },
    { id: 'learn',      label: 'learn',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="13" y2="11"/></svg>' },
    { id: 'noteshelf',  label: 'noteshelf',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>' },
    { id: 'tools',      label: 'tools',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' },
    { id: 'writer',     label: 'writer',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>' },
    { id: 'sources',    label: 'sources',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
    { id: 'reference',  label: 'reference',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
    { id: 'study',      label: 'study',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
    { id: 'whiteboard', label: 'whiteboard',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="7" x2="7" y2="7.01"/><line x1="12" y1="7" x2="17" y2="7"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="17" x2="13" y2="17"/></svg>' },
    { id: 'planner',    label: 'planner',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>' },
    { id: 'gpa',        label: 'gpa tracker',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
    { id: 'habits',     label: 'habits',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
    { id: '_divider' },
    { id: 'settings',   label: 'settings',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="10" cy="18" r="2" fill="currentColor"/></svg>' },
  ];

  // ── state ─────────────────────────────────────────────────────────
  var state = {
    currentPage: 'home',
    particlesOn: false,
    shapesOn: false,
    cursorGlowOn: false,
    cloakActive: true,
    mouseX: 0,
    mouseY: 0,
  };
  K.state = state;

  // ── settings persistence ──────────────────────────────────────────
  function loadSettings() {
    try {
      var o = JSON.parse(localStorage.getItem('krill-settings') || '{}');
      if (o.particlesOn !== undefined)  state.particlesOn  = o.particlesOn;
      if (o.shapesOn !== undefined)     state.shapesOn     = o.shapesOn;
      if (o.cursorGlowOn !== undefined) state.cursorGlowOn = o.cursorGlowOn;
      if (o.cloakActive !== undefined)  state.cloakActive  = o.cloakActive;
    } catch (_) { /* ignore */ }
  }
  function saveSettings() {
    localStorage.setItem('krill-settings', JSON.stringify({
      particlesOn: state.particlesOn,
      shapesOn: state.shapesOn,
      cursorGlowOn: state.cursorGlowOn,
      cloakActive: state.cloakActive,
    }));
  }
  loadSettings();

  // ── dom helpers ───────────────────────────────────────────────────
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class')     e.className = attrs[k];
        else if (k === 'html') e.innerHTML = attrs[k];
        else if (k === 'text') e.textContent = attrs[k];
        else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
        else e.setAttribute(k, attrs[k]);
      });
    }
    if (kids) {
      if (typeof kids === 'string') e.innerHTML = kids;
      else if (Array.isArray(kids)) kids.forEach(function (c) { if (c) e.appendChild(c); });
    }
    return e;
  }

  function randomQuote() {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }

  // ── lesson/completion helpers ─────────────────────────────────────
  function getCompleted() {
    try { return JSON.parse(localStorage.getItem('krill-completed') || '[]'); }
    catch (_) { return []; }
  }
  function setCompleted(arr) {
    localStorage.setItem('krill-completed', JSON.stringify(arr));
  }
  function isLessonCompleted(subj, idx) {
    return getCompleted().indexOf(subj + ':' + idx) !== -1;
  }
  function markLessonCompleted(subj, idx) {
    var c = getCompleted();
    var key = subj + ':' + idx;
    if (c.indexOf(key) === -1) { c.push(key); setCompleted(c); }
  }

  function getAllLessons() {
    var all = [];
    Object.keys(K.lessons).forEach(function (subj) {
      var s = K.lessons[subj];
      if (s && s.lessons) {
        s.lessons.forEach(function (l, i) {
          all.push({ subject: subj, subjectName: s.name || subj, index: i, lesson: l });
        });
      }
    });
    return all;
  }

  function getAllQuizQuestions() {
    var qs = [];
    getAllLessons().forEach(function (entry) {
      if (entry.lesson.quiz && entry.lesson.quiz.length) {
        entry.lesson.quiz.forEach(function (q) {
          qs.push({ subject: entry.subjectName, question: q });
        });
      }
    });
    return qs;
  }

  function countStats() {
    var lessons = getAllLessons();
    var subjects = Object.keys(K.lessons).length;
    var quizzes = 0;
    lessons.forEach(function (e) { if (e.lesson.quiz && e.lesson.quiz.length) quizzes++; });
    var toolCount = 12;
    return { lessons: lessons.length, subjects: subjects, quizzes: quizzes, tools: toolCount };
  }

  // ── toast ─────────────────────────────────────────────────────────
  K.toast = function (msg) {
    var container = $('#toast-container');
    if (!container) return;
    var t = el('div', { class: 'toast', text: msg });
    container.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3200);
  };

  // ── cloaking ──────────────────────────────────────────────────────
  function applyCloak() {
    var link = $('link[rel="icon"]');
    if (state.cloakActive) {
      document.title = 'Google Docs';
      if (link) link.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
    } else {
      document.title = 'krill academy';
      if (link) link.href = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">🦐</text></svg>');
    }
  }

  // ── navigation ────────────────────────────────────────────────────
  function buildNav() {
    var nav = $('#sidebar-nav');
    if (!nav) return;
    nav.innerHTML = '';
    NAV_PAGES.forEach(function (p) {
      if (p.id === '_divider') {
        nav.appendChild(el('div', { class: 'nav-divider' }));
        return;
      }
      var link = el('a', {
        class: 'nav-link' + (state.currentPage === p.id ? ' active' : ''),
        'data-page': p.id,
        html: p.icon + '<span>' + p.label + '</span>',
      });
      link.addEventListener('click', function (e) {
        e.preventDefault();
        navigate(p.id);
      });
      nav.appendChild(link);
    });
  }

  function navigate(page) {
    state.currentPage = page;
    $$('.nav-link').forEach(function (n) {
      n.classList.toggle('active', n.getAttribute('data-page') === page);
    });
    renderPage(page);
  }
  K.navigate = navigate;

  // ── page renderer dispatch ────────────────────────────────────────
  function renderPage(page) {
    var content = $('#content');
    if (!content) return;
    content.innerHTML = '';
    var wrapper = el('div', { class: 'page active' });
    content.appendChild(wrapper);

    var renderers = {
      home:       renderHome,
      learn:      renderLearn,
      noteshelf:  renderNoteshelf,
      tools:      renderTools,
      writer:     renderWriter,
      sources:    renderSources,
      reference:  renderReference,
      study:      renderStudy,
      whiteboard: renderWhiteboard,
      planner:    renderPlanner,
      gpa:        renderGPA,
      habits:     renderHabits,
      settings:   renderSettings,
    };
    var fn = renderers[page];
    if (fn) fn(wrapper);
  }

  /* ================================================================
     PAGE: HOME
     ================================================================ */
  function renderHome(container) {
    var stats = countStats();
    var shrimpSVG = '<svg width="64" height="64" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'
      + '<path d="M8 5L3 1.5"/><path d="M8 5L2 4"/>'
      + '<circle cx="7" cy="6.5" r="1" fill="currentColor" stroke="none"/>'
      + '<path d="M10 5C8 3.5 5.5 3.5 5 6C4.5 8.5 7 10 10 9"/>'
      + '<path d="M10 9C14 10 17 13 17 17C17 20 15 23 12 24"/>'
      + '<path d="M14.5 12C13.5 13.5 13 15 13 16.5"/>'
      + '<path d="M16 15.5C15 17 14 18.5 13 19.5"/>'
      + '<path d="M15 19C14 20 13 21.5 12 22"/>'
      + '<path d="M14 12.5L16.5 14"/><path d="M15.5 16L17.5 17.5"/><path d="M14.5 19.5L16.5 21"/>'
      + '<path d="M12 24L8.5 27.5"/><path d="M12 24L12 28.5"/><path d="M12 24L15.5 27"/>'
      + '</svg>';

    container.innerHTML = ''
      + '<div class="hero">'
      +   '<div class="hero-icon">' + shrimpSVG + '</div>'
      +   '<h1 class="hero-title">krill academy</h1>'
      +   '<p class="hero-subtitle">' + randomQuote() + '</p>'
      +   '<p class="hero-tagline">the fourth flagship of shrimpify</p>'
      + '</div>'
      + '<div class="quick-actions" id="home-actions"></div>'
      + '<div class="home-stats" id="home-stats"></div>';

    // quick action cards
    var actions = [
      { page: 'learn',     title: 'learn',     desc: 'browse lessons & quizzes',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>' },
      { page: 'noteshelf', title: 'noteshelf', desc: 'your personal notebook',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
      { page: 'sources',   title: 'sources',   desc: 'find & save references',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
      { page: 'tools',     title: 'tools',     desc: 'calculators & utilities',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15 1.65 1.65 0 003.17 14H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.37.55.98.93 1.51 1H21a2 2 0 010 4h-.09"/></svg>' },
      { page: 'writer',    title: 'writer',    desc: 'ai-powered writing tools',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>' },
      { page: 'study',     title: 'study',     desc: 'flashcards & review',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
      { page: 'habits',   title: 'habits',   desc: 'track daily habits & streaks', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
    ];

    var grid = $('#home-actions', container);
    actions.forEach(function (a) {
      var card = el('div', { class: 'action-card', 'data-page': a.page });
      card.innerHTML = '<div class="card-icon">' + a.icon + '</div>'
        + '<span class="card-title">' + a.title + '</span>'
        + '<span class="card-desc">' + a.desc + '</span>';
      card.addEventListener('click', function () { navigate(a.page); });
      grid.appendChild(card);
    });

    // stats bar
    var statsBar = $('#home-stats', container);
    var statItems = [
      { num: stats.lessons,  label: 'lessons' },
      { num: stats.subjects, label: 'subjects' },
      { num: stats.quizzes,  label: 'quizzes' },
      { num: stats.tools,    label: 'tools' },
    ];
    statItems.forEach(function (s) {
      var card = el('div', { class: 'stat-card' });
      card.innerHTML = '<span class="stat-number" data-target="' + s.num + '">0</span><span class="stat-label">' + s.label + '</span>';
      statsBar.appendChild(card);
    });
    // animate stat numbers
    setTimeout(function () {
      $$('.stat-number', container).forEach(function (numEl) {
        var target = parseInt(numEl.getAttribute('data-target')) || 0;
        if (!target) { numEl.textContent = '0'; return; }
        var cur = 0;
        var step = Math.max(1, Math.ceil(target / 30));
        var iv = setInterval(function () {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(iv); }
          numEl.textContent = cur;
        }, 30);
      });
    }, 200);
  }

  /* ================================================================
     PAGE: LEARN
     ================================================================ */
  function renderLearn(container) {
    container.innerHTML = ''
      + '<div class="page-header"><h2>learn</h2><p class="page-desc">browse lessons across all subjects</p></div>'
      + '<div class="learn-controls">'
      +   '<input type="text" class="input-field" id="learn-search" placeholder="search lessons...">'
      +   '<select class="input-field" id="learn-subject"><option value="">all subjects</option></select>'
      +   '<select class="input-field" id="learn-category"><option value="">all categories</option></select>'
      + '</div>'
      + '<div class="lesson-grid" id="learn-grid"></div>'
      + '<div class="lesson-viewer hidden" id="lesson-viewer"></div>';

    // populate subject dropdown
    var subjSel = $('#learn-subject', container);
    Object.keys(K.lessons).forEach(function (key) {
      var o = el('option', { value: key, text: (K.lessons[key].name || key).toLowerCase() });
      subjSel.appendChild(o);
    });

    function updateCategories() {
      var catSel = $('#learn-category', container);
      catSel.innerHTML = '<option value="">all categories</option>';
      var subj = subjSel.value;
      var cats = {};
      getAllLessons().forEach(function (e) {
        if (subj && e.subject !== subj) return;
        if (e.lesson.cat) cats[e.lesson.cat] = true;
      });
      Object.keys(cats).sort().forEach(function (c) {
        catSel.appendChild(el('option', { value: c, text: c.toLowerCase() }));
      });
    }

    subjSel.addEventListener('change', function () { updateCategories(); buildLessonGrid(container); });
    updateCategories();

    $('#learn-search', container).addEventListener('input', function () { buildLessonGrid(container); });
    $('#learn-category', container).addEventListener('change', function () { buildLessonGrid(container); });

    buildLessonGrid(container);
  }
  K.renderLearn = renderLearn;

  function buildLessonGrid(container) {
    var grid   = $('#learn-grid', container);
    var viewer = $('#lesson-viewer', container);
    grid.innerHTML = '';
    grid.style.display = '';
    viewer.classList.add('hidden');
    // show controls
    var ctrl = $('.learn-controls', container);
    if (ctrl) ctrl.style.display = '';

    var search     = ($('#learn-search', container) || {}).value || '';
    search = search.toLowerCase();
    var subjFilter = ($('#learn-subject', container) || {}).value || '';
    var catFilter  = ($('#learn-category', container) || {}).value || '';

    getAllLessons().forEach(function (entry) {
      var l = entry.lesson;
      if (subjFilter && entry.subject !== subjFilter) return;
      if (catFilter && l.cat !== catFilter) return;
      if (search && l.title.toLowerCase().indexOf(search) === -1) return;

      var completed = isLessonCompleted(entry.subject, entry.index);
      var card = el('div', { class: 'lesson-card' });
      card.innerHTML = ''
        + '<div class="lesson-card-subject">' + entry.subjectName + '</div>'
        + '<div class="lesson-card-title">' + l.title.toLowerCase() + '</div>'
        + '<div class="lesson-card-cat">' + (l.cat || '').toLowerCase() + '</div>'
        + (completed ? '<span class="lesson-card-badge completed">done</span>' : '<span class="lesson-card-badge">new</span>');
      card.addEventListener('click', function () {
        openLesson(container, entry);
      });
      grid.appendChild(card);
    });

    if (!grid.children.length) {
      grid.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem;padding:20px;">no lessons found.</p>';
    }
  }

  function openLesson(container, entry) {
    var grid   = $('#learn-grid', container);
    var viewer = $('#lesson-viewer', container);
    var ctrl   = $('.learn-controls', container);
    grid.style.display = 'none';
    if (ctrl) ctrl.style.display = 'none';
    viewer.classList.remove('hidden');

    var l = entry.lesson;
    viewer.innerHTML = ''
      + '<button class="back-btn" id="lesson-back">&larr; back to lessons</button>'
      + '<div class="page-header">'
      +   '<div class="lesson-card-subject" style="margin-bottom:6px;">' + entry.subjectName + '</div>'
      +   '<h2>' + l.title.toLowerCase() + '</h2>'
      +   '<p class="page-desc">' + (l.cat || '').toLowerCase() + '</p>'
      + '</div>'
      + '<div class="lesson-content">' + (l.content || '<p>no content available.</p>') + '</div>'
      + (l.quiz && l.quiz.length ? '<div class="lesson-quiz" id="lesson-quiz"></div>' : '');

    $('#lesson-back', viewer).addEventListener('click', function () {
      buildLessonGrid(container);
    });

    if (l.quiz && l.quiz.length) {
      renderQuiz($('#lesson-quiz', viewer), l.quiz, entry.subject, entry.index);
    }
  }

  function renderQuiz(quizEl, questions, subj, idx) {
    quizEl.innerHTML = '<h3 style="font-size:1.1rem;color:var(--accent-hover);margin-bottom:16px;">quiz</h3>';
    var totalQ   = questions.length;
    var answered = 0;
    var correct  = 0;

    questions.forEach(function (q, qi) {
      var qDiv = el('div', { class: 'quiz-question' });
      qDiv.innerHTML = '<div class="quiz-q">' + (qi + 1) + '. ' + q.q + '</div><div class="quiz-options" data-qi="' + qi + '"></div>';
      var optsDiv = qDiv.querySelector('.quiz-options');

      q.options.forEach(function (opt, oi) {
        var btn = el('button', { class: 'quiz-option', text: opt });
        btn.addEventListener('click', function () {
          if (btn.classList.contains('disabled')) return;
          answered++;
          var isCorrect = (oi === q.answer);
          if (isCorrect) correct++;

          $$('.quiz-option', optsDiv).forEach(function (b, bi) {
            b.classList.add('disabled');
            if (bi === q.answer) b.classList.add('correct');
            else if (bi === oi && !isCorrect) b.classList.add('wrong');
          });

          if (answered === totalQ) {
            markLessonCompleted(subj, idx);
            var scoreDiv = el('div', { class: 'quiz-score' });
            scoreDiv.textContent = 'score: ' + correct + '/' + totalQ + (correct === totalQ ? ' — perfect!' : '');
            quizEl.appendChild(scoreDiv);
            K.toast('lesson completed! ' + correct + '/' + totalQ);
          }
        });
        optsDiv.appendChild(btn);
      });
      quizEl.appendChild(qDiv);
    });
  }

  /* ================================================================
     PAGE: NOTESHELF (delegate to module)
     ================================================================ */
  function renderNoteshelf(container) {
    if (typeof K.renderNoteshelf === 'function' && K.renderNoteshelf !== renderNoteshelf) {
      K.renderNoteshelf(container);
    } else {
      container.innerHTML = ''
        + '<div class="page-header"><h2>noteshelf</h2><p class="page-desc">module not loaded yet</p></div>'
        + '<p style="color:var(--text-dim);font-size:0.85rem;padding:20px;">the noteshelf module has not been loaded. check that noteshelf.js is included.</p>';
    }
  }

  /* ================================================================
     PAGE: TOOLS (delegate to module)
     ================================================================ */
  function renderTools(container) {
    if (typeof K.renderTools === 'function' && K.renderTools !== renderTools) {
      K.renderTools(container);
    } else {
      container.innerHTML = ''
        + '<div class="page-header"><h2>tools</h2><p class="page-desc">module not loaded yet</p></div>'
        + '<p style="color:var(--text-dim);font-size:0.85rem;padding:20px;">the tools module has not been loaded. check that tools.js is included.</p>';
    }
  }

  /* ================================================================
     PAGE: SOURCES (delegate to module)
     ================================================================ */
  function renderSources(container) {
    if (typeof K.renderSources === 'function' && K.renderSources !== renderSources) {
      K.renderSources(container);
    } else {
      container.innerHTML = ''
        + '<div class="page-header"><h2>sources</h2><p class="page-desc">module not loaded yet</p></div>'
        + '<p style="color:var(--text-dim);font-size:0.85rem;padding:20px;">the sources module has not been loaded. check that sources.js is included.</p>';
    }
  }

  /* ================================================================
     PAGE: WRITER
     ================================================================ */
  function renderWriter(container) {
    var tabs = [
      { id: 'essay',     label: 'essay writer' },
      { id: 'humanizer', label: 'humanizer' },
      { id: 'summarizer',label: 'summarizer' },
      { id: 'outliner',  label: 'outliner' },
    ];

    container.innerHTML = ''
      + '<div class="page-header"><h2>writer</h2><p class="page-desc">ai-powered writing tools</p></div>'
      + '<div class="writer-tabs" id="writer-tabs"></div>'
      + '<div id="writer-sections"></div>';

    var tabBar   = $('#writer-tabs', container);
    var sections = $('#writer-sections', container);

    // tabs
    tabs.forEach(function (t, i) {
      var btn = el('button', { class: 'writer-tab' + (i === 0 ? ' active' : ''), 'data-tab': t.id, text: t.label });
      btn.addEventListener('click', function () {
        $$('.writer-tab', container).forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        $$('.writer-section', container).forEach(function (s) { s.classList.remove('active'); });
        var sec = $('#writer-' + t.id, container);
        if (sec) sec.classList.add('active');
      });
      tabBar.appendChild(btn);
    });

    // sections
    sections.innerHTML = ''
      // essay
      + '<div class="writer-section active" id="writer-essay">'
      +   '<div class="writer-options">'
      +     '<input type="text" class="input-field" id="essay-topic" placeholder="essay topic..." style="flex:2;min-width:200px;">'
      +     '<select class="input-field" id="essay-length">'
      +       '<option value="short">short (~300 words)</option>'
      +       '<option value="medium">medium (~600 words)</option>'
      +       '<option value="long">long (~1000 words)</option>'
      +     '</select>'
      +     '<select class="input-field" id="essay-tone">'
      +       '<option value="formal">formal</option>'
      +       '<option value="casual">casual</option>'
      +       '<option value="academic">academic</option>'
      +       '<option value="persuasive">persuasive</option>'
      +     '</select>'
      +     '<button class="primary-btn" id="essay-go">generate</button>'
      +   '</div>'
      +   '<div class="writer-output" id="essay-output"></div>'
      + '</div>'
      // humanizer
      + '<div class="writer-section" id="writer-humanizer">'
      +   '<textarea class="textarea-field" id="humanizer-input" rows="6" placeholder="paste ai-generated text here..."></textarea>'
      +   '<div class="writer-options" style="margin-top:10px;">'
      +     '<button class="primary-btn" id="humanizer-go">humanize</button>'
      +   '</div>'
      +   '<div class="writer-output" id="humanizer-output"></div>'
      + '</div>'
      // summarizer
      + '<div class="writer-section" id="writer-summarizer">'
      +   '<textarea class="textarea-field" id="summarizer-input" rows="6" placeholder="paste text to summarize..."></textarea>'
      +   '<div class="writer-options" style="margin-top:10px;">'
      +     '<button class="primary-btn" id="summarizer-go">summarize</button>'
      +   '</div>'
      +   '<div class="writer-output" id="summarizer-output"></div>'
      + '</div>'
      // outliner
      + '<div class="writer-section" id="writer-outliner">'
      +   '<input type="text" class="input-field" id="outliner-topic" placeholder="essay topic for outline..." style="width:100%;margin-bottom:10px;">'
      +   '<div class="writer-options">'
      +     '<button class="primary-btn" id="outliner-go">create outline</button>'
      +   '</div>'
      +   '<div class="writer-output" id="outliner-output"></div>'
      + '</div>';

    // wire buttons
    $('#essay-go', container).addEventListener('click', function () {
      var topic  = ($('#essay-topic', container).value || '').trim();
      var length = ($('#essay-length', container) || {}).value || 'medium';
      var tone   = ($('#essay-tone', container) || {}).value || 'formal';
      if (!topic) { K.toast('enter a topic first'); return; }
      var wordTarget = length === 'short' ? 300 : length === 'medium' ? 600 : 1000;
      var prompt = 'Write a ' + tone + ' essay about "' + topic + '" in approximately ' + wordTarget + ' words. Do not include a title heading. Use clean paragraph formatting. Do not use markdown.';
      callWriter(prompt, '#essay-output', container);
    });

    $('#humanizer-go', container).addEventListener('click', function () {
      var text = ($('#humanizer-input', container).value || '').trim();
      if (!text) { K.toast('paste some text first'); return; }
      var prompt = 'Rewrite the following text to sound more naturally human-written. Vary sentence length, add subtle imperfections, use natural transitions, and remove any overly formal or robotic phrasing. Keep the same meaning and approximate length. Do not use markdown:\n\n' + text;
      callWriter(prompt, '#humanizer-output', container);
    });

    $('#summarizer-go', container).addEventListener('click', function () {
      var text = ($('#summarizer-input', container).value || '').trim();
      if (!text) { K.toast('paste some text first'); return; }
      var prompt = 'Summarize the following text concisely, keeping only the key points. Use plain text, no markdown:\n\n' + text;
      callWriter(prompt, '#summarizer-output', container);
    });

    $('#outliner-go', container).addEventListener('click', function () {
      var topic = ($('#outliner-topic', container).value || '').trim();
      if (!topic) { K.toast('enter a topic first'); return; }
      var prompt = 'Create a detailed essay outline for the topic "' + topic + '". Include a thesis statement, main sections with sub-points, and a conclusion. Use numbered format. Do not use markdown.';
      callWriter(prompt, '#outliner-output', container);
    });
  }

  function callWriter(prompt, outputSel, container) {
    var outputEl = $(outputSel, container);
    if (!outputEl) return;
    outputEl.innerHTML = '<div class="spinner"></div> <span style="color:var(--text-dim);font-size:0.82rem;">generating...</span>';

    fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model: 'openai',
      }),
    })
    .then(function (res) { return res.text(); })
    .then(function (text) {
      outputEl.textContent = text;
      K.toast('generation complete');
    })
    .catch(function (err) {
      outputEl.textContent = 'error: ' + (err.message || 'request failed');
    });
  }

  /* ================================================================
     PAGE: REFERENCE
     ================================================================ */
  function renderReference(container) {
    var tabs = [
      { id: 'formulas',  label: 'formulas' },
      { id: 'periodic',  label: 'periodic table' },
      { id: 'constants', label: 'constants' },
      { id: 'grammar',   label: 'grammar' },
      { id: 'timelines', label: 'timelines' },
    ];

    container.innerHTML = ''
      + '<div class="page-header"><h2>reference</h2><p class="page-desc">quick lookup tables & guides</p></div>'
      + '<div class="reference-tabs" id="ref-tabs"></div>'
      + '<div class="reference-content" id="ref-content"></div>';

    var tabBar = $('#ref-tabs', container);
    tabs.forEach(function (t, i) {
      var btn = el('button', { class: 'ref-tab' + (i === 0 ? ' active' : ''), text: t.label, 'data-ref': t.id });
      btn.addEventListener('click', function () {
        $$('.ref-tab', container).forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        showRefContent(container, t.id);
      });
      tabBar.appendChild(btn);
    });

    showRefContent(container, 'formulas');
  }

  function showRefContent(container, tabId) {
    var refEl = $('#ref-content', container);
    var d = K.data || {};

    if (tabId === 'formulas') {
      var formulas = d.formulas || [
        { cat: 'algebra', items: ['quadratic formula: x = (-b +/- sqrt(b^2 - 4ac)) / 2a', 'slope: m = (y2 - y1) / (x2 - x1)', 'point-slope: y - y1 = m(x - x1)', 'distance: d = sqrt((x2-x1)^2 + (y2-y1)^2)', 'midpoint: M = ((x1+x2)/2, (y1+y2)/2)'] },
        { cat: 'geometry', items: ['area of circle: A = pi * r^2', 'circumference: C = 2 * pi * r', 'area of triangle: A = 1/2 * b * h', 'pythagorean theorem: a^2 + b^2 = c^2', 'volume of sphere: V = 4/3 * pi * r^3', 'volume of cylinder: V = pi * r^2 * h'] },
        { cat: 'trigonometry', items: ['sin(a) = opposite / hypotenuse', 'cos(a) = adjacent / hypotenuse', 'tan(a) = opposite / adjacent', 'sin^2(a) + cos^2(a) = 1', 'law of sines: a/sin(A) = b/sin(B) = c/sin(C)', 'law of cosines: c^2 = a^2 + b^2 - 2ab*cos(C)'] },
        { cat: 'calculus', items: ['power rule: d/dx[x^n] = n*x^(n-1)', 'product rule: d/dx[fg] = f\'g + fg\'', 'chain rule: d/dx[f(g(x))] = f\'(g(x))*g\'(x)', 'integral of x^n = x^(n+1)/(n+1) + C', 'fundamental theorem: integral a to b of f\'(x)dx = f(b) - f(a)'] },
        { cat: 'physics', items: ['F = ma (newton\'s second law)', 'KE = 1/2 * m * v^2', 'PE = mgh', 'v = d / t', 'ohm\'s law: V = IR', 'wave speed: v = f * lambda'] },
      ];
      var html = '<h3>formulas</h3>';
      formulas.forEach(function (f) {
        html += '<h3>' + f.cat + '</h3><table><tbody>';
        f.items.forEach(function (item) { html += '<tr><td>' + item + '</td></tr>'; });
        html += '</tbody></table>';
      });
      refEl.innerHTML = html;

    } else if (tabId === 'periodic') {
      var elements = d.periodicTable || [
        { n:1,  sym:'H',  name:'hydrogen',   mass:'1.008' },
        { n:2,  sym:'He', name:'helium',     mass:'4.003' },
        { n:3,  sym:'Li', name:'lithium',    mass:'6.941' },
        { n:4,  sym:'Be', name:'beryllium',  mass:'9.012' },
        { n:5,  sym:'B',  name:'boron',      mass:'10.81' },
        { n:6,  sym:'C',  name:'carbon',     mass:'12.011' },
        { n:7,  sym:'N',  name:'nitrogen',   mass:'14.007' },
        { n:8,  sym:'O',  name:'oxygen',     mass:'15.999' },
        { n:9,  sym:'F',  name:'fluorine',   mass:'18.998' },
        { n:10, sym:'Ne', name:'neon',       mass:'20.180' },
        { n:11, sym:'Na', name:'sodium',     mass:'22.990' },
        { n:12, sym:'Mg', name:'magnesium',  mass:'24.305' },
        { n:13, sym:'Al', name:'aluminum',   mass:'26.982' },
        { n:14, sym:'Si', name:'silicon',    mass:'28.086' },
        { n:15, sym:'P',  name:'phosphorus', mass:'30.974' },
        { n:16, sym:'S',  name:'sulfur',     mass:'32.065' },
        { n:17, sym:'Cl', name:'chlorine',   mass:'35.453' },
        { n:18, sym:'Ar', name:'argon',      mass:'39.948' },
        { n:19, sym:'K',  name:'potassium',  mass:'39.098' },
        { n:20, sym:'Ca', name:'calcium',    mass:'40.078' },
        { n:21, sym:'Sc', name:'scandium',   mass:'44.956' },
        { n:22, sym:'Ti', name:'titanium',   mass:'47.867' },
        { n:23, sym:'V',  name:'vanadium',   mass:'50.942' },
        { n:24, sym:'Cr', name:'chromium',   mass:'51.996' },
        { n:25, sym:'Mn', name:'manganese',  mass:'54.938' },
        { n:26, sym:'Fe', name:'iron',       mass:'55.845' },
        { n:27, sym:'Co', name:'cobalt',     mass:'58.933' },
        { n:28, sym:'Ni', name:'nickel',     mass:'58.693' },
        { n:29, sym:'Cu', name:'copper',     mass:'63.546' },
        { n:30, sym:'Zn', name:'zinc',       mass:'65.380' },
        { n:35, sym:'Br', name:'bromine',    mass:'79.904' },
        { n:36, sym:'Kr', name:'krypton',    mass:'83.798' },
        { n:47, sym:'Ag', name:'silver',     mass:'107.868' },
        { n:50, sym:'Sn', name:'tin',        mass:'118.710' },
        { n:53, sym:'I',  name:'iodine',     mass:'126.904' },
        { n:74, sym:'W',  name:'tungsten',   mass:'183.840' },
        { n:78, sym:'Pt', name:'platinum',   mass:'195.084' },
        { n:79, sym:'Au', name:'gold',       mass:'196.967' },
        { n:80, sym:'Hg', name:'mercury',    mass:'200.592' },
        { n:82, sym:'Pb', name:'lead',       mass:'207.200' },
        { n:92, sym:'U',  name:'uranium',    mass:'238.029' },
      ];
      var html2 = '<h3>periodic table (common elements)</h3>'
        + '<table><thead><tr><th>#</th><th>symbol</th><th>name</th><th>mass</th></tr></thead><tbody>';
      elements.forEach(function (e) {
        html2 += '<tr><td>' + e.n + '</td><td>' + e.sym + '</td><td>' + e.name + '</td><td>' + e.mass + '</td></tr>';
      });
      refEl.innerHTML = html2 + '</tbody></table>';

    } else if (tabId === 'constants') {
      var consts = d.constants || [
        { name: 'speed of light',              sym: 'c',     val: '2.998 x 10^8 m/s' },
        { name: 'gravitational constant',      sym: 'G',     val: '6.674 x 10^-11 N*m^2/kg^2' },
        { name: 'planck\'s constant',          sym: 'h',     val: '6.626 x 10^-34 J*s' },
        { name: 'boltzmann constant',          sym: 'k_B',   val: '1.381 x 10^-23 J/K' },
        { name: 'avogadro\'s number',          sym: 'N_A',   val: '6.022 x 10^23 /mol' },
        { name: 'elementary charge',           sym: 'e',     val: '1.602 x 10^-19 C' },
        { name: 'gas constant',                sym: 'R',     val: '8.314 J/(mol*K)' },
        { name: 'acceleration due to gravity', sym: 'g',     val: '9.807 m/s^2' },
        { name: 'pi',                          sym: '\u03c0', val: '3.14159265358979...' },
        { name: 'euler\'s number',             sym: 'e',     val: '2.71828182845904...' },
        { name: 'vacuum permittivity',         sym: '\u03b5\u2080', val: '8.854 x 10^-12 F/m' },
        { name: 'vacuum permeability',         sym: '\u03bc\u2080', val: '1.257 x 10^-6 H/m' },
      ];
      var html3 = '<h3>physical & mathematical constants</h3>'
        + '<table><thead><tr><th>name</th><th>symbol</th><th>value</th></tr></thead><tbody>';
      consts.forEach(function (c) {
        html3 += '<tr><td>' + c.name + '</td><td>' + c.sym + '</td><td>' + c.val + '</td></tr>';
      });
      refEl.innerHTML = html3 + '</tbody></table>';

    } else if (tabId === 'grammar') {
      var grammar = d.grammar || [
        { rule: 'parts of speech',         desc: 'noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection' },
        { rule: 'comma splice',            desc: 'do not join two independent clauses with only a comma; use a semicolon, conjunction, or period' },
        { rule: 'subject-verb agreement',  desc: 'singular subjects take singular verbs; plural subjects take plural verbs' },
        { rule: 'its vs it\'s',            desc: '"its" is possessive; "it\'s" is a contraction of "it is"' },
        { rule: 'their / there / they\'re',desc: '"their" = possessive, "there" = location, "they\'re" = they are' },
        { rule: 'affect vs effect',        desc: '"affect" is usually a verb; "effect" is usually a noun' },
        { rule: 'who vs whom',             desc: '"who" is a subject pronoun; "whom" is an object pronoun' },
        { rule: 'active vs passive voice', desc: 'active: subject performs action; passive: subject receives action. prefer active voice.' },
        { rule: 'parallel structure',      desc: 'items in a list or comparison should follow the same grammatical pattern' },
        { rule: 'dangling modifier',       desc: 'a modifier must clearly refer to the word it modifies; otherwise it "dangles"' },
        { rule: 'semicolon usage',         desc: 'use semicolons to join related independent clauses or to separate complex list items' },
        { rule: 'colon usage',             desc: 'use a colon to introduce a list, explanation, or elaboration after a complete sentence' },
      ];
      var html4 = '<h3>grammar quick reference</h3>'
        + '<table><thead><tr><th>rule</th><th>description</th></tr></thead><tbody>';
      grammar.forEach(function (g) {
        html4 += '<tr><td>' + g.rule + '</td><td>' + g.desc + '</td></tr>';
      });
      refEl.innerHTML = html4 + '</tbody></table>';

    } else if (tabId === 'timelines') {
      var timelines = d.timelines || [
        { era: 'ancient history',  events: ['~3000 BCE — first writing systems (sumer)', '~2560 BCE — great pyramid of giza built', '~500 BCE — golden age of athens', '~221 BCE — qin dynasty unifies china', '27 BCE — roman empire begins'] },
        { era: 'medieval period',  events: ['476 — fall of the western roman empire', '622 — birth of islam / hijra', '800 — charlemagne crowned emperor', '1066 — norman conquest of england', '1215 — magna carta signed', '1347 — black death reaches europe'] },
        { era: 'early modern',     events: ['1440 — gutenberg printing press', '1492 — columbus reaches americas', '1517 — protestant reformation begins', '1687 — newton publishes principia', '1776 — american declaration of independence', '1789 — french revolution begins'] },
        { era: 'modern era',       events: ['1804 — napoleon crowned emperor', '1861 — american civil war begins', '1914 — world war i begins', '1929 — great depression begins', '1939 — world war ii begins', '1945 — atomic bombs dropped; UN founded', '1969 — moon landing'] },
        { era: 'contemporary',     events: ['1989 — fall of berlin wall', '1991 — world wide web launches; soviet union dissolves', '2001 — september 11 attacks', '2008 — global financial crisis', '2020 — covid-19 pandemic'] },
      ];
      var html5 = '<h3>historical timelines</h3>';
      timelines.forEach(function (t) {
        html5 += '<h3>' + t.era + '</h3><table><tbody>';
        t.events.forEach(function (e) { html5 += '<tr><td>' + e + '</td></tr>'; });
        html5 += '</tbody></table>';
      });
      refEl.innerHTML = html5;
    }
  }

  /* ================================================================
     PAGE: STUDY
     ================================================================ */
  function renderStudy(container) {
    var tabs = [
      { id: 'flashcards', label: 'flashcards' },
      { id: 'quickquiz',  label: 'quick quiz' },
      { id: 'review',     label: 'review tracker' },
    ];

    container.innerHTML = ''
      + '<div class="page-header"><h2>study</h2><p class="page-desc">flashcards, quizzes & progress tracking</p></div>'
      + '<div class="study-tabs" id="study-tabs"></div>'
      + '<div class="study-content" id="study-content"></div>';

    var tabBar    = $('#study-tabs', container);
    var contentEl = $('#study-content', container);
    var activeTab = 'flashcards';

    tabs.forEach(function (t) {
      var btn = el('button', { class: 'study-tab' + (t.id === activeTab ? ' active' : ''), text: t.label, 'data-study': t.id });
      btn.addEventListener('click', function () {
        activeTab = t.id;
        $$('.study-tab', container).forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderStudyTab(contentEl, t.id);
      });
      tabBar.appendChild(btn);
    });

    renderStudyTab(contentEl, activeTab);
  }

  function renderStudyTab(contentEl, tabId) {
    contentEl.innerHTML = '';

    if (tabId === 'flashcards') {
      var allQ = getAllQuizQuestions();
      if (!allQ.length) {
        contentEl.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem;padding:20px;">no quiz questions available yet. complete some lessons first!</p>';
        return;
      }
      var shuffled   = allQ.slice().sort(function () { return Math.random() - 0.5; });
      var currentIdx = 0;
      var showAnswer = false;

      function renderCard() {
        var q = shuffled[currentIdx];
        contentEl.innerHTML = ''
          + '<div class="flashcard">'
          +   '<div class="flashcard-inner" id="fc-inner">'
          +     (showAnswer
                  ? '<div><span style="color:var(--text-dim);font-size:0.72rem;display:block;margin-bottom:8px;">answer</span>' + q.question.options[q.question.answer] + '</div>'
                  : '<div><span style="color:var(--text-dim);font-size:0.72rem;display:block;margin-bottom:8px;">' + q.subject.toLowerCase() + '</span>' + q.question.q + '</div>')
          +   '</div>'
          +   '<div class="flashcard-controls">'
          +     '<button class="small-btn" id="fc-prev">&larr; prev</button>'
          +     '<button class="small-btn primary" id="fc-flip">flip</button>'
          +     '<button class="small-btn" id="fc-next">next &rarr;</button>'
          +   '</div>'
          +   '<p style="text-align:center;font-size:0.72rem;color:var(--text-dim);margin-top:8px;">' + (currentIdx + 1) + ' / ' + shuffled.length + '</p>'
          + '</div>';

        $('#fc-flip', contentEl).addEventListener('click', function () { showAnswer = !showAnswer; renderCard(); });
        $('#fc-prev', contentEl).addEventListener('click', function () { showAnswer = false; currentIdx = (currentIdx - 1 + shuffled.length) % shuffled.length; renderCard(); });
        $('#fc-next', contentEl).addEventListener('click', function () { showAnswer = false; currentIdx = (currentIdx + 1) % shuffled.length; renderCard(); });
        $('#fc-inner', contentEl).addEventListener('click', function () { showAnswer = !showAnswer; renderCard(); });
      }
      renderCard();

    } else if (tabId === 'quickquiz') {
      var allQ2 = getAllQuizQuestions();
      if (allQ2.length < 1) {
        contentEl.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem;padding:20px;">no quiz questions available.</p>';
        return;
      }
      var shuffled2 = allQ2.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 10);
      var totalQ    = shuffled2.length;
      var answered2 = 0;
      var correct2  = 0;

      contentEl.innerHTML = '<h3 style="font-size:1rem;color:var(--accent-hover);margin-bottom:16px;">quick quiz (' + totalQ + ' questions)</h3>';

      shuffled2.forEach(function (item, qi) {
        var q = item.question;
        var qDiv = el('div', { class: 'quiz-question' });
        qDiv.innerHTML = ''
          + '<div class="quiz-q"><span style="color:var(--text-dim);font-size:0.7rem;">' + item.subject.toLowerCase() + '</span><br>' + (qi + 1) + '. ' + q.q + '</div>'
          + '<div class="quiz-options" data-qi="' + qi + '"></div>';
        var optsDiv = qDiv.querySelector('.quiz-options');

        q.options.forEach(function (opt, oi) {
          var btn = el('button', { class: 'quiz-option', text: opt });
          btn.addEventListener('click', function () {
            if (btn.classList.contains('disabled')) return;
            answered2++;
            if (oi === q.answer) correct2++;
            $$('.quiz-option', optsDiv).forEach(function (b, bi) {
              b.classList.add('disabled');
              if (bi === q.answer) b.classList.add('correct');
              else if (bi === oi && oi !== q.answer) b.classList.add('wrong');
            });
            if (answered2 === totalQ) {
              var scoreDiv = el('div', { class: 'quiz-score' });
              scoreDiv.textContent = 'final score: ' + correct2 + '/' + totalQ;
              contentEl.appendChild(scoreDiv);
              K.toast('quiz finished! ' + correct2 + '/' + totalQ);
            }
          });
          optsDiv.appendChild(btn);
        });
        contentEl.appendChild(qDiv);
      });

    } else if (tabId === 'review') {
      var completed = getCompleted();
      var subjects  = K.lessons;
      var html = '<h3 style="font-size:1rem;color:var(--accent-hover);margin-bottom:16px;">completion by subject</h3>';

      Object.keys(subjects).forEach(function (subj) {
        var s = subjects[subj];
        if (!s || !s.lessons) return;
        var total = s.lessons.length;
        var done = 0;
        s.lessons.forEach(function (_, i) {
          if (completed.indexOf(subj + ':' + i) !== -1) done++;
        });
        var pct = total > 0 ? Math.round((done / total) * 100) : 0;
        html += ''
          + '<div style="margin-bottom:20px;">'
          +   '<div style="display:flex;justify-content:space-between;align-items:center;">'
          +     '<span style="font-size:0.85rem;color:var(--text);">' + (s.name || subj).toLowerCase() + '</span>'
          +     '<span style="font-size:0.75rem;color:var(--text-muted);">' + done + '/' + total + ' lessons</span>'
          +   '</div>'
          +   '<div class="progress-bar-container" style="margin-top:6px;">'
          +     '<div class="progress-bar-fill" style="width:' + pct + '%;"></div>'
          +   '</div>'
          + '</div>';
      });

      if (!Object.keys(subjects).length) {
        html += '<p style="color:var(--text-dim);font-size:0.85rem;">no subjects loaded.</p>';
      }

      html += '<div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border);">'
        + '<span style="font-size:0.82rem;color:var(--text-muted);">total completed: <strong style="color:var(--accent-hover);">' + completed.length + '</strong> lessons</span>'
        + '</div>';
      contentEl.innerHTML = html;
    }
  }

  /* ================================================================
     PAGE: WHITEBOARD
     ================================================================ */
  function renderWhiteboard(container) {
    container.innerHTML = ''
      + '<div class="page-header"><h2>whiteboard</h2><p class="page-desc">freeform canvas drawing tool</p></div>'
      + '<div class="whiteboard-toolbar" id="wb-toolbar">'
      +   '<button class="wb-tool active" id="wb-pen">pen</button>'
      +   '<button class="wb-tool" id="wb-eraser">eraser</button>'
      +   '<label style="display:flex;align-items:center;gap:6px;font-size:0.75rem;color:var(--text-muted);">size <input type="range" class="wb-slider" id="wb-size" min="1" max="30" value="3"></label>'
      +   '<input type="color" class="wb-color" id="wb-color" value="#f0f0f0">'
      +   '<button class="wb-tool" id="wb-clear">clear</button>'
      +   '<button class="wb-tool" id="wb-save">save</button>'
      + '</div>'
      + '<canvas class="whiteboard-canvas" id="wb-canvas"></canvas>';

    var canvas = $('#wb-canvas', container);
    var ctx    = canvas.getContext('2d');

    // set canvas resolution
    requestAnimationFrame(function () {
      var rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    var drawing    = false;
    var tool       = 'pen';
    var brushSize  = 3;
    var brushColor = '#f0f0f0';

    $('#wb-pen', container).addEventListener('click', function () {
      tool = 'pen';
      $$('.wb-tool', container).forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
    $('#wb-eraser', container).addEventListener('click', function () {
      tool = 'eraser';
      $$('.wb-tool', container).forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
    $('#wb-size', container).addEventListener('input', function () { brushSize = parseInt(this.value); });
    $('#wb-color', container).addEventListener('input', function () { brushColor = this.value; });

    $('#wb-clear', container).addEventListener('click', function () {
      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      K.toast('canvas cleared');
    });

    $('#wb-save', container).addEventListener('click', function () {
      var link = document.createElement('a');
      link.download = 'krill-whiteboard.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      K.toast('whiteboard saved');
    });

    function getPos(e) {
      var r = canvas.getBoundingClientRect();
      if (e.touches) {
        return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
      }
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function startDraw(e) {
      drawing = true;
      var p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    }
    function draw(e) {
      if (!drawing) return;
      e.preventDefault();
      var p = getPos(e);
      ctx.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize;
      ctx.lineCap   = 'round';
      ctx.lineJoin  = 'round';
      ctx.strokeStyle = tool === 'eraser' ? '#111111' : brushColor;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    function stopDraw() {
      drawing = false;
      ctx.beginPath();
    }

    canvas.addEventListener('mousedown',  startDraw);
    canvas.addEventListener('mousemove',  draw);
    canvas.addEventListener('mouseup',    stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove',  draw,      { passive: false });
    canvas.addEventListener('touchend',   stopDraw);
  }

  /* ================================================================
     PAGE: PLANNER
     ================================================================ */
  function renderPlanner(container) {
    container.innerHTML = ''
      + '<div class="page-header"><h2>planner</h2><p class="page-desc">track assignments & tasks</p></div>'
      + '<div class="planner-controls">'
      +   '<button class="primary-btn" id="planner-add">+ add task</button>'
      +   '<select class="input-field" id="planner-filter">'
      +     '<option value="all">all tasks</option>'
      +     '<option value="active">active</option>'
      +     '<option value="completed">completed</option>'
      +     '<option value="overdue">overdue</option>'
      +   '</select>'
      + '</div>'
      + '<div class="planner-list" id="planner-list"></div>'
      // add task modal
      + '<div class="modal hidden" id="planner-modal">'
      +   '<div class="modal-content">'
      +     '<h3>add task</h3>'
      +     '<input type="text" class="input-field" id="task-name" placeholder="task name...">'
      +     '<input type="text" class="input-field" id="task-subject" placeholder="subject...">'
      +     '<input type="date" class="input-field" id="task-due">'
      +     '<select class="input-field" id="task-priority">'
      +       '<option value="low">low priority</option>'
      +       '<option value="medium">medium priority</option>'
      +       '<option value="high">high priority</option>'
      +     '</select>'
      +     '<textarea class="textarea-field" id="task-notes" rows="2" placeholder="notes..."></textarea>'
      +     '<div class="modal-actions">'
      +       '<button class="small-btn" id="task-cancel">cancel</button>'
      +       '<button class="small-btn primary" id="task-save">save</button>'
      +     '</div>'
      +   '</div>'
      + '</div>';

    function getTasks() {
      try { return JSON.parse(localStorage.getItem('krill-tasks') || '[]'); }
      catch (_) { return []; }
    }
    function saveTasks(t) { localStorage.setItem('krill-tasks', JSON.stringify(t)); }

    function renderTasks() {
      var list   = $('#planner-list', container);
      var filter = ($('#planner-filter', container) || {}).value || 'all';
      var tasks  = getTasks();
      var now    = new Date().toISOString().split('T')[0];
      list.innerHTML = '';

      tasks.forEach(function (t, i) {
        var isOverdue = t.due && t.due < now && !t.done;
        if (filter === 'active'    && t.done) return;
        if (filter === 'completed' && !t.done) return;
        if (filter === 'overdue'   && !isOverdue) return;

        var item = el('div', { class: 'planner-item' + (t.done ? ' completed' : '') + (isOverdue ? ' overdue' : '') });
        item.innerHTML = ''
          + '<div class="planner-checkbox' + (t.done ? ' checked' : '') + '" data-idx="' + i + '"></div>'
          + '<div class="planner-item-info">'
          +   '<div class="planner-item-name">' + (t.name || 'untitled').toLowerCase() + '</div>'
          +   '<div class="planner-item-meta">'
          +     (t.subject ? t.subject.toLowerCase() + ' &middot; ' : '')
          +     (t.due ? 'due: ' + t.due : 'no due date')
          +     (t.notes ? ' &middot; ' + t.notes.substring(0, 40).toLowerCase() : '')
          +   '</div>'
          + '</div>'
          + '<span class="planner-item-priority ' + (t.priority || 'low') + '">' + (t.priority || 'low') + '</span>'
          + '<button class="danger-btn" data-del="' + i + '" style="padding:3px 8px;font-size:0.7rem;">&times;</button>';

        item.querySelector('.planner-checkbox').addEventListener('click', function () {
          var tasks2 = getTasks();
          tasks2[i].done = !tasks2[i].done;
          saveTasks(tasks2);
          renderTasks();
          K.toast(tasks2[i].done ? 'task completed' : 'task reopened');
        });

        item.querySelector('[data-del]').addEventListener('click', function () {
          var tasks2 = getTasks();
          tasks2.splice(i, 1);
          saveTasks(tasks2);
          renderTasks();
          K.toast('task deleted');
        });

        list.appendChild(item);
      });

      if (!list.children.length) {
        list.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem;padding:12px;">no tasks.</p>';
      }
    }

    $('#planner-filter', container).addEventListener('change', renderTasks);

    $('#planner-add', container).addEventListener('click', function () {
      var modal = $('#planner-modal', container);
      modal.classList.remove('hidden');
      $('#task-name', container).value = '';
      $('#task-subject', container).value = '';
      $('#task-due', container).value = '';
      $('#task-priority', container).value = 'low';
      $('#task-notes', container).value = '';
    });

    $('#task-cancel', container).addEventListener('click', function () {
      $('#planner-modal', container).classList.add('hidden');
    });

    $('#task-save', container).addEventListener('click', function () {
      var name = ($('#task-name', container).value || '').trim();
      if (!name) { K.toast('enter a task name'); return; }
      var tasks = getTasks();
      tasks.push({
        name:     name,
        subject:  ($('#task-subject', container).value || '').trim(),
        due:      ($('#task-due', container) || {}).value || '',
        priority: ($('#task-priority', container) || {}).value || 'low',
        notes:    ($('#task-notes', container).value || '').trim(),
        done:     false,
      });
      saveTasks(tasks);
      $('#planner-modal', container).classList.add('hidden');
      renderTasks();
      K.toast('task added');
    });

    // close modal on background click
    $('#planner-modal', container).addEventListener('click', function (e) {
      if (e.target === this) this.classList.add('hidden');
    });

    renderTasks();
  }

  /* ================================================================
     PAGE: GPA
     ================================================================ */
  function renderGPA(container) {
    var GRADE_MAP = {
      'a+': 4.0, 'a': 4.0, 'a-': 3.7,
      'b+': 3.3, 'b': 3.0, 'b-': 2.7,
      'c+': 2.3, 'c': 2.0, 'c-': 1.7,
      'd+': 1.3, 'd': 1.0, 'd-': 0.7,
      'f': 0.0,
    };
    var gradeOptions = Object.keys(GRADE_MAP).map(function (g) {
      return '<option value="' + g + '">' + g + '</option>';
    }).join('');

    container.innerHTML = ''
      + '<div class="page-header"><h2>gpa tracker</h2><p class="page-desc">calculate your weighted gpa</p></div>'
      + '<div class="gpa-layout">'
      +   '<div class="gpa-input-section">'
      +     '<div class="gpa-row gpa-header-row"><span>course</span><span>grade</span><span>credits</span><span></span></div>'
      +     '<div id="gpa-rows"></div>'
      +     '<div style="margin-top:12px;display:flex;gap:8px;">'
      +       '<button class="small-btn" id="gpa-add-row">+ add course</button>'
      +       '<button class="small-btn primary" id="gpa-calc">calculate</button>'
      +     '</div>'
      +   '</div>'
      +   '<div class="gpa-result-section">'
      +     '<div class="gpa-circle">'
      +       '<span class="gpa-number" id="gpa-number">0.00</span>'
      +       '<span class="gpa-label">gpa</span>'
      +     '</div>'
      +     '<div class="gpa-stats" id="gpa-stats">add courses and calculate</div>'
      +   '</div>'
      + '</div>';

    function getCourses() {
      try { return JSON.parse(localStorage.getItem('krill-gpa') || '[]'); }
      catch (_) { return []; }
    }
    function saveCourses(c) { localStorage.setItem('krill-gpa', JSON.stringify(c)); }

    function addRow(course) {
      var rows = $('#gpa-rows', container);
      var row = el('div', { class: 'gpa-row' });
      row.innerHTML = ''
        + '<input type="text" class="input-field gpa-course" value="' + (course ? (course.name || '') : '') + '" placeholder="course name">'
        + '<select class="input-field gpa-grade">' + gradeOptions + '</select>'
        + '<input type="number" class="input-field gpa-credits" value="' + (course ? (course.credits || 3) : 3) + '" min="0" max="12" step="0.5">'
        + '<button class="remove-row">&times;</button>';
      if (course && course.grade) {
        var sel = row.querySelector('.gpa-grade');
        if (sel) sel.value = course.grade;
      }
      row.querySelector('.remove-row').addEventListener('click', function () { row.remove(); });
      rows.appendChild(row);
    }

    // load saved courses
    var saved = getCourses();
    if (saved.length) {
      saved.forEach(addRow);
    } else {
      addRow();
    }

    $('#gpa-add-row', container).addEventListener('click', function () { addRow(); });

    $('#gpa-calc', container).addEventListener('click', function () {
      var rowEls = $$('.gpa-row:not(.gpa-header-row)', container);
      var courses      = [];
      var totalPoints  = 0;
      var totalCredits = 0;

      rowEls.forEach(function (row) {
        var nameEl    = row.querySelector('.gpa-course');
        var gradeEl   = row.querySelector('.gpa-grade');
        var creditsEl = row.querySelector('.gpa-credits');
        var name    = nameEl ? nameEl.value : '';
        var grade   = gradeEl ? gradeEl.value : 'a';
        var credits = creditsEl ? (parseFloat(creditsEl.value) || 0) : 0;
        courses.push({ name: name, grade: grade, credits: credits });
        var pts = GRADE_MAP[grade] !== undefined ? GRADE_MAP[grade] : 0;
        totalPoints  += pts * credits;
        totalCredits += credits;
      });

      saveCourses(courses);

      var gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
      $('#gpa-number', container).textContent = gpa.toFixed(2);
      $('#gpa-stats', container).innerHTML = '<span>' + courses.length + '</span> courses &middot; <span>' + totalCredits + '</span> total credits';
      K.toast('gpa calculated: ' + gpa.toFixed(2));
    });
  }

  /* ================================================================
     PAGE: HABITS (delegate to module)
     ================================================================ */
  function renderHabits(container) {
    if (typeof K.renderHabits === 'function' && K.renderHabits !== renderHabits) {
      K.renderHabits(container);
    } else {
      container.innerHTML = ''
        + '<div class="page-header"><h2>habits</h2><p class="page-desc">module not loaded yet</p></div>'
        + '<p style="color:var(--text-dim);font-size:0.85rem;padding:20px;">the habits module has not been loaded. check that habits.js is included.</p>';
    }
  }

  /* ================================================================
     PAGE: SETTINGS
     ================================================================ */
  function renderSettings(container) {
    var panicUrl = localStorage.getItem('krill-panic-url') || 'https://classroom.google.com';

    container.innerHTML = ''
      + '<div class="page-header"><h2>settings</h2><p class="page-desc">customize your experience</p></div>'
      + '<div class="settings-list">'

      // tab cloaking
      +   '<div class="setting-item">'
      +     '<div class="setting-info"><span class="setting-name">tab cloaking</span><span class="setting-desc">disguise as google docs (title & favicon)</span></div>'
      +     '<label class="toggle"><input type="checkbox" id="set-cloak"' + (state.cloakActive ? ' checked' : '') + '><span class="toggle-slider"></span></label>'
      +   '</div>'

      // panic url
      +   '<div class="setting-item">'
      +     '<div class="setting-info"><span class="setting-name">panic url</span><span class="setting-desc">redirect url when pressing escape</span></div>'
      +     '<input type="text" class="input-field" id="set-panic" value="' + panicUrl + '" style="max-width:260px;">'
      +   '</div>'

      // reset
      +   '<div class="setting-item">'
      +     '<div class="setting-info"><span class="setting-name">reset all data</span><span class="setting-desc">clear saved notes, tasks, gpa, lesson progress</span></div>'
      +     '<button class="danger-btn" id="set-reset">reset</button>'
      +   '</div>'

      + '</div>';

    // wire
    $('#set-cloak', container).addEventListener('change', function () {
      state.cloakActive = this.checked;
      saveSettings();
      applyCloak();
      K.toast(state.cloakActive ? 'cloak enabled' : 'cloak disabled');
    });

    $('#set-panic', container).addEventListener('change', function () {
      localStorage.setItem('krill-panic-url', this.value.trim());
      K.toast('panic url updated');
    });

    $('#set-reset', container).addEventListener('click', function () {
      if (!confirm('are you sure? this will erase all saved data.')) return;
      localStorage.removeItem('krill-completed');
      localStorage.removeItem('krill-tasks');
      localStorage.removeItem('krill-gpa');
      localStorage.removeItem('krill-notes');
      localStorage.removeItem('krill-sources');
      localStorage.removeItem('krill-settings');
      localStorage.removeItem('krill-panic-url');
      localStorage.removeItem('krill-habits');
      state.particlesOn  = false;
      state.shapesOn     = false;
      state.cursorGlowOn = false;
      state.cloakActive  = true;
      saveSettings();
      applyCloak();
      K.toast('all data has been reset');
      renderSettings(container);
    });
  }

  /* ================================================================
     SHRIMP CURSOR
     ================================================================ */
  function initShrimpCursor() {
    var cursorEl = document.getElementById('shrimp-cursor');
    if (!cursorEl) return;
    var innerEl = cursorEl.querySelector('.shrimp-inner');

    var hoverSelectors = 'a, button, [data-page], .action-card, .lesson-card, .tool-card, input, select, textarea, .nav-link';

    document.addEventListener('mousemove', function (e) {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      cursorEl.style.left = e.clientX + 'px';
      cursorEl.style.top  = e.clientY + 'px';

      // hover state
      var target = document.elementFromPoint(e.clientX, e.clientY);
      if (target && target.closest && target.closest(hoverSelectors)) {
        cursorEl.classList.add('shrimp-cursor-hover');
      } else {
        cursorEl.classList.remove('shrimp-cursor-hover');
      }
    });

    document.addEventListener('mousedown', function () {
      if (innerEl) innerEl.classList.add('squeeze');
    });
    document.addEventListener('mouseup', function () {
      if (innerEl) innerEl.classList.remove('squeeze');
    });
  }

  /* ================================================================
     SPLASH SCREEN
     ================================================================ */
  function initSplash() {
    var overlay = document.getElementById('splash-overlay');
    if (!overlay) return;
    if (sessionStorage.getItem('krill-splash')) {
      overlay.style.display = 'none';
      return;
    }
    sessionStorage.setItem('krill-splash', '1');
    // CSS handles the fade animation; remove after it completes
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 4500);
  }

  /* ================================================================
     PANIC BUTTON (Escape key)
     ================================================================ */
  function initPanic() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var url = localStorage.getItem('krill-panic-url') || 'https://classroom.google.com';
        window.location.replace(url);
      }
    });
  }

  /* ================================================================
     BOOT
     ================================================================ */
  function boot() {
    applyCloak();
    buildNav();
    navigate('home');

    initShrimpCursor();
    initSplash();
    initPanic();
  }

  // run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
