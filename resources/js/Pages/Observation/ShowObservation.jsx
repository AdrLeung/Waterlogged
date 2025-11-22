import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@headlessui/react";

export default function ShowObservation({ observation, isProfessional }) {
    console.log(observation);

    return (
        <AppLayout>
            <p>this</p>
            {isProfessionalEmail && <Button></Button>}
        </AppLayout>
    );
}
