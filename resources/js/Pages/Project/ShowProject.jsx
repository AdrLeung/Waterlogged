import AppLayout from "@/Layouts/AppLayout";

export default function ShowProject({ name, description, observations }) {
    console.log(name);
    console.log(description);
    console.log(observations);

    return (
        <AppLayout>
            <p>name: {name}</p>
            <p>description: {description}</p>
            <ul>
                {observations.map((obs) => (
                    <li key={obs.observationID}>{obs.notes}</li>
                ))}
            </ul>
        </AppLayout>
    );
}
