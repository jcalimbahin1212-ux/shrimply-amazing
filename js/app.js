/* ============================================
   shrimpify — main application logic
   ============================================ */

(function () {
  "use strict";

  // ---- State ----
  const state = {
    currentPage: "home",
    panicUrl: localStorage.getItem("shrimpify-panic-url") || "https://classroom.google.com",
    selectedCheat: null,
    selectedGamemode: 0,
  };

  // ---- DOM refs ----
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---- Toast ----
  let toastTimer;
  function toast(msg) {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    clearTimeout(toastTimer);
    requestAnimationFrame(() => {
      el.classList.add("show");
      toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
    });
  }

  // expose toast globally for tools.js
  window.shrimpToast = toast;

  // ---- Navigation ----
  function navigate(page) {
    state.currentPage = page;
    $$(".page").forEach((p) => p.classList.remove("active"));
    $$(".nav-link").forEach((l) => l.classList.remove("active"));
    const target = $(`#page-${page}`);
    const link = $(`.nav-link[data-page="${page}"]`);
    if (target) target.classList.add("active");
    if (link) link.classList.add("active");

    // Reset cheat detail view when navigating to cheats
    if (page === "cheats") {
      showCheatList();
    }

    // Lazy-init tools when their page is visited
    if (window.ShrimpTools) {
      if (page === "tools") {
        ShrimpTools.calculator();
        ShrimpTools.unitConverter();
        ShrimpTools.timer();
        ShrimpTools.gpa();
      } else if (page === "writer") {
        ShrimpTools.textTools();
        ShrimpTools.citations();
      } else if (page === "reference") {
        ShrimpTools.formulas();
        ShrimpTools.periodicTable();
      } else if (page === "notes") {
        ShrimpTools.notes();
      }
    }
  }

  // sidebar nav
  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(link.dataset.page);
    });
  });

  // home cards nav
  $$(".quick-actions .card").forEach((card) => {
    card.addEventListener("click", () => navigate(card.dataset.page));
  });

  // ---- Sub-tab switching ----
  // Generic delegation: clicking a .tool-tab switches the active panel
  document.addEventListener("click", (e) => {
    const tab = e.target.closest(".tool-tab");
    if (!tab) return;

    const tabContainer = tab.parentElement;
    const page = tab.closest(".page");
    if (!page) return;

    // Deactivate all tabs in this group
    tabContainer.querySelectorAll(".tool-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Deactivate all panels in this page, activate the matching one
    const toolName = tab.dataset.tool;
    page.querySelectorAll(".tool-panel").forEach((p) => p.classList.remove("active"));
    const panel = page.querySelector(`#tool-${toolName}`);
    if (panel) panel.classList.add("active");
  });

  // ---- Helpers: detect iframe context ----
  function isInsideIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
  }

  function getTop() {
    try { return window.top || window; } catch (e) { return window; }
  }

  // ---- About:Blank Launcher ----
  function openInBlank(url) {
    const win = window.open("about:blank", "_blank");
    if (!win) {
      toast("Pop-up blocked! Allow pop-ups for this site.");
      return;
    }
    // Clone current cloak or use defaults
    const cloakTitle = document.title || "Google Docs";
    const cloakIcon = ($$("link[rel='icon']")[0] || {}).href ||
      "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";

    win.document.write(
      '<!DOCTYPE html><html><head>' +
      '<title>' + cloakTitle + '</title>' +
      '<link rel="icon" href="' + cloakIcon + '">' +
      '<style>*{margin:0;padding:0;overflow:hidden}html,body,iframe{width:100%;height:100%;border:none}</style>' +
      '</head><body>' +
      '<iframe src="' + url + '" allowfullscreen ' +
      'allow="clipboard-read; clipboard-write" ' +
      'style="width:100%;height:100%;border:none"></iframe>' +
      '</body></html>'
    );
    win.document.close();
    // Focus the iframe so keyboard events work immediately
    try { win.document.querySelector("iframe").focus(); } catch (_) {}
    toast("Opened in about:blank");
  }

  // ---- Cheats: List View ----
  function showCheatList() {
    state.selectedCheat = null;
    state.selectedGamemode = 0;
    $("#cheats-list").style.display = "";
    $("#cheat-detail").style.display = "none";
  }

  function renderCheatsList() {
    const list = $("#cheats-list");
    list.innerHTML = CHEATS.map(
      (cheat) => `
      <div class="cheat-list-item" data-cheat-id="${cheat.id}">
        <div class="cheat-list-icon">${cheat.icon}</div>
        <div class="cheat-list-info">
          <div class="cheat-list-name">${cheat.name}</div>
          <div class="cheat-list-desc">${cheat.desc}</div>
          <div class="cheat-list-modes">${cheat.gamemodes.length} gamemode${cheat.gamemodes.length > 1 ? "s" : ""}</div>
        </div>
        <div class="cheat-list-arrow">&rarr;</div>
      </div>
    `
    ).join("");

    list.querySelectorAll(".cheat-list-item").forEach((item) => {
      item.addEventListener("click", () => {
        const cheat = CHEATS.find((c) => c.id === item.dataset.cheatId);
        if (cheat) showCheatDetail(cheat);
      });
    });
  }

  // ---- Cheats: Detail View ----
  function showCheatDetail(cheat) {
    state.selectedCheat = cheat;
    state.selectedGamemode = 0;

    $("#cheats-list").style.display = "none";
    $("#cheat-detail").style.display = "block";

    // Header
    $("#cheat-detail-header").innerHTML = `
      <div class="cheat-detail-title">
        <span class="cheat-detail-icon">${cheat.icon}</span>
        <h2>${cheat.name}</h2>
        <a href="${cheat.url}" class="cheat-site-link" target="_blank">${cheat.url}</a>
      </div>
      <p class="cheat-detail-desc">${cheat.desc}</p>
    `;

    // Manual
    $("#cheat-manual").innerHTML = `
      <h3>How to Use</h3>
      <div class="manual-steps">
        ${cheat.manual.map((step) => `<div class="manual-step">${step}</div>`).join("")}
      </div>
    `;

    // Gamemode tabs
    renderGamemodeTabs(cheat);
    renderGamemodeContent(cheat, 0);
  }

  function renderGamemodeTabs(cheat) {
    const tabs = $("#gamemode-tabs");
    tabs.innerHTML = cheat.gamemodes
      .map(
        (gm, i) => `
      <button class="gamemode-tab ${i === state.selectedGamemode ? "active" : ""}" data-index="${i}">
        ${gm.name}
      </button>
    `
      )
      .join("");

    tabs.querySelectorAll(".gamemode-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        state.selectedGamemode = parseInt(tab.dataset.index);
        tabs.querySelectorAll(".gamemode-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderGamemodeContent(cheat, state.selectedGamemode);
      });
    });
  }

  function renderGamemodeContent(cheat, gmIndex) {
    const gm = cheat.gamemodes[gmIndex];
    const content = $("#gamemode-content");

    content.innerHTML = `
      <div class="gamemode-header">
        <h4>${gm.name}</h4>
        <p>${gm.desc}</p>
      </div>
      <div class="gamemode-cheats">
        ${gm.cheats
          .map(
            (c, i) => `
          <div class="script-card">
            <div class="script-header">
              <h5>${c.name}</h5>
              <p>${c.desc}</p>
            </div>
            <div class="script-code-wrapper">
              <pre class="script-code"><code>${escapeHtml(c.code)}</code></pre>
              <button class="btn copy-btn" data-gm="${gmIndex}" data-script="${i}">Copy</button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    // Copy buttons
    content.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const gmIdx = parseInt(btn.dataset.gm);
        const scriptIdx = parseInt(btn.dataset.script);
        const code = cheat.gamemodes[gmIdx].cheats[scriptIdx].code;
        navigator.clipboard.writeText(code).then(
          () => {
            btn.textContent = "Copied!";
            toast("Script copied to clipboard");
            setTimeout(() => (btn.textContent = "Copy"), 1500);
          },
          () => {
            const ta = document.createElement("textarea");
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            btn.textContent = "Copied!";
            toast("Script copied to clipboard");
            setTimeout(() => (btn.textContent = "Copy"), 1500);
          }
        );
      });
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Back button
  $("#cheat-back").addEventListener("click", showCheatList);

  // ---- Panic / Quick Exit ----
  function panic() {
    // Use top-level window so we escape the about:blank iframe
    getTop().location.replace(state.panicUrl);
  }

  $("#panic-btn").addEventListener("click", panic);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      panic();
    }
  });

  // update panic URL from settings
  const panicInput = $("#panic-url");
  if (panicInput) {
    panicInput.value = state.panicUrl;
    panicInput.addEventListener("change", () => {
      state.panicUrl = panicInput.value;
      localStorage.setItem("shrimpify-panic-url", panicInput.value);
      toast("Panic URL updated");
    });
  }

  // ---- Tab Cloaking ----
  function applyCloak(title, iconUrl) {
    document.title = title;
    let link = $("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = iconUrl;
    localStorage.setItem("shrimpify-cloak-title", title);
    localStorage.setItem("shrimpify-cloak-icon", iconUrl);
    toast("Tab cloaked as " + title);
  }

  // apply saved cloak on load
  const savedTitle = localStorage.getItem("shrimpify-cloak-title");
  const savedIcon = localStorage.getItem("shrimpify-cloak-icon");
  if (savedTitle) document.title = savedTitle;
  if (savedIcon) {
    let link = $("link[rel='icon']");
    if (link) link.href = savedIcon;
  }

  $("#apply-cloak").addEventListener("click", () => {
    const title = $("#cloak-title").value || "Google Docs";
    const icon =
      $("#cloak-favicon").value ||
      "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
    applyCloak(title, icon);
  });

  $("#reset-cloak").addEventListener("click", () => {
    localStorage.removeItem("shrimpify-cloak-title");
    localStorage.removeItem("shrimpify-cloak-icon");
    document.title = "Google Docs";
    let link = $("link[rel='icon']");
    if (link)
      link.href =
        "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
    toast("Cloak reset");
  });

  // cloak presets
  $$(".preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title;
      const icon = btn.dataset.icon;
      $("#cloak-title").value = title;
      $("#cloak-favicon").value = icon;
      applyCloak(title, icon);
    });
  });

  // ---- Open self in about:blank ----
  $("#aboutblank-self").addEventListener("click", () => {
    if (isInsideIframe()) {
      toast("Already running in about:blank");
      return;
    }
    openInBlank(window.location.href);
  });

  // ---- Apps: open in about:blank ----
  $$(".app-card").forEach((card) => {
    card.addEventListener("click", () => {
      openInBlank(card.dataset.url);
    });
  });

  // ---- Init ----
  renderCheatsList();
})();
