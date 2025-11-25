import Navbar from "@/Components/Navbar";
import { ToastContainer } from "@/Components/Toast";
import { Button } from "@/Components/ui/button";
import { ToastProvider } from "@/contexts/ToastContext";
import { Head, router } from "@inertiajs/react";

export default function AppLayout({ children }) {
    return (
        <>
<div className="min-h-screen bg-[url('/images/Waves.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
            <Head title="Sample Project" />
            <Navbar />
            <main className="h-full">{children}</main>
            <ToastContainer />

            <Button onClick={() => router.get(route("observation.create"))}
                className="fixed p-5 rounded-full bottom-10 right-10">
                Create Observation
            </Button>
        </div>
        </>
    );
}
