import { Input } from "@/Components/ui/input";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Milestone({ phylums }) {
    console.log(phylums);
    const [phylumText, setPhylumText] = useState("");
    const [kingdomText, setKingdomText] = useState("");
    return (
        <AppLayout>
            {phylums.map((phylum) => (
                <p>
                    {phylum.phylum}, {phylum.kingdom}
                </p>
            ))}
            <br />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    router.post(route("milestone.store"), {
                        phylum: phylumText,
                        kingdom: kingdomText,
                    });
                }}
            >
                <label>phylum to change</label>
                <Input
                    onChange={(e) => setPhylumText(e.target.value)}
                    className="w-16 border-black"
                ></Input>
                <label>new kingdom text</label>
                <Input
                    onChange={(e) => setKingdomText(e.target.value)}
                    className="w-16 border-black"
                ></Input>
                <Button type="submit">submit</Button>
            </form>
        </AppLayout>
    );
}
