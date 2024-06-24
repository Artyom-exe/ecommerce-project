// product.js

import productsData from "../../storage/products.json";
import { ajouterAuPanier } from "../../components/cart";

export const Product = (element) => {
  const url = new URL(window.location.href);
  const productId = parseInt(url.searchParams.get("id"));
  const product = productsData.products.find((product) => product.id === productId);

  if (!product) {
    element.innerHTML = `
      <h1>Produit non trouvé</h1>
      <p>Le produit avec l'identifiant ${productId} n'existe pas.</p>
    `;
    return;
  }

  element.innerHTML = `
    <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div class="text-left w-100" style="max-width: 600px;">
        <div class="d-flex justify-content-between align-items-center">
          <h1>${product.name}</h1>
          <h2 class="card-price">${product.price} €</h2>
        </div>
        <p>${product.description}</p>
        <img class="img-product" src="${product.image}" style="width: 100%;">
      </div>
      <div class="text-left mt-3 w-100" style="max-width: 600px;">
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary" type="button" id="decrease-quantity">-</button>
          <input type="text" class="form-control text-center" id="quantity" value="1" readonly>
          <button class="btn btn-outline-secondary" type="button" id="increase-quantity">+</button>
        </div>
        <button class="btn btn-primary mt-2" id="add-to-cart">Ajouter au panier</button>
      </div>
    </div>
  `;

  const quantityInput = element.querySelector('#quantity');
  const decreaseBtn = element.querySelector('#decrease-quantity');
  const increaseBtn = element.querySelector('#increase-quantity');

  let quantity = 1;

  decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity.toString();
    }
  });

  increaseBtn.addEventListener('click', () => {
    quantity++;
    quantityInput.value = quantity.toString();
  });

  document.getElementById('add-to-cart').addEventListener('click', () => {
    ajouterAuPanier({ ...product, quantity });
    quantity = 1;
    quantityInput.value = quantity.toString();
  });
};
