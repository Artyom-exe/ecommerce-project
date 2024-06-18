import { Category } from "./Category";

/**
 * @typedef {Object} product
 * @property {number} id - L'identifiant de l'utilisateur.
 * @property {string} name - Le nom de l'utilisateur.
 * @property {string} description - L'adresse email de l'utilisateur.
 * @property {string} category - Le rôle de l'utilisateur.
 */

/**
 * Affiche une carte d'utilisateur
 *
 * @param {product} product
 * @returns {string} HTML string
 */

export const ProductCard = (product) => {
  return `
    <div class="col p-4">
      <div class="card-body">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="card-price">${product.price}</h6>
          <h6>${Category(product.category)}</h6>
        </div>
        <a href="/produit?id=${product.id}" class="btn btn-primary mt-3">Voir le produit</a>
      </div>
    </div>
  `;
};
