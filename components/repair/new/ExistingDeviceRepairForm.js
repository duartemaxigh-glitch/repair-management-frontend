"use client";
import { useState } from "react";
import { createRepairForExistingDevice } from "@/lib/api/repairOrders";
import { useRouter } from "next/navigation";

export default function ExistingDeviceRepairForm({
    customer,
    device,
    onBack,
}) {
    const [problem, setProblem] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);
        setError(null);

        try {
            const normalizedProblem = problem.trim();

            if (!normalizedProblem) {
                setError("Indicá el problema del dispositivo.");
                return;
            }

            const repair = await createRepairForExistingDevice({
                device_id: device.id,
                problem: normalizedProblem,
                notes: notes.trim() || null,
            });

            router.push(`/reparaciones/${repair.id}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <button
                type="button"
                onClick={onBack}
                className="mb-4 text-sm text-gray-600"
            >
                ← Cambiar dispositivo
            </button>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="font-semibold text-gray-900">
                    {customer.name}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                    {device.brand} {device.model}
                </p>
            </div>

            <div className="mt-6">
                <label
                    htmlFor="problem"
                    className="text-sm font-medium text-gray-700"
                >
                    Problema
                </label>

                <input
                    id="problem"
                    type="text"
                    value={problem}
                    onChange={(event) => setProblem(event.target.value)}
                    required
                    maxLength={100}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
                    placeholder="Ej. No carga"
                />
            </div>

            <div className="mt-4">
                <label
                    htmlFor="notes"
                    className="text-sm font-medium text-gray-700"
                >
                    Observaciones
                </label>

                <textarea
                    id="notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    maxLength={255}
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
                    placeholder="Opcional"
                />
            </div>

            {error && (
                <p className="mt-4 text-sm text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white disabled:opacity-50"
            >
                {isSubmitting
                    ? "Registrando..."
                    : "Registrar reparación"}
            </button>
        </form>
    );
}
