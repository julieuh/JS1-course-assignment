// get cart from localStorage
export function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// save cart
export function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// add product to cart
export function addToCart(product) {
    const cart = getCart();

    // check if product already exists in cart
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image.url,
            quantity: 1
        });
    }

    saveCart(cart);
}