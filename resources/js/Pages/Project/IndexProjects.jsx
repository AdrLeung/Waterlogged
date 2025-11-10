import { CreateProjectDialog } from "@/Components/CreateProjectDialog";
import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";

export default function IndexProjects({ isProfessional, projects }) {
    const { auth } = usePage().props;
    console.log(auth);

    return (
        <AppLayout>
            {isProfessional && <CreateProjectDialog />}
            {auth.user && (
                <Button onClick={() => router.get(route("observation.create"))}>
                    Create Observation
                </Button>
            )}
            {projects.map((project) => (
                <div className="mb-8">
                    <p>{project.name}</p>
                    <p>{project.description}</p>
                    <p>{project.observationCount} observations</p>
                    <Button
                        onClick={() => {
                            console.log(project.projectID);
                            router.get(
                                route("project.show", { id: project.projectID })
                            );
                        }}
                    >
                        view
                    </Button>
                </div>
            ))}
        </AppLayout>
    );
}
