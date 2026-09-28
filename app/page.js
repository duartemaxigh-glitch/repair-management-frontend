import Link from "next/link";
import RepairList from "@/components/RepairList";

async function getRepairOrders() {
  const response = await fetch(
    "http://127.0.0.1:8000/repair-orders",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener las reparaciones");
  }

  return response.json();
}

export default async function Home() {
  const repairOrders = await getRepairOrders();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Reparaciones
          </h1>

          <Link
            href="/reparaciones/nueva"
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            + Nueva
          </Link>
        </div>

        <RepairList initialRepairs={repairOrders} />
      </div>
    </main>
  );
}