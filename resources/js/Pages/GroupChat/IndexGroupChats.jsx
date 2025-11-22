import { CreateGroupChatDialog } from "@/Components/CreateGroupChatDialog";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Contexts/ToastContext";
import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function IndexGroupChats({
    groupsUserIsIn,
    groupsUserIsNotIn,
    isProfessional,
}) {
    const [groupsIn, setGroupsIn] = useState(groupsUserIsIn);
    const [groupsNotIn, setGroupsNotIn] = useState(groupsUserIsNotIn);

    const { addToast } = useToast();
    const handleJoin = (groupID) => {
        router.post(route("groupChat.join", parseInt(groupID)));
    };

    const handleLeave = (groupID) => {
        const group = groupsIn.find((g) => g.ID === groupID);
        if (!group) return;

        setGroupsIn((prev) => prev.filter((g) => g.ID !== groupID));
        setGroupsNotIn((prev) => [...prev, group]);

        router.post(route("groupChat.leave", parseInt(groupID)));
    };

    const handleView = (groupID) => {
        router.get(route("groupChat.show", groupID));
    };

    const handleDelete = (groupId) => {
        setGroupsIn((prev) => prev.filter((g) => g.ID !== groupId));

        router.delete(route("groupChat.delete", { id: groupId }), {
            onSuccess: () => {
                addToast("Group Chat Deleted", "success");
            },
        });
    };
    return (
        <AppLayout>
            <div className="flex items-start justify-center min-h-screen p-6 bg-slate-600">
                <div className="w-full max-w-2xl space-y-10">

            <CreateGroupChatDialog />

            <div className="gap-4 p-8 bg-white border rounded-lg ">
            <h1 className="text-2xl font-semibold">Your Groups</h1>
            {groupsIn.map((group, index) => (
                <div key={index}>
                    <p>{group.name}</p>
                    <Button
                        onClick={() => handleLeave(group.ID)}
                        className="bg-red-800"
                    >
                        leave group
                    </Button>
                    <Button onClick={() => handleView(group.ID)}>
                        View Group
                    </Button>
                    {isProfessional && (
                        <Button onClick={() => handleDelete(group.ID)}>
                            Delete
                        </Button>
                    )}
                </div>
            ))}
            </div>

            <div className="gap-4 p-8 bg-white border rounded-lg">
            <h1 className="text-2xl font-semibold"> Not your Groups </h1>

            {groupsNotIn.map((group, index) => (
                <div key={index}>
                    <p>{group.name}</p>
                    <Button
                        className="overflow-visible bg-green-800"
                        onClick={() => handleJoin(group.ID)}
                    >
                        join group
                    </Button>
                </div>
            ))}
            </div>
            </div>
            </div>
        </AppLayout>
    );
}
