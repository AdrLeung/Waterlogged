import Navbar from "@/Components/Navbar";
import { ToastContainer } from "@/Components/Toast";
import { ToastProvider } from "@/contexts/ToastContext";
import { Head } from "@inertiajs/react";

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen">
            <Head title="Sample Project" />
            <Navbar />
            <main className="h-full">{children}</main>
            <ToastContainer />
        </div>
    );
}
