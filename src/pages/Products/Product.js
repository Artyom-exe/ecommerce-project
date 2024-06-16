import products from "../../storage/products.json";
import { Categorie } from "./Partials/Category";

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
  const product = products.find((product) => product.id === productId);

  // si l'utilisateur n'existe pas, on affiche un message d'erreur
  if (!product) {
    element.innerHTML = `
      <h1>Utilisateur non trouvé</h1>
      <p>L'utilisateur avec l'identifiant ${productId} n'existe pas.</p>
      `;
    return;
  }

  element.innerHTML = `
    <h1>${product.name}</h1>
    <p>${product.email}</p>
    ${Category(product.categorie)}
    `;
};
