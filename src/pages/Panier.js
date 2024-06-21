// Déclaration globale de panier pour stocker les produits ajoutés au panier
let panier = JSON.parse(localStorage.getItem('panier')) || [];

/**
 * Page de panier
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Panier = (element) => {
    element.innerHTML = `
        <div class="container mt-5">
        <h1>Mon Panier</h1>
        <ul id="panier" class="list-group">
            <!-- Liste des produits ajoutés au panier -->
        </ul>
        <button id="viderPanier" class="btn btn-danger mt-3">Vider le panier</button>
        <button id="passerCommande" class="btn btn-success mt-3">Passer commande</button>
    </div>
    `;

    // Fonction pour afficher les produits dans le panier
    function afficherPanier() {
        const panierListe = document.getElementById("panier");
        panierListe.innerHTML = ""; // Efface la liste actuelle

        panier.forEach((produit) => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `
                ${produit.name} (Prix : ${produit.price} €)
                <button class="btn btn-danger btn-sm float-right" onclick="supprimerProduit(${produit.id})">Supprimer</button>
            `;
            panierListe.appendChild(li);
        });
    }

    // Fonction pour supprimer un produit du panier
    window.supprimerProduit = function (id) {
        const index = panier.findIndex((p) => p.id === id);
        if (index !== -1) {
            panier.splice(index, 1);
            localStorage.setItem('panier', JSON.stringify(panier)); // Mettre à jour le localStorage
            afficherPanier();
        }
    }

    // Écouteur d'événement pour le bouton "Vider le panier"
    document.getElementById("viderPanier").addEventListener("click", () => {
        panier.length = 0; // Vide le panier
        localStorage.setItem('panier', JSON.stringify(panier)); // Mettre à jour le localStorage
        afficherPanier();
    });

    // Écouteur d'événement pour le bouton "Passer commande"
    document.getElementById("passerCommande").addEventListener("click", () => {
        // Redirige l'utilisateur vers la page de paiement ou de commande
        // Remplacez cette ligne par votre propre logique de passage de commande
        alert("Passer commande !");
    });

    // Affiche le panier initial
    afficherPanier();
}
