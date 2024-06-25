import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";

/**
 * Un composant pour afficher une liste de cartes paginée et filtrable.
 *
 * @param {HTMLElement} element
 * @param {Object} data
 * @param {Function} itemTemplate
 * @param {string} searchableField - Le champ dans lequel effectuer la recherche.
 * @param {string} [category] - ID de la catégorie sélectionnée.
 * @returns {void}
 */
export const CardsList = (element, data, itemTemplate, searchableField, category) => {
  let items = data.products;
  
  // On récupère le numéro de page et la valeur du champ de recherche dans l'URL
  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get("page")) || 1;
  let searchInputValue = urlParams.get("search") || "";

  // On génère un identifiant unique pour le composant
  const id = `list-${Math.random().toString(36).slice(2)}`;

  element.innerHTML = `
    <div class="row">
      <div class="col mb-2">
        ${TextInput("search", searchInputValue, "search", "Rechercher...")}
      </div>
    </div>
    <div id="${id}" class="row row-cols-2 row-cols-lg-3">
    </div>
    <div id="pagination"></div>
  `;

  const searchInput = element.querySelector("input#search");
  const listElement = element.querySelector(`#${id}`);
  const paginationElement = element.querySelector("#pagination");

  // Fonction pour afficher la liste des items
  const renderList = (filteredItems) => {
    if (filteredItems.length === 0) {
      return `
        <p>Aucun résultat</p>
      `;
    }

    // On passe le template de l'item à la fonction map pour générer une liste de cartes
    return `
      ${filteredItems.map(itemTemplate).join("")}
    `;
  };

  // Fonction pour filtrer et paginer les items
  const filterAndPaginate = (perPage = 12) => {
    const value = searchInputValue.toLowerCase();
    
    // On filtre les items en fonction de la catégorie sélectionnée
    let filteredItems = category ? items.filter(item => item.category === category) : items;

    // On filtre les items en fonction de la valeur du champ de recherche
    if (value) {
      filteredItems = filteredItems.filter(
        item => item[searchableField].toLowerCase().includes(value)
      );
    }
    
    // On calcule l'index de départ et de fin des items à afficher
    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, filteredItems.length);
    // On calcule le nombre de pages
    const pages = Math.ceil(filteredItems.length / perPage);
    // On récupère les items à afficher
    const paginatedItems = filteredItems.slice(start, end);

    // On met à jour le contenu de la liste et de la pagination
    listElement.innerHTML = renderList(paginatedItems);
    paginationElement.innerHTML = Pagination(currentPage, pages);

    // Ajout des écouteurs d'événements sur les liens de pagination
    paginationElement.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        currentPage = parseInt(new URL(event.currentTarget.href).searchParams.get("page"));
        const url = new URL(window.location);
        url.searchParams.set("page", currentPage);
        window.history.pushState({}, "", url);
        filterAndPaginate();
      });
    });

    // Ajout des écouteurs d'événements sur les liens de carte
    listElement.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.pushState({}, "", event.currentTarget.href);
        document.querySelector("header").dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
      });
    });
  };

  // Initialisation de la liste de cartes
  filterAndPaginate();

  // Ajout d'un écouteur d'événement sur le champ de recherche
  searchInput.addEventListener("input", (e) => {
    searchInputValue = e.target.value;
    currentPage = 1; // On revient à la première page lorsqu'on effectue une recherche
    const url = new URL(window.location);
    url.searchParams.set("search", searchInputValue);
    url.searchParams.set("page", currentPage);
    window.history.pushState({}, "", url);
    filterAndPaginate();
  });

  // Ajout d'un écouteur d'événement sur le bouton précédent du navigateur
  window.addEventListener("popstate", () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentPage = parseInt(urlParams.get("page")) || 1;
    searchInputValue = urlParams.get("search") || "";
    searchInput.value = searchInputValue;
    filterAndPaginate();
  });
};
