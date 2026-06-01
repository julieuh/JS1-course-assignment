import { fetchProducts } from "../api/fetchProducts.js";
import { renderProductCard } from "../components.js";

async function init() {
    const container = document.getElementById("product-grid");
    container.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
        </div>
    `;

    try {
        const products = await fetchProducts();

        const mensProducts = products.filter(product =>
            product.gender === "Male"
        );

        if (mensProducts.length === 0) {
            container.innerHTML = "<p>No men's products available.</p>";
            return;
        }

        container.innerHTML = mensProducts
            .map(renderProductCard)
            .join("");
        console.log(`Successfully loaded ${mensProducts.length} men's products`);

    } catch (error) {
        console.error("Error loading men's products:", error.message);
        container.innerHTML = `<p>Could not load products: ${error.message}</p>`;
    }
}

init();