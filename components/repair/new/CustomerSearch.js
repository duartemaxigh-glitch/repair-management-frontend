"use client";
import { useState, useEffect } from "react";
import { searchCustomers } from "@/lib/api/customers";

export default function CustomerSearch({ onSelectCustomer, onCreateCustomer }) {
    const [search, setSearch] = useState("");
    const [customers, setCustomers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);


    useEffect(() => {
        const term = search.trim();

        if (!term) {
            setCustomers([]);
            setIsSearching(false);
            setHasSearched(false);
            return;
        }

        setIsSearching(true);
        setHasSearched(false);

        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
            async function searchCustomersAsync() {
                try {
                    const data = await searchCustomers(
                        term,
                        controller.signal
                    );

                    setCustomers(data);
                    setHasSearched(true);
                } catch (error) {
                    if (error.name !== "AbortError") {
                        console.error(error);
                    }
                } finally {
                    if (!controller.signal.aborted) {
                        setIsSearching(false);
                    }
                }
            }

            searchCustomersAsync();
        }, 350);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [search]);

    return (
        <div>
            <label
                htmlFor="customer-search"
                className="text-sm font-medium text-gray-700"
            >
                Buscar cliente
            </label>

            <input
                id="customer-search"
                type="text"
                placeholder="Nombre, teléfono o equipo..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none"
            />

            {isSearching && (
                <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 text-center">
                    <p className="text-sm text-gray-500">
                        Buscando clientes...
                    </p>
                </div>
            )}

            {!isSearching && customers.length > 0 && (
                <div className="mt-4 space-y-3">
                    {customers.map((customer) => (
                        <CustomerResult
                            key={customer.id}
                            customer={customer}
                            onSelect={onSelectCustomer}
                        />
                    ))}
                </div>
            )}

            {!isSearching &&
                hasSearched &&
                customers.length === 0 && (
                    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 text-center">
                        <p className="font-medium text-gray-900">
                            No encontramos clientes
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Podés registrar uno nuevo.
                        </p>

                        <button
                            type="button"
                            onClick={onCreateCustomer}
                            className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white"
                        >
                            + Nuevo cliente
                        </button>
                    </div>
                )}

        </div>
    );

}

function CustomerResult({customer, onSelect}) {
    return (
        <button
            type="button"
            onClick={() => onSelect(customer)}
            className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm"
        >
            <p className="font-semibold text-gray-900">
                {customer.name}
            </p>

            <p className="mt-1 text-sm text-gray-600">
                {customer.phone}
            </p>

            <p className="mt-3 text-xs text-gray-500">
                {customer.devices.length === 1
                    ? "1 dispositivo registrado"
                    : `${customer.devices.length} dispositivos registrados`}
            </p>
        </button>
    );
}