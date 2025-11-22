import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";

export default function ShowObservation({ observation, isProfessional }) {
    console.log(observation);

    const { auth } = usePage().props;
    console.log(auth.user);
    const email = auth.user.email;

    const handleVerification = () => {
        router.post(
            route("observation.verify", { id: observation.observationID })
        );
    };

    return (
        <AppLayout>
            <p>observationID: {observation.observationID}</p>
            <p>scientificName: {observation.scientificName}</p>
            <p>quantity: {observation.quantity}</p>
            <p>username: {observation.username}</p>
            <p>email: {observation.email}</p>
            <p>professionalEmail: {observation.professionalEmail}</p>
            <p>date: {observation.date}</p>
            <p>dateConfirmed: {observation.dateConfirmed}</p>
            <p>latitude: {observation.latitude}</p>
            <p>longitude: {observation.longitude}</p>
            <p>meanLatitude: {observation.meanLatitude}</p>
            <p>meanLongitude: {observation.meanLongitude}</p>
            <p>notes: {observation.notes}</p>

            <p>media:</p>

            {observation.media.map((m) => (
                <div key={m.mediaID}>
                    <p>mediaID: {m.mediaID}</p>

                    {m.mediaType === "image" ? (
                        <img src={m.URL} alt="" width="200" />
                    ) : m.mediaType === "video" ? (
                        <video src={m.URL} width="200" controls />
                    ) : (
                        <>
                            <p>data type not renderable</p>
                            <p>URL: {m.URL}</p>
                        </>
                    )}

                    {}
                </div>
            ))}

            {isProfessional && !observation.professionalEmail && (
                <Button onClick={handleVerification}>verify</Button>
            )}
            {email == observation.email && (
                <Button
                    onClick={() =>
                        router.post(
                            route(
                                "observation.update",
                                observation.observationID
                            )
                        )
                    }
                >
                    Update
                </Button>
            )}
        </AppLayout>
    );
}
