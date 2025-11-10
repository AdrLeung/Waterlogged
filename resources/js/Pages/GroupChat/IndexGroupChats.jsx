import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function IndexGroupChats({ groupsUserIsIn, groupsUserIsNotIn }) {
    const [groupsIn, setGroupsIn] = useState(groupsUserIsIn);
    const [groupsNotIn, setGroupsNotIn] = useState(groupsUserIsNotIn);
    const handleJoin = (groupID) => {
        const group = groupsNotIn.find((g) => g.ID === groupID);
        if (!group) return;

        setGroupsNotIn((prev) => prev.filter((g) => g.ID !== groupID));
        setGroupsIn((prev) => [...prev, group]);

        router.post(route("groupChat.join", parseInt(groupID)));
    };

    const handleLeave = (groupID) => {
        const group = groupsIn.find((g) => g.ID === groupID);
        if (!group) return;

        setGroupsIn((prev) => prev.filter((g) => g.ID !== groupID));
        setGroupsNotIn((prev) => [...prev, group]);

        router.post(route("groupChat.leave", parseInt(groupID)));
    };
    return (
        <AppLayout>
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
