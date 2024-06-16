/**
 * categorie du produit
 *
 * @param {string} category
 * @returns {string} HTML string
 */
export const Category = (category) => {
  const categories = {
    admin: "text-bg-danger",
    product: "text-bg-primary",
  };

  const categoryClass = categories[category] || "text-bg-secondary";

  return `
    <span class="${categoryClass}">${category}</span>
    `;
};
