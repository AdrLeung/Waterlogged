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
            <CreateGroupChatDialog />
            <h1>groups in</h1>
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

            <h1>groups not it </h1>

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
        </AppLayout>
    );
}
