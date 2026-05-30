import { fetchOneProduct } from "./api/fetchOneProduct.js";
import { renderProductDetails } from "./components.js";
import { addToCart } from "./cart.js";
import { updateCartCount } from "./utils.js";

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

        // Add to cart functionality
        const button = document.querySelector(".add-to-cart-btn");
        button.addEventListener("click", () => {
            addToCart(product);
            updateCartCount();
        });
    } catch (error) {
        container.innerHTML = "<p>Could not fetch product.</p>";
    }
}

init();