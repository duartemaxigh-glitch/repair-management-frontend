export function formatDateTime(value) {
    if (!value) {
        return null;
    }

    return new Intl.DateTimeFormat("es-AR", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}