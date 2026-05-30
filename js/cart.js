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

// remove one item from cart
export function removeFromCart(productId) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        // remove completely if quantity is 1
        cart = cart.filter(item => item.id !== productId);
    }

    saveCart(cart);
}

// delete product completely from cart
export function deleteFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
}