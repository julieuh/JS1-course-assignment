function parsePrice(price) {
  if (typeof price === 'number') {
    return price;
  }
  if (!price) {
    return 0;
  }

  return Number(String(price).replace(',', '.').replace(/[^0-9.\-]/g, '')) || 0;
}

function isDiscounted(product) {
  const original = parsePrice(product.price);
  const discounted = parsePrice(product.discountedPrice ?? product.price);
  return discounted < original;
}

function formatPrice(price) {
  return `${price} kr`;
}

function renderPrice(product) {
  const originalPrice = parsePrice(product.price);
  const discountedPrice = parsePrice(product.discountedPrice ?? product.price);

  if (discountedPrice < originalPrice) {
    return `
      <div class="price price--sale">
        <span class="price-old">${formatPrice(product.price)}</span>
        <span class="price-new">${formatPrice(product.discountedPrice)}</span>
      </div>
    `;
  }

  return `<p class="price">${formatPrice(product.price)}</p>`;
}

// product cards
export function renderProductCard(product) {
  return `
        <div class="product-card">
            <img src="${product.image.url}" alt="${product.image.alt}">
            <h3>${product.title}</h3>
            ${renderPrice(product)}
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
                ${renderPrice(product)}

                <button data-id="${product.id}" class="add-to-cart-btn">
                    Add to cart
                </button>
            </div>
        </div>
    `;
}
