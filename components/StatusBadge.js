const statusConfig = {
    received: {
        label: "Recibido",
        className: "bg-blue-100 text-blue-700",
    },
    in_review: {
        label: "En revisión",
        className: "bg-amber-100 text-amber-700",
    },
    in_repair: {
        label: "En reparación",
        className: "bg-purple-100 text-purple-700",
    },
    ready: {
        label: "Listo",
        className: "bg-green-100 text-green-700",
    },
    delivered: {
        label: "Entregado",
        className: "bg-gray-200 text-gray-700",
    },
};

export default function StatusBadge({ status }) {
    const config = statusConfig[status];

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
        >
            {config.label}
        </span>
    );
}