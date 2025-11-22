import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { useToast } from "@/Contexts/ToastContext";

export default function CreateObservation({
    locations,
    species,
    genusList,
    projects,
}) {
    const [form, setForm] = useState({
        longitude: "",
        latitude: "",
        meanLatitude: "",
        meanLongitude: "",
        quantity: "",
        notes: "",
        scientificName: "",
        media: [{ url: "", type: "" }],
        projectIds: [],
    });

    const [speciesState, setSpecies] = useState(species);
    const [showNewSpecies, setShowNewSpecies] = useState(false);
    const [newSpecies, setNewSpecies] = useState({
        scientificName: "",
        commonName: "",
        description: "",
        genus: "",
    });

    const [selectedProjectIds, setSelectedProjectIds] = useState(new Set());
    const [projectSearchOpen, setProjectSearchOpen] = useState(false);
    const [projectSearch, setProjectSearch] = useState("");
    const { addToast } = useToast();

    const filteredProjects = useMemo(
        () =>
            projects.filter((p) =>
                p.name.toLowerCase().includes(projectSearch.toLowerCase())
            ),
        [projects, projectSearch]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleMediaChange = (index, field, value) => {
        const newMedia = [...form.media];
        newMedia[index][field] = value;
        setForm((prev) => ({ ...prev, media: newMedia }));
    };

    const addMediaField = () =>
        setForm((prev) => ({
            ...prev,
            media: [...prev.media, { url: "", type: "" }],
        }));

    const removeMediaField = () => {
        if (form.media.length <= 1) return;
        setForm((prev) => ({ ...prev, media: prev.media.slice(0, -1) }));
    };

    const handleNewSpeciesChange = (e) => {
        const { name, value } = e.target;
        setNewSpecies((prev) => ({ ...prev, [name]: value }));
    };

    const addNewSpecies = () => {
        if (!newSpecies.scientificName || !newSpecies.genus) {
            return;
        }

        setSpecies((prev) => [...prev, newSpecies]);
        setForm((prev) => ({
            ...prev,
            scientificName: newSpecies.scientificName,
        }));

        router.post(
            route("species.store", {
                scientificName: newSpecies.scientificName,
                commonName: newSpecies.commonName,
                description: newSpecies.description,
                genus: newSpecies.genus,
            })
        );

        setNewSpecies({
            scientificName: "",
            commonName: "",
            description: "",
            genus: "",
        });
        setShowNewSpecies(false);
    };

    const handleProjectToggle = (projectId) => {
        const newSelected = new Set(selectedProjectIds);
        if (newSelected.has(projectId)) {
            newSelected.delete(projectId);
        } else {
            newSelected.add(projectId);
        }

        setSelectedProjectIds(newSelected);
        setForm((prev) => ({ ...prev, projectIds: Array.from(newSelected) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route("observation.store", form),
            {},
            {
                onSuccess: addToast(
                    "Observation successfully created!",
                    "success"
                ),
            }
        );
    };

    const selectedProjectNames = projects
        .filter((p) => selectedProjectIds.has(p.projectID))
        .map((p) => p.name)
        .join(", ");

    return (
        <AppLayout>
            <div className="flex items-start justify-center min-h-screen p-6 bg-slate-600">
                <div className="w-full max-w-lg space-y-10">
                    <div className="gap-4 p-8 bg-white border rounded-lg ">
                        <h1 className="mb-4 text-3xl font-bold text-center">
                            Create Observation
                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="max-w-md space-y-4"
                        >
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Select
                                    name="location"
                                    onValueChange={(value) => {
                                        const [meanLongitude, meanLatitude] =
                                            value.split(",");

                                        setForm((prev) => ({
                                            ...prev,
                                            meanLatitude: meanLatitude,
                                            meanLongitude: meanLongitude,
                                        }));
                                    }}
                                >
                                    <SelectTrigger id="location">
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {locations.map((loc, index) => (
                                            <SelectItem
                                                key={`${loc.meanLongitude}-${loc.meanLatitude}-${index}`}
                                                value={`${loc.meanLongitude},${loc.meanLatitude}`}
                                            >
                                                {loc.name} ({loc.meanLatitude},{" "}
                                                {loc.meanLongitude})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="latitude">Mean Latitude</Label>
                                <Input
                                    id="latitude"
                                    type="number"
                                    step="0.000001"
                                    name="latitude"
                                    placeholder="Latitude of observation"
                                    value={form.latitude || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="longitude">
                                    Mean Longitude
                                </Label>
                                <Input
                                    id="longitude"
                                    type="number"
                                    step="0.000001"
                                    name="longitude"
                                    placeholder="Mean Longitude"
                                    value={form.longitude || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={form.quantity || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="Notes"
                                    value={form.notes || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="species">Species</Label>
                                <Select
                                    name="scientificName"
                                    value={form.scientificName || ""}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            scientificName: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger id="species">
                                        <SelectValue placeholder="Select species" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {speciesState.map((s, index) => (
                                            <SelectItem
                                                key={index}
                                                value={s.scientificName}
                                            >
                                                {s.scientificName} (
                                                {s.commonName})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        setShowNewSpecies(!showNewSpecies)
                                    }
                                >
                                    {showNewSpecies
                                        ? "Cancel"
                                        : "+ Add New Species"}
                                </Button>

                                {showNewSpecies && (
                                    <div className="p-3 mt-2 space-y-2 border rounded-xl">
                                        <Input
                                            name="scientificName"
                                            placeholder="Scientific Name"
                                            value={
                                                newSpecies.scientificName || ""
                                            }
                                            onChange={handleNewSpeciesChange}
                                        />
                                        <Input
                                            name="commonName"
                                            placeholder="Common Name"
                                            value={newSpecies.commonName || ""}
                                            onChange={handleNewSpeciesChange}
                                        />
                                        <div>
                                            <Label htmlFor="genus">Genus</Label>
                                            <Select
                                                name="genus"
                                                value={newSpecies.genus || ""}
                                                onValueChange={(value) =>
                                                    setNewSpecies((prev) => ({
                                                        ...prev,
                                                        genus: value,
                                                    }))
                                                }
                                            >
                                                <SelectTrigger id="genus">
                                                    <SelectValue placeholder="Select genus" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {genusList.map((g) => (
                                                        <SelectItem
                                                            key={g.genus}
                                                            value={g.genus}
                                                        >
                                                            {g.genus}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Textarea
                                            name="description"
                                            placeholder="Description"
                                            value={newSpecies.description || ""}
                                            onChange={handleNewSpeciesChange}
                                        />
                                        <Button
                                            type="button"
                                            onClick={addNewSpecies}
                                        >
                                            Save Species
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label>Projects</Label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProjectSearchOpen(
                                                !projectSearchOpen
                                            )
                                        }
                                        className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <span>
                                            {selectedProjectNames ||
                                                "Select projects..."}
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

                                    {projectSearchOpen && (
                                        <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border-2 rounded max-h-64">
                                            <Input
                                                placeholder="Search project"
                                                value={projectSearch}
                                                onChange={(e) =>
                                                    setProjectSearch(
                                                        e.target.value
                                                    )
                                                }
                                                autoFocus
                                                className="mb-1"
                                            />
                                            <div>
                                                {filteredProjects.length > 0 ? (
                                                    filteredProjects.map(
                                                        (p) => (
                                                            <button
                                                                key={
                                                                    p.projectID
                                                                }
                                                                type="button"
                                                                onClick={() =>
                                                                    handleProjectToggle(
                                                                        Number(
                                                                            p.projectID
                                                                        )
                                                                    )
                                                                }
                                                                className="flex items-center justify-between w-full px-2 py-1 hover:bg-accent"
                                                            >
                                                                <span>
                                                                    {p.name}
                                                                </span>
                                                                {selectedProjectIds.has(
                                                                    Number(
                                                                        p.projectID
                                                                    )
                                                                ) && (
                                                                    <Check className="w-4 h-4 text-green-600" />
                                                                )}
                                                            </button>
                                                        )
                                                    )
                                                ) : (
                                                    <p className="p-2">
                                                        No projects found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label>Media</Label>
                                {form.media.map((m, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <Input
                                            type="text"
                                            placeholder="Media URL"
                                            value={m.url}
                                            onChange={(e) =>
                                                handleMediaChange(
                                                    i,
                                                    "url",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <Select
                                            value={m.type}
                                            onValueChange={(value) =>
                                                handleMediaChange(
                                                    i,
                                                    "type",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="image">
                                                    Image
                                                </SelectItem>
                                                <SelectItem value="video">
                                                    Video
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}

                                <div className="flex gap-2 mt-2">
                                    <Button
                                        type="button"
                                        onClick={addMediaField}
                                        variant="outline"
                                    >
                                        + Add media
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={removeMediaField}
                                        variant="outline"
                                    >
                                        - Remove media
                                    </Button>
                                </div>
                            </div>

                            <Button type="submit">Submit Observation</Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
