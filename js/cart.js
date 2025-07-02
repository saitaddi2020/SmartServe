// js/cart.js
import { db, auth } from './firebase.js';
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const cartItemsContainer = document.getElementById('cartItems');
const totalDisplay = document.getElementById('total');
const placeOrderBtn = document.getElementById('placeOrderBtn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.textContent = '';
    placeOrderBtn.style.display = "none";
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = '';

  cart.forEach((item, index) => {
    total += item.price;
    cartItemsContainer.innerHTML += `
      <div>
        ${item.name} - ₹${item.price}
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  totalDisplay.textContent = "Total: ₹" + total;
}

window.removeItem = function(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
};

placeOrderBtn.addEventListener('click', () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await addDoc(collection(db, "orders"), {
          userId: user.uid,
          items: cart,
          status: "Pending",
          timestamp: serverTimestamp()
        });
        alert("✅ Order placed successfully!");
        localStorage.removeItem('cart');
        window.location.reload();
      } catch (error) {
        alert("❌ Failed to place order: " + error.message);
      }
    } else {
      alert("You must be logged in to place an order.");
    }
  });
});

renderCart();
