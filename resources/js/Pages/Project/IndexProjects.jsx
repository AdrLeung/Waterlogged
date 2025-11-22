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
} from "@/components/ui/card"
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
} from "@/components/ui/alert-dialog"

export default function IndexProjects({ isProfessional, projects }) {
    console.log(projects);
    const { auth } = usePage().props;
    console.log(auth);

    return (
        <AppLayout>
            <div className="ml-4">
                {isProfessional && <CreateProjectDialog/>}
            {auth.user && (
                <Button className="mt-4 mb-4 ml-4" onClick={() => router.get(route("observation.create"))}>
                    Create Observation
                </Button>
            )}
            </div>
            {projects.map((project) => (
                <Card className="w-1/3 mb-4 ml-4">
                    <CardTitle className="pt-4 pl-4">
                        <p>{project.name}</p>
                    </CardTitle>
                    <CardHeader>
                        <p>{project.description}</p>
                    </CardHeader>
                    <CardDescription className="pl-4">
                        <p>{project.observationCount} observations</p>
                    </CardDescription>
                    <CardContent>
                        <div className>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline">View</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle><p>{project.name}</p></AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <p>{project.description}</p>
                                            <p>{project.observationCount}</p>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Exit</AlertDialogCancel>
                                        <AlertDialogAction>Contribute</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardContent>
                </Card>

            ))}
        </AppLayout>
    );
}
