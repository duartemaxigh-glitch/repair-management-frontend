"use client";
import { createRepairWithNewDevice } from "@/lib/api/repairOrders";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDeviceRepairForm({ customer, onBack }) {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [problem, setProblem] = useState("");
    const [notes, setNotes] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);
        setError(null);

        try {
            const normalizedProblem = problem.trim();
            const normalizedBrand = brand.trim();
            const normalizedModel = model.trim();

            if (!normalizedProblem) {
                setError("Indicá el problema del dispositivo.");
                return;
            }
            if (!normalizedBrand) {
                setError("Indicá el problema del dispositivo.");
                return;
            }
            if (!normalizedModel) {
                setError("Indicá el problema del dispositivo.");
                return;
            }

            const repair = await createRepairWithNewDevice({
                customer_id: customer.id,
                device: {
                    brand: normalizedBrand,
                    model: normalizedModel,
                    identifier: identifier.trim() || null,
                },
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
                ← Volver a dispositivos
            </button>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="font-semibold text-gray-900">
                    {customer.name}
                </p>

                <p className="text-sm text-gray-600">
                    {customer.phone}
                </p>
            </div>

            <h2 className="mt-6 font-semibold text-gray-900">
                Nuevo dispositivo
            </h2>

            <div className="mt-4">
                <label
                    htmlFor="brand"
                    className="text-sm font-medium text-gray-700"
                >
                    Marca
                </label>

                <input
                    id="brand"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                    required
                    maxLength={100}
                    placeholder="Ej. Samsung"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
                />
            </div>

            <div className="mt-4">
                <label
                    htmlFor="model"
                    className="text-sm font-medium text-gray-700"
                >
                    Modelo
                </label>

                <input
                    id="model"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    required
                    maxLength={100}
                    placeholder="Ej. A54"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
                />
            </div>

            <div className="mt-4">
                <label
                    htmlFor="identifier"
                    className="text-sm font-medium text-gray-700"
                >
                    IMEI / Identificador
                </label>

                <input
                    id="identifier"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    maxLength={255}
                    placeholder="Opcional"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
                />
            </div>

            <h2 className="mt-7 font-semibold text-gray-900">
                Reparación
            </h2>

            <div className="mt-4">
                <label
                    htmlFor="problem"
                    className="text-sm font-medium text-gray-700"
                >
                    Problema
                </label>

                <input
                    id="problem"
                    value={problem}
                    onChange={(event) => setProblem(event.target.value)}
                    required
                    maxLength={100}
                    placeholder="Ej. No carga"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
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
                    placeholder="Opcional"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
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
                    : "Registrar dispositivo y reparación"}
            </button>
        </form>
    );
}