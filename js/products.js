import { fetchProducts } from "./api/fetchProducts.js";
import { renderProductCard } from "./components.js";
import "./utils.js"; // cart count display

async function init() {
  const container = document.getElementById("product-grid");
  const title = document.querySelector("main h1");

  // Show loader
  container.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  // Read URL parameters
  const params = new URLSearchParams(window.location.search);
  const gender = params.get("gender"); // "Male" / "Female" or null

  try {
    const products = await fetchProducts();

    let filtered = products;

    // Apply gender filter if present
    if (gender) {
      filtered = filtered.filter(
        (product) =>
          product.gender &&
          product.gender.toLowerCase() === gender.toLowerCase()
      );

      // Update page title
      if (title) {
        if (gender.toLowerCase() === "female") {
          title.textContent = "Women's Clothing";
        } else if (gender.toLowerCase() === "male") {
          title.textContent = "Men's Clothing";
        }
      }
    }

    // Clear loader
    container.innerHTML = "";

    if (filtered.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    // Render products
    filtered.forEach((product) => {
      container.innerHTML += renderProductCard(product);
    });

    console.log(`Loaded ${filtered.length} products`);
  } catch (error) {
    console.error("Error loading products:", error.message);
    container.innerHTML = `<p>Could not load products: ${error.message}</p>`;
  }
}

init();