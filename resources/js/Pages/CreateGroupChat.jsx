import { Input } from "@/Components/ui/input";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function CreateGroupChat() {
    const [groupName, setGroupName] = useState("");
    console.log(groupName);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("groupChat.store"), { groupChatName: groupName });
    };
    return (
        <AppLayout>
            <p>this page will be where users create a new group chat </p>
            <p>
                we could also do something like have a button on the homepage
                that then opens a popup that asks for the name of the group chat
            </p>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Group Name"
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <Button type="submit" variant="outline">
                    submit
                </Button>
            </form>
        </AppLayout>
    );
}
