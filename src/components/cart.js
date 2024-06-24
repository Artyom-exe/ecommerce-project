// cart.js

// Initialisation du panier depuis le stockage local
export let panier = JSON.parse(localStorage.getItem('panier')) || [];

export function ajouterAuPanier(produit) {
  const existingProductIndex = panier.findIndex((p) => p.id === produit.id);
  if (existingProductIndex !== -1) {
    panier[existingProductIndex].quantity += produit.quantity;
  } else {
    panier.push({ ...produit });
  }
  localStorage.setItem('panier', JSON.stringify(panier));
  mettreAJourCompteurPanier();
  document.dispatchEvent(new CustomEvent('panierUpdated'));
}

export function mettreAJourQuantiteProduit(id, quantity) {
  const index = panier.findIndex((p) => p.id === id);
  if (index !== -1) {
    panier[index].quantity = quantity;
    localStorage.setItem('panier', JSON.stringify(panier));
    mettreAJourCompteurPanier();
    document.dispatchEvent(new CustomEvent('panierUpdated'));
  }
}

export function supprimerProduit(id) {
  const index = panier.findIndex((p) => p.id === id);
  if (index !== -1) {
    panier.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(panier));
    mettreAJourCompteurPanier();
    document.dispatchEvent(new CustomEvent('panierUpdated'));
  }
}

export function viderPanier() {
  panier.length = 0;
  localStorage.setItem('panier', JSON.stringify(panier));
  mettreAJourCompteurPanier();
  document.dispatchEvent(new CustomEvent('panierUpdated'));
}

export function mettreAJourCompteurPanier() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = panier.reduce((total, p) => total + p.quantity, 0).toString();
  }
}

document.addEventListener('DOMContentLoaded', mettreAJourCompteurPanier);
