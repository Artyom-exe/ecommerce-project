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

     // Exemple de produits (vous pouvez les charger depuis une API ou une base de données)
        const produits = [
            { id: 1, nom: "T-shirt", prix: 20 },
            { id: 2, nom: "Jeans", prix: 50 },
            // Ajoutez d'autres produits ici
        ];

        const panier = []; // Stocke les produits ajoutés au panier

        // Fonction pour afficher les produits dans le panier
        function afficherPanier() {
            const panierListe = document.getElementById("panier");
            panierListe.innerHTML = ""; // Efface la liste actuelle

            panier.forEach((produit) => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.innerHTML = `
                    ${produit.nom} (Prix : ${produit.prix} €)
                    <button class="btn btn-danger btn-sm float-right" onclick="supprimerProduit(${produit.id})">Supprimer</button>
                `;
                panierListe.appendChild(li);
            });
        }

        // Fonction pour ajouter un produit au panier
        function ajouterProduit(id) {
            const produit = produits.find((p) => p.id === id);
            if (produit) {
                panier.push(produit);
                afficherPanier();
            }
        }

        // Fonction pour supprimer un produit du panier
        function supprimerProduit(id) {
            const index = panier.findIndex((p) => p.id === id);
            if (index !== -1) {
                panier.splice(index, 1);
                afficherPanier();
            }
        }

        // Écouteur d'événement pour le bouton "Vider le panier"
        document.getElementById("viderPanier").addEventListener("click", () => {
            panier.length = 0; // Vide le panier
            afficherPanier();
        });

        // Écouteur d'événement pour le bouton "Passer commande"
        document.getElementById("passerCommande").addEventListener("click", () => {
            // Redirige l'utilisateur vers la page de paiement ou de commande
            // Remplacez cette ligne par votre propre logique de passage de commande
            alert("Passer commande !");
        });

        // Chargez les produits initiaux (vous pouvez les charger depuis une API)
        produits.forEach((p) => ajouterProduit(p.id));
}