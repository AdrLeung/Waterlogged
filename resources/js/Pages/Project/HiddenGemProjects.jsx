import AppLayout from "@/Layouts/AppLayout";

export default function HiddenGemProjects({ projects, superUsers }) {
    console.log(superUsers);

    return (
        <AppLayout>
            <div className="flex items-start justify-center min-h-screen p-6">
                <div className="w-full max-w-2xl space-y-10">
                    <div className="gap-4 p-8 space-y-4 bg-white border rounded-lg">
                        <h1 className="p-2 text-2xl font-bold">
                            These are some projects that needs extra support!
                        </h1>
                        {projects.map((project) => (
                            <div className="flex justify-between p-6 space-x-3 space-y-2 border rounded-lg ">
                                <p className="font-semibold">{project.name}</p>
                                <p>{project.description}</p>
                                <p>Observations: {project.obs_amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
