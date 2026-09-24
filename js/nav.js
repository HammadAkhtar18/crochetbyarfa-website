/**
 * Injects shared header and footer into #site-header and #site-footer.
 * Sets aria-current on the active nav link based on the current page.
 * Also wires subtle fade-up observers when present.
 */
(function () {
  const IG = "https://www.instagram.com/crochetbyarfa/";
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  function isActive(href) {
    const file = href.split("/").pop().toLowerCase();
    if (path === file) return true;
    if ((path === "" || path === "/") && file === "index.html") return true;
    return false;
  }

  function link(href, label, cta) {
    const current = isActive(href);
    const cls = cta ? ' class="nav-cta"' : "";
    const aria = current ? ' aria-current="page"' : "";
    return `<li><a href="${href}"${cls}${aria}>${label}</a></li>`;
  }

  const igIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>`;

  const headerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="container header-inner">
      <a class="logo" href="index.html" aria-label="crochetbyarfa home">
        <img class="logo-mark" src="assets/icons/logo.svg" width="32" height="32" alt="" />
        <span class="logo-text">crochetbyarfa</span>
      </a>
      <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16"/>
        </svg>
      </button>
      <nav class="nav" id="site-nav" aria-label="Primary">
        <ul class="nav-list">
          ${link("index.html", "Home")}
          ${link("shop.html", "Shop")}
          ${link("custom.html", "Custom")}
          ${link("about.html", "About")}
        </ul>
        <ul class="nav-actions">
          <li>
            <a class="nav-ig" href="${IG}" target="_blank" rel="noopener noreferrer" aria-label="Instagram @crochetbyarfa">
              ${igIcon}
            </a>
          </li>
          ${link("contact.html", "Enquire", true)}
        </ul>
      </nav>
    </div>
  `;

  const year = new Date().getFullYear();
  const footerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="logo" href="index.html">
            <img class="logo-mark" src="assets/icons/logo.svg" width="32" height="32" alt="" />
            <span class="logo-text">crochetbyarfa</span>
          </a>
          <p>Thoughtfully crocheted flowers, gifts and keepsakes — made one stitch at a time. Shipping across Pakistan.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="custom.html">Custom orders</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Enquire</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="${IG}" target="_blank" rel="noopener noreferrer">Instagram @crochetbyarfa</a></li>
            <li><a href="contact.html">Send an enquiry</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} crochetbyarfa. All rights reserved.</p>
        <p>Handmade in Pakistan</p>
      </div>
    </div>
  `;

  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) {
    headerEl.classList.add("site-header");
    headerEl.innerHTML = headerHTML;
  }
  if (footerEl) {
    footerEl.classList.add("site-footer");
    footerEl.innerHTML = footerHTML;
  }

  const toggle = headerEl && headerEl.querySelector(".nav-toggle");
  const nav = headerEl && headerEl.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Image fallback: JPG → SVG via data-fallback or onerror class */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    function applyFallback() {
      const fb = img.getAttribute("data-fallback");
      if (!fb || img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = "1";
      img.src = fb;
      img.classList.add("is-fallback");
    }
    img.addEventListener("error", applyFallback);
    if (img.complete && img.naturalWidth === 0) applyFallback();
  });

  /* Subtle fade-up on scroll */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll(".fade-up");
  if (reduce) {
    els.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window && els.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  } else {
    els.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
