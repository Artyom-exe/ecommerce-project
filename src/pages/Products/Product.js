import productsData from "../../storage/products.json";
import { Category } from "./Partials/Category";

/**
 * Page des détails d'un utilisateur
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Product = (element) => {
  // on récupère l'identifiant de l'utilisateur depuis l'URL
  const url = new URL(window.location.href);
  const productId = parseInt(url.searchParams.get("id"));
  // on récupère l'utilisateur correspondant à l'identifiant
  const product = productsData.products.find((product) => product.id === productId);
  // si l'utilisateur n'existe pas, on affiche un message d'erreur
  if (!product) {
    element.innerHTML = `
      <h1>Utilisateur non trouvé</h1>
      <p>L'utilisateur avec l'identifiant ${productId} n'existe pas.</p>
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
    </div>
  </div>
`;


};
