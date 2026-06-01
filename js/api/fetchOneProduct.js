export async function fetchOneProduct(id) {
    const url = `https://v2.api.noroff.dev/rainy-days/${id}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                console.error(`Product not found - Status: 404`);
                throw new Error("Product not found");
            }
            console.error(`API Error - Status: ${response.status} ${response.statusText}`);
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.data) {
            throw new Error("Invalid product data");
        }
        
        return data.data;
    } catch (error) {
        console.error("Failed to fetch product:", error.message);
        throw error;
    }
}