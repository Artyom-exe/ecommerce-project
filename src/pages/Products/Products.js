import { CardsList } from "../../components/CardsList";
import { DataTable } from "../../components/DataTable";
import products from "../../storage/products.json";
import { ProductCard } from "./Partials/ProductCard";
import { ProductRow } from "./Partials/ProductRow";

/**
 * Page de la liste des produits
 * 2 modes d'affichage : grille et tableau
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Products = (element) => {
  // on récupère le mode d'affichage depuis l'URL
  const url = new URL(window.location.href);
  const modeFromQueryString = url.searchParams.get("mode");
  let mode = modeFromQueryString || "grid";

  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Produits</h1>
      <div>
        <button id="grid-mode-btn" class="btn btn-sm btn-secondary mr-3">
          <i class="ri-layout-grid-line"></i>
        </button>
        <button id="table-mode-btn" class="btn btn-sm btn-secondary mr-3">
          <i class="ri-table-line"></i>
        </button>
      </div>
    </div>
    <div id="products-list"></div>
  `;

  const productsList = element.querySelector("#products-list");

  const gridModeBtn = element.querySelector("#grid-mode-btn");
  const tableModeBtn = element.querySelector("#table-mode-btn");

  let categoryId = url.searchParams.get("category");
  let intCategoryId = parseInt(categoryId);

  // Fonction pour afficher les produits en fonction du mode d'affichage
  const render = () => {
    if (mode === "grid") {
      CardsList(productsList, products, ProductCard, "name", intCategoryId); // Changement ici pour n'inclure que le champ "name"
    } else if (mode === "table") {
      DataTable(
        productsList,
        products,
        ProductRow,
        ["name", "description"],
        ["Nom", "prix", "Catégorie", "lien"], 
        intCategoryId
      );
    }
  };

  // Met à jour le mode dans l'URL
  const putModeInQueryString = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", mode);
    window.history.pushState({}, "", url);
  };

  // Met en surbrillance le mode d'affichage actif
  const markActiveMode = () => {
    if (mode === "grid") {
      tableModeBtn.classList.remove("active");
      gridModeBtn.classList.add("active");
    } else if (mode === "table") {
      gridModeBtn.classList.remove("active");
      tableModeBtn.classList.add("active");
    }
  };

  // Initialisation de la page
  render();
  markActiveMode();

  // Ajout des écouteurs d'événements sur les boutons de mode d'affichage
  gridModeBtn.addEventListener("click", () => {
    mode = "grid";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  tableModeBtn.addEventListener("click", () => {
    mode = "table";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  // Ajout d'un écouteur d'événement sur le bouton de retour arrière du navigateur
  window.addEventListener("popstate", () => {
    const url = new URL(window.location.href);
    mode = url.searchParams.get("mode") || "grid";
    render();
    markActiveMode();
  });
};
