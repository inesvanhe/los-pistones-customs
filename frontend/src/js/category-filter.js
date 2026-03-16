export function initCategoryFilter(gridId) {
  const grid = document.getElementById(gridId);
  const buttons = document.querySelectorAll(".category-filter");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.category;

      // Aktiven Button markieren
      buttons.forEach((b) => b.classList.remove("active-filter"));
      btn.classList.add("active-filter");

      // Karten filtern
      const cards = grid.querySelectorAll("[data-category]");
      cards.forEach((card) => {
        if (selected === "All" || card.dataset.category === selected) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}
