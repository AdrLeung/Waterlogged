import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";

export default function ShowObservation({ observation, isProfessional }) {
    console.log(observation);

    const handleVerification = () => {
        router.post(
            route("observation.verify", { id: observation.observationID })
        );
    };

    return (
        <AppLayout>
            <p>this</p>
            <p>{observation.professionalEmail}</p>
            {isProfessional && !observation.professionalEmail && (
                <Button onClick={handleVerification}>verify</Button>
            )}
        </AppLayout>
    );
}
