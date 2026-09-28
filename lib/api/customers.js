const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function searchCustomers(search, signal) {
    const params = new URLSearchParams({
        search,
    });

    const response = await fetch(
        `${API_URL}/customers?${params}`,
        {
            signal,
        }
    );

    if (!response.ok) {
        throw new Error("No se pudieron buscar los clientes");
    }

    return response.json();
}