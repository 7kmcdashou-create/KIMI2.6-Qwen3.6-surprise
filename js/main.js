/* =========================================================
   KIMI K2.6 と Qwen3.6 の衝撃 — サイト共通 JS
   ========================================================= */

(function () {
  "use strict";

  /* -------- スプラッシュ閉じる -------- */
  function closeSplash() {
    const sp = document.querySelector(".splash");
    if (!sp) return;
    setTimeout(() => sp.classList.add("gone"), 350);
  }

  /* -------- Reveal on scroll -------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* -------- 確率バーのアニメーション -------- */
  function initProbBars() {
    const bars = document.querySelectorAll(".prob-bar-fill, .compare-bar-fill");
    if (!bars.length || !("IntersectionObserver" in window)) {
      bars.forEach((b) => {
        const w = b.getAttribute("data-width");
        if (w) b.style.width = w;
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const w = e.target.getAttribute("data-width");
            if (w) {
              setTimeout(() => (e.target.style.width = w), 140);
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach((b) => {
      b.style.width = "0%";
      io.observe(b);
    });
  }

  /* -------- Bottom nav のアクティブ状態 -------- */
  function initBottomNav() {
    const navItems = document.querySelectorAll(".bottom-nav-item");
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    navItems.forEach((it) => {
      const target = (it.getAttribute("data-page") || "").toLowerCase();
      if (path === target) it.classList.add("active");
      else if (path === "" && target === "index.html") it.classList.add("active");
    });
  }

  /* -------- 数字カウントアップ -------- */
  function initCountUp() {
    const targets = document.querySelectorAll("[data-count]");
    if (!targets.length || !("IntersectionObserver" in window)) {
      targets.forEach((t) => {
        t.textContent = t.getAttribute("data-count");
      });
      return;
    }
    const animate = (el) => {
      const raw = el.getAttribute("data-count");
      const target = parseFloat(raw);
      if (isNaN(target)) {
        el.textContent = raw;
        return;
      }
      const duration = 1400;
      const decimals = (raw.split(".")[1] || "").length;
      const startTime = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      function tick(now) {
        const p = Math.min(1, (now - startTime) / duration);
        const val = target * ease(p);
        el.textContent = val.toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* -------- ハプティック風の軽いタッチフィードバック -------- */
  function initTap() {
    document.addEventListener(
      "touchstart",
      (e) => {
        const t = e.target.closest(".btn, .feature, .card, .bottom-nav-item, .appbar-action");
        if (!t) return;
        if (navigator.vibrate) navigator.vibrate(3);
      },
      { passive: true }
    );
  }

  /* -------- スムーススクロール補助 -------- */
  function initAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        const offset = 70;
        const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  /* -------- Top へ戻る -------- */
  function initBackToTop() {
    const btn = document.querySelector("[data-back-to-top]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------- Copy link helper -------- */
  function initShare() {
    const btns = document.querySelectorAll("[data-share]");
    btns.forEach((b) => {
      b.addEventListener("click", async () => {
        const url = location.href;
        const title = document.title;
        if (navigator.share) {
          try {
            await navigator.share({ title, url });
          } catch (err) {}
        } else if (navigator.clipboard) {
          try {
            await navigator.clipboard.writeText(url);
            const prev = b.innerHTML;
            b.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => (b.innerHTML = prev), 1400);
          } catch (err) {}
        }
      });
    });
  }

  /* -------- 初期化 -------- */
  function boot() {
    initBottomNav();
    initReveal();
    initProbBars();
    initCountUp();
    initTap();
    initAnchor();
    initBackToTop();
    initShare();
    closeSplash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
