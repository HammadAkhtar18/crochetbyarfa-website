/**
 * Injects shared header and footer into #site-header and #site-footer.
 * Sets aria-current on the active nav link based on the current page.
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

  const headerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="container header-inner">
      <a class="logo" href="index.html" aria-label="crochetbyarfa home">
        <img class="logo-mark" src="assets/icons/logo.svg" width="40" height="40" alt="" />
        <span class="logo-text">crochetbyarfa<span>Handmade with care</span></span>
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
          ${link("contact.html", "Contact", true)}
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
            <img class="logo-mark" src="assets/icons/logo.svg" width="40" height="40" alt="" />
            <span class="logo-text">crochetbyarfa</span>
          </a>
          <p>Handmade crochet, made with care. Custom orders welcome. Shipping across Pakistan.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="custom.html">Custom orders</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
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
})();
