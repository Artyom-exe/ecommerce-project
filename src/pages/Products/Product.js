import productsData from "../../storage/products.json";
import { ajouterAuPanier } from "../../components/cart";

export const Product = (element) => {
  const url = new URL(window.location.href);
  const productId = parseInt(url.searchParams.get("id"));
  const product = productsData.products.find((product) => product.id === productId);

  if (!product) {
    element.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Produit non trouvé</h4>
        <p>Le produit avec l'identifiant ${productId} n'existe pas.</p>
      </div>
    `;
    return;
  }

  const generateStarRating = (rating) => {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    let starsHTML = '';

    for (let i = 1; i <= filledStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }

    if (halfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = starsTotal - Math.ceil(rating);
    for (let i = 1; i <= emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>';
    }

    return `
      <div class="star-rating">
        ${starsHTML}
      </div>
    `;
  };

  const reviewsHTML = product.reviews.map(review => `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${review.username} - ${generateStarRating(review.rating)}</h5>
        <p class="card-text">${review.comment}</p>
      </div>
    </div>
  `).join('');

  element.innerHTML = `
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm mb-4">
            <img src="${product.image}" class="card-img-top img-fluid" alt="${product.name}">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
              <h1 class="card-title">${product.name}</h1>
              <h2 class="card-text text-muted">${product.price.toFixed(2)} €</h2>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>Fabricant:</strong> ${product.manufacturer}</p>
              <div class="input-group mb-3">
                <button class="btn btn-outline-secondary" type="button" id="decrease-quantity">-</button>
                <input type="text" class="form-control text-center" id="quantity" value="1" readonly>
                <button class="btn btn-outline-secondary" type="button" id="increase-quantity">+</button>
              </div>
              <button class="btn btn-primary btn-block btn-lg" id="add-to-cart">Ajouter au panier</button>
            </div>
          </div>
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <h3 class="card-title">Avis des clients</h3>
              ${reviewsHTML || '<p class="card-text text-muted">Aucun avis pour ce produit.</p>'}
            </div>
          </div>
        </div>
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
