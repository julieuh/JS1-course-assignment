import { getCart } from "./cart.js";
import "./utils.js"; // Load cart count display
import { removeFromCart, deleteFromCart } from "./cart.js";
import { updateCartCount } from "./utils.js";

const container = document.getElementById("cart-container");

function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.price} kr</p>
                    <div class="cart-item-controls">
                        <button class="btn-remove" data-id="${item.id}">−</button>
                        <span class="quantity">Quantity: ${item.quantity}</span>
                        <button class="btn-delete" data-id="${item.id}">Slett</button>
                    </div>
                </div>
            </div>
        `).join("");

        // Add event listeners to remove buttons
        document.querySelectorAll(".btn-remove").forEach(btn => {
            btn.addEventListener("click", () => {
                removeFromCart(btn.dataset.id);
                updateCartCount();
                renderCart();
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", () => {
                deleteFromCart(btn.dataset.id);
                updateCartCount();
                renderCart();
            });
        });
    }
}

renderCart();