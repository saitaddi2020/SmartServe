// js/product.js
import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const productContainer = document.getElementById('productContainer');

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  productContainer.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" width="200" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;

    productContainer.appendChild(card);
  });
}

window.addToCart = function(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart`);
};

loadProducts();
