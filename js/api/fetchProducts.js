// fetch products from the API

export async function fetchProducts() {
    const url = "https://v2.api.noroff.dev/rainy-days";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        return data.data; // API returnerer data inni data.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}