import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function IndexObservations({ results, species }) {
    const [projectionFields, setProjectionFields] = useState([]);
    const [selectionSpecies, setSelectionSpecies] = useState("");
    const [selectionUpperBound, setSelectionUpperBound] = useState("");
    const [selectionLowerBound, setSelectionLowerBound] = useState("");
    const [selectionProfessional, setSelectionProfessional] = useState("");
    const [speciesSearch, setSpeciesSearch] = useState("");
    const [speciesSearchOpen, setSpeciesSearchOpen] = useState(false);

    const handleProjectionChange = (e) => {
        const value = e.target.value;
        setProjectionFields((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const handleSelectionSubmit = (e) => {
        e.preventDefault();
        console.log({
            species: selectionSpecies,
            min: selectionUpperBound,
            professionalOnly: selectionProfessional,
        });
    };

    const handleProjectionSubmit = (e) => {
        e.preventDefault();
        console.log({ projection: projectionFields });
    };

    const filteredSpecies = species.filter((s) =>
        s.commonName.toLowerCase().includes(speciesSearch.toLowerCase())
    );

    return (
        <AppLayout>
        <div className="flex items-start justify-center min-h-screen p-6">
            <div className="w-full max-w-2xl space-y-10">
                <div className="gap-4 p-8 space-y-4 bg-white border rounded-lg">
                <form onSubmit={handleSelectionSubmit}>
                    <h2 className="pb-3 text-2xl font-bold">Selection Filters:</h2>

                    <div>
                        <label>Species involved:</label>
                        <div>
                            <button
                                type="button"
                                onClick={() =>
                                    setSpeciesSearchOpen(!speciesSearchOpen)
                                }
                                className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <span>
                                    {selectionSpecies ||
                                        "Select species..."}
                                </span>
                                <svg
                                    className={"w-4 h-4"}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </button>

                            {speciesSearchOpen && (
                                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border-2 rounded max-h-64">
                                    <Input
                                        placeholder="Search species..."
                                        value={speciesSearch}
                                        onChange={(e) =>
                                            setSpeciesSearch(e.target.value)
                                        }
                                        autoFocus
                                        className="mb-1"
                                    />
                                    <div>
                                        {filteredSpecies.length > 0 ? (
                                            filteredSpecies.map(
                                                (speciesInfo, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectionSpecies(
                                                                speciesInfo.commonName
                                                            );
                                                            setSpeciesSearchOpen(
                                                                false
                                                            );
                                                            setSpeciesSearch(
                                                                ""
                                                            );
                                                        }}
                                                        className="flex items-center justify-between w-full px-2 py-1 hover:bg-accent"
                                                    >
                                                        <span>
                                                            {
                                                                speciesInfo.commonName
                                                            }
                                                        </span>
                                                        {selectionSpecies ===
                                                            speciesInfo.commonName && (
                                                            <Check className="w-4 h-4 text-green-600" />
                                                        )}
                                                    </button>
                                                )
                                            )
                                        ) : (
                                            <p>No species found</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label>Upper bound for quantity</label>
                        <Input
                            type="number"
                            placeholder="Enter quantity..."
                            value={selectionUpperBound}
                            onChange={(e) =>
                                setSelectionUpperBound(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label>Lower Bound for Quantity</label>
                        <Input
                            type="number"
                            placeholder="Enter quantity..."
                            value={selectionLowerBound}
                            onChange={(e) =>
                                setSelectionLowerBound(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label>Made by professional:</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="professional"
                                    value="yes"
                                    checked={
                                        selectionProfessional === "yes"
                                    }
                                    onChange={(e) =>
                                        setSelectionProfessional(
                                            e.target.value
                                        )
                                    }
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="professional"
                                    value="no"
                                    checked={selectionProfessional === "no"}
                                    onChange={(e) =>
                                        setSelectionProfessional(
                                            e.target.value
                                        )
                                    }
                                />
                                No
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="professional"
                                    value=""
                                    checked={selectionProfessional === ""}
                                    onChange={(e) =>
                                        setSelectionProfessional(
                                            e.target.value
                                        )
                                    }
                                />
                                Any
                            </label>
                        </div>
                        <Button>Search</Button>
                    </div>
                </form>
            </div>
            <div className="gap-4 p-8 space-y-2 bg-white border rounded-lg">
            <form onSubmit={handleProjectionSubmit}>
                <h2 className="text-xl font-bold">Projection Fields</h2>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="scientificName"
                            checked={projectionFields.includes(
                                "scientificName"
                            )}
                            onChange={handleProjectionChange}
                        />
                        Scientific Name
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="quantity"
                            checked={projectionFields.includes("quantity")}
                            onChange={handleProjectionChange}
                        />
                        Quantity
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="date"
                            checked={projectionFields.includes("date")}
                            onChange={handleProjectionChange}
                        />
                        Date
                    </label>
                </div>

                <button type="submit">Filter for these values</button>
            </form>

            {results.map((obvservation) => (
                <div key={obvservation.obvservationID}>
                    <p>{obvservation.scientificName}</p>
                    <p>{obvservation.quantity}</p>
                    <Button>Delete</Button>
                </div>
            ))}
            </div>
            </div>
        </div>
    </AppLayout>
    );
}
