import { panier, supprimerProduit, viderPanier, mettreAJourQuantiteProduit } from "../components/cart";

export const Panier = (element) => {
  element.innerHTML = `
    <div class="container mt-5">
      <h1 class="mb-4">Mon Panier</h1>
      <div id="panier" class="list-group mb-4"></div>
      <div class="d-flex justify-content-between">
        <button id="viderPanier" class="btn btn-danger">Vider le panier</button>
        <button id="passerCommande" class="btn btn-success">Passer commande</button>
      </div>
    </div>
  `;

  function afficherPanier() {
    const panierListe = document.getElementById("panier");
    if (!panierListe) return;
    panierListe.innerHTML = "";

    panier.forEach((produit) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center mb-2";
      li.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${produit.image}" alt="${produit.name}" class="img-thumbnail me-3" style="width: 50px; height: 50px;">
          <div>
            <h5 class="mb-1">${produit.name}</h5>
            <p class="mb-1 text-muted">${produit.description}</p>
            <small>Prix : ${produit.price} €</small>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-outline-secondary btn-sm me-2" onclick="window.mettreAJourQuantiteProduit(${produit.id}, ${produit.quantity - 1})">-</button>
          <span class="me-2">${produit.quantity}</span>
          <button class="btn btn-outline-secondary btn-sm me-2" onclick="window.mettreAJourQuantiteProduit(${produit.id}, ${produit.quantity + 1})">+</button>
          <button class="btn btn-danger btn-sm" onclick="window.supprimerProduit(${produit.id})">Supprimer</button>
        </div>
      `;
      panierListe.appendChild(li);
    });
  }

  // Assignation des fonctions aux variables globales pour pouvoir les appeler dans le HTML
  window.supprimerProduit = supprimerProduit;
  window.mettreAJourQuantiteProduit = (id, quantity) => {
    if (quantity > 0) {
      mettreAJourQuantiteProduit(id, quantity);
    } else {
      supprimerProduit(id);
    }
  };

  // Événement pour vider le panier
  document.getElementById("viderPanier").addEventListener("click", () => {
    if (confirm("Êtes-vous sûr de vouloir vider le panier ?")) {
      viderPanier();
    }
  });

  // Événement pour passer la commande
  document.getElementById("passerCommande").addEventListener("click", () => {
    alert("Passer commande !");
    viderPanier();
  });

  // Affichage initial du panier
  afficherPanier();

  // Écoute de l'événement personnalisé pour mettre à jour le panier
  document.addEventListener('panierUpdated', afficherPanier);
};
