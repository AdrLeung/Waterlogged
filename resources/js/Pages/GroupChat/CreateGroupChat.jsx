import { Input } from "@/Components/ui/input";
import AppLayout from "@/Layouts/AppLayout";

import { router } from "@inertiajs/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/Components/ui/button";

export default function CreateGroupChat() {
    const [groupName, setGroupName] = useState("");
    console.log(groupName);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("groupChat.store"), { groupChatName: groupName });
    };
    return (
        <AppLayout>
            <div className="flex items-center justify-center h-screen bg-slate-600">
                <Card className="w-full max-w-md shadow-white">
                    <CardHeader>
                        <CardTitle className="text-2xl center font-">
                            Create a New Group
                        </CardTitle>
                        <p>
                            {" "}
                            Create a new group chat to discuss, share ideas and
                            totally chill with your homies{" "}
                        </p>

                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                placeholder="Group Name"
                                onChange={(e) => setGroupName(e.target.value)}
                            />

                            <div className="flex justify-center">
                                <Button type="submit" variant="default">
                                    submit
                                </Button>
                            </div>
                        </form>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
