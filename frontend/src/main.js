import "./style.css";
import { getParts, getCategories } from "./shared/api/client.js";
import { initCategoryFilter } from "./js/category-filter.js";

const grid = document.getElementById("products-grid");
const filterBar = document.querySelector(".flex.flex-wrap.gap-2");
const cartList = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

let cart = [];

async function renderCategories() {
  const categories = await getCategories();
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

async function renderParts() {
  const parts = await getParts();
  grid.innerHTML = parts
    .map(
      (part) => `
    <div class="card bg-white shadow rounded-2xl" data-category="${part.category.name}">
      <div class="card-body p-4">
        <h3 class="font-semibold">${part.name}</h3>
        <p class="text-sm text-gray-600">${part.description}</p>
        <div class="mt-2 flex items-center justify-between">
          <span class="font-bold">${part.price}€</span>
          <button
            data-id="${part._id}"
            data-name="${part.name}"
            data-price="${part.price}"
            class="btn-cart btn rounded-xl bg-[#30d6bb] hover:bg-[#2bb69e]"
          >
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  grid.querySelectorAll(".btn-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      if (!cart.find((i) => i.id === id)) {
        cart.push({ id, name, price });
        updateCart();
      }
    });
  });

  initCategoryFilter("products-grid");
}

function updateCart() {
  cartList.innerHTML = cart
    .map(
      (item) =>
        `<li class="flex justify-between px-2 py-1">
      <span>${item.name}</span>
      <span>${item.price}€</span>
    </li>`,
    )
    .join("");
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  totalEl.textContent = total.toFixed(2);
}

renderCategories().then(() => renderParts());
