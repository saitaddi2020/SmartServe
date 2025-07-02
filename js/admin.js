// js/admin.js
import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Handle upload
const form = document.getElementById('uploadForm');
const msg = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const imageUrl = document.getElementById('imageUrl').value.trim();

  if (!name || !price || !imageUrl) {
    msg.textContent = "Please fill all fields.";
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      imageUrl,
      createdAt: serverTimestamp()
    });

    msg.textContent = "✅ Product uploaded successfully!";
    form.reset();
  } catch (error) {
    msg.textContent = "❌ Error uploading product: " + error.message;
  }
});

import { db } from './firebase.js';
import {
  collection, getDocs, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const adminOrders = document.getElementById('adminOrders');

if (adminOrders) {
  loadAllOrders();
}

async function loadAllOrders() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  adminOrders.innerHTML = "";

  querySnapshot.forEach((orderDoc) => {
    const order = orderDoc.data();
    const orderId = orderDoc.id;

    const itemsHtml = order.items.map(i => `<li>${i.name} - ₹${i.price}</li>`).join("");

    const container = document.createElement("div");
    container.classList.add("order-card");

    container.innerHTML = `
      <strong>User ID:</strong> ${order.userId}<br>
      <strong>Status:</strong>
      <select data-id="${orderId}">
        <option ${order.status === "Pending" ? "selected" : ""}>Pending</option>
        <option ${order.status === "Preparing" ? "selected" : ""}>Preparing</option>
        <option ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
      </select><br>
      <strong>Items:</strong><ul>${itemsHtml}</ul>
      <hr>
    `;

    adminOrders.appendChild(container);
  });

  document.querySelectorAll("select").forEach((dropdown) => {
    dropdown.addEventListener("change", async (e) => {
      const id = e.target.getAttribute("data-id");
      const newStatus = e.target.value;

      await updateDoc(doc(db, "orders", id), {
        status: newStatus
      });

      alert("✅ Order status updated to " + newStatus);
    });
  });
}
