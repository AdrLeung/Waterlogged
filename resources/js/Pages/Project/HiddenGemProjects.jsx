import AppLayout from "@/Layouts/AppLayout";

export default function HiddenGemProjects({ projects }) {
    console.log(projects);

    return (
        <AppLayout>
            <h1>These are some projects that needs some extra support!</h1>
            {projects.map((project) => (
                <div>
                    <p>{project.name}</p>
                    <p>{project.description}</p>
                    <p>{project.obs_amount}</p>
                    <br />
                </div>
            ))}
        </AppLayout>
    );
}
