// Couples wedding template — interactions
(function () {
  "use strict";

  // ---------- Wedding date — change here once, it propagates ----------
  const WEDDING_DATE = "2026-10-17T16:30:00-05:00";

  // ---------- Mobile nav ----------
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") links.classList.remove("is-open");
    });
  }

  // ---------- Current page in nav ----------
  const path = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href").replace(/\.html$/, "").replace(/\/index$/, "/");
    if (href === path || (href !== "/" && path.endsWith(href))) {
      a.setAttribute("aria-current", "page");
    }
  });

  // ---------- Countdown ----------
  const countdownEl = document.querySelector("[data-countdown]");
  if (countdownEl) {
    const target = new Date(WEDDING_DATE).getTime();
    const cells = {
      d: countdownEl.querySelector("[data-d]"),
      h: countdownEl.querySelector("[data-h]"),
      m: countdownEl.querySelector("[data-m]"),
      s: countdownEl.querySelector("[data-s]")
    };
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        countdownEl.innerHTML = '<div class="count-cell" style="min-width: auto;"><span class="num">We did it!</span></div>';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (cells.d) cells.d.textContent = d;
      if (cells.h) cells.h.textContent = String(h).padStart(2, "0");
      if (cells.m) cells.m.textContent = String(m).padStart(2, "0");
      if (cells.s) cells.s.textContent = String(s).padStart(2, "0");
    };
    tick();
    setInterval(tick, 1000);
  }

  // ---------- RSVP form ----------
  // Plug in any backend — Formspree, Netlify Forms, your own API, Google Apps Script, etc.
  const ENDPOINT_URL = "";

  const form = document.querySelector("#rsvp-form");
  const msg = document.querySelector("#rsvp-msg");
  if (form && msg) {
    // Toggle meal/dietary visibility based on attending choice
    const conditional = form.querySelector("[data-if-attending]");
    form.querySelectorAll('input[name="attending"]').forEach((r) =>
      r.addEventListener("change", (e) => {
        if (!conditional) return;
        conditional.style.display = e.target.value === "yes" ? "" : "none";
      })
    );

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.classList.remove("show", "success", "error");

      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      payload.submittedAt = new Date().toISOString();

      if (!ENDPOINT_URL) {
        console.info("[demo] RSVP payload:", payload);
        msg.textContent = "Thank you! Your RSVP was captured locally — connect a backend in assets/js/main.js to deliver it.";
        msg.classList.add("show", "success");
        form.reset();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";

      try {
        const res = await fetch(ENDPOINT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Bad response");
        msg.textContent = "Thank you — your RSVP is in. We can't wait to see you.";
        msg.classList.add("show", "success");
        form.reset();
      } catch (err) {
        msg.textContent = "Something went wrong sending your RSVP. Please email us directly.";
        msg.classList.add("show", "error");
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });
  }

  // ---------- Year ----------
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
