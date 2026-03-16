import "../style.css";
import { getServices, getCategories } from "../shared/api/client.js";
import { initCategoryFilter } from "./category-filter.js";

const grid = document.getElementById("services-grid");
const filterBar = document.querySelector(".flex.flex-wrap.gap-2");
const selectedList = document.getElementById("selected-services");
const totalEl = document.getElementById("service-total");

let selectedServices = [];

async function renderCategories() {
  const categories = await getCategories();

  // "Alle"-Button bleibt, rest dynamisch
  filterBar.innerHTML = `
    <button class="filter-btn category-filter" data-category="All">Alle</button>
    ${categories
      .map(
        (cat) => `
      <button class="filter-btn category-filter" data-category="${cat.name}">
        ${cat.name}
      </button>
    `,
      )
      .join("")}
  `;
}

async function renderServices() {
  const services = await getServices();

  grid.innerHTML = services
    .map(
      (service) => `
    <div class="card bg-white shadow rounded-2xl" data-category="${service.category.name}">
      <div class="card-body p-4">
        <h3 class="font-semibold">${service.name}</h3>
        <p class="text-sm text-gray-600">${service.description}</p>
        <div class="mt-2 flex items-center justify-between">
          <span class="font-bold">${service.price}€</span>
          <button
            data-id="${service._id}"
            data-name="${service.name}"
            data-price="${service.price}"
            class="btn-select btn rounded-xl bg-[#30d6bb] hover:bg-[#2bb69e]"
          >
            Auswählen
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  // Click-Handler für Auswahl
  grid.querySelectorAll(".btn-select").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      if (!selectedServices.find((s) => s.id === id)) {
        selectedServices.push({ id, name, price });
        updateSummary();
      }
    });
  });

  initCategoryFilter("services-grid");
}

function updateSummary() {
  selectedList.innerHTML = selectedServices
    .map(
      (s) =>
        `<li class="flex justify-between px-2 py-1">
      <span>${s.name}</span>
      <span>${s.price}€</span>
    </li>`,
    )
    .join("");

  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);
  totalEl.textContent = total.toFixed(2);
}

renderCategories().then(() => renderServices());
