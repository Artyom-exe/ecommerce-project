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
    <div class="col p-2">
      <a class="card product-link" href="/produit?id=${product.id}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          ${Category(product.category)}
        </div>
      </a>
    </div>
    `;
};
