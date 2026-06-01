// fetch products from the API

export async function fetchProducts() {
    const url = "https://v2.api.noroff.dev/rainy-days";

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error(`API Error - Status: ${response.status} ${response.statusText}`);
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.data || !Array.isArray(data.data)) {
            throw new Error("Invalid API response format");
        }
        
        return data.data;
    } catch (error) {
        console.error("Failed to fetch products:", error.message);
        throw error;
    }
}