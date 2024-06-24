import { Category } from "./Category";

/**
 * @typedef {Object} product
 * @property {number} id - L'identifiant du produit.
 * @property {string} name - Le nom du produit.
 * @property {string} description - La description du produit.
 * @property {string} image - L'URL de l'image du produit.
 * @property {number} price - Le prix du produit.
 * @property {number} category - L'identifiant de la catégorie du produit.
 */

/**
 * Affiche une carte de produit
 *
 * @param {product} product
 * @returns {string} HTML string
 */

export const ProductCard = (product) => {
  return `
    <div class="col-md-4 col-sm-6 mb-4">
      <div class="card h-100 shadow-sm border-0">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="card-price">${product.price.toFixed(2)} €</h6>
            <h6>${Category(product.category)}</h6>
          </div>
          <a href="/produit?id=${product.id}" class="btn btn-primary mt-3 btn-sm">Voir le produit</a>
        </div>
      </div>
    </div>
  `;
};
