import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";

export default function RepairCard({ repair }) {
    return (
        <Link href={`/reparaciones/${repair.id}`} className="block">
            <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {repair.device.brand} {repair.device.model}
                        </h2>

                        <p className="text-sm text-gray-600">
                            {repair.device.customer.name}
                        </p>
                    </div>

                    <StatusBadge status={repair.status} />
                </div>

                <p className="mt-4 text-sm text-gray-800">
                    {repair.problem}
                </p>
            </article>
        </Link>
    );
}