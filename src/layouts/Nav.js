import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Products } from "../pages/Products/Products";
import productsData from "../storage/products.json";

export const Nav = (element) => {
  const appName = "Une App";

  const categoryLinks = productsData.categories.map(category => ({
    category: category.id,
    text: category.name
  }));

  const links = [
    { href: "/", text: "Accueil" },
    { 
      text: "Catégorie", 
      dropdown: categoryLinks 
    },
    { href: "/contact", text: "Contact" },
  ];

  element.innerHTML = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">${appName}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          ${links
            .map(
              (link) => link.dropdown 
                ? `
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${link.text}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#" onclick="navigateToCategory('none')">Pas de catégories</a></li>
                    ${link.dropdown.map(sublink => `
                      <li><a class="dropdown-item" href="#" onclick="navigateToCategory('${sublink.category}')">${sublink.text}</a></li>
                    `).join('')}
                  </ul>
                </li>
                `
                : `
                <li class="nav-item">
                  <a class="nav-link" href="${link.href}">${link.text}</a>
                </li>
                `
            )
            .join("")}
        </ul>
      </div>

      <!-- Élément du panier -->
      <div class="cart-container">
        <a href="/panier" class="nav-link">
          <i class="bi bi-cart"></i> Panier
          <!-- Ici, vous pouvez afficher le nombre d'articles dans le panier -->
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
      document.title = appName;
      return;
    }

    document.title = `${activeLink.textContent} - ${appName}`;
  };

  // Initialise la barre de navigation
  markAsActive();
  replaceLinksByEvents();
  changePageTitle();

  // Ajoute un écouteur d'événement pour gérer les événements de navigation du navigateur (précédent/suivant)
  window.addEventListener("popstate", () => {
    removeActive();
    markAsActive();
    changePageTitle();
    element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
  });
};