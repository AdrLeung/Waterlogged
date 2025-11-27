import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default function ShowProject({ name, description, observations }) {
    console.log(name);
    console.log(description);
    console.log(observations);

    return (
        <AppLayout>
            <div className="flex items-start justify-center min-h-screen p-6">
                <div className="justify-between w-full max-w-md p-8 space-y-3 text-center bg-white rounded-2xl">
            <p className="text-2xl font-extrabold">Project Name: {name}</p>
            <p>Description: {description}</p>
            <ul>
                {observations.map((obs) => (
                    <li key={obs.observationID}>{obs.notes}</li>
                ))}
            </ul>

            <div className="grid grid-cols-1 gap-4">
                        <Button
                            onClick={() => router.get(route("groupChat.index"))}
                        >
                            See Groupchats
                        </Button>

                        <Button
                            onClick={() => router.get(route("project.index"))}
                        >
                            Back to Projects
                        </Button>
                    </div>
            </div>
            </div>
        </AppLayout>
    );
}
