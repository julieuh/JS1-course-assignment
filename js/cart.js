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
    if (!product || !product.price) {
        throw new Error("Invalid product: missing price");
    }
    
    const originalPrice = parsePrice(product.price);
    const discountedPrice = parsePrice(product.discountedPrice ?? product.price);
    const price = discountedPrice < originalPrice ? discountedPrice : originalPrice;
    return { price, originalPrice };
}

// add product to cart
export function addToCart(product) {
    try {
        if (!product || !product.id || !product.title) {
            throw new Error("Invalid product data");
        }

        const cart = getCart();
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
                image: product.image?.url || '',
                quantity: 1
            });
        }

        saveCart(cart);
        console.log("Product added to cart:", product.title, "Quantity:", existing ? existing.quantity : 1);
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        throw error;
    }
}

// remove one item from cart
export function removeFromCart(productId) {
    try {
        if (!productId) {
            throw new Error("Product ID is required");
        }
        
        const cart = getCart();
        const item = cart.find(item => item.id === productId);

        if (!item) {
            throw new Error("Product not found in cart");
        }

        if (item.quantity > 1) {
            item.quantity -= 1;
            saveCart(cart);
            console.log("Reduced quantity for:", item.title, "New quantity:", item.quantity);
        } else {
            const updatedCart = cart.filter(item => item.id !== productId);
            saveCart(updatedCart);
            console.log("Removed from cart:", item.title);
        }
    } catch (error) {
        console.error("Error removing from cart:", error.message);
        throw error;
    }
}

// delete product completely from cart
export function deleteFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
}