import productsData from "../../../storage/products.json";

/**
 * Récupère la classe de catégorie pour un identifiant de catégorie donné
 *
 * @param {string} categoryId
 * @returns {string} Chaîne HTML avec la classe de catégorie
 */
export const Category = (categoryId) => {
  const categoryMap = new Map(); // Crée une nouvelle Map

  // Remplissez la Map avec les catégories de productsData
  productsData.categories.forEach((cat) => {
    categoryMap.set(cat.id, cat.name);
  });

  // Obtenez le nom de la catégorie à partir de la Map
  const categoryName = categoryMap.get(categoryId);

  // Définissez la classe de catégorie en fonction de l'identifiant
  const myCategory = {
    [categoryId]: "text-bg-danger",
  };

  const categoryClass = myCategory[categoryId] || "text-bg-secondary";

  return `<span class="${categoryClass}">${categoryName}</span>`;
};

