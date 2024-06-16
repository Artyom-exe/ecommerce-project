/**
 * categorie du produit
 *
 * @param {string} categorie
 * @returns {string} HTML string
 */
export const Categorie = (categorie) => {
  const categories = {
    admin: "text-bg-danger",
    product: "text-bg-primary",
  };

  const categorie = categories[categorie] || "text-bg-secondary";

  return `
    <span class="${categorie}">${categorie}</span>
    `;
};
