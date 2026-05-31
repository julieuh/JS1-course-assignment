// get cart from localStorage
export function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// save cart
export function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function parsePrice(price) {
    if (typeof price === 'number') {
        return price;
    }
    if (!price) {
        return 0;
    }

    return Number(String(price).replace(',', '.').replace(/[^0-9.\-]/g, '')) || 0;
}

function getCartPrices(product) {
    const originalPrice = parsePrice(product.price);
    const discountedPrice = parsePrice(product.discountedPrice ?? product.price);
    const price = discountedPrice < originalPrice ? discountedPrice : originalPrice;
    return { price, originalPrice };
}

// add product to cart
export function addToCart(product) {
    const cart = getCart();

    // check if product already exists in cart
    const existing = cart.find(item => item.id === product.id);
    const { price, originalPrice } = getCartPrices(product);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price,
            originalPrice,
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
        saveCart(cart);
        return;
    }

    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
}

// delete product completely from cart
export function deleteFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
}