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
          <img src="${product.image}">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <h6 class="card-price">${product.price}</h6>
          <a href="/produit?id=${product.id}" class="btn btn-primary">Voir le produit</a>
          <h6>${Category(product.category)}
        </div>
      </a>
    </div>
    `;
};
