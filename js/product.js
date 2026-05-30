import { fetchOneProduct } from "./api/fetchOneProduct.js";
import { renderProductDetails } from "./components.js";

async function init() {
    const container = document.getElementById("product-details");

    container.innerHTML = "<p>Loading product...</p>";

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        container.innerHTML = "<p>Product ID is missing.</p>";
        return;
    }

    try {
        const product = await fetchOneProduct(id);
        container.innerHTML = renderProductDetails(product);
    } catch (error) {
        container.innerHTML = "<p>Could not fetch product.</p>";
    }
}

init();



// Add to cart functionality

import { addToCart } from "./cart.js";

container.innerHTML = renderProductDetails(product);

// Finn knappen
const button = document.querySelector(".add-to-cart-btn");

// Legg til event listener
button.addEventListener("click", () => {
    addToCart(product);
    alert("Added to cart!");
});