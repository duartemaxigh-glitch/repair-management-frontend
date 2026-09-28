"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updateRepairStatus } from "@/lib/api/repairOrders";

const nextStatusConfig = {
    received: {
        status: "in_review",
        label: "Pasar a revisión",
    },
    in_review: {
        status: "in_repair",
        label: "Iniciar reparación",
    },
    in_repair: {
        status: "ready",
        label: "Marcar como listo",
    },
    ready: {
        status: "delivered",
        label: "Marcar como entregado",
    },
};

export default function RepairStatusAction({
    repairId,
    currentStatus,
}) {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const nextStatus = nextStatusConfig[currentStatus];

    if (!nextStatus) {
        return null;
    }

    async function handleClick() {
        setIsSubmitting(true);
        setError(null);

        try {
            await updateRepairStatus(
                repairId,
                nextStatus.status
            );

            router.refresh();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="mt-6">
            {error && (
                <p className="mb-3 text-sm text-red-600">
                    {error}
                </p>
            )}

            <button
                type="button"
                onClick={handleClick}
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white disabled:opacity-50"
            >
                {isSubmitting
                    ? "Actualizando..."
                    : nextStatus.label}
            </button>
        </div>
    );
}