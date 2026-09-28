"use client";

import { useState } from "react";

import CustomerSearch from "./CustomerSearch";
import CustomerDevices from "./CustomerDevices";
import ExistingDeviceRepairForm from "./ExistingDeviceRepairForm";
import NewDeviceRepairForm from "./NewDeviceRepairForm";
import NewCustomerRepairForm from "./NewCustomerRepairForm";

export default function NewRepairFlow() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const [isCreatingDevice, setIsCreatingDevice] = useState(false);
    const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);

    if (isCreatingCustomer) {
        return (
            <NewCustomerRepairForm
                onBack={() => setIsCreatingCustomer(false)}
            />
        );
    }

    if (selectedDevice) {
        return (
            <ExistingDeviceRepairForm
                customer={selectedCustomer}
                device={selectedDevice}
                onBack={() => setSelectedDevice(null)}
            />
        );
    }

    if (selectedCustomer && isCreatingDevice) {
        return (
            <NewDeviceRepairForm
                customer={selectedCustomer}
                onBack={() => setIsCreatingDevice(false)}
            />
        );
    }

    if (selectedCustomer) {
        return (
            <CustomerDevices
                customer={selectedCustomer}
                onBack={() => setSelectedCustomer(null)}
                onSelectDevice={setSelectedDevice}
                onCreateDevice={() => setIsCreatingDevice(true)}
            />
        );
    }

    return (
        <CustomerSearch
            onSelectCustomer={setSelectedCustomer}
            onCreateCustomer={() => setIsCreatingCustomer(true)}
        />
    );
}