import { getCart } from "./cart.js";

const container = document.getElementById("cart-container");
const cart = getCart();

if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
} else {
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.price} kr</p>
            <p>Quantity: ${item.quantity}</p>
        </div>
    `).join("");
}