import { fetchOneProduct } from "./api/fetchOneProduct.js";
import { renderProductDetails } from "./components.js";
import { addToCart } from "./cart.js";
import { updateCartCount } from "./utils.js";

async function init() {
    const container = document.getElementById("product-details");

    container.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
        </div>
    `;

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
        if (button) {
            button.addEventListener("click", () => {
                try {
                    addToCart(product);
                    updateCartCount();
                    console.log("Product added to cart:", product.title);
                } catch (err) {
                    console.error("Error adding product to cart:", err.message);
                    alert("Could not add product to cart. Please try again.");
                }
            });
        }
    } catch (error) {
        console.error("Error loading product:", error.message);
        container.innerHTML = `<p>Could not load product: ${error.message}</p>`;
    }
}

init();