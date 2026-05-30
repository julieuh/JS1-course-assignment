// loading
import { getCart } from "./cart.js";

// Update cart count badge
export function updateCartCount() {
    const cart = getCart();
    const cartLink = document.querySelector(".cart");
    
    let badge = cartLink.querySelector(".badge");
    
    if (!badge) {
        badge = document.createElement("span");
        badge.className = "badge";
        cartLink.appendChild(badge);
    }
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    badge.textContent = itemCount > 0 ? itemCount : "";
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);




// error handling