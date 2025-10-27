import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage } from "@inertiajs/react";

export default function Welcome() {
    const groupId = 5;
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gray-50">
                <div className="w-full max-w-md p-8 space-y-6 text-center bg-white shadow-md rounded-2xl">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome, {auth.user?.name || "Guest"}
                    </h1>
                    <Button
                        onClick={() => {
                            router.post(route("message.send"), {
                                groupId: groupId,
                                content: "2",
                            });
                        }}
                    >
                        send message
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
