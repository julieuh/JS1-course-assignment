export async function fetchOneProduct(id) {
    const url = `https://v2.api.noroff.dev/rainy-days/${id}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}