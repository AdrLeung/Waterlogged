import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function CreateProject() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    console.log(name);

    return (
        <AppLayout>
            <Input
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <Input
                onChange={(e) => {
                    setDesc(e.target.value);
                }}
            />
            <Button
                onClick={() =>
                    router.post(
                        route("project.store", { name: name, desc: desc })
                    )
                }
            >
                submit
            </Button>
        </AppLayout>
    );
}
