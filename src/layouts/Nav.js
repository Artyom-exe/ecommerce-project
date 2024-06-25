import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Products } from "../pages/Products/Products";
import productsData from "../storage/products.json";

export const Nav = (element) => {
  const categoryLinks = productsData.categories.map(category => ({
    category: category.id,
    text: category.name
  }));

  const links = [
    { href: "/", text: "Accueil" },
    { href: "/contact", text: "Contact" },
  ];

  element.innerHTML = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <div class="logo">
          <span class="logo-text">Project</span><span class="logo-highlight">JS</span>
        </div>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          ${links
            .map(
              (link) => `
                <li class="nav-item">
                  <a class="nav-link" href="${link.href}">${link.text}</a>
                </li>
              `
            )
            .join("")}
          <li class="nav-item dropdown category-dropdown d-none">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Catégorie
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#" onclick="navigateToCategory('none')">Pas de catégories</a></li>
              ${categoryLinks.map(sublink => `
                <li><a class="dropdown-item" href="#" onclick="navigateToCategory('${sublink.category}')">${sublink.text}</a></li>
              `).join('')}
            </ul>
          </li>
        </ul>
      </div>

      <!-- Élément du panier -->
      <div class="cart-container">
        <a href="/panier" class="nav-link">
          <i class="fas fa-shopping-cart cart-icon"></i> Panier
          <span id="cart-count" class="badge bg-primary rounded-pill"></span>
        </a>
      </div>
    </div>
  </nav>
`;

  window.navigateToCategory = (categoryId) => {
    let url = new URL(window.location);
    url.searchParams.set("category", categoryId);
    window.history.pushState({}, "", url);
    const headerElement = document.querySelector("header");
    headerElement.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
    const main = document.querySelector("main");
    Products(main);
    toggleCategoryDropdown(); // Appel de la fonction ici aussi
  };

  const isHomePage = () => {
    return window.location.pathname === "/";
  };

  const toggleCategoryDropdown = () => {
    const categoryDropdown = element.querySelector('.category-dropdown');
    if (isHomePage()) {
      categoryDropdown.classList.remove('d-none');
    } else {
      categoryDropdown.classList.add('d-none');
    }
  };

  // Remplace les liens par des événements de navigation
  const replaceLinksByEvents = () => {
    const navLinks = element.querySelectorAll("a");

    const linkClickHandler = (event) => {
      // Empêche la navigation par défaut
      event.preventDefault();
      // Modifie l'URL de la page sans recharger la page
      window.history.pushState({}, "", event.target.href);
      // Déclenche l'événement route-changed pour changer de page sans recharger la page
      element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));

      removeActive();
      markAsActive();
      changePageTitle();
      toggleCategoryDropdown();
    };

    // Ajoute un écouteur d'événement sur chaque lien de navigation
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", linkClickHandler);
    }
  };

  // Supprime la classe active des liens de navigation
  const removeActive = () => {
    const activeLink = element.querySelector("a.active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
  };

  // Ajoute la classe active au lien de navigation correspondant à l'URL de la page courante
  const markAsActive = () => {
    const activeLink = element.querySelector(
      `a.nav-link[href="${window.location.pathname}"]`
    );
    if (!activeLink) {
      return;
    }
    activeLink.classList.add("active");
  };

  // Modifie le titre de la page en fonction du lien de navigation actif
  const changePageTitle = () => {
    const activeLink = element.querySelector("a.active");

    // Si la page courante n'est pas une page de navigation, on affiche uniquement le nom de l'application
    if (!activeLink) {
      document.title = "Projetc JS";
      return;
    }

    document.title = `${activeLink.textContent} - Projetc JS`;
  };

  // Initialise la barre de navigation
  markAsActive();
  replaceLinksByEvents();
  changePageTitle();
  toggleCategoryDropdown(); // Appel initial de la fonction

  // Ajoute un écouteur d'événement pour gérer les événements de navigation du navigateur (précédent/suivant)
  window.addEventListener("popstate", () => {
    removeActive();
    markAsActive();
    changePageTitle();
    element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
    toggleCategoryDropdown(); // Appel de la fonction ici aussi
  });
};
