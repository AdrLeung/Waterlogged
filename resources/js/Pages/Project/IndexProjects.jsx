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
            <div className="flex items-start justify-center min-h-screen p-5">
                <div className="justify-center max-w-full">
                    <div className="space-x-3">
                        <input
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="rounded-xl"
                        />
                        <input
                            placeholder="Min species"
                            type="number"
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            className="rounded-xl"
                        />
                        <input
                            placeholder="Min observations"
                            type="number"
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                            className="rounded-xl"
                        />
                        <input
                            placeholder="Min contributors"
                            type="number"
                            value={contributors}
                            onChange={(e) => setContributors(e.target.value)}
                            className="rounded-xl"
                        />
                        </div>

                        <div className="flex justify-center gap-3 p-3">
                        <Button onClick={handleSubmit}>Submit</Button>

                    {isProfessional && <CreateProjectDialog />}
                    {auth.user && (
                        <Button
                            className=""
                            onClick={() =>
                                router.get(route("observation.create"))
                            }
                        >
                            Create Observation
                        </Button>
                    )}
                        </div>
                <div className="flex-col gap-4 p-8 space-y-2 overflow-y-auto bg-white border rounded-lg">
                    <h1 className="pb-3 text-3xl font-extrabold text-center">Projects</h1>
                {Object.values(projects).map((project) => {
                    return (
                        <Card key={project.id} className="">
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
                                            <AlertDialogAction
                                                onClick={() =>
                                                    router.get(route("project.show", {"id" : project.projectID}))
                                                }
                                            >
                                                Go to Project
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardContent>
                        </Card>
                    );
                })}
                </div>
                </div>
                </div>
        </AppLayout>
    );
}
