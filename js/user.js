// js/user.js
import { db, auth } from './firebase.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const orderList = document.getElementById('orderList');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(collection(db, "orders"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      orderList.innerHTML = "<p>No orders found.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement('div');
      div.classList.add("order-card");

      const itemsHtml = data.items.map(i => `<li>${i.name} - ₹${i.price}</li>`).join("");
      div.innerHTML = `
        <strong>Status:</strong> ${data.status}<br>
        <strong>Items:</strong><ul>${itemsHtml}</ul>
        <hr>
      `;

      orderList.appendChild(div);
    });
  } else {
    orderList.innerHTML = "<p>Please login to view your orders.</p>";
  }
});
