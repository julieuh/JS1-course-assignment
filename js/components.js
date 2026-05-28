// product cards
export function renderProductCard(product) {
  return `
        <div class="product-card">
            <img src="${product.image.url}" alt="${product.image.alt}">
            <h3>${product.title}</h3>
            <p>${product.price} kr</p>
            <a href="product.html?id=${product.id}">View product</a>
        </div>
    `;
}

// product details

export function renderProductDetails(product) {
  return `
        <div class="product-page">
            <div class="product-image">
                <img src="${product.image.url}" alt="${product.image.alt}">
            </div>

            <div class="product-info">
                <h1>${product.title}</h1>
                <p>${product.description}</p>
                <p class="price">${product.price} kr</p>

                <button data-id="${product.id}" class="add-to-cart-btn">
                    Add to cart
                </button>
            </div>
        </div>
    `;
}
