const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRepairOrders({
    status,
    search,
    signal,
} = {}) {
    const params = new URLSearchParams();

    if (status) {
        params.set("status", status);
    }

    if (search) {
        params.set("search", search);
    }

    const query = params.toString();

    const response = await fetch(
        `${API_URL}/repair-orders${query ? `?${query}` : ""}`,
        {
            cache: "no-store",
            signal,
        }
    );

    return parseResponse(
        response,
        "No se pudieron obtener las reparaciones"
    );
}

export async function getRepairOrderById(id) {
    const response = await fetch(
        `${API_URL}/repair-orders/${id}`,
        {
            cache: "no-store",
        }
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            "No se pudo obtener la reparación"
        );
    }

    return response.json();
}

async function parseResponse(response, defaultMessage) {
    if (!response.ok) {
        const error = new Error(defaultMessage);
        error.status = response.status;

        throw error;
    }

    return response.json();
}

export async function createRepairForExistingDevice(
    data
) {
    const response = await fetch(
        `${API_URL}/repair-orders/existing-device`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return parseResponse(
        response,
        "No se pudo registrar la reparación"
    );
}

export async function createRepairWithNewDevice(
    data
) {
    const response = await fetch(
        `${API_URL}/repair-orders/new-device`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return parseResponse(
        response,
        "No se pudo registrar el dispositivo y la reparación"
    );
}

export async function createRepairWithNewCustomer(
    data
) {
    const response = await fetch(
        `${API_URL}/repair-orders/new-customer`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return parseResponse(
        response,
        "No se pudo registrar el cliente y la reparación"
    );
}

export async function updateRepairStatus(id, status) {
    const response = await fetch(
        `${API_URL}/repair-orders/${id}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status,
            }),
        }
    );

    return parseResponse(
        response,
        "No se pudo actualizar el estado de la reparación"
    );
}