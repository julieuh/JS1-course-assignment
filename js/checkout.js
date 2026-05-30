import { getCart } from "./cart.js";

const container = document.getElementById("checkout-summary");
const button = document.getElementById("complete-order-btn");

const cart = getCart();

if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    button.style.display = "none";
} else {
    let total = 0;

    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;

        return `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.price} kr</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML += `
        <div class="checkout-total">
            <h2>Total: ${total} kr</h2>
        </div>
    `;
}

button.addEventListener("click", () => {
    // Tøm handlekurven
    localStorage.removeItem("cart");

    // Send videre
    window.location.href = "confirmation.html";
});
