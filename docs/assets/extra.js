/* ================================================================
   Aprende Rust — Interactive Learning System
   ================================================================
   Features:
   1. Flashcard click-to-reveal with keyboard nav
   2. Quiz system with scoring + ARIA + state restore
   3. Progress tracking (localStorage)
   4. Self-check completion tracking
   5. Smooth scroll and focus management
   6. Legacy format migration (data-question flashcards)
   ================================================================ */

(function () {
  "use strict";

  // ── STORAGE KEYS ──
  const STORAGE_PREFIX = "aprende-rust-";
  const PROGRESS_KEY = STORAGE_PREFIX + "progress";
  const QUIZ_KEY = STORAGE_PREFIX + "quiz-scores";

  // ── HELPERS ──
  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    } catch { return {}; }
  }

  function saveProgress(data) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    } catch { /* quota exceeded — fail silently */ }
  }

  function getQuizScores() {
    try {
      return JSON.parse(localStorage.getItem(QUIZ_KEY) || "{}");
    } catch { return {}; }
  }

  function saveQuizScores(data) {
    try {
      localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
    } catch { /* quota exceeded */ }
  }

  function getPageId() {
    return window.location.pathname.replace(/\//g, "_").replace(/\.html$/, "");
  }

  // ── 0. LEGACY FORMAT MIGRATION ──
  // Converts data-question flashcards to front/back format at runtime
  function migrateLegacyFormats() {
    // Legacy flashcards: <div class="flashcard" data-question="Q">Answer</div>
    document.querySelectorAll(".flashcard[data-question]").forEach(function (card) {
      var question = card.dataset.question;
      var answer = card.innerHTML.trim();
      card.removeAttribute("data-question");
      card.innerHTML = '<div class="front">' + question + '</div><div class="back">' + answer + '</div>';
    });

    // Legacy quizzes: <div class="quiz" data-question="Q" data-correct="b">
    //   <div class="quiz-option" data-option="a">...</div>
    document.querySelectorAll(".quiz[data-correct]:not([data-quiz-id])").forEach(function (quiz) {
      var question = quiz.dataset.question;
      var correctLetter = quiz.dataset.correct;
      quiz.removeAttribute("data-question");
      quiz.removeAttribute("data-correct");

      // Generate a quiz-id from question text
      var quizId = "legacy-" + (question || "").substring(0, 30).replace(/\s+/g, "-").toLowerCase();
      quiz.dataset.quizId = quizId;

      // Add h4 with question
      var h4 = document.createElement("h4");
      h4.textContent = question;
      quiz.insertBefore(h4, quiz.firstChild);

      // Convert div options to buttons with data-correct true/false
      quiz.querySelectorAll(".quiz-option[data-option]").forEach(function (opt) {
        var btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.innerHTML = opt.innerHTML;
        btn.dataset.correct = (opt.dataset.option === correctLetter) ? "true" : "false";
        opt.parentNode.replaceChild(btn, opt);
      });

      // Add feedback div if not present
      if (!quiz.querySelector(".quiz-feedback")) {
        var fb = document.createElement("div");
        fb.className = "quiz-feedback";
        fb.dataset.correct = "¡Correcto!";
        fb.dataset.incorrect = "Incorrecto. Revisa la explicación.";
        quiz.appendChild(fb);
      }
    });
  }

  // ── 1. FLASHCARDS ──
  function initFlashcards() {
    document.querySelectorAll(".flashcard").forEach(function (card) {
      if (card.dataset.initialized) return;
      card.dataset.initialized = "true";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-expanded", "false");
      card.setAttribute("aria-label", "Flashcard — pulsa para revelar la respuesta");

      card.addEventListener("click", function () {
        card.classList.toggle("revealed");
        card.setAttribute("aria-expanded", card.classList.contains("revealed"));
      });

      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // ── 2. QUIZ SYSTEM ──
  function initQuizzes() {
    var pageId = getPageId();
    var scores = getQuizScores();
    var pageScores = scores[pageId] || {};

    document.querySelectorAll(".quiz").forEach(function (quiz) {
      if (quiz.dataset.initialized) return;
      quiz.dataset.initialized = "true";

      var options = quiz.querySelectorAll(".quiz-option");
      var feedback = quiz.querySelector(".quiz-feedback");
      var quizId = quiz.dataset.quizId || quiz.querySelector("h4")?.textContent || "";

      // ARIA: group role + label
      quiz.setAttribute("role", "group");
      var h4 = quiz.querySelector("h4");
      if (h4) {
        if (!h4.id) h4.id = "quiz-label-" + quizId.replace(/\s+/g, "-").substring(0, 40);
        quiz.setAttribute("aria-labelledby", h4.id);
      }
      if (feedback) {
        feedback.setAttribute("aria-live", "polite");
        feedback.setAttribute("role", "status");
      }

      // Restore previous answer state
      if (pageScores[quizId] !== undefined) {
        restoreQuizState(quiz, options, feedback, pageScores[quizId]);
        return; // Already answered — skip adding click handlers
      }

      options.forEach(function (opt) {
        opt.setAttribute("role", "button");

        opt.addEventListener("click", function () {
          if (opt.disabled) return;

          // Disable all options
          options.forEach(function (o) {
            o.disabled = true;
            o.setAttribute("aria-disabled", "true");
          });

          var isCorrect = opt.dataset.correct === "true";

          if (isCorrect) {
            opt.classList.add("correct");
          } else {
            opt.classList.add("incorrect");
            // Show the correct one
            options.forEach(function (o) {
              if (o.dataset.correct === "true") o.classList.add("correct");
            });
          }

          // Show feedback
          if (feedback) {
            var correctFeedback = feedback.dataset.correct || "¡Correcto!";
            var incorrectFeedback = feedback.dataset.incorrect || "Incorrecto. Revisa la explicación.";
            feedback.textContent = isCorrect ? correctFeedback : incorrectFeedback;
            feedback.className = "quiz-feedback show " + (isCorrect ? "correct" : "incorrect");
          }

          // Save score
          var sc = getQuizScores();
          if (!sc[pageId]) sc[pageId] = {};
          sc[pageId][quizId] = isCorrect;
          saveQuizScores(sc);
        });
      });
    });
  }

  // Restore quiz visual state from saved scores
  function restoreQuizState(quiz, options, feedback, wasCorrect) {
    options.forEach(function (o) {
      o.disabled = true;
      o.setAttribute("aria-disabled", "true");

      var isCorrectOption = o.dataset.correct === "true";
      if (isCorrectOption) {
        o.classList.add("correct");
      } else if (!wasCorrect) {
        // We don't know which wrong option was picked, so just show correct
      }
    });

    if (feedback) {
      var correctFeedback = feedback.dataset.correct || "¡Correcto!";
      var incorrectFeedback = feedback.dataset.incorrect || "Incorrecto. Revisa la explicación.";
      feedback.textContent = wasCorrect ? correctFeedback : incorrectFeedback;
      feedback.className = "quiz-feedback show " + (wasCorrect ? "correct" : "incorrect");
    }
  }

  // ── 3. SELF-CHECK BOXES ──
  function initSelfChecks() {
    document.querySelectorAll(".self-check input[type='checkbox']").forEach(function (cb) {
      if (cb.dataset.initialized) return;
      cb.dataset.initialized = "true";

      var pageId = getPageId();
      var checkId = cb.id || cb.parentElement?.textContent?.trim().substring(0, 50);
      var progress = getProgress();
      var parentLabel = cb.closest("label");

      // Restore state
      if (progress[pageId]?.checks?.[checkId]) {
        cb.checked = true;
        // :has() fallback — add .checked class to parent label
        if (parentLabel) parentLabel.classList.add("checked");
      }

      cb.addEventListener("change", function () {
        var prog = getProgress();
        if (!prog[pageId]) prog[pageId] = {};
        if (!prog[pageId].checks) prog[pageId].checks = {};
        prog[pageId].checks[checkId] = cb.checked;
        saveProgress(prog);
        updateProgressBars();

        // :has() fallback — toggle .checked class on parent label
        if (parentLabel) {
          if (cb.checked) {
            parentLabel.classList.add("checked");
          } else {
            parentLabel.classList.remove("checked");
          }
        }
      });
    });
  }

  // ── 4. PROGRESS BARS ──
  function updateProgressBars() {
    document.querySelectorAll(".progress-tracker").forEach(function (tracker) {
      var fill = tracker.querySelector(".progress-bar-fill");
      var text = tracker.querySelector(".progress-text");
      if (!fill) return;

      var pageId = getPageId();
      var progress = getProgress();
      var checks = progress[pageId]?.checks || {};
      var total = document.querySelectorAll(".self-check input[type='checkbox']").length;
      var completed = Object.values(checks).filter(Boolean).length;

      if (total > 0) {
        var pct = Math.round((completed / total) * 100);
        fill.style.width = pct + "%";
        if (text) text.textContent = completed + "/" + total + " completados (" + pct + "%)";
      }
    });
  }

  // ── 5. PROGRESS RESET BUTTON ──
  function initProgressReset() {
    document.querySelectorAll(".progress-reset").forEach(function (btn) {
      if (btn.dataset.initialized) return;
      btn.dataset.initialized = "true";

      btn.addEventListener("click", function () {
        var pageId = getPageId();

        // Clear self-check progress
        var prog = getProgress();
        delete prog[pageId];
        saveProgress(prog);

        // Clear quiz scores
        var sc = getQuizScores();
        delete sc[pageId];
        saveQuizScores(sc);

        // Reset UI: checkboxes
        document.querySelectorAll(".self-check input[type='checkbox']").forEach(function (cb) {
          cb.checked = false;
          var label = cb.closest("label");
          if (label) label.classList.remove("checked");
        });

        // Reset UI: quizzes
        document.querySelectorAll(".quiz").forEach(function (quiz) {
          quiz.removeAttribute("data-initialized");
          quiz.querySelectorAll(".quiz-option").forEach(function (o) {
            o.disabled = false;
            o.removeAttribute("aria-disabled");
            o.classList.remove("correct", "incorrect");
          });
          var fb = quiz.querySelector(".quiz-feedback");
          if (fb) {
            fb.textContent = "";
            fb.className = "quiz-feedback";
          }
        });

        // Re-init quizzes (without restored state)
        initQuizzes();
        updateProgressBars();
        showToast("Progreso reiniciado");
      });
    });
  }

  // ── 6. TOAST NOTIFICATIONS ──
  function showToast(message) {
    var existing = document.querySelector(".progress-toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "progress-toast";
    toast.textContent = message;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);

    // Trigger show animation
    requestAnimationFrame(function () {
      toast.classList.add("show");
    });

    // Auto-hide after 2.5s
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 300);
    }, 2500);
  }

  // ── 7. KEYBOARD NAVIGATION FOR FLASHCARDS ──
  function initKeyboardNav() {
    document.addEventListener("keydown", function (e) {
      // Alt+F = focus next flashcard
      if (e.altKey && e.key === "f") {
        e.preventDefault();
        var cards = Array.from(document.querySelectorAll(".flashcard"));
        var current = document.activeElement;
        var idx = cards.indexOf(current);
        var next = cards[(idx + 1) % cards.length];
        if (next) next.focus();
      }

      // Alt+R = reveal all flashcards
      if (e.altKey && e.key === "r") {
        e.preventDefault();
        var allRevealed = Array.from(document.querySelectorAll(".flashcard"))
          .every(function (c) { return c.classList.contains("revealed"); });
        document.querySelectorAll(".flashcard").forEach(function (c) {
          if (allRevealed) {
            c.classList.remove("revealed");
            c.setAttribute("aria-expanded", "false");
          } else {
            c.classList.add("revealed");
            c.setAttribute("aria-expanded", "true");
          }
        });
      }
    });
  }

  // ── 8. SMOOTH SCROLL TO SECTIONS ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // ── INITIALIZATION ──
  function initAll() {
    migrateLegacyFormats(); // Must run before flashcard/quiz init
    initFlashcards();
    initQuizzes();
    initSelfChecks();
    updateProgressBars();
    initProgressReset();
    initKeyboardNav();
    initSmoothScroll();
  }

  // Run on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", initAll);

  // Re-initialize on MkDocs instant navigation
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      // Small delay to ensure DOM is updated
      setTimeout(initAll, 50);
    });
  }
})();
