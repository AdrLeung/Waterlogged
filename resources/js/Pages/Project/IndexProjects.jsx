import { useState } from "react";
import { CreateProjectDialog } from "@/Components/CreateProjectDialog";
import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function IndexProjects({ isProfessional, projects }) {
    const { auth } = usePage().props;

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [observations, setObservations] = useState("");
    const [contributors, setContributors] = useState("");

    const handleSubmit = () => {
        console.log({
            name,
            species,
            observations,
            contributors,
        });
        router.get(
            route("project.index", {
                filters: { name, species, observations, contributors },
            })
        );
    };

    return (
        <AppLayout>
            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <input
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            placeholder="Min species"
                            type="number"
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                        />
                        <input
                            placeholder="Min observations"
                            type="number"
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                        />
                        <input
                            placeholder="Min contributors"
                            type="number"
                            value={contributors}
                            onChange={(e) => setContributors(e.target.value)}
                        />

                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>

                <div className="px-1 space-x-3">
                    {isProfessional && <CreateProjectDialog />}
                    {auth.user && (
                        <Button
                            className="mt-4 mb-4"
                            onClick={() =>
                                router.get(route("observation.create"))
                            }
                        >
                            Create Observation
                        </Button>
                    )}
                </div>

                {Object.values(projects).map((project) => {
                    return (
                        <Card key={project.id} className="w-1/3 mb-4 ml-4">
                            <CardTitle className="pt-4 pl-4">
                                <p>{project.projectName}</p>
                            </CardTitle>
                            <CardHeader>
                                <p>{project.description}</p>
                            </CardHeader>
                            <CardDescription className="pl-4">
                                <p>{project.observationCount} observations</p>
                            </CardDescription>
                            <CardContent>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline">View</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                <p>{project.name}</p>
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                <p>{project.description}</p>
                                                {project.observations.map(
                                                    (observation, index) => (
                                                        <p key={index}>
                                                            {index + 1}.{" "}
                                                            {observation.notes}
                                                        </p>
                                                    )
                                                )}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Exit
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            "observation.create"
                                                        )
                                                    )
                                                }
                                            >
                                                Contribute
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </AppLayout>
    );
}
