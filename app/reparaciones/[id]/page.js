import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import RepairStatusAction from "@/components/RepairStatusAction";
import { formatDateTime } from "@/lib/formatters";

async function getRepairOrder(id) {
    const response = await fetch(
        `http://127.0.0.1:8000/repair-orders/${id}`,
        {
            cache: "no-store",
        }
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("No se pudo obtener la reparación");
    }

    return response.json();
}

export default async function RepairDetail({ params }) {
    const { id } = await params;

    const repair = await getRepairOrder(id);

    if (!repair) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="mx-auto max-w-md">
                <Link
                    href="/"
                    className="mb-6 inline-block text-sm text-gray-600"
                >
                    ← Volver
                </Link>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                {repair.device.brand} {repair.device.model}
                            </h1>

                            <p className="mt-1 text-sm text-gray-600">
                                Reparación #{repair.id}
                            </p>
                        </div>

                        <StatusBadge status={repair.status} />
                    </div>

                    <div className="mt-6 space-y-5">
                        <section>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Cliente
                            </h2>

                            <p className="mt-1 font-medium text-gray-900">
                                {repair.device.customer.name}
                            </p>

                            <p className="text-sm text-gray-600">
                                {repair.device.customer.phone}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Problema
                            </h2>

                            <p className="mt-1 text-gray-900">
                                {repair.problem}
                            </p>
                        </section>

                        {repair.notes && (
                            <section>
                                <h2 className="text-sm font-semibold text-gray-500">
                                    Observaciones
                                </h2>

                                <p className="mt-1 text-gray-900">
                                    {repair.notes}
                                </p>
                            </section>
                        )}

                        {repair.device.identifier && (
                            <section>
                                <h2 className="text-sm font-semibold text-gray-500">
                                    IMEI / Identificador
                                </h2>

                                <p className="mt-1 break-all text-sm text-gray-900">
                                    {repair.device.identifier}
                                </p>
                            </section>
                        )}

                        <section>
                            <h2 className="text-sm font-semibold text-gray-500">
                                Recibido
                            </h2>

                            <p className="mt-1 text-gray-900">
                                {formatDateTime(repair.received_at)}
                            </p>
                        </section>

                        {repair.delivered_at && (
                            <section>
                                <h2 className="text-sm font-semibold text-gray-500">
                                Entregado
                                </h2>

                                <p className="mt-1 text-gray-900">
                                {formatDateTime(repair.delivered_at)}
                                </p>
                            </section>
                        )}
                    </div>
                </div>
                <RepairStatusAction
                    repairId={repair.id}
                    currentStatus={repair.status}
                />
            </div>
        </main>
    );
}