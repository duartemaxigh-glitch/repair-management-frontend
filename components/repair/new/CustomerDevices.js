export default function CustomerDevices({
    customer,
    onBack,
    onSelectDevice,
    onCreateDevice,
}) {
    return (
        <div>
            <button
                type="button"
                onClick={onBack}
                className="mb-4 text-sm text-gray-600"
            >
                ← Cambiar cliente
            </button>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="font-semibold text-gray-900">
                    {customer.name}
                </p>

                <p className="text-sm text-gray-600">
                    {customer.phone}
                </p>
            </div>

            <h2 className="mt-6 text-sm font-semibold text-gray-700">
                Dispositivos
            </h2>

            {customer.devices.length === 0 ? (
                <div className="mt-3 rounded-xl border border-gray-200 bg-white p-5 text-center">
                    <p className="text-sm text-gray-600">
                        Este cliente todavía no tiene dispositivos registrados.
                    </p>
                </div>
            ) : (
                <div className="mt-3 space-y-3">
                    {customer.devices.map((device) => (
                        <DeviceResult
                            key={device.id}
                            device={device}
                            onSelect={onSelectDevice}
                        />
                    ))}
                </div>
            )}

            <button
                type="button"
                onClick={onCreateDevice}
                className="mt-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-900"
            >
                + Registrar dispositivo nuevo
            </button>
        </div>
    );
}

function DeviceResult({ device, onSelect }) {
    const hasIdentifier =
        device.identifier &&
        device.identifier.trim().toLowerCase() !== "null";

    return (
        <button
            type="button"
            onClick={() => onSelect(device)}
            className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm"
        >
            <p className="font-semibold text-gray-900">
                {device.brand} {device.model}
            </p>

            <p className="mt-1 text-sm text-gray-500">
                {hasIdentifier
                    ? `Identificador: ${device.identifier}`
                    : "Sin identificador"}
            </p>
        </button>
    );
}
