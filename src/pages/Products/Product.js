import productsData from "../../storage/products.json";
import { Category } from "./Partials/Category";
import { Panier } from "../Panier";

let panier = JSON.parse(localStorage.getItem('panier')) || [];

/**
 * Page des détails d'un produit
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Product = (element) => {
  // on récupère l'identifiant du produit depuis l'URL
  const url = new URL(window.location.href);
  const productId = parseInt(url.searchParams.get("id"));
  console.log(productId);
  
  // on récupère le produit correspondant à l'identifiant
  const product = productsData.products.find((product) => product.id === productId);
  
  // si le produit n'existe pas, on affiche un message d'erreur
  if (!product) {
    element.innerHTML = `
      <h1>Produit non trouvé</h1>
      <p>Le produit avec l'identifiant ${productId} n'existe pas.</p>
    `;
    return;
  }

  element.innerHTML = `
    <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div class="text-left w-100" style="max-width: 600px;">
        <div class="d-flex justify-content-between align-items-center">
          <h1>${product.name}</h1>
          <h2 class="card-price">${product.price}</h2>
        </div>
        <p>${product.description}</p>
        <img class="img-product" src="${product.image}" style="width: 100%;">
      </div>
      <div class="text-left mt-3 w-100" style="max-width: 600px;">
        ${Category(product.category)}
        <button class="btn btn-primary mt-2" onclick="ajouterAuPanier(${productId})">Ajouter au panier</button>
      </div>
    </div>
  `;
};

// Fonction pour ajouter un produit au panier
window.ajouterAuPanier = function (id) {
  const produit = productsData.products.find((product) => product.id === id);
  if (produit) {
    panier.push(produit);
    localStorage.setItem('panier', JSON.stringify(panier)); // Mettre à jour le localStorage
    alert("Produit ajouté au panier !");
    reloadPanierSection();
  }
}

// Fonction pour recharger la section du panier
window.reloadPanierSection = () => {
  const main = document.querySelector("main");
  Panier(main);
};
