import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage } from "@inertiajs/react";

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-slate-600">
                <div className="w-full max-w-md p-8 space-y-6 text-center bg-white shadow-md rounded-2xl">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome, {auth.user?.name || "Guest"}
                    </h1>

                    <Button
                        onClick={() => router.get(route("groupChat.index"))}
                    >
                        list group chats
                    </Button>

                    <Button onClick={() => router.get(route("project.index"))}>
                        index projects
                    </Button>
                    <Button
                        onClick={() => router.get(route("observation.search"))}
                    >
                        View All Observations
                    </Button>

                    <Button onClick={() => router.get(route("users.index"))}>
                        View All Users
                    </Button>
                    <Button onClick={() => router.get(route("users.super"))}>
                        View Super Users
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
