import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

export default function IndexObservations({ results, species }) {
    const [projectionFields, setProjectionFields] = useState([]);

    const handleProjectionChange = (e) => {
        const value = e.target.value;
        setProjectionFields((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const handleProjectionSubmit = (e) => {
        e.preventDefault();
        router.get(route("observation.search"), {
            projection: projectionFields,
        });
    };

    const selectionValues = [
        {
            value: "scientificName",
            label: "Scientific Name",
        },
        {
            value: "quantity",
            label: "Quantity",
        },
        { value: "date", label: "Date" },
        {
            value: "dateConfirmed",
            label: "Date Confirmed",
        },
        { value: "email", label: "Creator" },
        {
            value: "verifiedBy",
            label: "Verified By",
        },
        {
            value: "preciseLocation",
            label: "Precise Location",
        },
        {
            value: "location",
            label: "Location",
        },
        { value: "notes", label: "Notes" },
    ];

    return (
        <AppLayout>
            <div className="flex items-start justify-center min-h-screen p-6">
                <div className="w-full max-w-2xl space-y-10">
                    <div className="gap-4 p-8 space-y-2 bg-white border rounded-lg">
                        <form onSubmit={handleProjectionSubmit}>
                            <div className="p-3 space-y-3 border rounded-lg">
                                <h2 className="text-lg font-bold">
                                    Projection Fields:
                                </h2>

                                <div className="flex flex-wrap gap-4">
                                    {selectionValues.map((field) => (
                                        <label key={field.value}>
                                            <input
                                                type="checkbox"
                                                className="rounded-xl"
                                                value={field.value}
                                                checked={projectionFields.includes(
                                                    field.value
                                                )}
                                                onChange={
                                                    handleProjectionChange
                                                }
                                            />
                                            {field.label}
                                        </label>
                                    ))}
                                </div>

                                <Button type="submit">
                                    Filter for these values
                                </Button>
                            </div>
                        </form>

                        {results.map((observation) => {
                            return (
                                <div
                                    key={observation.observationID}
                                    className="flex flex-col p-3 space-y-1 border rounded-lg"
                                >
                                    {observation.scientificName && (
                                        <p>
                                            <span className="font-bold">
                                                Scientific Name:{" "}
                                                {observation.scientificName}
                                            </span>
                                        </p>
                                    )}
                                    {observation.quantity && (
                                        <p>
                                            <span className="font-bold">
                                                Quantity: {observation.quantity}
                                            </span>
                                        </p>
                                    )}
                                    {observation.date && (
                                        <p>
                                            <span className="font-bold">
                                                Date: {observation.date}
                                            </span>
                                        </p>
                                    )}
                                    {observation.dateConfirmed && (
                                        <p>
                                            <span className="font-bold">
                                                Date Confirmed:
                                                {observation.dateConfirmed}
                                            </span>
                                        </p>
                                    )}
                                    {observation.email && (
                                        <p>
                                            <span className="font-bold">
                                                Email:{observation.email}
                                            </span>
                                        </p>
                                    )}
                                    {observation.professionalEmail && (
                                        <p>
                                            <span className="font-bold">
                                                Verified By:
                                                {observation.professionalEmail}
                                            </span>
                                        </p>
                                    )}
                                    {observation.latitude &&
                                        observation.longitude && (
                                            <p>
                                                <span className="font-bold">
                                                    Precise Location: (
                                                    {observation.longitude},{" "}
                                                    {observation.latitude})
                                                </span>
                                            </p>
                                        )}
                                    {observation.meanLatitude &&
                                        observation.meanLongitude && (
                                            <p>
                                                <span className="font-bold">
                                                    Location: {observation.name}{" "}
                                                    ({observation.meanLongitude}
                                                    , {observation.meanLatitude}
                                                    )
                                                </span>
                                            </p>
                                        )}
                                    {observation.notes && (
                                        <p>
                                            <span className="font-bold">
                                                Notes:{observation.notes}
                                            </span>
                                        </p>
                                    )}

                                    <Button
                                        onClick={() =>
                                            router.get(
                                                route("observation.show", {
                                                    id: observation.observationID,
                                                })
                                            )
                                        }
                                    >
                                        View Observation
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
