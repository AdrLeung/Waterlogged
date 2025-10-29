import { Input } from "@/Components/ui/input";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Milestone({ projects }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <AppLayout>
            {projects.map((project) => (
                <p key={project.projectID}>
                    {project.projectID}, {project.name}, {project.description}
                </p>
            ))}

            <br />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    router.post(route("milestone.update"), {
                        id,
                        name,
                        description,
                    });
                }}
            >
                <label>ID</label>
                <Input
                    onChange={(e) => setId(e.target.value)}
                    className="w-32 border-black"
                />
                <label>Name</label>
                <Input
                    onChange={(e) => setName(e.target.value)}
                    className="w-32 border-black"
                />
                <label>Description</label>
                <Input
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-32 border-black"
                />
                <Button type="submit">Update</Button>
                <Button
                    type="button"
                    onClick={() => {
                        router.delete(route("milestone.delete"), {
                            data: { id },
                        });
                    }}
                >
                    Delete
                </Button>
            </form>
        </AppLayout>
    );
}
