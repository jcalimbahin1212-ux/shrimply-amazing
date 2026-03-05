/* ============================================
   shrimpify — main application logic
   ============================================ */

(function () {
  "use strict";

  // ---- Splash Screen ----
  (function() {
    var splash = document.getElementById('splash-overlay');
    if (!splash) return;
    if (sessionStorage.getItem('shrimpify-splash-shown')) {
      splash.remove();
      return;
    }
    sessionStorage.setItem('shrimpify-splash-shown', '1');
    splash.addEventListener('animationend', function() {
      splash.remove();
    });
  })();

  // ---- Random Home Quote ----
  (function () {
    var quotes = [
      "why my shrimp here",
      "she shrimp on my shrimp till i shrimp",
      "matthew keeps shrimping",
      "my shrimp is at its max",
      "you should check out gn-math",
      "shrimp who?",
      "just shrimping around",
      "truffled.lol is pretty fire",
      "dont make me start shrimping",
      "random shrimp facts 101"
    ];
    var el = document.getElementById("home-quote");
    if (el) el.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  })();

  // ---- Ambient Particles ----
  (function () {
    var canvas = document.getElementById("ambient-particles");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var particles = [];
    var count = 35;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        o: Math.random() * 0.25 + 0.05,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + p.o + ")";
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // ---- Card Mouse Glow ----
  document.addEventListener("mousemove", function (e) {
    var cards = document.querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
      var rect = cards[i].getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      cards[i].style.setProperty("--mouse-x", x + "px");
      cards[i].style.setProperty("--mouse-y", y + "px");
    }
  });

  // ---- State ----
  const state = {
    currentPage: "home",
    panicUrl: localStorage.getItem("shrimpify-panic-url") || "https://classroom.google.com",
    selectedCheat: null,
    selectedGamemode: 0,
  };

  // ---- Bypass Unlock System ----
  var BYPASS_KEY = "shrimpify-bypass";
  var BYPASS_CODE = "180shrimp";

  function isUnlocked() {
    return localStorage.getItem(BYPASS_KEY) === "1";
  }

  function applyUnlockState() {
    if (isUnlocked()) {
      document.body.classList.add("bypass-unlocked");
    } else {
      document.body.classList.remove("bypass-unlocked");
    }
  }

  function unlock() {
    localStorage.setItem(BYPASS_KEY, "1");
    applyUnlockState();
    toast("bypass features unlocked");
  }

  window.shrimpUnlock = unlock;
  applyUnlockState();

  // ---- Scramjet Proxy Setup ----
  const DEFAULT_WISP_URL = "wss://wisp.mercurywork.shop/";
  let scramjetController = null;
  let bareMuxConn = null;

  (function initScramjet() {
    if (typeof $scramjetLoadController === "undefined" || typeof BareMux === "undefined") {
      console.warn("Scramjet or BareMux not loaded. Proxy disabled.");
      return;
    }
    try {
      var ctrl = $scramjetLoadController();
      scramjetController = new ctrl.ScramjetController({
        files: {
          wasm: "/scram/scramjet.wasm.wasm",
          all: "/scram/scramjet.all.js",
          sync: "/scram/scramjet.sync.js",
        },
      });
      scramjetController.init();
      bareMuxConn = new BareMux.BareMuxConnection("/baremux/worker.js");
    } catch (e) {
      console.error("Scramjet init error:", e);
    }
  })();

  async function registerScramjetSW() {
    if (!navigator.serviceWorker) {
      throw new Error("Service workers not supported.");
    }
    var reg = await navigator.serviceWorker.register("/sw.js");
    // Wait for the service worker to become active
    if (!navigator.serviceWorker.controller) {
      await new Promise(function(resolve) {
        var sw = reg.installing || reg.waiting || reg.active;
        if (sw) {
          if (sw.state === "activated") { resolve(); return; }
          sw.addEventListener("statechange", function() {
            if (sw.state === "activated") resolve();
          });
        } else {
          resolve();
        }
      });
    }
  }

  async function ensureScramjetTransport() {
    if (!bareMuxConn) throw new Error("BareMux not initialized.");
    var wispUrl = localStorage.getItem("shrimpify-wisp-url") || DEFAULT_WISP_URL;
    var currentTransport = null;
    try { currentTransport = await bareMuxConn.getTransport(); } catch (e) { console.debug("getTransport:", e); }
    if (currentTransport !== "/epoxy/index.mjs") {
      await bareMuxConn.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
    }
  }

  // ---- Panel CSS for about:blank game launcher ----
  const PANEL_CSS = `
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{height:100%;overflow:hidden;background:#111;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif;color:#ccc}
    #game-frame{position:fixed;top:0;left:0;bottom:0;right:280px;width:calc(100% - 280px);height:100%;border:none;transition:right .25s ease,width .25s ease}
    #game-frame.full{right:32px;width:calc(100% - 32px)}
    #panel-toggle{position:fixed;top:0;right:248px;width:32px;bottom:0;background:#161616;border-left:1px solid #222;border-right:1px solid #222;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:right .25s ease;user-select:none}
    #panel-toggle.collapsed{right:0}
    #panel-toggle:hover{background:#1a1a1a}
    #panel-toggle span{color:#555;font-size:14px;transition:transform .25s ease}
    #panel-toggle.collapsed span{transform:rotate(180deg)}
    #panel{position:fixed;top:0;right:0;width:248px;bottom:0;background:#161616;overflow-y:auto;transition:transform .25s ease;z-index:9;display:flex;flex-direction:column}
    #panel.collapsed{transform:translateX(248px)}
    #panel::-webkit-scrollbar{width:4px}
    #panel::-webkit-scrollbar-track{background:transparent}
    #panel::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}
    .p-header{padding:14px 16px;border-bottom:1px solid #222}
    .p-title{display:flex;align-items:center;gap:8px}
    .p-title span{font-size:1.2rem}
    .p-title h2{font-size:.85rem;font-weight:400;color:#888;letter-spacing:.5px}
    .p-tabs{display:flex;flex-wrap:wrap;gap:4px;padding:10px 14px;border-bottom:1px solid #222}
    .p-tab{padding:5px 10px;background:transparent;border:1px solid #2a2a2a;border-radius:4px;color:#555;font-size:.72rem;cursor:pointer;transition:all .15s;text-transform:lowercase}
    .p-tab:hover{color:#aaa;border-color:#444}
    .p-tab.active{color:#ccc;border-color:#444;background:#1e1e1e}
    .p-scripts{padding:10px 14px;display:flex;flex-direction:column;gap:6px;flex:1}
    .p-btn{display:block;width:100%;padding:10px 14px;background:#1a1a1a;border:1px solid #252525;border-radius:6px;color:#999;font-size:.78rem;text-align:left;cursor:pointer;transition:all .15s;font-family:inherit;text-transform:lowercase}
    .p-btn:hover{background:#1e1e1e;color:#ddd;border-color:#3a3a3a}
    .p-btn.copied{color:#6a8;border-color:#3a5a4a}
    .p-hint{padding:12px 14px;font-size:.65rem;color:#444;text-align:center;border-top:1px solid #222;margin-top:auto;opacity:0;transition:opacity .3s ease}
    .p-hint.visible{opacity:1}
    .p-lookup{padding:10px 14px;border-bottom:1px solid #222}
    .p-lookup-title{font-size:.68rem;color:#555;margin-bottom:8px;letter-spacing:.3px}
    .p-lookup-row{display:flex;gap:4px;margin-bottom:4px}
    .p-lookup-input{flex:1;padding:8px 10px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:4px;color:#ccc;font-size:.75rem;outline:none;font-family:inherit}
    .p-lookup-input:focus{border-color:#444}
    .p-lookup-input::placeholder{color:#3a3a3a}
    .p-lookup-go{padding:8px 12px;background:#1e1e1e;border:1px solid #333;border-radius:4px;color:#aaa;font-size:.72rem;cursor:pointer;transition:all .15s;white-space:nowrap;font-family:inherit}
    .p-lookup-go:hover{background:#252525;color:#ddd;border-color:#555}
    .p-lookup-go:disabled{opacity:.4;cursor:not-allowed}
    .p-lookup-hint{font-size:.58rem;color:#3a3a3a;margin-top:2px;line-height:1.3}
    .p-lookup-status{font-size:.68rem;padding:6px 0;text-align:center}
    .p-status-err{color:#c88}
    .p-status-load{color:#666}
    .p-status-ok{color:#6a8}
    .p-answers{padding:0 14px 10px;overflow-y:auto;flex:1}
    .p-answer-item{padding:8px 10px;background:#1a1a1a;border:1px solid #222;border-radius:4px;margin-bottom:4px;font-size:.72rem}
    .p-answer-q{color:#888;margin-bottom:3px;line-height:1.3}
    .p-answer-num{color:#555;font-size:.66rem;margin-right:4px}
    .p-answer-choices{margin-top:3px;display:flex;flex-direction:column;gap:1px}
    .p-answer-correct{color:#6a8;font-weight:500}
    .p-answer-wrong{color:#444;font-size:.68rem}
    .p-divider{border:none;border-top:1px solid #222;margin:4px 14px}
  `;

  // ---- Panel API JS for about:blank game launcher (answer fetching) ----
  const PANEL_API_JS = `
    var PROXIES=[
      {name:"corsproxy",prefix:"https://corsproxy.io/?",post:true},
      {name:"allorigins",prefix:"https://api.allorigins.win/raw?url=",post:false},
      {name:"codetabs",prefix:"https://api.codetabs.com/v1/proxy?quest=",post:false}
    ];
    function proxyFetch(url,opts){
      var method=(opts&&opts.method)||"GET";
      var isPost=method==="POST";
      var list=isPost?PROXIES.filter(function(p){return p.post}):PROXIES;
      return tryP(0);
      function tryP(i){
        if(i>=list.length)return Promise.reject(new Error("all proxies failed — your school may be blocking them."));
        var p=list[i];
        var pUrl=p.prefix+encodeURIComponent(url);
        var fo={method:method};
        if(opts&&opts.headers)fo.headers=opts.headers;
        if(opts&&opts.body)fo.body=opts.body;
        var ac=new AbortController();fo.signal=ac.signal;
        var tid=setTimeout(function(){ac.abort()},10000);
        return fetch(pUrl,fo).then(function(r){
          clearTimeout(tid);
          if(!r.ok)throw new Error("HTTP "+r.status);
          return r;
        }).catch(function(e){
          clearTimeout(tid);
          return tryP(i+1);
        });
      }
    }
    function fetchQuizizz(input){
      var v=input.trim();
      if(/^[a-f0-9]{24}$/i.test(v))return fetchQuizizzQuiz(v);
      if(!/^\\d+$/.test(v))return Promise.reject(new Error("enter a numeric room code or 24-char quiz id."));
      return proxyFetch("https://game.quizizz.com/play-api/v5/checkRoom",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({roomCode:v})
      }).then(function(r){return r.json()}).then(function(d){
        var qid=(d.room&&d.room.quizId)||(d.data&&d.data.room&&d.data.room.quizId);
        if(!qid)throw new Error("could not find quiz for that code — game may have ended.");
        return fetchQuizizzQuiz(qid);
      });
    }
    function fetchQuizizzQuiz(qid){
      return proxyFetch("https://quizizz.com/api/main/quiz/"+qid+"?bypassProfanity=true")
        .then(function(r){return r.json()}).then(function(d){
          var quiz=d.data||d;
          var qs=(quiz.info&&quiz.info.questions)||[];
          if(!qs.length)throw new Error("no questions found in quiz.");
          return qs.map(function(q,i){
            var txt=(q.structure&&q.structure.query&&q.structure.query.text)||("question "+(i+1));
            txt=txt.replace(/<[^>]+>/g,"");
            var opts=(q.structure&&q.structure.options)||[];
            var ans=q.structure&&q.structure.answer;
            var ci=Array.isArray(ans)?ans:(typeof ans==="number"?[ans]:[]);
            return{num:i+1,question:txt,options:opts.map(function(o,oi){
              return{text:(o.text||"").replace(/<[^>]+>/g,""),correct:ci.indexOf(oi)!==-1};
            })};
          });
        });
    }
    function fetchKahoot(input){
      var v=input.trim();
      var m=v.match(/kahoots?\\/([-\\w]+)/i)||v.match(/([\\w]{8}-[\\w]{4}-[\\w]{4}-[\\w]{4}-[\\w]{12})/);
      if(m)v=m[1];
      if(!v||v.length<8)return Promise.reject(new Error("enter a kahoot quiz link or uuid. game PINs won't work."));
      return proxyFetch("https://play.kahoot.it/rest/kahoots/"+v)
        .then(function(r){return r.json()}).then(function(d){
          var qs=d.questions;
          if(!qs||!qs.length)throw new Error("quiz not found — it may be private. ask teacher for share link.");
          return qs.map(function(q,i){
            var txt=(q.question||("question "+(i+1))).replace(/<[^>]+>/g,"");
            var ch=q.choices||[];
            return{num:i+1,question:txt,options:ch.map(function(c){
              return{text:(c.answer||"").replace(/<[^>]+>/g,""),correct:!!c.correct};
            })};
          });
        });
    }
    function fetchEdpuzzle(input,gameUrl){
      var id=input.trim();
      if(!id&&gameUrl){var m=gameUrl.match(/\\/(assignments|media)\\/([\\da-f]+)/i);if(m)id=m[2];}
      if(id.indexOf("edpuzzle.com")!==-1){var m2=id.match(/\\/(assignments|media)\\/([\\da-f]+)/i);if(m2)id=m2[2];}
      if(!id)return Promise.reject(new Error("could not detect assignment id. paste the edpuzzle url."));
      return proxyFetch("https://edpuzzle.com/api/v3/assignments/"+id)
        .then(function(r){return r.json()}).then(function(d){
          var qs=d.questions||(d.medias&&d.medias[0]&&d.medias[0].questions)||[];
          if(!qs.length)throw new Error("no questions found — assignment may need login.");
          return qs.map(function(q,i){
            var txt=(q.body&&q.body[0]&&q.body[0].text)||q.title||("question "+(i+1));
            txt=txt.replace(/<[^>]+>/g,"");
            var ans=q.answers||[];
            return{num:i+1,question:txt,options:ans.map(function(a){
              var at=(a.body&&a.body[0]&&a.body[0].text)||a.text||"";
              return{text:at.replace(/<[^>]+>/g,""),correct:!!a.isCorrect};
            })};
          });
        });
    }
    function escHTML(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
    if(DATA.apiLookup){
      var lkDiv=document.getElementById("p-lookup");
      var lkIn=document.getElementById("p-lookup-input");
      var lkBtn=document.getElementById("p-lookup-go");
      var lkHint=document.getElementById("p-lookup-hint");
      var lkStatus=document.getElementById("p-lookup-status");
      var ansDiv=document.getElementById("p-answers");
      var dividerEl=document.getElementById("p-divider");
      lkDiv.style.display="";
      lkIn.placeholder=DATA.apiLookup.inputPlaceholder||"enter code...";
      lkHint.textContent=DATA.apiLookup.hint||"";
      if(DATA.apiLookup.platform==="edpuzzle"&&DATA.gameUrl){
        var am=DATA.gameUrl.match(/\\/(assignments|media)\\/([\\da-f]+)/i);
        if(am){lkIn.value=am[2];lkIn.placeholder="auto-detected";}
      }
      function doLookup(){
        var val=lkIn.value;
        lkBtn.disabled=true;lkBtn.textContent="fetching...";
        lkStatus.textContent="";lkStatus.className="p-lookup-status p-status-load";
        ansDiv.style.display="none";ansDiv.innerHTML="";
        var h;
        if(DATA.apiLookup.platform==="quizizz")h=fetchQuizizz(val);
        else if(DATA.apiLookup.platform==="kahoot")h=fetchKahoot(val);
        else if(DATA.apiLookup.platform==="edpuzzle")h=fetchEdpuzzle(val,DATA.gameUrl);
        else{lkBtn.disabled=false;lkBtn.textContent="fetch";return;}
        h.then(function(results){
          lkBtn.disabled=false;lkBtn.textContent="fetch";
          lkStatus.textContent="found "+results.length+" questions";
          lkStatus.className="p-lookup-status p-status-ok";
          renderAnswers(results);
        }).catch(function(err){
          lkBtn.disabled=false;lkBtn.textContent="fetch";
          lkStatus.textContent=err.message||"fetch failed.";
          lkStatus.className="p-lookup-status p-status-err";
          ansDiv.style.display="none";
        });
      }
      function renderAnswers(results){
        dividerEl.style.display="";ansDiv.style.display="";
        ansDiv.innerHTML=results.map(function(r){
          var h='<div class="p-answer-item">';
          h+='<div class="p-answer-q"><span class="p-answer-num">q'+r.num+':</span> '+escHTML(r.question)+'</div>';
          if(r.options.length>0){
            h+='<div class="p-answer-choices">';
            r.options.forEach(function(o){
              if(o.correct)h+='<div class="p-answer-correct">\\u2192 '+escHTML(o.text)+'</div>';
              else h+='<div class="p-answer-wrong">\\u00a0\\u00a0 '+escHTML(o.text)+'</div>';
            });
            h+='</div>';
          }
          h+='</div>';return h;
        }).join("");
      }
      lkBtn.addEventListener("click",doLookup);
      lkIn.addEventListener("keydown",function(e){if(e.key==="Enter")doLookup();});
    }
  `;

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
    // Block navigation to bypass-gated pages if not unlocked
    var gatedPages = ["apps", "cheats", "proxy"];
    if (gatedPages.indexOf(page) !== -1 && !isUnlocked()) return;

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
        ShrimpTools.gradeCalc();
        ShrimpTools.typingTest();
        ShrimpTools.randomPicker();
      } else if (page === "writer") {
        ShrimpTools.textTools();
        ShrimpTools.citations();
        ShrimpTools.essayOutliner();
        ShrimpTools.textToSpeech();
        ShrimpTools.translator();
        ShrimpTools.essayWriter();
        ShrimpTools.humanizer();
      } else if (page === "reference") {
        ShrimpTools.formulas();
        ShrimpTools.periodicTable();
        ShrimpTools.anatomy();
      } else if (page === "notes") {
        ShrimpTools.notes();
      } else if (page === "whiteboard") {
        ShrimpTools.whiteboard();
      } else if (page === "study") {
        ShrimpTools.flashcards();
        ShrimpTools.quizMode();
        ShrimpTools.studyPlanner();
        ShrimpTools.classSchedule();
      } else if (page === "settings") {
        ShrimpTools.focusSounds();
      } else if (page === "library") {
        ShrimpTools.sourceFinder();
        ShrimpTools.vocabulary();
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

  // ---- About:Blank Launcher with Scramjet Proxy ----
  async function openInBlankProxy(url) {
    if (!scramjetController || !bareMuxConn) {
      toast("Proxy not available. Opening directly.");
      openInBlank(url);
      return;
    }

    try {
      toast("Starting proxy…");
      await registerScramjetSW();
      await ensureScramjetTransport();

      // Encode the URL through Scramjet's proxy prefix
      // Must be absolute URL so the about:blank iframe loads from our origin
      // where the service worker is registered
      var proxyUrl = new URL(scramjetController.encodeUrl(url), location.origin).href;

      var win = window.open("about:blank", "_blank");
      if (!win) {
        toast("Pop-up blocked! Allow pop-ups for this site.");
        return;
      }

      var cloakTitle = document.title || "Google Docs";
      var cloakIcon = ($$("link[rel='icon']")[0] || {}).href ||
        "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";

      win.document.write(
        '<!DOCTYPE html><html><head>' +
        '<title>' + cloakTitle + '</title>' +
        '<link rel="icon" href="' + cloakIcon + '">' +
        '<style>*{margin:0;padding:0;overflow:hidden}html,body,iframe{width:100%;height:100%;border:none}</style>' +
        '</head><body>' +
        '<iframe src="' + proxyUrl + '" allowfullscreen ' +
        'allow="clipboard-read; clipboard-write" ' +
        'style="width:100%;height:100%;border:none"></iframe>' +
        '</body></html>'
      );
      win.document.close();
      try { win.document.querySelector("iframe").focus(); } catch (_) {}
      toast("Opened via Scramjet proxy");
    } catch (err) {
      console.error("Scramjet proxy error:", err);
      toast("Proxy failed: " + (err.message || err) + ". Opening directly.");
      openInBlank(url);
    }
  }

  // ---- Proxy Page ----
  (function initProxyPage() {
    var proxyInput = $("#proxy-url-input");
    var proxyBtn = $("#proxy-go-btn");
    if (!proxyInput || !proxyBtn) return;

    function launchProxy() {
      var url = proxyInput.value.trim();
      if (!url) { toast("Enter a URL"); return; }
      if (!/^https?:\/\//i.test(url)) url = "https://" + url;
      openInBlankProxy(url);
    }

    proxyBtn.addEventListener("click", launchProxy);
    proxyInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") launchProxy();
    });
  })();

  // ---- Game Launcher with Script Panel ----
  function openGameWithPanel(cheat) {
    const win = window.open("about:blank", "_blank");
    if (!win) {
      toast("Pop-up blocked! Allow pop-ups for this site.");
      return;
    }
    const cloakTitle = document.title || "Google Docs";
    const cloakIcon = ($$("link[rel='icon']")[0] || {}).href ||
      "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";

    // Serialize cheat data as Base64 JSON to avoid </script> parsing issues
    const payload = {
      name: cheat.name,
      icon: cheat.icon,
      gamemodes: cheat.gamemodes,
      apiLookup: cheat.apiLookup || null,
      gameUrl: cheat.url
    };
    const dataB64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));

    win.document.write(buildPanelHTML(cloakTitle, cloakIcon, cheat.url, dataB64));
    win.document.close();
    try { win.document.querySelector("#game-frame").focus(); } catch (_) {}
    toast("Launched " + cheat.name + " with shrimpanel");
  }

  function buildPanelHTML(cloakTitle, cloakIcon, gameUrl, dataB64) {
    return '<!DOCTYPE html><html><head>' +
      '<title>' + cloakTitle + '</title>' +
      '<link rel="icon" href="' + cloakIcon + '">' +
      '<style>' + PANEL_CSS + '</style>' +
      '</head><body>' +
      '<iframe id="game-frame" src="' + gameUrl + '" allowfullscreen allow="clipboard-read;clipboard-write"></iframe>' +
      '<div id="panel-toggle"><span>&#9664;</span></div>' +
      '<div id="panel">' +
        '<div class="p-header">' +
          '<div class="p-title"><span id="p-icon"></span><h2 id="p-name">shrimpanel</h2></div>' +
        '</div>' +
        '<div class="p-tabs" id="p-tabs"></div>' +
        '<div class="p-lookup" id="p-lookup" style="display:none">' +
          '<div class="p-lookup-title">answer lookup</div>' +
          '<div class="p-lookup-row">' +
            '<input class="p-lookup-input" id="p-lookup-input" type="text" placeholder="">' +
            '<button class="p-lookup-go" id="p-lookup-go">fetch</button>' +
          '</div>' +
          '<div class="p-lookup-hint" id="p-lookup-hint"></div>' +
          '<div class="p-lookup-status" id="p-lookup-status"></div>' +
        '</div>' +
        '<div class="p-answers" id="p-answers" style="display:none"></div>' +
        '<hr class="p-divider" id="p-divider" style="display:none">' +
        '<div class="p-scripts" id="p-scripts"></div>' +
        '<div class="p-hint" id="p-hint">paste in console (F12)</div>' +
      '</div>' +
      '<script>' +
        'var DATA=JSON.parse(decodeURIComponent(escape(atob("' + dataB64 + '"))));' +
        'var activeGM=0;' +
        'document.getElementById("p-icon").textContent=DATA.icon;' +
        'function renderTabs(){' +
          'var tabs=document.getElementById("p-tabs");' +
          'tabs.innerHTML=DATA.gamemodes.map(function(gm,i){' +
            'return "\\x3cbutton class=\\"p-tab"+(i===activeGM?" active":"")+ "\\" data-i=\\""+i+"\\">"+gm.name.toLowerCase()+"\\x3c/button>"' +
          '}).join("");' +
          'tabs.querySelectorAll(".p-tab").forEach(function(t){' +
            't.addEventListener("click",function(){' +
              'activeGM=parseInt(t.dataset.i);' +
              'renderTabs();renderScripts()' +
            '})' +
          '})' +
        '}' +
        'function renderScripts(){' +
          'var gm=DATA.gamemodes[activeGM];' +
          'var el=document.getElementById("p-scripts");' +
          'el.innerHTML=gm.cheats.map(function(c,i){' +
            'return "\\x3cbutton class=\\"p-btn\\" data-i=\\""+i+"\\">"+c.name.toLowerCase()+"\\x3c/button>"' +
          '}).join("");' +
          'el.querySelectorAll(".p-btn").forEach(function(btn){' +
            'btn.addEventListener("click",function(){' +
              'var code=gm.cheats[parseInt(btn.dataset.i)].code;' +
              'var orig=btn.textContent;' +
              'navigator.clipboard.writeText(code).then(function(){' +
                'btn.textContent="copied \\u2713";btn.classList.add("copied");' +
                'document.getElementById("p-hint").classList.add("visible");' +
                'setTimeout(function(){btn.textContent=orig;btn.classList.remove("copied")},1500)' +
              '},function(){' +
                'var ta=document.createElement("textarea");ta.value=code;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);' +
                'btn.textContent="copied \\u2713";btn.classList.add("copied");' +
                'document.getElementById("p-hint").classList.add("visible");' +
                'setTimeout(function(){btn.textContent=orig;btn.classList.remove("copied")},1500)' +
              '})' +
            '})' +
          '})' +
        '}' +
        'renderTabs();renderScripts();' +
        'var toggle=document.getElementById("panel-toggle");' +
        'var panel=document.getElementById("panel");' +
        'var frame=document.getElementById("game-frame");' +
        'toggle.addEventListener("click",function(){' +
          'var c=panel.classList.toggle("collapsed");' +
          'toggle.classList.toggle("collapsed",c);' +
          'frame.classList.toggle("full",c)' +
        '});' +
      PANEL_API_JS +
      '</' + 'script>' +
      '</body></html>';
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
      <button class="btn cheat-launch-btn" id="cheat-launch-game">launch with shrimpanel</button>
    `;

    // Launch button handler
    $("#cheat-launch-game").addEventListener("click", () => openGameWithPanel(cheat));

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

  // ---- Google Docs Disguise Mode ----
  const disguiseBar = document.createElement("div");
  disguiseBar.id = "disguise-bar";
  disguiseBar.innerHTML = '<div class="db-icon"><svg viewBox="0 0 48 48"><path fill="#2196F3" d="M37 45H11c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h17l11 11v29c0 1.1-.9 2-2 2z"/><path fill="#BBDEFB" d="M40 14H28V2z"/><path fill="#E1F5FE" d="M15 23h18v2H15zm0 4h18v2H15zm0 4h12v2H15z"/></svg></div><div><div class="db-title">Untitled document</div><div class="db-subtitle">File Edit View Insert Format Tools</div></div>';
  document.body.appendChild(disguiseBar);

  const disguiseExit = document.createElement("button");
  disguiseExit.id = "disguise-exit";
  disguiseExit.title = "Exit disguise";
  document.body.appendChild(disguiseExit);

  function activateDisguise() {
    document.body.classList.add("disguise");
    document.title = "Untitled document - Google Docs";
    let link = $("link[rel='icon']");
    if (link) link.href = "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
    localStorage.setItem("shrimpify-disguise", "1");
    toast("Disguise activated");
  }

  function deactivateDisguise() {
    document.body.classList.remove("disguise");
    const savedTitle = localStorage.getItem("shrimpify-cloak-title");
    const savedIcon = localStorage.getItem("shrimpify-cloak-icon");
    document.title = savedTitle || "Google Docs";
    let link = $("link[rel='icon']");
    if (link) link.href = savedIcon || "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
    localStorage.removeItem("shrimpify-disguise");
    toast("Disguise deactivated");
  }

  $("#disguise-toggle").addEventListener("click", () => {
    if (document.body.classList.contains("disguise")) deactivateDisguise();
    else activateDisguise();
  });

  disguiseExit.addEventListener("click", deactivateDisguise);

  // Restore disguise on load
  if (localStorage.getItem("shrimpify-disguise") === "1") {
    document.body.classList.add("disguise");
    document.title = "Untitled document - Google Docs";
    let link = $("link[rel='icon']");
    if (link) link.href = "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
  }

  // ---- Apps: open in about:blank via Scramjet proxy ----
  $$(".app-card").forEach((card) => {
    card.addEventListener("click", () => {
      openInBlankProxy(card.dataset.url);
    });
  });

  // ---- Proxy Settings ----
  (function initProxySettings() {
    var wispInput = $("#wisp-url");
    var saveBtn = $("#save-wisp-url");
    var resetBtn = $("#reset-wisp-url");
    var statusEl = $("#proxy-status");
    if (!wispInput || !saveBtn || !resetBtn) return;

    var stored = localStorage.getItem("shrimpify-wisp-url");
    if (stored) wispInput.value = stored;

    saveBtn.addEventListener("click", function() {
      var url = wispInput.value.trim();
      if (url) {
        localStorage.setItem("shrimpify-wisp-url", url);
        if (statusEl) statusEl.textContent = "✓ Proxy URL saved. Changes apply on next app launch.";
        toast("Proxy URL saved");
      }
    });

    resetBtn.addEventListener("click", function() {
      localStorage.removeItem("shrimpify-wisp-url");
      wispInput.value = "";
      wispInput.placeholder = DEFAULT_WISP_URL;
      if (statusEl) statusEl.textContent = "✓ Reset to default.";
      toast("Proxy URL reset to default");
    });
  })();

  // ---- Init ----
  renderCheatsList();
})();
