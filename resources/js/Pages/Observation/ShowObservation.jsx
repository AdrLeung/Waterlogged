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
            <h1 className="pt-3 text-3xl font-extrabold text-center">Observation View</h1>
            <div className="flex items-start justify-center min-h-screen p-6 space-x-3">
                <div className="w-full max-w-lg space-y-3">
                    <div className="p-6 bg-white border rounded-xl">
            <p className="pb-3 text-lg font-bold">Scientific Name: {observation.scientificName}</p>
            <p>Submitted By: {observation.username} </p>
            <p>Email: {observation.email}</p>
            <p className="pb-2">Date: {observation.date}</p>
            <p>Confirmed By: {observation.professionalEmail}</p>
            <p className="pb-2">Date Confirmed: {observation.dateConfirmed}</p>
            <p>Latitude: {observation.latitude}</p>
            <p>Longitude: {observation.longitude}</p>
            <p>Mean Latitude: {observation.meanLatitude}</p>
            <p className="pb-2">Mean Longitude: {observation.meanLongitude}</p>
            <p>Quantity: {observation.quantity}</p>
            <p>Notes: {observation.notes}</p>
            <p className="pt-3 text-xs text-gray-400">Observation ID: {observation.observationID}</p>
            </div>
            </div>

            <div>
                <div className="p-6 bg-white border rounded-xl">
            <p className="pb-2 text-lg font-semibold">Media:</p>

            {observation.media.map((m) => (
                <div key={m.mediaID}>
                    <p>Media ID: {m.mediaID}</p>

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
            </div>

            <div className="py-2 space-x-2 text-center">
            {isProfessional && !observation.professionalEmail && (
                <Button onClick={handleVerification}>Verify</Button>
            )}
            {email == observation.email && (
                <Button
                    onClick={() =>
                        router.get(
                            route("observation.edit", observation.observationID)
                        )
                    }
                >
                    Update
                </Button>
            )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
