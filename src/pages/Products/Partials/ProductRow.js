import { Category } from "./Category";

/**
 * @typedef {Object} product
 * @property {number} id - L'identifiant de l'utilisateur.
 * @property {string} name - Le nom de l'utilisateur.
 * @property {string} email - L'adresse email de l'utilisateur.
 * @property {string} category - Le rôle de l'utilisateur.
 */

/**
 * Affiche une ligne d'un tableau d'utilisateurs
 *
 * @param {product} product
 * @returns {string} HTML string
 */
export const ProductRow = (product) => {
  return `
    <tr>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${Category(product.category)}</td>
      <td><a class="btn btn-primary btn-sm" href="/produit?id=${
        product.id
      }"><i class="ri-search-eye-line"></i></a></td>
    </tr>
    `;
};
