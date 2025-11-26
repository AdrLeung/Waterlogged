import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage } from "@inertiajs/react";

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1 className="p-6 text-5xl font-bold text-gray-800 bg-white border-solid rounded-full">
                        Hello {auth.user?.name || "Guest"}, Welcome to Water Logged
                    </h1>
                <div className="justify-between w-full max-w-md p-8 text-center bg-white rounded-2xl ">
                <h1 className="pb-4 text-2xl font-bold text-gray-800">
                        Where Will the Tide Take you Next
                    </h1>
                    <div className="grid grid-cols-1 gap-4">
                    <Button
                        onClick={() => router.get(route("groupChat.index"))}
                    >
                        View Group Chats
                    </Button>

                    <Button onClick={() => router.get(route("project.index"))}>
                        View Projects
                    </Button>
                    <Button
                        onClick={() => router.get(route("observation.search"))}
                    >
                        Search Observations
                    </Button>

                    <Button onClick={() => router.get(route("users.index"))}>
                        View All Users
                    </Button>

                    <Button onClick={() => router.get(route("projects.gems"))}>
                        Hidden Pearls
                    </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
