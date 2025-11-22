import AppLayout from "@/Layouts/AppLayout";

export default function HiddenGemProjects({ projects }) {
    return (
        <AppLayout>
            {projects.map((project) => (
                <div>
                    <p>{project.name}</p>
                    <p>{project.description}</p>
                    {/* <p>{project.}</p> */}
                </div>
            ))}
        </AppLayout>
    );
}
