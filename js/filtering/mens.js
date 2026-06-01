import { fetchProducts } from "../api/fetchProducts.js";
import { renderProductCard } from "../components.js";

async function init() {
    const container = document.getElementById("product-grid");
    container.innerHTML = "<p>Loading...</p>";

    try {
        const products = await fetchProducts();

        const mensProducts = products.filter(product =>
            product.gender === "Male"
        );

        container.innerHTML = mensProducts
            .map(renderProductCard)
            .join("");

    } catch (error) {
        container.innerHTML = "<p>Could not load products.</p>";
    }
}

init();