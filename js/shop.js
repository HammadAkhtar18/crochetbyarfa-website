/**
 * Shop filters + lightweight product detail modal.
 * Filter contract: .filter-btn[data-filter] ↔ .product-card[data-category]
 */
(function () {
  const IG = "https://www.instagram.com/crochetbyarfa/";

  /* —— Category filters —— */
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".product-card[data-category]");
  if (buttons.length && cards.length) {
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const cat = btn.getAttribute("data-filter");
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        cards.forEach(function (card) {
          const match = cat === "all" || card.getAttribute("data-category") === cat;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* —— Product modal —— */
  if (!cards.length) return;

  let modal = document.getElementById("product-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "product-modal";
    modal.className = "product-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "product-modal-title");
    modal.hidden = true;
    modal.innerHTML =
      '<button type="button" class="product-modal-backdrop" aria-label="Close dialog"></button>' +
      '<div class="product-modal-dialog">' +
      '  <button type="button" class="product-modal-close" aria-label="Close">' +
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      "  </button>" +
      '  <div class="product-modal-media"><img alt="" /></div>' +
      '  <div class="product-modal-body">' +
      '    <p class="product-modal-cat"></p>' +
      '    <h2 id="product-modal-title"></h2>' +
      '    <p class="product-modal-price"></p>' +
      '    <p class="product-modal-desc"></p>' +
      '    <div class="product-modal-meta"></div>' +
      '    <div class="product-modal-actions">' +
      '      <a class="btn btn-primary" data-enquire href="#">Enquire on Instagram</a>' +
      '      <a class="btn btn-secondary" data-ig href="' +
      IG +
      '" target="_blank" rel="noopener noreferrer">Open Instagram</a>' +
      "    </div>" +
      "  </div>" +
      "</div>";
    document.body.appendChild(modal);
  }

  const dialog = modal.querySelector(".product-modal-dialog");
  const mediaImg = modal.querySelector(".product-modal-media img");
  const catEl = modal.querySelector(".product-modal-cat");
  const titleEl = modal.querySelector("#product-modal-title");
  const priceEl = modal.querySelector(".product-modal-price");
  const descEl = modal.querySelector(".product-modal-desc");
  const metaEl = modal.querySelector(".product-modal-meta");
  const enquireEl = modal.querySelector("[data-enquire]");
  const closeBtns = modal.querySelectorAll(".product-modal-close, .product-modal-backdrop");
  let lastFocus = null;

  function closeModal() {
    modal.classList.remove("is-open");
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  function openModal(card) {
    const name = card.getAttribute("data-name") || (card.querySelector("h3") && card.querySelector("h3").textContent) || "";
    const category = card.getAttribute("data-category-label") || card.getAttribute("data-category") || "";
    const price = card.getAttribute("data-price") || "";
    const desc = card.getAttribute("data-desc") || (card.querySelector(".product-body > p:not(.product-price)") && card.querySelector(".product-body > p:not(.product-price)").textContent) || "";
    const colours = card.getAttribute("data-colours") || "Soft seasonal palettes — confirm via DM";
    const note = card.getAttribute("data-note") || "Customisation welcome. Final price depends on size and colours.";
    const enquire = card.getAttribute("data-enquire") || "contact.html?product=" + encodeURIComponent(name);
    const img = card.querySelector(".product-media img");
    const src = img ? img.currentSrc || img.src : "";
    const fallback = img ? img.getAttribute("data-fallback") : "";
    const alt = img ? img.getAttribute("alt") || name : name;

    catEl.textContent = category;
    titleEl.textContent = name;
    priceEl.textContent = price;
    descEl.textContent = desc;
    metaEl.innerHTML =
      "<p><strong>Available colours</strong>" +
      colours +
      "</p><p style=\"margin-top:0.75rem\"><strong>Customisation</strong>" +
      note +
      "</p>";
    enquireEl.href = enquire;
    enquireEl.textContent = enquire.indexOf("custom.html") !== -1 ? "Request custom" : "Enquire";

    mediaImg.classList.remove("is-fallback");
    mediaImg.alt = alt;
    mediaImg.onerror = function () {
      if (fallback) {
        mediaImg.onerror = null;
        mediaImg.src = fallback;
        mediaImg.classList.add("is-fallback");
      }
    };
    if (img && img.classList.contains("is-fallback") && fallback) {
      mediaImg.src = fallback;
      mediaImg.classList.add("is-fallback");
    } else {
      mediaImg.src = src;
    }

    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(function () {
      modal.classList.add("is-open");
    });
    document.body.classList.add("modal-open");
    modal.querySelector(".product-modal-close").focus();
  }

  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  cards.forEach(function (card) {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    const label = card.getAttribute("data-name") || "View product details";
    card.setAttribute("aria-label", "View details: " + label);

    function activate(e) {
      if (e.target.closest("a, button")) return;
      openModal(card);
    }

    card.addEventListener("click", activate);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (e.target.closest("a, button")) return;
        openModal(card);
      }
    });
  });
})();
