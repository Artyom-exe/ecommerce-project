// panier.js

import { panier, supprimerProduit, viderPanier, mettreAJourQuantiteProduit } from "../components/cart";

export const Panier = (element) => {
  element.innerHTML = `
    <div class="container mt-5">
      <h1>Mon Panier</h1>
      <ul id="panier" class="list-group"></ul>
      <button id="viderPanier" class="btn btn-danger mt-3">Vider le panier</button>
      <button id="passerCommande" class="btn btn-success mt-3">Passer commande</button>
    </div>
  `;

  function afficherPanier() {
    const panierListe = document.getElementById("panier");
    if (!panierListe) return;
    panierListe.innerHTML = "";

    panier.forEach((produit) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${produit.name} (Prix : ${produit.price} €)
        <div>
          <button class="btn btn-outline-secondary btn-sm" onclick="mettreAJourQuantiteProduit(${produit.id}, ${produit.quantity - 1})">-</button>
          <span>${produit.quantity}</span>
          <button class="btn btn-outline-secondary btn-sm" onclick="mettreAJourQuantiteProduit(${produit.id}, ${produit.quantity + 1})">+</button>
          <button class="btn btn-danger btn-sm" onclick="supprimerProduit(${produit.id})">Supprimer</button>
        </div>
      `;
      panierListe.appendChild(li);
    });
  }

  window.supprimerProduit = supprimerProduit;
  window.mettreAJourQuantiteProduit = (id, quantity) => {
    if (quantity > 0) {
      mettreAJourQuantiteProduit(id, quantity);
    } else {
      supprimerProduit(id);
    }
  };

  document.getElementById("viderPanier").addEventListener("click", viderPanier);

  document.getElementById("passerCommande").addEventListener("click", () => {
    alert("Passer commande !");
    viderPanier();
  });

  afficherPanier();

  document.addEventListener('panierUpdated', afficherPanier);
};
