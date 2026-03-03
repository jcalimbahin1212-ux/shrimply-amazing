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
  };
})();
