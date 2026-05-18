// Austin Wedding Services — site interactions
(function () {
  "use strict";

  // Mobile nav toggle
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

  // Mark current page in nav
  const path = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href").replace(/\.html$/, "").replace(/\/index$/, "/");
    if (href === path || (href !== "/" && path.endsWith(href))) {
      a.setAttribute("aria-current", "page");
    }
  });

  // Contact form
  // Replace ENDPOINT_URL with your backend (e.g. Formspree, AWS Lambda, your own API).
  const ENDPOINT_URL = ""; // e.g. "https://your-backend.example.com/requests"

  const form = document.querySelector("#request-form");
  const msg = document.querySelector("#form-msg");
  if (form && msg) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.classList.remove("show", "success", "error");

      const fd = new FormData(form);
      const services = fd.getAll("services");
      if (services.length === 0) {
        msg.textContent = "Please select at least one service so we know how to help.";
        msg.classList.add("show", "error");
        return;
      }

      const payload = Object.fromEntries(fd.entries());
      payload.services = services;
      payload.submittedAt = new Date().toISOString();
      payload.source = "austin-wedding-services";

      // If no endpoint is configured, just log and show success (form is wired but not connected yet).
      if (!ENDPOINT_URL) {
        console.info("[demo] Request payload:", payload);
        msg.textContent = "Thanks — your request was captured locally. Connect a backend in assets/js/main.js to deliver it.";
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
        msg.textContent = "Thank you — your request was sent. We'll be in touch within 1 business day.";
        msg.classList.add("show", "success");
        form.reset();
      } catch (err) {
        msg.textContent = "Something went wrong sending your request. Please email hello@example.com or try again.";
        msg.classList.add("show", "error");
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });
  }

  // Set footer year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
