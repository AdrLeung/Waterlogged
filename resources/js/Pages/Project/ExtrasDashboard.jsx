import AppLayout from "@/Layouts/AppLayout";

export default function ExtrasDashboard({ projects, superUsers, greatUsers }) {
    return (
        <AppLayout>
            <div className="flex flex-col items-center min-h-screen p-6 space-y-10">
                <div className="w-full max-w-2xl p-8 space-y-4 bg-white border rounded-lg">
                    <h1 className="text-2xl font-bold">
                        Projects That Need Extra Support
                    </h1>
                    {projects.map((project) => (
                        <div
                            key={project.projectID}
                            className="p-6 space-y-2 border rounded-lg"
                        >
                            <p className="font-semibold">
                                Name: {project.name}
                            </p>
                            <p>Description: {project.description}</p>
                            <p>Observations: {project.obs_amount}</p>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-2xl p-8 space-y-4 bg-white border rounded-lg">
                    <h1 className="text-2xl font-bold">
                        Contributed to all projects
                    </h1>
                    {superUsers.map((user) => (
                        <div
                            key={user.email}
                            className="p-4 space-y-1 border rounded-lg"
                        >
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-2xl p-8 space-y-4 bg-white border rounded-lg">
                    <h1 className="text-2xl font-bold">
                        Observed 5 or more species
                    </h1>
                    {greatUsers.map((user) => (
                        <div
                            key={user.email}
                            className="p-4 space-y-1 border rounded-lg"
                        >
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                            <p>Species Observed: {user.speciesCount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
