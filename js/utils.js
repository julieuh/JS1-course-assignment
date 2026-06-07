// loading
import { getCart } from "./cart.js";

// Update cart count badge
export function updateCartCount() {
    const cart = getCart();
    const cartLink = document.querySelector(".cart");
    if (!cartLink) return;
    
    let badge = cartLink.querySelector(".badge");
    
    if (!badge) {
        badge = document.createElement("span");
        badge.className = "badge";
        cartLink.appendChild(badge);
    }
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (itemCount > 0) {
        badge.textContent = itemCount;
        badge.style.display = "inline-flex";
    } else {
        badge.textContent = "";
        badge.style.display = "none";
    }
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);




// error handling