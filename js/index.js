import { fetchProducts } from "./api/fetchProducts.js";
import { renderProductCard } from "./components.js";
import "./utils.js"; // Load cart count display

async function init() {
    const container = document.getElementById("product-grid");

    container.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
        </div>
    `;

    try {
        const products = await fetchProducts();

        container.innerHTML = "";

        if (products.length === 0) {
            container.innerHTML = "<p>No products available.</p>";
            return;
        }

        products.forEach(product => {
            container.innerHTML += renderProductCard(product);
        });
        console.log(`Successfully loaded ${products.length} products`);

    } catch (error) {
        console.error("Error loading products:", error.message);
        container.innerHTML = `<p>Kunne ikke laste produkter: ${error.message}</p>`;
    }
}

init();