"use client";

import { useEffect, useState } from "react";

import RepairCard from "@/components/RepairCard";
import { getRepairOrders } from "@/lib/api/repairOrders";

export default function RepairList({ initialRepairs }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [repairs, setRepairs] = useState(initialRepairs);

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            async function fetchRepairs() {
            const params = new URLSearchParams();

            if (search) {
                params.set("search", search);
            }

            if (status) {
                params.set("status", status);
            }

            const data = await getRepairOrders({
                status,
                search,
                signal: controller.signal,
            });

            setRepairs(data);
            }

        fetchRepairs();
    }, 350);

    return () => {
        clearTimeout(timeoutId);
        controller.abort();
    };
    }, [search, status]);

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar cliente o equipo..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none"
            />

            <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
            >
                <option value="">Todos los estados</option>
                <option value="received">Recibido</option>
                <option value="in_review">En revisión</option>
                <option value="in_repair">En reparación</option>
                <option value="ready">Listo</option>
                <option value="delivered">Entregado</option>
            </select>

            <div className="mt-4">
                {repairs.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                    <p className="font-medium text-gray-900">
                        No encontramos reparaciones
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Probá con otro cliente, teléfono o equipo.
                    </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                    {repairs.map((repair) => (
                        <RepairCard
                        key={repair.id}
                        repair={repair}
                        />
                    ))}
                    </div>
                )}
            </div>
        </div>
    );
}