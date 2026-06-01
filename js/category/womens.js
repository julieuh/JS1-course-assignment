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

        const womensProducts = products.filter(product =>
            product.gender === "Female"
        );

        if (womensProducts.length === 0) {
            container.innerHTML = "<p>No women's products available.</p>";
            return;
        }

        container.innerHTML = womensProducts
            .map(renderProductCard)
            .join("");
        console.log(`Successfully loaded ${womensProducts.length} women's products`);

    } catch (error) {
        console.error("Error loading women's products:", error.message);
        container.innerHTML = `<p>Could not load products: ${error.message}</p>`;
    }
}

init();
