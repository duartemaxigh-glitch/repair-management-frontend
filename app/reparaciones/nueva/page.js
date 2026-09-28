import Link from "next/link";
import NewRepairFlow from "@/components/repair/new/NewRepairFlow";

export default function NewRepairPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="mx-auto max-w-md">
                <Link
                    href="/"
                    className="mb-6 inline-block text-sm text-gray-600"
                >
                    ← Volver
                </Link>

                <h1 className="text-2xl font-bold text-gray-900">
                    Nueva reparación
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Primero buscá al cliente.
                </p>

                <div className="mt-6">
                    <NewRepairFlow />
                </div>
                
            </div>
        </main>
    );
}