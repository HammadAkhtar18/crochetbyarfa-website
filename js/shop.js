(function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".product-card[data-category]");
  if (!buttons.length || !cards.length) return;

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
})();
