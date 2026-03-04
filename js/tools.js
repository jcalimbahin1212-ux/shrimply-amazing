/* ============================================
   shrimpify — tool implementations
   ============================================ */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const _inited = {};
  function initOnce(name, fn) {
    if (_inited[name]) return;
    _inited[name] = true;
    fn();
  }

  function toast(msg) {
    if (window.shrimpToast) window.shrimpToast(msg);
  }

  // ============================================================
  //  1. CALCULATOR
  // ============================================================
  function _initCalculator() {
    let expr = "";
    let history = JSON.parse(localStorage.getItem("shrimpify-calc-history") || "[]");
    const exprEl = $("#calc-expression");
    const resultEl = $("#calc-result");
    const historyList = $("#calc-history-list");

    function updateDisplay() {
      exprEl.textContent = expr || "";
      // live preview
      if (expr) {
        try {
          const val = calcEval(expr);
          if (val !== undefined && !isNaN(val) && isFinite(val)) {
            resultEl.textContent = formatNum(val);
          }
        } catch (_) { /* ignore parse errors while typing */ }
      }
    }

    function formatNum(n) {
      if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toString();
      const s = n.toPrecision(10);
      return parseFloat(s).toString();
    }

    function calcEval(expression) {
      // Replace math functions and constants for safe eval
      let e = expression
        .replace(/pi/g, "(" + Math.PI + ")")
        .replace(/\be\b/g, "(" + Math.E + ")")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/\^/g, "**");
      // Only allow safe characters
      if (/[^0-9+\-*/.()%eEMathsincostalqg ,]/.test(e.replace(/Math\.\w+/g, ""))) return undefined;
      return Function('"use strict"; return (' + e + ")")();
    }

    function renderHistory() {
      historyList.innerHTML = history
        .slice()
        .reverse()
        .map((h) => '<div class="calc-history-item">' + h.expr + " = " + h.result + "</div>")
        .join("");
    }

    // Button clicks
    $$("#tool-calculator .calc-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.dataset.val;
        const action = btn.dataset.action;

        if (val !== undefined) {
          expr += val;
          updateDisplay();
        } else if (action === "backspace") {
          // Handle removing multi-char tokens
          const fns = ["sin(", "cos(", "tan(", "log(", "sqrt(", "ln(", "pi"];
          let removed = false;
          for (const fn of fns) {
            if (expr.endsWith(fn)) {
              expr = expr.slice(0, -fn.length);
              removed = true;
              break;
            }
          }
          if (!removed) expr = expr.slice(0, -1);
          updateDisplay();
          if (!expr) resultEl.textContent = "0";
        } else if (action === "clear") {
          expr = "";
          resultEl.textContent = "0";
          exprEl.textContent = "";
        } else if (action === "equals") {
          try {
            const val = calcEval(expr);
            if (val !== undefined && !isNaN(val) && isFinite(val)) {
              const result = formatNum(val);
              history.push({ expr: expr, result: result });
              if (history.length > 50) history.shift();
              localStorage.setItem("shrimpify-calc-history", JSON.stringify(history));
              exprEl.textContent = expr + " =";
              resultEl.textContent = result;
              expr = result;
              renderHistory();
            } else {
              resultEl.textContent = "Error";
            }
          } catch (_) {
            resultEl.textContent = "Error";
          }
        }
      });
    });

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if ($("#page-tools")?.classList.contains("active") &&
          $("#tool-calculator")?.classList.contains("active")) {
        if (e.key >= "0" && e.key <= "9" || "+-*/.%()^".includes(e.key)) {
          expr += e.key;
          updateDisplay();
          e.preventDefault();
        } else if (e.key === "Enter") {
          $(".calc-btn[data-action='equals']")?.click();
          e.preventDefault();
        } else if (e.key === "Backspace") {
          $(".calc-btn[data-action='backspace']")?.click();
          e.preventDefault();
        }
      }
    });

    // Clear history
    $("#calc-history-clear").addEventListener("click", () => {
      history = [];
      localStorage.removeItem("shrimpify-calc-history");
      renderHistory();
      toast("Calculator history cleared");
    });

    renderHistory();
  }

  // ============================================================
  //  2. UNIT CONVERTER
  // ============================================================
  function _initUnitConverter() {
    const categories = Object.keys(UNITS);
    let currentCategory = categories[0];
    const catContainer = $("#converter-categories");
    const fromSelect = $("#converter-from");
    const toSelect = $("#converter-to");
    const input = $("#converter-input");
    const output = $("#converter-output");

    function renderCategories() {
      catContainer.innerHTML = categories
        .map(
          (c) =>
            '<button class="converter-category-tab' +
            (c === currentCategory ? " active" : "") +
            '" data-cat="' + c + '">' + c + "</button>"
        )
        .join("");

      catContainer.querySelectorAll(".converter-category-tab").forEach((btn) => {
        btn.addEventListener("click", () => {
          currentCategory = btn.dataset.cat;
          catContainer.querySelectorAll(".converter-category-tab").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          populateUnits();
          convert();
        });
      });
    }

    function populateUnits() {
      const units = Object.keys(UNITS[currentCategory].units);
      fromSelect.innerHTML = units.map((u) => '<option value="' + u + '">' + u + "</option>").join("");
      toSelect.innerHTML = units.map((u) => '<option value="' + u + '">' + u + "</option>").join("");
      if (units.length > 1) toSelect.selectedIndex = 1;
    }

    function convert() {
      const val = parseFloat(input.value);
      if (isNaN(val)) {
        output.textContent = "—";
        return;
      }
      const cat = UNITS[currentCategory].units;
      const from = cat[fromSelect.value];
      const to = cat[toSelect.value];

      let result;
      // Temperature special case (objects with toBase/fromBase)
      if (typeof from === "object" && from.toBase) {
        const base = from.toBase(val);
        result = to.fromBase(base);
      } else {
        // Standard: multiply by from factor, divide by to factor
        result = (val * from) / to;
      }

      if (isNaN(result) || !isFinite(result)) {
        output.textContent = "—";
      } else {
        // Format nicely
        output.textContent = parseFloat(result.toPrecision(10)).toString();
      }
    }

    input.addEventListener("input", convert);
    fromSelect.addEventListener("change", convert);
    toSelect.addEventListener("change", convert);

    $("#converter-swap").addEventListener("click", () => {
      const fromIdx = fromSelect.selectedIndex;
      fromSelect.selectedIndex = toSelect.selectedIndex;
      toSelect.selectedIndex = fromIdx;
      convert();
    });

    renderCategories();
    populateUnits();
    convert();
  }

  // ============================================================
  //  3. TIMER
  // ============================================================
  function _initTimer() {
    let mode = "stopwatch"; // stopwatch | countdown | pomodoro
    let running = false;
    let elapsed = 0; // ms for stopwatch, remaining ms for countdown/pomodoro
    let startTime = 0;
    let intervalId = null;
    let laps = [];
    let pomodoroPhase = "work"; // work | break
    let pomodoroCount = 0;
    const POMO_WORK = 25 * 60 * 1000;
    const POMO_BREAK = 5 * 60 * 1000;

    const display = $("#timer-display");
    const startBtn = $("#timer-start");
    const pauseBtn = $("#timer-pause");
    const resetBtn = $("#timer-reset");
    const lapBtn = $("#timer-lap");
    const lapList = $("#timer-lap-list");
    const countdownInputs = $("#timer-countdown-inputs");
    const pomodoroInfo = $("#timer-pomodoro-info");

    function formatTime(ms, showCentis) {
      const totalSec = Math.abs(ms) / 1000;
      const hrs = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = Math.floor(totalSec % 60);
      const centis = Math.floor((Math.abs(ms) % 1000) / 10);

      if (showCentis) {
        if (hrs > 0) return pad(hrs) + ":" + pad(mins) + ":" + pad(secs) + "." + pad(centis);
        return pad(mins) + ":" + pad(secs) + "." + pad(centis);
      }
      if (hrs > 0) return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
      return pad(mins) + ":" + pad(secs);
    }

    function pad(n) {
      return n < 10 ? "0" + n : "" + n;
    }

    function updateDisplay() {
      if (mode === "stopwatch") {
        display.textContent = formatTime(elapsed, true);
      } else {
        display.textContent = formatTime(elapsed, false);
      }
    }

    function tick() {
      if (mode === "stopwatch") {
        elapsed = Date.now() - startTime;
        updateDisplay();
      } else {
        // countdown / pomodoro: count down
        const remaining = elapsed - (Date.now() - startTime);
        if (remaining <= 0) {
          elapsed = 0;
          updateDisplay();
          stop();
          if (mode === "pomodoro") {
            if (pomodoroPhase === "work") {
              pomodoroCount++;
              pomodoroPhase = "break";
              elapsed = POMO_BREAK;
              toast("Break time!");
            } else {
              pomodoroPhase = "work";
              elapsed = POMO_WORK;
              toast("Back to work!");
            }
            $("#pomodoro-phase").textContent = pomodoroPhase === "work" ? "Work" : "Break";
            $("#pomodoro-count").textContent = pomodoroCount;
            updateDisplay();
            // Auto-start next phase
            start();
            return;
          }
          toast("Timer done!");
          return;
        }
        elapsed = remaining;
        startTime = Date.now();
        updateDisplay();
      }
    }

    function start() {
      if (running) return;

      if (mode === "countdown" && elapsed === 0) {
        // Read inputs
        const h = parseInt($("#timer-hours").value) || 0;
        const m = parseInt($("#timer-minutes").value) || 0;
        const s = parseInt($("#timer-seconds").value) || 0;
        elapsed = (h * 3600 + m * 60 + s) * 1000;
        if (elapsed <= 0) return;
      }

      if (mode === "pomodoro" && elapsed === 0) {
        pomodoroPhase = "work";
        elapsed = POMO_WORK;
        $("#pomodoro-phase").textContent = "Work";
        $("#pomodoro-count").textContent = pomodoroCount;
      }

      running = true;
      startTime = Date.now();
      intervalId = setInterval(tick, mode === "stopwatch" ? 30 : 200);
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      if (mode === "stopwatch") lapBtn.style.display = "";
    }

    function stop() {
      running = false;
      clearInterval(intervalId);
      intervalId = null;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }

    function reset() {
      stop();
      elapsed = 0;
      laps = [];
      updateDisplay();
      lapList.innerHTML = "";
      if (mode === "pomodoro") {
        pomodoroPhase = "work";
        pomodoroCount = 0;
        elapsed = 0;
        $("#pomodoro-phase").textContent = "Work";
        $("#pomodoro-count").textContent = "0";
      }
    }

    startBtn.addEventListener("click", start);
    pauseBtn.addEventListener("click", stop);
    resetBtn.addEventListener("click", reset);
    lapBtn.addEventListener("click", () => {
      if (!running || mode !== "stopwatch") return;
      laps.push(elapsed);
      const lapDiv = document.createElement("div");
      lapDiv.className = "timer-lap-item";
      lapDiv.innerHTML = "<span>Lap " + laps.length + "</span><span>" + formatTime(elapsed, true) + "</span>";
      lapList.prepend(lapDiv);
    });

    // Mode switching
    $$(".timer-mode-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".timer-mode-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        mode = tab.dataset.mode;
        reset();

        // Toggle UI
        countdownInputs.style.display = mode === "countdown" ? "" : "none";
        pomodoroInfo.style.display = mode === "pomodoro" ? "" : "none";
        lapBtn.style.display = mode === "stopwatch" ? "none" : "none";
        lapList.innerHTML = "";

        if (mode === "stopwatch") {
          display.textContent = "00:00.00";
        } else if (mode === "countdown") {
          display.textContent = "00:00";
        } else {
          display.textContent = "25:00";
        }
      });
    });
  }

  // ============================================================
  //  4. GPA CALCULATOR
  // ============================================================
  function _initGpa() {
    let rows = JSON.parse(localStorage.getItem("shrimpify-gpa-rows") || "[]");
    if (rows.length === 0) rows = [{ name: "", grade: "A", credits: 3 }];

    const tbody = $("#gpa-rows");
    const gpaValue = $("#gpa-value");
    const scaleSelect = $("#gpa-scale");

    function calcGPA() {
      let totalPoints = 0;
      let totalCredits = 0;
      const scale = parseFloat(scaleSelect.value);
      const multiplier = scale / 4.0;

      rows.forEach((r) => {
        const gp = GRADE_POINTS[r.grade];
        if (gp !== undefined && r.credits > 0) {
          totalPoints += gp * multiplier * r.credits;
          totalCredits += r.credits;
        }
      });

      const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
      gpaValue.textContent = gpa.toFixed(2);
    }

    function save() {
      localStorage.setItem("shrimpify-gpa-rows", JSON.stringify(rows));
      calcGPA();
    }

    function renderRows() {
      const gradeOptions = Object.keys(GRADE_POINTS)
        .map((g) => '<option value="' + g + '">' + g + "</option>")
        .join("");

      tbody.innerHTML = rows
        .map(
          (r, i) =>
            "<tr>" +
            '<td><input type="text" value="' + (r.name || "") + '" data-idx="' + i + '" data-field="name" placeholder="Class name"></td>' +
            '<td><select data-idx="' + i + '" data-field="grade">' +
            gradeOptions.replace('value="' + r.grade + '"', 'value="' + r.grade + '" selected') +
            "</select></td>" +
            '<td><input type="number" value="' + r.credits + '" data-idx="' + i + '" data-field="credits" min="0" max="10" step="0.5"></td>' +
            '<td><button class="gpa-remove-btn" data-idx="' + i + '">x</button></td>' +
            "</tr>"
        )
        .join("");

      // Wire events
      tbody.querySelectorAll("input, select").forEach((el) => {
        el.addEventListener("change", () => {
          const idx = parseInt(el.dataset.idx);
          const field = el.dataset.field;
          if (field === "credits") {
            rows[idx][field] = parseFloat(el.value) || 0;
          } else {
            rows[idx][field] = el.value;
          }
          save();
        });
      });

      tbody.querySelectorAll(".gpa-remove-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          rows.splice(parseInt(btn.dataset.idx), 1);
          if (rows.length === 0) rows.push({ name: "", grade: "A", credits: 3 });
          save();
          renderRows();
        });
      });

      calcGPA();
    }

    $("#gpa-add-row").addEventListener("click", () => {
      rows.push({ name: "", grade: "A", credits: 3 });
      save();
      renderRows();
    });

    scaleSelect.addEventListener("change", calcGPA);

    renderRows();
  }

  // ============================================================
  //  5. TEXT TOOLS
  // ============================================================
  function _initTextTools() {
    const textarea = $("#text-input");
    const statWords = $("#stat-words");
    const statChars = $("#stat-chars");
    const statSentences = $("#stat-sentences");
    const statParagraphs = $("#stat-paragraphs");
    const statReadingTime = $("#stat-reading-time");

    function updateStats() {
      const text = textarea.value;
      const trimmed = text.trim();
      const words = trimmed ? trimmed.split(/\s+/).length : 0;
      const chars = text.length;
      const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (words > 0 ? 1 : 0) : 0;
      const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length || (words > 0 ? 1 : 0) : 0;
      const readingTime = Math.max(1, Math.ceil(words / 200));

      statWords.textContent = words;
      statChars.textContent = chars;
      statSentences.textContent = sentences;
      statParagraphs.textContent = paragraphs;
      statReadingTime.textContent = words > 0 ? readingTime : 0;
    }

    textarea.addEventListener("input", updateStats);

    // Case converters
    $$("#tool-text-tools [data-case]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = textarea.value;
        switch (btn.dataset.case) {
          case "upper":
            textarea.value = text.toUpperCase();
            break;
          case "lower":
            textarea.value = text.toLowerCase();
            break;
          case "title":
            textarea.value = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
            break;
          case "sentence":
            textarea.value = text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p, c) => p + c.toUpperCase());
            break;
        }
        updateStats();
        toast("Text transformed");
      });
    });

    // Find & replace
    $("#text-replace-btn").addEventListener("click", () => {
      const find = $("#text-find").value;
      const replace = $("#text-replace").value;
      if (!find) return;
      const count = (textarea.value.match(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
      textarea.value = textarea.value.split(find).join(replace);
      updateStats();
      toast("Replaced " + count + " occurrence" + (count !== 1 ? "s" : ""));
    });

    // Transforms
    $("#text-reverse").addEventListener("click", () => {
      textarea.value = textarea.value.split("").reverse().join("");
      updateStats();
      toast("Text reversed");
    });

    $("#text-remove-duplicates").addEventListener("click", () => {
      const lines = textarea.value.split("\n");
      const unique = [...new Set(lines)];
      textarea.value = unique.join("\n");
      updateStats();
      toast("Removed " + (lines.length - unique.length) + " duplicate line(s)");
    });

    $("#text-sort-lines").addEventListener("click", () => {
      textarea.value = textarea.value
        .split("\n")
        .sort((a, b) => a.localeCompare(b))
        .join("\n");
      updateStats();
      toast("Lines sorted A-Z");
    });

    updateStats();
  }

  // ============================================================
  //  6. CITATION GENERATOR
  // ============================================================
  function _initCitations() {
    const typeSelect = $("#cite-type");
    const generateBtn = $("#cite-generate");
    const outputDiv = $("#citation-output");

    // Show/hide fields based on type
    typeSelect.addEventListener("change", () => {
      const type = typeSelect.value;
      $$(".cite-journal-field").forEach((el) => (el.style.display = type === "journal" ? "" : "none"));
      $$(".cite-book-field").forEach((el) => (el.style.display = type === "book" ? "" : "none"));
    });

    generateBtn.addEventListener("click", () => {
      const type = typeSelect.value;
      const first = $("#cite-first").value.trim();
      const last = $("#cite-last").value.trim();
      const title = $("#cite-title").value.trim();
      const publisher = $("#cite-publisher").value.trim();
      const date = $("#cite-date").value.trim();
      const url = $("#cite-url").value.trim();
      const accessed = $("#cite-accessed").value.trim();
      const journal = $("#cite-journal").value.trim();
      const volume = $("#cite-volume").value.trim();
      const pages = $("#cite-pages").value.trim();
      const edition = $("#cite-edition").value.trim();
      const city = $("#cite-city").value.trim();

      let mla = "", apa = "", chicago = "";

      if (type === "website") {
        // MLA: Last, First. "Title." Publisher, Date, URL. Accessed Day Mon. Year.
        mla = (last ? last + ", " + first : first || "Unknown") + '. "' + (title || "Untitled") + '." ';
        if (publisher) mla += '<i>' + publisher + '</i>, ';
        if (date) mla += date + ', ';
        if (url) mla += url + '. ';
        if (accessed) mla += 'Accessed ' + accessed + '.';

        // APA: Last, F. (Year). Title. Publisher. URL
        const apaInitial = first ? first.charAt(0) + "." : "";
        apa = (last ? last + ", " + apaInitial : first || "Unknown") + " ";
        if (date) apa += "(" + date + "). ";
        else apa += "(n.d.). ";
        apa += "<i>" + (title || "Untitled") + "</i>. ";
        if (publisher) apa += publisher + ". ";
        if (url) apa += url;

        // Chicago: Last, First. "Title." Publisher. Date. URL.
        chicago = (last ? last + ", " + first : first || "Unknown") + '. "' + (title || "Untitled") + '." ';
        if (publisher) chicago += publisher + ". ";
        if (date) chicago += date + ". ";
        if (url) chicago += url + '.';
      } else if (type === "book") {
        // MLA: Last, First. Title. Edition. Publisher, Date.
        mla = (last ? last + ", " + first : first || "Unknown") + ". <i>" + (title || "Untitled") + "</i>. ";
        if (edition) mla += edition + " ed., ";
        if (publisher) mla += publisher + ", ";
        if (date) mla += date + ".";

        // APA: Last, F. (Year). Title (Edition). Publisher.
        const apaInitial = first ? first.charAt(0) + "." : "";
        apa = (last ? last + ", " + apaInitial : first || "Unknown") + " ";
        if (date) apa += "(" + date + "). ";
        else apa += "(n.d.). ";
        apa += "<i>" + (title || "Untitled") + "</i>";
        if (edition) apa += " (" + edition + " ed.)";
        apa += ". ";
        if (publisher) apa += publisher + ".";

        // Chicago: Last, First. Title. City: Publisher, Date.
        chicago = (last ? last + ", " + first : first || "Unknown") + ". <i>" + (title || "Untitled") + "</i>. ";
        if (city) chicago += city + ": ";
        if (publisher) chicago += publisher + ", ";
        if (date) chicago += date + ".";
      } else if (type === "journal") {
        // MLA: Last, First. "Title." Journal, vol. X, no. X, Date, pp. X-X.
        mla = (last ? last + ", " + first : first || "Unknown") + '. "' + (title || "Untitled") + '." ';
        if (journal) mla += "<i>" + journal + "</i>, ";
        if (volume) mla += "vol. " + volume + ", ";
        if (date) mla += date + ", ";
        if (pages) mla += "pp. " + pages + ".";

        // APA: Last, F. (Year). Title. Journal, Volume, Pages. URL
        const apaInitial = first ? first.charAt(0) + "." : "";
        apa = (last ? last + ", " + apaInitial : first || "Unknown") + " ";
        if (date) apa += "(" + date + "). ";
        else apa += "(n.d.). ";
        apa += (title || "Untitled") + ". ";
        if (journal) apa += "<i>" + journal + "</i>, ";
        if (volume) apa += "<i>" + volume + "</i>, ";
        if (pages) apa += pages + ". ";
        if (url) apa += url;

        // Chicago: Last, First. "Title." Journal Volume (Date): Pages.
        chicago = (last ? last + ", " + first : first || "Unknown") + '. "' + (title || "Untitled") + '." ';
        if (journal) chicago += "<i>" + journal + "</i> ";
        if (volume) chicago += volume + " ";
        if (date) chicago += "(" + date + "): ";
        if (pages) chicago += pages + ".";
      }

      $("#cite-mla").innerHTML = mla;
      $("#cite-apa").innerHTML = apa;
      $("#cite-chicago").innerHTML = chicago;
      outputDiv.style.display = "";
      toast("Citations generated");
    });

    // Copy buttons
    $$(".copy-cite-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const format = btn.dataset.format;
        const el = $("#cite-" + format);
        if (!el) return;
        const text = el.textContent;
        navigator.clipboard.writeText(text).then(
          () => toast("Copied " + format.toUpperCase() + " citation"),
          () => {
            // Fallback
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            toast("Copied " + format.toUpperCase() + " citation");
          }
        );
      });
    });
  }

  // ============================================================
  //  7. FORMULA SHEETS
  // ============================================================
  function _initFormulas() {
    let currentCategory = "All";
    let searchQuery = "";
    const searchInput = $("#formula-search");
    const catContainer = $("#formula-categories");
    const grid = $("#formula-grid");

    const categories = ["All", ...new Set(FORMULAS.map((f) => f.category))];

    function renderCategories() {
      catContainer.innerHTML = categories
        .map(
          (c) =>
            '<button class="formula-category-tab' +
            (c === currentCategory ? " active" : "") +
            '" data-cat="' + c + '">' + c + "</button>"
        )
        .join("");

      catContainer.querySelectorAll(".formula-category-tab").forEach((btn) => {
        btn.addEventListener("click", () => {
          currentCategory = btn.dataset.cat;
          catContainer.querySelectorAll(".formula-category-tab").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          renderFormulas();
        });
      });
    }

    function renderFormulas() {
      const q = searchQuery.toLowerCase();
      const filtered = FORMULAS.filter((f) => {
        const matchCat = currentCategory === "All" || f.category === currentCategory;
        const matchSearch =
          !q ||
          f.name.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          f.desc.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q);
        return matchCat && matchSearch;
      });

      grid.innerHTML = filtered
        .map(
          (f) =>
            '<div class="formula-card">' +
            '<div class="formula-card-name">' + f.name + "</div>" +
            '<div class="formula-card-formula">' + f.formula + "</div>" +
            '<div class="formula-card-desc">' + f.desc + "</div>" +
            "</div>"
        )
        .join("");

      if (filtered.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-dim)">No formulas found.</p>';
      }
    }

    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value;
      renderFormulas();
    });

    renderCategories();
    renderFormulas();
  }

  // ============================================================
  //  8. PERIODIC TABLE
  // ============================================================
  function _initPeriodicTable() {
    const grid = $("#periodic-grid");
    const detailPanel = $("#element-detail");
    const detailContent = $("#element-detail-content");

    // Build a 2D map: [row][col] → element
    // Standard table: periods 1-7 in rows 1-7, lanthanides in row 9, actinides in row 10
    // Each element placed at (period, group) except lanthanides/actinides

    function getGridPosition(el) {
      if (el.category === "lanthanide") {
        // z 57-71 → row 9, columns 3-17 (mapped by z - 57 + 3)
        return { row: 9, col: el.z - 57 + 3 };
      }
      if (el.category === "actinide") {
        // z 89-103 → row 10, columns 3-17
        return { row: 10, col: el.z - 89 + 3 };
      }
      return { row: el.period, col: el.group };
    }

    // Build grid array
    const cells = {}; // "row-col" → element
    ELEMENTS.forEach((el) => {
      const pos = getGridPosition(el);
      cells[pos.row + "-" + pos.col] = el;
    });

    let html = "";
    const totalRows = 10;
    const totalCols = 18;

    for (let r = 1; r <= totalRows; r++) {
      // Skip row 8 (gap between main table and lanthanides/actinides)
      if (r === 8) {
        for (let c = 1; c <= totalCols; c++) {
          html += '<div class="element-cell" style="border:none;background:none"></div>';
        }
        continue;
      }
      for (let c = 1; c <= totalCols; c++) {
        const el = cells[r + "-" + c];
        if (el) {
          html +=
            '<div class="element-cell element-' +
            el.category +
            '" data-z="' + el.z + '" title="' + el.name + " (" + el.symbol + ') - ' + el.mass + '">' +
            '<span class="element-number">' + el.z + "</span>" +
            '<span class="element-symbol">' + el.symbol + "</span>" +
            '<span class="element-name">' + el.name + "</span>" +
            "</div>";
        } else {
          html += '<div class="element-cell" style="border:none;background:none"></div>';
        }
      }
    }

    grid.innerHTML = html;

    // Click handler
    grid.querySelectorAll(".element-cell[data-z]").forEach((cell) => {
      cell.addEventListener("click", () => {
        const el = ELEMENTS.find((e) => e.z === parseInt(cell.dataset.z));
        if (!el) return;

        detailContent.innerHTML =
          '<h3>' + el.z + " — " + el.name + " (" + el.symbol + ")</h3>" +
          '<div class="element-detail-grid">' +
          detailItem("Atomic Number", el.z) +
          detailItem("Symbol", el.symbol) +
          detailItem("Atomic Mass", el.mass + " u") +
          detailItem("Category", el.category.replace(/-/g, " ")) +
          detailItem("Group", el.group) +
          detailItem("Period", el.period) +
          detailItem("Block", el.block) +
          "</div>";

        detailPanel.style.display = "";
      });
    });

    function detailItem(label, value) {
      return (
        '<div class="element-detail-item">' +
        '<span class="element-detail-label">' + label + "</span>" +
        '<span class="element-detail-value">' + value + "</span>" +
        "</div>"
      );
    }
  }

  // ============================================================
  //  9. NOTES
  // ============================================================
  function _initNotes() {
    let notes = JSON.parse(localStorage.getItem("shrimpify-notes") || "[]");
    let activeId = notes.length > 0 ? notes[0].id : null;
    let saveTimer = null;

    const list = $("#notes-list");
    const titleInput = $("#note-title");
    const bodyInput = $("#note-body");
    const lastSaved = $("#note-last-saved");
    const deleteBtn = $("#note-delete");
    const newBtn = $("#note-new");

    function save() {
      localStorage.setItem("shrimpify-notes", JSON.stringify(notes));
    }

    function getActive() {
      return notes.find((n) => n.id === activeId);
    }

    function renderList() {
      list.innerHTML = notes
        .map(
          (n) =>
            '<div class="note-item' +
            (n.id === activeId ? " active" : "") +
            '" data-id="' + n.id + '">' +
            '<div class="note-item-title">' + (n.title || "Untitled") + "</div>" +
            '<div class="note-item-preview">' + (n.body || "").slice(0, 60) + "</div>" +
            "</div>"
        )
        .join("");

      list.querySelectorAll(".note-item").forEach((item) => {
        item.addEventListener("click", () => {
          activeId = item.dataset.id;
          loadNote();
          renderList();
        });
      });
    }

    function loadNote() {
      const note = getActive();
      if (note) {
        titleInput.value = note.title || "";
        bodyInput.value = note.body || "";
        lastSaved.textContent = note.lastSaved ? "Saved " + note.lastSaved : "";
        titleInput.disabled = false;
        bodyInput.disabled = false;
        deleteBtn.disabled = false;
      } else {
        titleInput.value = "";
        bodyInput.value = "";
        lastSaved.textContent = "";
        titleInput.disabled = true;
        bodyInput.disabled = true;
        deleteBtn.disabled = true;
      }
    }

    function autoSave() {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        const note = getActive();
        if (!note) return;
        note.title = titleInput.value;
        note.body = bodyInput.value;
        const now = new Date();
        note.lastSaved = now.toLocaleTimeString();
        lastSaved.textContent = "Saved " + note.lastSaved;
        save();
        renderList();
      }, 500);
    }

    titleInput.addEventListener("input", autoSave);
    bodyInput.addEventListener("input", autoSave);

    newBtn.addEventListener("click", () => {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      const note = { id: id, title: "", body: "", lastSaved: "" };
      notes.unshift(note);
      activeId = id;
      save();
      renderList();
      loadNote();
      titleInput.focus();
    });

    deleteBtn.addEventListener("click", () => {
      if (!activeId) return;
      notes = notes.filter((n) => n.id !== activeId);
      activeId = notes.length > 0 ? notes[0].id : null;
      save();
      renderList();
      loadNote();
      toast("Note deleted");
    });

    renderList();
    loadNote();
  }

  // ============================================================
  //  10. FLASHCARDS
  // ============================================================
  function _initFlashcards() {
    var decks = JSON.parse(localStorage.getItem("shrimpify-flashcard-decks") || "[]");
    var currentDeckId = null;
    var studyCards = [];
    var studyIndex = 0;
    var isFlipped = false;

    var deckView = $("#fc-deck-view");
    var editorView = $("#fc-editor");
    var studyArea = $("#fc-study-area");

    function saveDecks() {
      localStorage.setItem("shrimpify-flashcard-decks", JSON.stringify(decks));
    }

    function getDeck(id) {
      return decks.find(function(d) { return d.id === id; });
    }

    function showView(view) {
      deckView.style.display = view === "decks" ? "" : "none";
      editorView.style.display = view === "editor" ? "" : "none";
      studyArea.style.display = view === "study" ? "" : "none";
    }

    function renderDeckList() {
      var deckGrid = $("#fc-deck-list");
      if (decks.length === 0) {
        deckGrid.innerHTML = '<p style="color:var(--text-dim)">No decks yet. Create one below!</p>';
        return;
      }
      deckGrid.innerHTML = decks.map(function(deck) {
        return '<div class="fc-deck-card" data-id="' + deck.id + '">' +
          '<div class="fc-deck-name">' + (deck.name || "Untitled Deck") + '</div>' +
          '<div class="fc-deck-count">' + deck.cards.length + ' card' + (deck.cards.length !== 1 ? 's' : '') + '</div>' +
          '<div class="fc-deck-actions">' +
          '<button class="fc-study-deck-btn" data-id="' + deck.id + '">Study</button>' +
          '<button class="fc-edit-deck-btn" data-id="' + deck.id + '">Edit</button>' +
          '<button class="fc-delete-deck-btn" data-id="' + deck.id + '">Delete</button>' +
          '</div>' +
          '</div>';
      }).join("");

      deckGrid.querySelectorAll(".fc-study-deck-btn").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
          e.stopPropagation();
          var deck = getDeck(btn.dataset.id);
          if (deck && deck.cards.length > 0) {
            currentDeckId = deck.id;
            startStudy();
          } else {
            toast("Add some cards first!");
          }
        });
      });

      deckGrid.querySelectorAll(".fc-edit-deck-btn").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
          e.stopPropagation();
          currentDeckId = btn.dataset.id;
          openEditor();
        });
      });

      deckGrid.querySelectorAll(".fc-delete-deck-btn").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
          e.stopPropagation();
          decks = decks.filter(function(d) { return d.id !== btn.dataset.id; });
          saveDecks();
          renderDeckList();
          toast("Deck deleted");
        });
      });
    }

    function openEditor() {
      var deck = getDeck(currentDeckId);
      if (!deck) return;
      $("#fc-deck-title").textContent = deck.name || "Untitled Deck";
      renderCardList();
      showView("editor");
    }

    function renderCardList() {
      var deck = getDeck(currentDeckId);
      if (!deck) return;
      var cardList = $("#fc-card-list");
      if (deck.cards.length === 0) {
        cardList.innerHTML = '<p style="color:var(--text-dim)">No cards yet. Add one above!</p>';
        return;
      }
      cardList.innerHTML = deck.cards.map(function(card, idx) {
        return '<div class="fc-card-item">' +
          '<div class="fc-card-front-preview">' + card.front + '</div>' +
          '<div class="fc-card-back-preview">' + card.back + '</div>' +
          '<span class="fc-card-status">' + (card.mastered ? "Mastered" : "") + '</span>' +
          '<button class="fc-delete-card-btn" data-idx="' + idx + '">Delete</button>' +
          '</div>';
      }).join("");

      cardList.querySelectorAll(".fc-delete-card-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
          var deck = getDeck(currentDeckId);
          if (deck) {
            deck.cards.splice(parseInt(btn.dataset.idx), 1);
            saveDecks();
            renderCardList();
            toast("Card deleted");
          }
        });
      });
    }

    function shuffleArray(arr) {
      var shuffled = arr.slice();
      for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
      return shuffled;
    }

    function startStudy() {
      var deck = getDeck(currentDeckId);
      if (!deck) return;
      var unmastered = deck.cards.filter(function(c) { return !c.mastered; });
      if (unmastered.length === 0) {
        unmastered = deck.cards.slice();
        deck.cards.forEach(function(c) { c.mastered = false; });
        saveDecks();
      }
      studyCards = shuffleArray(unmastered);
      studyIndex = 0;
      isFlipped = false;
      showView("study");
      renderStudyCard();
    }

    function renderStudyCard() {
      var studyDone = $("#fc-study-done");
      var studyCardArea = $("#fc-study-card-area");
      var progressBar = $("#fc-progress-bar");
      var progressText = $("#fc-progress-text");

      if (studyIndex >= studyCards.length) {
        studyDone.style.display = "";
        studyCardArea.style.display = "none";
        progressText.textContent = "Complete!";
        progressBar.style.width = "100%";
        return;
      }

      studyDone.style.display = "none";
      studyCardArea.style.display = "";

      var card = studyCards[studyIndex];
      $("#fc-study-front").textContent = card.front;
      $("#fc-study-back").textContent = card.back;
      $("#fc-study-card").classList.remove("flipped");
      isFlipped = false;

      var progress = Math.round((studyIndex / studyCards.length) * 100);
      progressBar.style.width = progress + "%";
      progressText.textContent = (studyIndex + 1) + " / " + studyCards.length;
    }

    // New deck
    $("#fc-new-deck").addEventListener("click", function() {
      var nameInput = $("#fc-deck-name-input");
      var name = nameInput.value.trim();
      if (!name) {
        toast("Enter a deck name");
        return;
      }
      var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      decks.push({ id: id, name: name, cards: [] });
      saveDecks();
      nameInput.value = "";
      renderDeckList();
      toast("Deck created");
    });

    // Add card
    $("#fc-add-card").addEventListener("click", function() {
      var deck = getDeck(currentDeckId);
      if (!deck) return;
      var front = $("#fc-card-front").value.trim();
      var back = $("#fc-card-back").value.trim();
      if (!front || !back) {
        toast("Enter both front and back");
        return;
      }
      deck.cards.push({ front: front, back: back, mastered: false });
      saveDecks();
      $("#fc-card-front").value = "";
      $("#fc-card-back").value = "";
      renderCardList();
      toast("Card added");
    });

    // Start study from editor
    $("#fc-start-study").addEventListener("click", function() {
      var deck = getDeck(currentDeckId);
      if (deck && deck.cards.length > 0) {
        startStudy();
      } else {
        toast("Add some cards first!");
      }
    });

    // Back to decks
    $("#fc-back-to-decks").addEventListener("click", function() {
      showView("decks");
      renderDeckList();
    });

    // Study controls
    $("#fc-flip-card").addEventListener("click", function() {
      var cardEl = $("#fc-study-card");
      if (isFlipped) {
        cardEl.classList.remove("flipped");
      } else {
        cardEl.classList.add("flipped");
      }
      isFlipped = !isFlipped;
    });

    $("#fc-got-it").addEventListener("click", function() {
      var deck = getDeck(currentDeckId);
      if (deck) {
        var currentCard = studyCards[studyIndex];
        var originalCard = deck.cards.find(function(c) {
          return c.front === currentCard.front && c.back === currentCard.back;
        });
        if (originalCard) {
          originalCard.mastered = true;
          saveDecks();
        }
      }
      studyIndex++;
      renderStudyCard();
    });

    $("#fc-again").addEventListener("click", function() {
      studyIndex++;
      renderStudyCard();
    });

    // Back to editor from study
    $("#fc-back-to-editor").addEventListener("click", function() {
      openEditor();
    });

    // Restart study
    $("#fc-restart-study").addEventListener("click", function() {
      startStudy();
    });

    // Initial render
    showView("decks");
    renderDeckList();
  }

  // ============================================================
  //  11. QUIZ MODE
  // ============================================================
  function _initQuizMode() {
    var currentDeck = null;
    var quizType = "multiple-choice";
    var quizQuestions = [];
    var currentQuestion = 0;
    var score = 0;
    var answered = false;

    var setupView = $("#quiz-setup");
    var quizArea = $("#quiz-area");
    var resultsView = $("#quiz-results");

    function getDecks() {
      return JSON.parse(localStorage.getItem("shrimpify-flashcard-decks") || "[]");
    }

    function showQuizView(view) {
      setupView.style.display = view === "setup" ? "" : "none";
      quizArea.style.display = view === "quiz" ? "" : "none";
      resultsView.style.display = view === "results" ? "" : "none";
    }

    function populateDeckSelect() {
      var decks = getDecks();
      var deckSelect = $("#quiz-deck-select");
      var noDecks = $("#quiz-no-decks");

      var validDecks = decks.filter(function(d) { return d.cards.length >= 4; });

      if (validDecks.length === 0) {
        noDecks.style.display = "";
        noDecks.textContent = "No decks with 4+ cards available. Create flashcard decks first!";
        deckSelect.style.display = "none";
        $("#quiz-start").disabled = true;
        return;
      }

      noDecks.style.display = "none";
      deckSelect.style.display = "";
      $("#quiz-start").disabled = false;

      deckSelect.innerHTML = validDecks.map(function(d) {
        return '<option value="' + d.id + '">' + d.name + ' (' + d.cards.length + ' cards)</option>';
      }).join("");
    }

    function shuffleArray(arr) {
      var shuffled = arr.slice();
      for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
      return shuffled;
    }

    function startQuiz() {
      var decks = getDecks();
      var deckId = $("#quiz-deck-select").value;
      currentDeck = decks.find(function(d) { return d.id === deckId; });
      if (!currentDeck || currentDeck.cards.length < 4) {
        toast("Select a valid deck");
        return;
      }

      quizType = $("#quiz-type").value;
      var count = parseInt($("#quiz-count").value) || 10;
      count = Math.min(count, currentDeck.cards.length);

      quizQuestions = shuffleArray(currentDeck.cards).slice(0, count);
      currentQuestion = 0;
      score = 0;
      answered = false;

      showQuizView("quiz");
      renderQuestion();
    }

    function renderQuestion() {
      if (currentQuestion >= quizQuestions.length) {
        showResults();
        return;
      }

      var q = quizQuestions[currentQuestion];
      $("#quiz-question").textContent = q.front;
      $("#quiz-progress").textContent = "Question " + (currentQuestion + 1) + " of " + quizQuestions.length;
      $("#quiz-feedback").textContent = "";
      $("#quiz-feedback").className = "quiz-feedback";
      $("#quiz-next").style.display = "none";
      answered = false;

      var choicesDiv = $("#quiz-choices");
      var typeInputDiv = $("#quiz-type-input");

      if (quizType === "multiple-choice") {
        choicesDiv.style.display = "";
        typeInputDiv.style.display = "none";

        var wrongAnswers = currentDeck.cards.filter(function(c) {
          return c.back !== q.back;
        });
        var wrongChoices = shuffleArray(wrongAnswers).slice(0, 3).map(function(c) {
          return c.back;
        });
        var allChoices = shuffleArray([q.back].concat(wrongChoices));

        choicesDiv.innerHTML = allChoices.map(function(choice) {
          return '<button class="quiz-choice-btn" data-answer="' + choice.replace(/"/g, '&quot;') + '">' + choice + '</button>';
        }).join("");

        choicesDiv.querySelectorAll(".quiz-choice-btn").forEach(function(btn) {
          btn.addEventListener("click", function() {
            if (answered) return;
            checkAnswer(btn.dataset.answer, q.back);
            choicesDiv.querySelectorAll(".quiz-choice-btn").forEach(function(b) {
              if (b.dataset.answer === q.back) {
                b.classList.add("correct");
              } else if (b === btn && btn.dataset.answer !== q.back) {
                b.classList.add("incorrect");
              }
              b.disabled = true;
            });
          });
        });
      } else {
        choicesDiv.style.display = "none";
        typeInputDiv.style.display = "";
        $("#quiz-answer-input").value = "";
        $("#quiz-answer-input").disabled = false;
        $("#quiz-submit-answer").disabled = false;
        $("#quiz-answer-input").focus();
      }
    }

    function checkAnswer(userAnswer, correctAnswer) {
      answered = true;
      var feedback = $("#quiz-feedback");

      var isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();

      if (isCorrect) {
        score++;
        feedback.textContent = "Correct!";
        feedback.className = "quiz-feedback correct";
      } else {
        feedback.textContent = "Wrong! The answer was: " + correctAnswer;
        feedback.className = "quiz-feedback incorrect";
      }

      $("#quiz-next").style.display = "";
    }

    function showResults() {
      showQuizView("results");
      var percent = Math.round((score / quizQuestions.length) * 100);
      $("#quiz-score").innerHTML = "You scored <strong>" + score + " / " + quizQuestions.length + "</strong> (" + percent + "%)";
    }

    // Event listeners
    $("#quiz-start").addEventListener("click", startQuiz);

    $("#quiz-submit-answer").addEventListener("click", function() {
      if (answered) return;
      var userAnswer = $("#quiz-answer-input").value;
      var q = quizQuestions[currentQuestion];
      checkAnswer(userAnswer, q.back);
      $("#quiz-answer-input").disabled = true;
      $("#quiz-submit-answer").disabled = true;
    });

    $("#quiz-answer-input").addEventListener("keydown", function(e) {
      if (e.key === "Enter" && !answered) {
        $("#quiz-submit-answer").click();
      }
    });

    $("#quiz-next").addEventListener("click", function() {
      currentQuestion++;
      renderQuestion();
    });

    $("#quiz-restart").addEventListener("click", function() {
      startQuiz();
    });

    $("#quiz-back-setup").addEventListener("click", function() {
      showQuizView("setup");
      populateDeckSelect();
    });

    // Initialize
    showQuizView("setup");
    populateDeckSelect();
  }

  // ============================================================
  //  12. STUDY PLANNER
  // ============================================================
  function _initStudyPlanner() {
    var tasks = JSON.parse(localStorage.getItem("shrimpify-study-planner") || "[]");
    var currentFilter = "all";

    function saveTasks() {
      localStorage.setItem("shrimpify-study-planner", JSON.stringify(tasks));
    }

    function getToday() {
      var d = new Date();
      return d.toISOString().split("T")[0];
    }

    function getWeekFromNow() {
      var d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().split("T")[0];
    }

    function formatDate(dateStr) {
      if (!dateStr) return "No due date";
      var d = new Date(dateStr + "T00:00:00");
      var options = { weekday: "short", month: "short", day: "numeric" };
      return d.toLocaleDateString(undefined, options);
    }

    function isOverdue(dateStr, done) {
      if (!dateStr || done) return false;
      return dateStr < getToday();
    }

    function filterTasks() {
      var today = getToday();
      var weekEnd = getWeekFromNow();

      return tasks.filter(function(t) {
        if (currentFilter === "all") return true;
        if (currentFilter === "today") return t.due === today;
        if (currentFilter === "week") return t.due >= today && t.due <= weekEnd;
        if (currentFilter === "overdue") return isOverdue(t.due, t.done);
        return true;
      });
    }

    function renderTasks() {
      var list = $("#planner-list");
      var filtered = filterTasks();

      if (filtered.length === 0) {
        list.innerHTML = '<p style="color:var(--text-dim)">No tasks found.</p>';
        return;
      }

      list.innerHTML = filtered.map(function(task) {
        var overdueClass = isOverdue(task.due, task.done) ? " overdue" : "";
        var doneClass = task.done ? " done" : "";
        return '<div class="planner-task' + overdueClass + doneClass + '" data-id="' + task.id + '">' +
          '<input type="checkbox" class="planner-checkbox" data-id="' + task.id + '"' + (task.done ? ' checked' : '') + '>' +
          '<span class="planner-subject-badge">' + task.subject + '</span>' +
          '<span class="planner-task-name">' + task.task + '</span>' +
          '<span class="planner-due-date">' + formatDate(task.due) + '</span>' +
          '<button class="planner-delete-btn" data-id="' + task.id + '">Delete</button>' +
          '</div>';
      }).join("");

      list.querySelectorAll(".planner-checkbox").forEach(function(cb) {
        cb.addEventListener("change", function() {
          var task = tasks.find(function(t) { return t.id === cb.dataset.id; });
          if (task) {
            task.done = cb.checked;
            saveTasks();
            renderTasks();
          }
        });
      });

      list.querySelectorAll(".planner-delete-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
          tasks = tasks.filter(function(t) { return t.id !== btn.dataset.id; });
          saveTasks();
          renderTasks();
          toast("Task deleted");
        });
      });
    }

    // Add task
    $("#planner-add-task").addEventListener("click", function() {
      var subject = $("#planner-subject-input").value.trim();
      var taskName = $("#planner-task-input").value.trim();
      var due = $("#planner-due-date").value;

      if (!subject || !taskName) {
        toast("Enter subject and task");
        return;
      }

      var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      tasks.push({
        id: id,
        subject: subject,
        task: taskName,
        due: due,
        done: false
      });
      saveTasks();

      $("#planner-subject-input").value = "";
      $("#planner-task-input").value = "";
      $("#planner-due-date").value = "";

      renderTasks();
      toast("Task added");
    });

    // Filter
    $("#planner-filter").addEventListener("change", function() {
      currentFilter = this.value;
      renderTasks();
    });

    // Clear done
    $("#planner-clear-done").addEventListener("click", function() {
      var beforeCount = tasks.length;
      tasks = tasks.filter(function(t) { return !t.done; });
      var removed = beforeCount - tasks.length;
      saveTasks();
      renderTasks();
      toast("Cleared " + removed + " completed task" + (removed !== 1 ? "s" : ""));
    });

    // Initial render
    renderTasks();
  }

  // ============================================================
  //  13. SOURCE FINDER
  // ============================================================
  function _initSourceFinder() {
    var searchInput = $("#source-search-input");
    var searchBtn = $("#source-search-btn");
    var loadingEl = $("#source-loading");
    var resultsEl = $("#source-results");
    var webCol = $("#source-web-col");
    var academicCol = $("#source-academic-col");
    var booksCol = $("#source-books-col");

    // SearXNG public instances (fallback chain)
    var searxInstances = [
      "https://searx.be",
      "https://search.sapti.me",
      "https://searx.tiekoetter.com"
    ];

    function fetchWithTimeout(url, ms) {
      var controller = new AbortController();
      var timer = setTimeout(function() { controller.abort(); }, ms);
      return fetch(url, { signal: controller.signal }).finally(function() { clearTimeout(timer); });
    }

    function trySearx(query, idx) {
      if (idx >= searxInstances.length) return Promise.resolve(null);
      var url = searxInstances[idx] + "/search?q=" + encodeURIComponent(query) + "&format=json&categories=general&language=en";
      return fetchWithTimeout(url, 8000)
        .then(function(r) { return r.json(); })
        .catch(function() { return trySearx(query, idx + 1); });
    }

    function extractDomain(url) {
      try { return new URL(url).hostname.replace(/^www\./, ""); } catch(e) { return ""; }
    }

    function isAcademic(url) {
      var domain = extractDomain(url);
      return /\.(edu|gov|org)$/i.test(domain);
    }

    function renderCard(item) {
      var domain = extractDomain(item.url || "");
      return '<div class="source-card">' +
        '<div class="source-title">' + (item.title || "Untitled") + '</div>' +
        (domain ? '<div class="source-domain">' + domain + '</div>' : '') +
        '<div class="source-snippet">' + (item.content || "") + '</div>' +
        '<a href="' + item.url + '" target="_blank" rel="noopener" class="source-link">Visit Source</a>' +
        '</div>';
    }

    function search() {
      var q = searchInput.value.trim();
      if (!q) { toast("Enter a search term"); return; }

      loadingEl.style.display = "";
      resultsEl.style.display = "none";
      webCol.innerHTML = "";
      academicCol.innerHTML = "";
      booksCol.innerHTML = "";

      var bookUrl = "https://openlibrary.org/search.json?q=" + encodeURIComponent(q) + "&limit=15";
      var searxPromise = trySearx(q, 0);
      var bookPromise = fetch(bookUrl).then(function(r) { return r.json(); }).catch(function() { return null; });

      Promise.all([searxPromise, bookPromise]).then(function(results) {
        loadingEl.style.display = "none";
        resultsEl.style.display = "";

        var searxData = results[0];
        var bookData = results[1];

        // Split SearXNG results into web and academic
        var webResults = [];
        var academicResults = [];
        if (searxData && searxData.results && searxData.results.length > 0) {
          searxData.results.forEach(function(item) {
            if (isAcademic(item.url)) {
              academicResults.push(item);
            } else {
              webResults.push(item);
            }
          });
        }

        // Render web results
        if (webResults.length > 0) {
          webCol.innerHTML = webResults.slice(0, 15).map(renderCard).join("");
        } else {
          webCol.innerHTML = '<p style="color:var(--text-dim)">No web results found.</p>';
        }

        // Render academic results
        if (academicResults.length > 0) {
          academicCol.innerHTML = academicResults.slice(0, 15).map(renderCard).join("");
        } else {
          academicCol.innerHTML = '<p style="color:var(--text-dim)">No academic sources found. Try more specific keywords.</p>';
        }

        // Render books
        if (bookData && bookData.docs && bookData.docs.length > 0) {
          booksCol.innerHTML = bookData.docs.map(function(doc) {
            var link = "https://openlibrary.org" + doc.key;
            var authors = doc.author_name ? doc.author_name.join(", ") : "Unknown author";
            var year = doc.first_publish_year || "Unknown year";
            return '<div class="source-card">' +
              '<div class="source-title">' + doc.title + '</div>' +
              '<div class="source-meta">By ' + authors + ' (' + year + ')</div>' +
              '<a href="' + link + '" target="_blank" rel="noopener" class="source-link">View on OpenLibrary</a>' +
              '</div>';
          }).join("");
        } else {
          booksCol.innerHTML = '<p style="color:var(--text-dim)">No books found.</p>';
        }

        toast("Found sources!");
      }).catch(function() {
        loadingEl.style.display = "none";
        toast("Error searching sources");
      });
    }

    searchBtn.addEventListener("click", search);
    searchInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") search();
    });
  }

  // ============================================================
  //  14. VOCABULARY BUILDER
  // ============================================================
  function _initVocabulary() {
    var searchInput = $("#vocab-word-input");
    var searchBtn = $("#vocab-lookup-btn");
    var resultArea = $("#vocab-result");
    var wordTitle = $("#vocab-word-title");
    var phonetic = $("#vocab-phonetic");
    var definitions = $("#vocab-definitions");
    var saveBtn = $("#vocab-save-btn");
    var wordList = $("#vocab-word-list");
    var clearBtn = $("#vocab-clear-list");
    var loadingEl = $("#vocab-loading");

    var currentWord = null;

    function getSavedWords() {
      return JSON.parse(localStorage.getItem("shrimpify-vocab-list") || "[]");
    }

    function saveWords(words) {
      localStorage.setItem("shrimpify-vocab-list", JSON.stringify(words));
    }

    function renderSavedWords() {
      var words = getSavedWords();
      if (words.length === 0) {
        wordList.innerHTML = '<p style="color:var(--text-dim)">No saved words yet.</p>';
        return;
      }
      wordList.innerHTML = words.map(function(w, idx) {
        return '<div class="vocab-saved-item">' +
          '<span class="vocab-saved-word">' + w.word + '</span>' +
          '<button class="vocab-delete-word" data-idx="' + idx + '">Delete</button>' +
          '</div>';
      }).join("");

      wordList.querySelectorAll(".vocab-delete-word").forEach(function(btn) {
        btn.addEventListener("click", function() {
          var words = getSavedWords();
          words.splice(parseInt(btn.dataset.idx), 1);
          saveWords(words);
          renderSavedWords();
          toast("Word removed");
        });
      });
    }

    function lookup() {
      var word = searchInput.value.trim().toLowerCase();
      if (!word) {
        toast("Enter a word");
        return;
      }

      resultArea.style.display = "none";
      if (loadingEl) loadingEl.style.display = "";
      wordTitle.textContent = "";
      phonetic.textContent = "";
      definitions.innerHTML = "";
      currentWord = null;

      var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(word);

      fetch(url)
        .then(function(r) {
          if (!r.ok) throw new Error("Not found");
          return r.json();
        })
        .then(function(data) {
          if (loadingEl) loadingEl.style.display = "none";
          if (!data || data.length === 0) {
            toast("Word not found");
            return;
          }

          var entry = data[0];
          currentWord = entry;

          wordTitle.textContent = entry.word;

          var phoneticText = entry.phonetic || "";
          if (!phoneticText && entry.phonetics && entry.phonetics.length > 0) {
            for (var i = 0; i < entry.phonetics.length; i++) {
              if (entry.phonetics[i].text) {
                phoneticText = entry.phonetics[i].text;
                break;
              }
            }
          }
          phonetic.textContent = phoneticText;

          var html = "";
          if (entry.meanings && entry.meanings.length > 0) {
            entry.meanings.forEach(function(meaning) {
              html += '<div class="vocab-meaning-section">';
              html += '<h4 class="vocab-pos">' + meaning.partOfSpeech + '</h4>';
              html += '<ol class="vocab-def-list">';
              meaning.definitions.forEach(function(def) {
                html += '<li>' + def.definition;
                if (def.example) {
                  html += '<div class="vocab-example">"' + def.example + '"</div>';
                }
                html += '</li>';
              });
              html += '</ol>';
              html += '</div>';
            });
          }
          definitions.innerHTML = html;
          resultArea.style.display = "";
        })
        .catch(function() {
          if (loadingEl) loadingEl.style.display = "none";
          toast("Word not found");
        });
    }

    searchBtn.addEventListener("click", lookup);

    searchInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        lookup();
      }
    });

    saveBtn.addEventListener("click", function() {
      if (!currentWord) {
        toast("Look up a word first");
        return;
      }

      var words = getSavedWords();
      var exists = words.some(function(w) {
        return w.word.toLowerCase() === currentWord.word.toLowerCase();
      });

      if (exists) {
        toast("Word already saved");
        return;
      }

      var simplified = {
        word: currentWord.word,
        phonetic: phonetic.textContent,
        meanings: currentWord.meanings.map(function(m) {
          return {
            partOfSpeech: m.partOfSpeech,
            definitions: m.definitions.slice(0, 3).map(function(d) {
              return d.definition;
            })
          };
        })
      };

      words.push(simplified);
      saveWords(words);
      renderSavedWords();
      toast("Word saved!");
    });

    clearBtn.addEventListener("click", function() {
      localStorage.removeItem("shrimpify-vocab-list");
      renderSavedWords();
      toast("Word list cleared");
    });

    // Initial render
    renderSavedWords();
  }

  // ============================================================
  //  15. ESSAY OUTLINER
  // ============================================================
  function _initEssayOutliner() {
    var saveTimer = null;

    function getOutline() {
      var saved = localStorage.getItem("shrimpify-essay-outline");
      if (saved) {
        return JSON.parse(saved);
      }
      return { thesis: "", intro: "", bodies: [""], conclusion: "" };
    }

    function saveOutline(outline) {
      localStorage.setItem("shrimpify-essay-outline", JSON.stringify(outline));
    }

    function loadOutline() {
      var outline = getOutline();
      $("#outline-thesis").value = outline.thesis || "";
      $("#outline-intro").value = outline.intro || "";
      $("#outline-conclusion").value = outline.conclusion || "";
      renderBodyParagraphs(outline.bodies || [""]);
    }

    function renderBodyParagraphs(bodies) {
      var container = $("#outline-body-list");
      if (!bodies || bodies.length === 0) {
        bodies = [""];
      }
      container.innerHTML = bodies.map(function(body, idx) {
        return '<div class="outline-body-item">' +
          '<label>Body Paragraph ' + (idx + 1) + '</label>' +
          '<textarea class="outline-body-textarea" data-idx="' + idx + '" rows="3" placeholder="Enter body paragraph ' + (idx + 1) + ' content...">' + body + '</textarea>' +
          '<button class="outline-remove-body" data-idx="' + idx + '">Remove</button>' +
          '</div>';
      }).join("");

      container.querySelectorAll(".outline-body-textarea").forEach(function(ta) {
        ta.addEventListener("input", scheduleAutoSave);
      });

      container.querySelectorAll(".outline-remove-body").forEach(function(btn) {
        btn.addEventListener("click", function() {
          var outline = getOutline();
          outline.bodies.splice(parseInt(btn.dataset.idx), 1);
          if (outline.bodies.length === 0) {
            outline.bodies = [""];
          }
          saveOutline(outline);
          renderBodyParagraphs(outline.bodies);
          toast("Paragraph removed");
        });
      });
    }

    function collectOutline() {
      var thesis = $("#outline-thesis").value;
      var intro = $("#outline-intro").value;
      var conclusion = $("#outline-conclusion").value;
      var bodies = [];
      $$("#outline-body-list .outline-body-textarea").forEach(function(ta) {
        bodies.push(ta.value);
      });
      return { thesis: thesis, intro: intro, bodies: bodies, conclusion: conclusion };
    }

    function scheduleAutoSave() {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function() {
        var outline = collectOutline();
        saveOutline(outline);
      }, 500);
    }

    // Event listeners for main fields
    $("#outline-thesis").addEventListener("input", scheduleAutoSave);
    $("#outline-intro").addEventListener("input", scheduleAutoSave);
    $("#outline-conclusion").addEventListener("input", scheduleAutoSave);

    // Add body paragraph
    $("#outline-add-body").addEventListener("click", function() {
      var outline = collectOutline();
      outline.bodies.push("");
      saveOutline(outline);
      renderBodyParagraphs(outline.bodies);
    });

    // Export
    $("#outline-export").addEventListener("click", function() {
      var outline = collectOutline();
      var text = "ESSAY OUTLINE\n";
      text += "=============\n\n";
      text += "THESIS STATEMENT:\n";
      text += (outline.thesis || "(empty)") + "\n\n";
      text += "INTRODUCTION:\n";
      text += (outline.intro || "(empty)") + "\n\n";
      outline.bodies.forEach(function(body, idx) {
        text += "BODY PARAGRAPH " + (idx + 1) + ":\n";
        text += (body || "(empty)") + "\n\n";
      });
      text += "CONCLUSION:\n";
      text += (outline.conclusion || "(empty)") + "\n";

      navigator.clipboard.writeText(text).then(function() {
        toast("Outline copied to clipboard!");
      }).catch(function() {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        toast("Outline copied to clipboard!");
      });
    });

    // Clear
    $("#outline-clear").addEventListener("click", function() {
      localStorage.removeItem("shrimpify-essay-outline");
      $("#outline-thesis").value = "";
      $("#outline-intro").value = "";
      $("#outline-conclusion").value = "";
      renderBodyParagraphs([""]);
      toast("Outline cleared");
    });

    // Initial load
    loadOutline();
  }

  // ============================================================
  //  Grade Calculator
  // ============================================================
  function _initGradeCalc() {
    var $ = function(s) { return document.querySelector(s); };

    // Final exam calculator
    $("#gc-calculate").addEventListener("click", function() {
      var current = parseFloat($("#gc-current").value);
      var weight = parseFloat($("#gc-weight").value) / 100;
      var target = parseFloat($("#gc-target").value);
      if (isNaN(current) || isNaN(weight) || isNaN(target) || weight <= 0) {
        var r = $("#gc-result"); r.style.display = "block";
        r.className = "gc-result gc-impossible";
        r.innerHTML = "Please fill in all fields with valid numbers.";
        return;
      }
      var needed = (target - current * (1 - weight)) / weight;
      var r = $("#gc-result");
      r.style.display = "block";
      if (needed <= 0) {
        r.className = "gc-result gc-safe";
        r.innerHTML = "You're safe! You could score <span class='gc-score'>0%</span> and still hit your target.";
      } else if (needed > 100) {
        r.className = "gc-result gc-impossible";
        r.innerHTML = "You'd need <span class='gc-score'>" + needed.toFixed(1) + "%</span> — that's mathematically impossible. Aim for a lower target.";
      } else {
        r.className = "gc-result gc-possible";
        r.innerHTML = "You need at least <span class='gc-score'>" + needed.toFixed(1) + "%</span> on the final.";
      }
    });

    // Semester grade calculator
    var semesterRows = [];
    function addSemesterRow(cat, grade, weight) {
      semesterRows.push({ cat: cat || "", grade: grade || "", weight: weight || "" });
      renderSemesterRows();
    }
    function renderSemesterRows() {
      var tbody = $("#gc-semester-rows");
      tbody.innerHTML = "";
      semesterRows.forEach(function(row, i) {
        var tr = document.createElement("tr");
        tr.innerHTML = '<td><input type="text" value="' + row.cat + '" data-i="' + i + '" data-f="cat" placeholder="Homework"></td>' +
          '<td><input type="number" value="' + row.grade + '" data-i="' + i + '" data-f="grade" step="0.1" placeholder="95"></td>' +
          '<td><input type="number" value="' + row.weight + '" data-i="' + i + '" data-f="weight" step="0.1" placeholder="30"></td>' +
          '<td><button class="gpa-remove-btn" data-i="' + i + '">x</button></td>';
        tbody.appendChild(tr);
      });
      tbody.querySelectorAll("input").forEach(function(inp) {
        inp.addEventListener("input", function() {
          semesterRows[parseInt(inp.dataset.i)][inp.dataset.f] = inp.value;
          calcSemester();
        });
      });
      tbody.querySelectorAll(".gpa-remove-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
          semesterRows.splice(parseInt(btn.dataset.i), 1);
          renderSemesterRows();
          calcSemester();
        });
      });
    }
    function calcSemester() {
      var totalWeight = 0, weighted = 0;
      semesterRows.forEach(function(r) {
        var g = parseFloat(r.grade), w = parseFloat(r.weight);
        if (!isNaN(g) && !isNaN(w)) { weighted += g * w; totalWeight += w; }
      });
      var res = $("#gc-semester-result");
      if (totalWeight > 0) {
        var avg = weighted / totalWeight;
        res.style.display = "block";
        res.className = "gc-result gc-possible";
        res.innerHTML = "Semester grade: <span class='gc-score'>" + avg.toFixed(1) + "%</span>" +
          (totalWeight < 100 ? " <span style='font-size:0.8rem;color:var(--text-dim)'>(weights total " + totalWeight.toFixed(0) + "%)</span>" : "");
      } else {
        res.style.display = "none";
      }
    }
    $("#gc-add-category").addEventListener("click", function() { addSemesterRow(); });
    addSemesterRow("Homework", "", "");
    addSemesterRow("Tests", "", "");
    addSemesterRow("Final Exam", "", "");
  }

  // ============================================================
  //  Typing Test
  // ============================================================
  function _initTypingTest() {
    var $ = function(s) { return document.querySelector(s); };
    var $$ = function(s) { return document.querySelectorAll(s); };
    var toast = window.shrimpToast || function() {};

    var passages = [
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.",
      "In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.",
      "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors.",
      "All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys' house.",
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood.",
      "Call me Ishmael. Some years ago, never mind how long precisely, having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      "The sun rose slowly over the misty mountains, casting golden rays across the forest floor. Birds began their morning songs as the world came alive with color and sound.",
      "Science is not only a disciple of reason but also one of romance and passion. The desire to understand the universe is the primary drive behind all scientific discovery and exploration.",
      "Education is the most powerful weapon which you can use to change the world. It is the key to eliminating gender inequality, to reducing poverty, to creating a sustainable planet, and to fostering peace.",
      "Technology is best when it brings people together. The advances we make should always serve to improve human connection and understanding across all boundaries and borders.",
      "The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle. As with all matters of the heart, you will know when you find it.",
      "Success is not final, failure is not fatal. It is the courage to continue that counts. Every champion was once a contender who refused to give up when things got difficult."
    ];

    var duration = 15, timer = null, startTime = null, started = false, finished = false;
    var currentPassage = "", charIndex = 0, errors = 0, totalTyped = 0;
    var bestWpm = parseInt(localStorage.getItem("shrimpify-best-wpm")) || 0;

    function pickPassage() {
      currentPassage = passages[Math.floor(Math.random() * passages.length)];
      renderPassage();
    }

    function renderPassage() {
      var el = $("#tt-passage");
      el.innerHTML = currentPassage.split("").map(function(ch, i) {
        var cls = i === 0 ? " current" : "";
        return '<span class="tt-char' + cls + '" data-i="' + i + '">' + (ch === " " ? "&nbsp;" : ch.replace(/</g, "&lt;")) + '</span>';
      }).join("");
    }

    function updateStats() {
      if (!startTime) return;
      var elapsed = (Date.now() - startTime) / 1000;
      var timeLeft = Math.max(0, duration - elapsed);
      var wordsTyped = (charIndex / 5);
      var minutes = elapsed / 60;
      var wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
      var accuracy = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;
      $("#tt-wpm").textContent = wpm;
      $("#tt-accuracy").textContent = accuracy;
      $("#tt-time").textContent = timeLeft.toFixed(0);
    }

    function endTest() {
      finished = true;
      clearInterval(timer);
      var elapsed = duration;
      var wordsTyped = charIndex / 5;
      var minutes = elapsed / 60;
      var wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
      var accuracy = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;
      if (wpm > bestWpm) { bestWpm = wpm; localStorage.setItem("shrimpify-best-wpm", bestWpm); }
      $("#tt-final-wpm").textContent = wpm;
      $("#tt-final-accuracy").textContent = accuracy + "%";
      $("#tt-final-errors").textContent = errors;
      $("#tt-best-wpm").textContent = bestWpm;
      $("#tt-results").style.display = "block";
      $("#tt-input").disabled = true;
      $("#tt-time").textContent = "0";
    }

    function resetTest() {
      clearInterval(timer);
      timer = null; startTime = null; started = false; finished = false;
      charIndex = 0; errors = 0; totalTyped = 0;
      $("#tt-wpm").textContent = "0";
      $("#tt-accuracy").textContent = "100";
      $("#tt-time").textContent = duration;
      $("#tt-results").style.display = "none";
      $("#tt-input").value = "";
      $("#tt-input").disabled = false;
      pickPassage();
    }

    // Duration tabs
    $$(".tt-mode-tab").forEach(function(tab) {
      tab.addEventListener("click", function() {
        $$(".tt-mode-tab").forEach(function(t) { t.classList.remove("active"); });
        tab.classList.add("active");
        duration = parseInt(tab.dataset.duration);
        resetTest();
      });
    });

    // Typing input
    $("#tt-input").addEventListener("input", function(e) {
      if (finished) return;
      if (!started) {
        started = true;
        startTime = Date.now();
        timer = setInterval(function() {
          updateStats();
          var elapsed = (Date.now() - startTime) / 1000;
          if (elapsed >= duration) endTest();
        }, 100);
      }
      var val = e.target.value;
      var lastChar = val[val.length - 1];
      if (charIndex < currentPassage.length) {
        totalTyped++;
        var chars = $$("#tt-passage .tt-char");
        if (lastChar === currentPassage[charIndex]) {
          chars[charIndex].classList.remove("current");
          chars[charIndex].classList.add("correct");
          charIndex++;
          if (charIndex < chars.length) chars[charIndex].classList.add("current");
        } else {
          chars[charIndex].classList.remove("current");
          chars[charIndex].classList.add("incorrect");
          errors++;
          charIndex++;
          if (charIndex < chars.length) chars[charIndex].classList.add("current");
        }
        e.target.value = "";
        if (charIndex >= currentPassage.length) endTest();
      }
    });

    // Prevent paste
    $("#tt-input").addEventListener("paste", function(e) { e.preventDefault(); });

    // Restart
    $("#tt-restart").addEventListener("click", resetTest);

    // Init
    resetTest();
  }

  // ============================================================
  //  Whiteboard
  // ============================================================
  function _initWhiteboard() {
    var $ = function(s) { return document.querySelector(s); };
    var $$ = function(s) { return document.querySelectorAll(s); };

    var canvas = $("#wb-canvas");
    var ctx = canvas.getContext("2d");
    var drawing = false, erasing = false;
    var color = "#e0e0e0", lineWidth = 4;
    var strokes = [], currentStroke = [];

    function resizeCanvas() {
      var wrap = $(".wb-canvas-wrap");
      var rect = wrap.getBoundingClientRect();
      var w = rect.width;
      var h = Math.max(500, window.innerHeight - 300);
      if (canvas.width !== w || canvas.height !== h) {
        var imageData = canvas.toDataURL();
        canvas.width = w;
        canvas.height = h;
        var img = new Image();
        img.onload = function() { ctx.drawImage(img, 0, 0); };
        img.src = imageData;
      }
    }

    function getPos(e) {
      var rect = canvas.getBoundingClientRect();
      var t = e.touches ? e.touches[0] : e;
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }

    function startDraw(e) {
      e.preventDefault();
      drawing = true;
      var pos = getPos(e);
      currentStroke = [{ x: pos.x, y: pos.y, color: erasing ? "#1a1a1a" : color, width: erasing ? lineWidth * 4 : lineWidth }];
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
      if (!drawing) return;
      e.preventDefault();
      var pos = getPos(e);
      var s = currentStroke[0];
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      currentStroke.push({ x: pos.x, y: pos.y });
    }

    function endDraw() {
      if (!drawing) return;
      drawing = false;
      if (currentStroke.length > 1) {
        strokes.push(currentStroke);
        if (strokes.length > 50) strokes.shift();
      }
    }

    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      strokes.forEach(function(stroke) {
        if (stroke.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = stroke[0].color;
        ctx.lineWidth = stroke[0].width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (var i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
      });
    }

    // Mouse events
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mouseleave", endDraw);

    // Touch events
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", endDraw);

    // Colors
    $$(".wb-color-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        $$(".wb-color-btn").forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        color = btn.dataset.color;
        erasing = false;
        $("#wb-eraser").classList.remove("active");
      });
    });

    // Custom color
    $("#wb-custom-color").addEventListener("input", function(e) {
      color = e.target.value;
      $$(".wb-color-btn").forEach(function(b) { b.classList.remove("active"); });
      erasing = false;
      $("#wb-eraser").classList.remove("active");
    });

    // Sizes
    $$(".wb-size-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        $$(".wb-size-btn").forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        lineWidth = parseInt(btn.dataset.size);
      });
    });

    // Eraser
    $("#wb-eraser").addEventListener("click", function() {
      erasing = !erasing;
      this.classList.toggle("active", erasing);
    });

    // Undo
    $("#wb-undo").addEventListener("click", function() {
      if (strokes.length > 0) { strokes.pop(); redraw(); }
    });

    // Clear
    $("#wb-clear").addEventListener("click", function() {
      strokes = [];
      redraw();
    });

    // Save
    $("#wb-save").addEventListener("click", function() {
      var link = document.createElement("a");
      link.download = "whiteboard.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });

    // Init
    resizeCanvas();
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    window.addEventListener("resize", resizeCanvas);
  }

  // ============================================================
  //  Random Picker
  // ============================================================
  function _initRandomPicker() {
    var $ = function(s) { return document.querySelector(s); };
    var $$ = function(s) { return document.querySelectorAll(s); };

    // Mode tabs
    $$(".rp-mode-tab").forEach(function(tab) {
      tab.addEventListener("click", function() {
        $$(".rp-mode-tab").forEach(function(t) { t.classList.remove("active"); });
        tab.classList.add("active");
        $$(".rp-panel").forEach(function(p) { p.classList.remove("active"); });
        var panel = $("#rp-" + tab.dataset.mode);
        if (panel) panel.classList.add("active");
      });
    });

    // Coin Flip
    $("#rp-flip-btn").addEventListener("click", function() {
      var result = Math.random() < 0.5 ? "Heads" : "Tails";
      var el = $("#rp-coin-result");
      el.textContent = result;
      el.style.animation = "none";
      el.offsetHeight;
      el.style.animation = "";
    });

    // Dice Roll
    $("#rp-roll-btn").addEventListener("click", function() {
      var count = parseInt($("#rp-dice-count").value) || 1;
      var el = $("#rp-dice-result");
      el.innerHTML = "";
      for (var i = 0; i < count; i++) {
        var val = Math.floor(Math.random() * 6) + 1;
        var die = document.createElement("div");
        die.className = "rp-die";
        die.textContent = val;
        el.appendChild(die);
      }
    });

    // Number
    $("#rp-number-btn").addEventListener("click", function() {
      var min = parseInt($("#rp-num-min").value) || 0;
      var max = parseInt($("#rp-num-max").value) || 100;
      if (min > max) { var tmp = min; min = max; max = tmp; }
      var val = Math.floor(Math.random() * (max - min + 1)) + min;
      var el = $("#rp-number-result");
      el.textContent = val;
      el.style.animation = "none";
      el.offsetHeight;
      el.style.animation = "";
    });

    // Name Picker
    $("#rp-name-btn").addEventListener("click", function() {
      var text = $("#rp-name-list").value.trim();
      var names = text.split("\n").map(function(n) { return n.trim(); }).filter(function(n) { return n.length > 0; });
      if (names.length === 0) return;
      var idx = Math.floor(Math.random() * names.length);
      var picked = names[idx];
      var el = $("#rp-name-result");
      el.style.display = "block";
      el.textContent = picked;
      el.style.animation = "none";
      el.offsetHeight;
      el.style.animation = "";

      if ($("#rp-remove-picked").checked) {
        names.splice(idx, 1);
        $("#rp-name-list").value = names.join("\n");
      }
    });
  }

  // ============================================================
  //  Class Schedule
  // ============================================================
  function _initClassSchedule() {
    var $ = function(s) { return document.querySelector(s); };
    var toast = window.shrimpToast || function() {};

    var KEY = "shrimpify-class-schedule";
    var periods = 8;
    var schedule = {};
    var editCell = null;

    function loadSchedule() {
      try {
        var saved = JSON.parse(localStorage.getItem(KEY));
        if (saved) { schedule = saved.schedule || {}; periods = saved.periods || 8; }
      } catch (e) {}
    }

    function saveSchedule() {
      localStorage.setItem(KEY, JSON.stringify({ schedule: schedule, periods: periods }));
    }

    function getCellKey(period, day) { return period + "-" + day; }

    function renderGrid() {
      var tbody = $("#cs-body");
      tbody.innerHTML = "";
      var today = new Date().getDay();

      // Highlight today column header
      var ths = document.querySelectorAll("#cs-table thead th[data-day]");
      ths.forEach(function(th) {
        th.classList.toggle("cs-today", parseInt(th.dataset.day) === today);
      });

      for (var p = 1; p <= periods; p++) {
        var tr = document.createElement("tr");
        var tdLabel = document.createElement("td");
        tdLabel.textContent = "P" + p;
        tr.appendChild(tdLabel);

        for (var d = 1; d <= 5; d++) {
          var td = document.createElement("td");
          var key = getCellKey(p, d);
          var cell = document.createElement("div");
          cell.className = "cs-cell";
          cell.dataset.period = p;
          cell.dataset.day = d;

          var data = schedule[key];
          if (data && data.subject) {
            cell.style.background = data.color || "";
            cell.innerHTML = '<div class="cs-cell-subject">' + data.subject + '</div>' +
              (data.teacher || data.room ? '<div class="cs-cell-detail">' + [data.teacher, data.room].filter(Boolean).join(" · ") + '</div>' : '');
          }

          cell.addEventListener("click", function() {
            openEditModal(this.dataset.period, this.dataset.day);
          });

          td.appendChild(cell);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
    }

    function openEditModal(period, day) {
      editCell = { period: parseInt(period), day: parseInt(day) };
      var key = getCellKey(editCell.period, editCell.day);
      var data = schedule[key] || {};
      $("#cs-edit-subject").value = data.subject || "";
      $("#cs-edit-teacher").value = data.teacher || "";
      $("#cs-edit-room").value = data.room || "";
      $("#cs-edit-color").value = data.color || "#2a2a2a";
      $("#cs-edit-modal").style.display = "flex";
    }

    $("#cs-edit-save").addEventListener("click", function() {
      if (!editCell) return;
      var key = getCellKey(editCell.period, editCell.day);
      var subject = $("#cs-edit-subject").value.trim();
      if (subject) {
        schedule[key] = {
          subject: subject,
          teacher: $("#cs-edit-teacher").value.trim(),
          room: $("#cs-edit-room").value.trim(),
          color: $("#cs-edit-color").value
        };
      } else {
        delete schedule[key];
      }
      saveSchedule();
      renderGrid();
      $("#cs-edit-modal").style.display = "none";
      editCell = null;
    });

    $("#cs-edit-delete").addEventListener("click", function() {
      if (!editCell) return;
      delete schedule[getCellKey(editCell.period, editCell.day)];
      saveSchedule();
      renderGrid();
      $("#cs-edit-modal").style.display = "none";
      editCell = null;
    });

    $("#cs-edit-cancel").addEventListener("click", function() {
      $("#cs-edit-modal").style.display = "none";
      editCell = null;
    });

    // Close modal on background click
    $("#cs-edit-modal").addEventListener("click", function(e) {
      if (e.target === this) {
        this.style.display = "none";
        editCell = null;
      }
    });

    // Add/Remove periods
    $("#cs-add-period").addEventListener("click", function() {
      if (periods < 12) { periods++; saveSchedule(); renderGrid(); }
    });

    $("#cs-remove-period").addEventListener("click", function() {
      if (periods > 1) {
        for (var d = 1; d <= 5; d++) delete schedule[getCellKey(periods, d)];
        periods--;
        saveSchedule();
        renderGrid();
      }
    });

    $("#cs-clear").addEventListener("click", function() {
      schedule = {};
      saveSchedule();
      renderGrid();
      toast("Schedule cleared");
    });

    loadSchedule();
    renderGrid();
  }

  // ============================================================
  //  Text-to-Speech
  // ============================================================
  function _initTextToSpeech() {
    var $ = function(s) { return document.querySelector(s); };
    var synth = window.speechSynthesis;
    if (!synth) return;

    var utterance = null, speaking = false;

    // Populate voices
    function loadVoices() {
      var voices = synth.getVoices();
      var sel = $("#tts-voice");
      sel.innerHTML = "";
      voices.forEach(function(v, i) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = v.name + " (" + v.lang + ")";
        sel.appendChild(opt);
      });
    }
    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);

    // Rate slider
    $("#tts-rate").addEventListener("input", function() {
      $("#tts-rate-value").textContent = this.value + "x";
    });

    // Play
    $("#tts-play").addEventListener("click", function() {
      var text = $("#tts-text").value.trim();
      if (!text) return;
      synth.cancel();
      utterance = new SpeechSynthesisUtterance(text);
      var voices = synth.getVoices();
      var voiceIdx = parseInt($("#tts-voice").value);
      if (voices[voiceIdx]) utterance.voice = voices[voiceIdx];
      utterance.rate = parseFloat($("#tts-rate").value);

      // Sentence highlighting
      var highlight = $("#tts-highlight");
      var sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
      var sentIdx = 0;
      highlight.classList.add("active");

      function updateHighlight() {
        highlight.innerHTML = sentences.map(function(s, i) {
          return i === sentIdx ? '<span class="tts-current">' + s + '</span>' : s;
        }).join("");
      }
      updateHighlight();

      utterance.addEventListener("boundary", function(e) {
        if (e.name === "sentence") {
          var spoken = text.substring(0, e.charIndex);
          var count = (spoken.match(/[.!?]+/g) || []).length;
          if (count < sentences.length) { sentIdx = count; updateHighlight(); }
        }
      });

      utterance.addEventListener("end", function() {
        speaking = false;
        highlight.classList.remove("active");
      });

      synth.speak(utterance);
      speaking = true;
    });

    // Pause
    $("#tts-pause").addEventListener("click", function() {
      if (synth.speaking && !synth.paused) { synth.pause(); this.textContent = "Resume"; }
      else if (synth.paused) { synth.resume(); this.textContent = "Pause"; }
    });

    // Stop
    $("#tts-stop").addEventListener("click", function() {
      synth.cancel();
      speaking = false;
      $("#tts-highlight").classList.remove("active");
      $("#tts-pause").textContent = "Pause";
    });
  }

  // ============================================================
  //  Focus Sounds
  // ============================================================
  function _initFocusSounds() {
    var $ = function(s) { return document.querySelector(s); };
    var $$ = function(s) { return document.querySelectorAll(s); };
    var toast = window.shrimpToast || function() {};

    var audioCtx = null, sourceNode = null, gainNode = null;
    var activeSound = null, stopTimer = null;

    function getCtx() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      return audioCtx;
    }

    function createWhiteNoise() {
      var ctx = getCtx();
      var bufferSize = 2 * ctx.sampleRate;
      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      var source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      return source;
    }

    function createBrownNoise() {
      var ctx = getCtx();
      var bufferSize = 2 * ctx.sampleRate;
      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      var last = 0;
      for (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;
        data[i] = (last + 0.02 * white) / 1.02;
        last = data[i];
        data[i] *= 3.5;
      }
      var source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      return source;
    }

    function createRain() {
      var ctx = getCtx();
      var bufferSize = 2 * ctx.sampleRate;
      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      var last = 0;
      for (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;
        data[i] = (last + 0.01 * white) / 1.01;
        last = data[i];
        data[i] *= 2;
        if (Math.random() < 0.001) data[i] += (Math.random() - 0.5) * 0.5;
      }
      var source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      return source;
    }

    function startSound(type) {
      stopSound();
      var ctx = getCtx();
      if (ctx.state === "suspended") ctx.resume();

      if (type === "white") sourceNode = createWhiteNoise();
      else if (type === "brown") sourceNode = createBrownNoise();
      else if (type === "rain") sourceNode = createRain();

      gainNode = ctx.createGain();
      gainNode.gain.value = parseFloat($("#fs-volume").value);
      sourceNode.connect(gainNode);
      gainNode.connect(ctx.destination);
      sourceNode.start();
      activeSound = type;

      $$(".fs-sound-btn").forEach(function(b) { b.classList.remove("active"); });
      var btn = document.querySelector('.fs-sound-btn[data-sound="' + type + '"]');
      if (btn) btn.classList.add("active");

      var timerVal = parseInt($("#fs-timer").value);
      if (timerVal > 0) {
        clearTimeout(stopTimer);
        stopTimer = setTimeout(function() { stopSound(); toast("Focus sounds auto-stopped"); }, timerVal * 60000);
        $("#fs-status").textContent = "Playing " + type + " noise — auto-stop in " + timerVal + "m";
      } else {
        $("#fs-status").textContent = "Playing " + type + " noise";
      }
    }

    function stopSound() {
      if (sourceNode) { try { sourceNode.stop(); } catch (e) {} sourceNode = null; }
      if (gainNode) { gainNode.disconnect(); gainNode = null; }
      clearTimeout(stopTimer);
      activeSound = null;
      $$(".fs-sound-btn").forEach(function(b) { b.classList.remove("active"); });
      $("#fs-status").textContent = "";
    }

    $$(".fs-sound-btn[data-sound]").forEach(function(btn) {
      btn.addEventListener("click", function() {
        if (activeSound === btn.dataset.sound) { stopSound(); return; }
        startSound(btn.dataset.sound);
      });
    });

    $("#fs-stop").addEventListener("click", stopSound);

    $("#fs-volume").addEventListener("input", function() {
      var val = parseFloat(this.value);
      $("#fs-volume-value").textContent = Math.round(val * 100) + "%";
      if (gainNode) gainNode.gain.value = val;
    });
  }

  // ============================================================
  //  TRANSLATOR
  // ============================================================
  function _initTranslator() {
    var inputEl = document.getElementById('translator-input');
    var outputEl = document.getElementById('translator-output');
    var fromSelect = document.getElementById('translator-from');
    var toSelect = document.getElementById('translator-to');
    var charCount = document.getElementById('translator-char-count');
    var detectedLang = document.getElementById('translator-detected-lang');
    var statusEl = document.getElementById('translator-status');
    var translateBtn = document.getElementById('translator-go');
    var swapBtn = document.getElementById('translator-swap');
    var clearBtn = document.getElementById('translator-clear');
    var copyBtn = document.getElementById('translator-copy');
    if (!inputEl) return;

    var MAX_CHARS = 500;
    var debounceTimer = null;

    function updateCharCount() {
      var len = inputEl.value.length;
      charCount.textContent = len + ' / ' + MAX_CHARS;
      charCount.classList.toggle('over-limit', len > MAX_CHARS);
    }

    function doTranslate() {
      var text = inputEl.value.trim();
      if (!text) { outputEl.textContent = ''; statusEl.textContent = ''; return; }
      if (text.length > MAX_CHARS) {
        statusEl.textContent = 'Text exceeds ' + MAX_CHARS + ' character limit';
        statusEl.className = 'translator-status error';
        return;
      }
      var fromLang = fromSelect.value;
      var toLang = toSelect.value;
      if (fromLang === toLang && fromLang !== 'auto') {
        outputEl.textContent = text;
        statusEl.textContent = 'Same language selected';
        return;
      }
      var langPair = (fromLang === 'auto' ? '' : fromLang) + '|' + toLang;
      var url = 'https://api.mymemory.translated.net/get?q=' +
        encodeURIComponent(text) + '&langpair=' + langPair;
      statusEl.textContent = 'Translating...';
      statusEl.className = 'translator-status';
      translateBtn.disabled = true;
      fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(data) {
          translateBtn.disabled = false;
          if (data.responseStatus === 200 && data.responseData) {
            outputEl.textContent = data.responseData.translatedText;
            statusEl.textContent = '';
            if (fromLang === 'auto' && data.responseData.detectedLanguage) {
              detectedLang.textContent = 'Detected: ' + data.responseData.detectedLanguage;
            } else { detectedLang.textContent = ''; }
          } else {
            statusEl.textContent = data.responseDetails || 'Translation failed';
            statusEl.className = 'translator-status error';
          }
        })
        .catch(function() {
          translateBtn.disabled = false;
          statusEl.textContent = 'Network error';
          statusEl.className = 'translator-status error';
        });
    }

    inputEl.addEventListener('input', function() {
      updateCharCount();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(doTranslate, 800);
    });
    translateBtn.addEventListener('click', doTranslate);
    swapBtn.addEventListener('click', function() {
      var fromVal = fromSelect.value;
      var toVal = toSelect.value;
      if (fromVal === 'auto') return;
      fromSelect.value = toVal;
      toSelect.value = fromVal;
      var outputText = outputEl.textContent;
      if (outputText) {
        inputEl.value = outputText;
        outputEl.textContent = '';
        updateCharCount();
        doTranslate();
      }
    });
    clearBtn.addEventListener('click', function() {
      inputEl.value = '';
      outputEl.textContent = '';
      statusEl.textContent = '';
      detectedLang.textContent = '';
      updateCharCount();
    });
    copyBtn.addEventListener('click', function() {
      var text = outputEl.textContent;
      if (!text) return;
      navigator.clipboard.writeText(text).then(function() {
        statusEl.textContent = 'Copied!';
        setTimeout(function() { statusEl.textContent = ''; }, 1500);
      });
    });
    updateCharCount();
  }

  // ============================================================
  //  ANATOMY DIAGRAMS
  // ============================================================
  function _initAnatomy() {
    if (typeof ANATOMY_SYSTEMS === 'undefined') return;
    var svgEl = document.getElementById('anatomy-svg');
    var tabsEl = document.getElementById('anatomy-system-tabs');
    var searchEl = document.getElementById('anatomy-search');
    var descEl = document.getElementById('anatomy-system-desc');
    var detailEl = document.getElementById('anatomy-part-detail');
    var nameEl = document.getElementById('anatomy-part-name');
    var partDescEl = document.getElementById('anatomy-part-desc');
    var partsListEl = document.getElementById('anatomy-parts-list');
    if (!svgEl || !tabsEl) return;

    var currentSystem = 0;
    var activePart = null;
    var searchQuery = '';

    var BODY = 'M200 18 C210 18 218 24 220 36 C222 48 220 58 216 66 L212 74 L218 78 C232 82 244 90 250 98 L260 98 C264 100 268 106 268 114 L262 192 C260 198 256 202 250 204 L244 272 C242 278 240 280 236 280 L230 280 L228 260 L222 260 L220 282 C218 296 224 340 226 380 L228 388 C230 396 232 420 232 436 L230 490 C230 496 228 500 224 502 L218 504 C214 504 210 500 210 496 L206 436 L200 380 L194 436 L190 496 C190 500 186 504 182 504 L176 502 C172 500 170 496 170 490 L168 436 C168 420 170 396 172 388 L174 380 C176 340 182 296 180 282 L178 260 L172 260 L170 280 L164 280 C160 280 158 278 156 272 L150 204 C144 202 140 198 138 192 L132 114 C132 106 136 100 140 98 L150 98 C156 90 168 82 182 78 L188 74 L184 66 C180 58 178 48 180 36 C182 24 190 18 200 18 Z';

    function renderSystemTabs() {
      tabsEl.innerHTML = ANATOMY_SYSTEMS.map(function(sys, i) {
        return '<button class="anatomy-system-tab' +
          (i === currentSystem ? ' active' : '') +
          '" data-idx="' + i + '">' + sys.name.replace(' System', '') + '</button>';
      }).join('');
      tabsEl.querySelectorAll('.anatomy-system-tab').forEach(function(btn) {
        btn.addEventListener('click', function() {
          currentSystem = parseInt(btn.dataset.idx);
          activePart = null;
          searchQuery = '';
          searchEl.value = '';
          renderSystemTabs();
          renderDiagram();
          renderInfo();
          renderPartsList();
        });
      });
    }

    function renderDiagram() {
      var sys = ANATOMY_SYSTEMS[currentSystem];
      var html = '<path class="body-outline" d="' + BODY + '"/>';
      var q = searchQuery.toLowerCase();
      sys.parts.forEach(function(part) {
        var match = !q || part.name.toLowerCase().indexOf(q) !== -1 ||
          part.description.toLowerCase().indexOf(q) !== -1;
        var dim = q && !match;
        var act = activePart === part.id;
        var cls = 'anatomy-part' + (act ? ' active' : '') + (dim ? ' dimmed' : '');
        var col = sys.color;
        if (part.path) {
          var closed = part.path.indexOf('Z') !== -1;
          html += '<path class="' + cls + '" data-part="' + part.id + '" d="' + part.path +
            '" fill="' + (closed ? col : 'none') + '" fill-opacity="' + (closed ? '0.4' : '0') +
            '" stroke="' + col + '" stroke-width="' + (closed ? '1' : '2.5') +
            '" stroke-linecap="round"><title>' + part.name + '</title></path>';
        } else if (part.rx) {
          html += '<ellipse class="' + cls + '" data-part="' + part.id +
            '" cx="' + part.cx + '" cy="' + part.cy + '" rx="' + part.rx + '" ry="' + part.ry +
            '" fill="' + col + '" fill-opacity="0.4" stroke="' + col +
            '" stroke-width="1"><title>' + part.name + '</title></ellipse>';
        } else if (part.r) {
          html += '<circle class="' + cls + '" data-part="' + part.id +
            '" cx="' + part.cx + '" cy="' + part.cy + '" r="' + part.r +
            '" fill="' + col + '" fill-opacity="0.4" stroke="' + col +
            '" stroke-width="1"><title>' + part.name + '</title></circle>';
        }
      });
      svgEl.innerHTML = html;
      svgEl.querySelectorAll('.anatomy-part').forEach(function(el) {
        el.addEventListener('click', function() {
          activePart = activePart === el.dataset.part ? null : el.dataset.part;
          renderDiagram();
          renderInfo();
          highlightList();
        });
      });
    }

    function renderInfo() {
      var sys = ANATOMY_SYSTEMS[currentSystem];
      descEl.textContent = sys.description;
      if (activePart) {
        var part = sys.parts.find(function(p) { return p.id === activePart; });
        if (part) {
          nameEl.textContent = part.name;
          partDescEl.textContent = part.description;
          detailEl.style.display = '';
          return;
        }
      }
      detailEl.style.display = 'none';
    }

    function renderPartsList() {
      var sys = ANATOMY_SYSTEMS[currentSystem];
      var q = searchQuery.toLowerCase();
      var filtered = sys.parts.filter(function(p) {
        return !q || p.name.toLowerCase().indexOf(q) !== -1 ||
          p.description.toLowerCase().indexOf(q) !== -1;
      });
      partsListEl.innerHTML = filtered.map(function(part) {
        return '<div class="anatomy-part-item' +
          (activePart === part.id ? ' active' : '') +
          '" data-part="' + part.id + '">' + part.name + '</div>';
      }).join('');
      partsListEl.querySelectorAll('.anatomy-part-item').forEach(function(item) {
        item.addEventListener('click', function() {
          activePart = activePart === item.dataset.part ? null : item.dataset.part;
          renderDiagram();
          renderInfo();
          renderPartsList();
        });
      });
    }

    function highlightList() {
      partsListEl.querySelectorAll('.anatomy-part-item').forEach(function(item) {
        item.classList.toggle('active', item.dataset.part === activePart);
      });
    }

    searchEl.addEventListener('input', function() {
      searchQuery = searchEl.value;
      renderDiagram();
      renderPartsList();
    });

    renderSystemTabs();
    renderDiagram();
    renderInfo();
    renderPartsList();
  }

  // ============================================================
  //  AI ESSAY WRITER (Pollinations AI — free, no key)
  // ============================================================
  function _initEssayWriter() {
    var topicInput = $("#essay-topic");
    var typeSelect = $("#essay-type");
    var lengthSelect = $("#essay-length");
    var toneSelect = $("#essay-tone");
    var generateBtn = $("#essay-generate-btn");
    var loadingEl = $("#essay-loading");
    var outputArea = $("#essay-output-area");
    var outputTextarea = $("#essay-output");
    var wordCountEl = $("#essay-word-count");
    var copyBtn = $("#essay-copy-btn");

    var lengthMap = { short: "approximately 300 words", medium: "approximately 500 words", long: "approximately 800 words" };

    function countWords(text) {
      return text.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;
    }

    function updateWordCount() {
      wordCountEl.textContent = countWords(outputTextarea.value) + " words";
    }

    outputTextarea.addEventListener("input", updateWordCount);

    copyBtn.addEventListener("click", function() {
      navigator.clipboard.writeText(outputTextarea.value).then(function() { toast("Copied to clipboard!"); });
    });

    generateBtn.addEventListener("click", function() {
      var topic = topicInput.value.trim();
      if (!topic) { toast("Enter a topic or prompt"); return; }

      var essayType = typeSelect.value;
      var length = lengthMap[lengthSelect.value] || lengthMap.medium;
      var tone = toneSelect.value;

      var prompt = "Write a " + essayType + " essay about: " + topic + ". " +
        "The essay should be " + length + " long. " +
        "Use a " + tone + " tone. " +
        "Include an introduction with a clear thesis statement, " +
        "well-developed body paragraphs with supporting evidence, " +
        "and a strong conclusion. " +
        "Write it as a student would — use varied sentence structure, " +
        "natural transitions between paragraphs, and avoid sounding robotic or overly formal.";

      loadingEl.style.display = "";
      outputArea.style.display = "none";
      generateBtn.disabled = true;

      fetch("https://text.pollinations.ai/" + encodeURIComponent(prompt))
        .then(function(r) { return r.text(); })
        .then(function(text) {
          outputTextarea.value = text.trim();
          updateWordCount();
          outputArea.style.display = "";
          toast("Essay generated!");
        })
        .catch(function() {
          toast("Error generating essay. Please try again.");
        })
        .finally(function() {
          loadingEl.style.display = "none";
          generateBtn.disabled = false;
        });
    });
  }

  // ============================================================
  //  AI HUMANIZER (Pollinations AI — free, no key)
  // ============================================================
  function _initHumanizer() {
    var inputTextarea = $("#humanizer-input");
    var outputTextarea = $("#humanizer-output");
    var goBtn = $("#humanizer-go-btn");
    var loadingEl = $("#humanizer-loading");
    var inputCount = $("#humanizer-input-count");
    var outputCount = $("#humanizer-output-count");
    var copyBtn = $("#humanizer-copy-btn");

    function countWords(text) {
      return text.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;
    }

    inputTextarea.addEventListener("input", function() {
      inputCount.textContent = countWords(inputTextarea.value) + " words";
    });

    copyBtn.addEventListener("click", function() {
      navigator.clipboard.writeText(outputTextarea.value).then(function() { toast("Copied to clipboard!"); });
    });

    goBtn.addEventListener("click", function() {
      var text = inputTextarea.value.trim();
      if (!text) { toast("Paste some text to humanize"); return; }

      var prompt = "Rewrite the following text to sound completely natural and human-written. " +
        "Make it sound like a real student wrote it: use contractions (don't, it's, they're), " +
        "vary sentence lengths (mix short punchy sentences with longer ones), " +
        "add occasional informal phrasing, use natural transitions, " +
        "and avoid overly perfect grammar or robotic patterns. " +
        "Keep the same meaning and information but make it undetectable as AI-written. " +
        "Do not add any commentary — just output the rewritten text.\n\n" + text;

      loadingEl.style.display = "";
      goBtn.disabled = true;
      outputTextarea.value = "";
      outputCount.textContent = "0 words";

      fetch("https://text.pollinations.ai/" + encodeURIComponent(prompt))
        .then(function(r) { return r.text(); })
        .then(function(result) {
          outputTextarea.value = result.trim();
          outputCount.textContent = countWords(result.trim()) + " words";
          toast("Text humanized!");
        })
        .catch(function() {
          toast("Error humanizing text. Please try again.");
        })
        .finally(function() {
          loadingEl.style.display = "none";
          goBtn.disabled = false;
        });
    });
  }

  // ============================================================
  //  Public API (lazy init wrappers)
  // ============================================================
  window.ShrimpTools = {
    calculator: function () { initOnce("calculator", _initCalculator); },
    unitConverter: function () { initOnce("unitConverter", _initUnitConverter); },
    timer: function () { initOnce("timer", _initTimer); },
    gpa: function () { initOnce("gpa", _initGpa); },
    textTools: function () { initOnce("textTools", _initTextTools); },
    citations: function () { initOnce("citations", _initCitations); },
    formulas: function () { initOnce("formulas", _initFormulas); },
    periodicTable: function () { initOnce("periodicTable", _initPeriodicTable); },
    notes: function () { initOnce("notes", _initNotes); },
    flashcards: function () { initOnce("flashcards", _initFlashcards); },
    quizMode: function () { initOnce("quizMode", _initQuizMode); },
    studyPlanner: function () { initOnce("studyPlanner", _initStudyPlanner); },
    sourceFinder: function () { initOnce("sourceFinder", _initSourceFinder); },
    vocabulary: function () { initOnce("vocabulary", _initVocabulary); },
    essayOutliner: function () { initOnce("essayOutliner", _initEssayOutliner); },
    gradeCalc: function () { initOnce("gradeCalc", _initGradeCalc); },
    typingTest: function () { initOnce("typingTest", _initTypingTest); },
    whiteboard: function () { initOnce("whiteboard", _initWhiteboard); },
    randomPicker: function () { initOnce("randomPicker", _initRandomPicker); },
    classSchedule: function () { initOnce("classSchedule", _initClassSchedule); },
    textToSpeech: function () { initOnce("textToSpeech", _initTextToSpeech); },
    focusSounds: function () { initOnce("focusSounds", _initFocusSounds); },
    translator: function () { initOnce("translator", _initTranslator); },
    anatomy: function () { initOnce("anatomy", _initAnatomy); },
    essayWriter: function () { initOnce("essayWriter", _initEssayWriter); },
    humanizer: function () { initOnce("humanizer", _initHumanizer); },
  };
})();
