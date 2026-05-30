import { fetchProducts } from "./api/fetchProducts.js";
import { renderProductCard } from "./components.js";
import "./utils.js"; // Load cart count display

async function init() {
    const container = document.getElementById("product-grid");

    container.innerHTML = "<p>Laster produkter...</p>";

    try {
        const products = await fetchProducts();

        container.innerHTML = ""; // fjern loading

        products.forEach(product => {
            container.innerHTML += renderProductCard(product);
        });

    } catch (error) {
        container.innerHTML = "<p>Kunne ikke laste produkter.</p>";
    }
}

init();