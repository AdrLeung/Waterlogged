import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToast } from "@/Contexts/ToastContext";

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed z-50 flex flex-col gap-2 bottom-4 right-4">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}

function Toast({ message, type, onClose }) {
    const getToastStyles = () => {
        switch (type) {
            case "success":
                return " green-50  border-green-500";
            case "error":
                return " red-50  border-red-500";
            default:
                return " gray-50   border-gray-500";
        }
    };

    const getTextColor = () => {
        switch (type) {
            case "success":
                return "text-green-900";
            case "error":
                return "text-red-900";
            default:
                return "text-gray-900";
        }
    };

    const getIconColor = () => {
        switch (type) {
            case "success":
                return "text-green-500";
            case "error":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle size={20} />;
            case "error":
                return <AlertCircle size={20} />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`
                ${getToastStyles()}
                ${getTextColor()}
                bg-white px-5 py-4 rounded-lg shadow-xl
                flex items-center justify-between
                border-current border pointer-events-auto border-l-4
            `}
        >
            <div className="flex items-center gap-3">
                <div className={getIconColor()}>{getIcon()}</div>
                <span className="text-sm font-medium">{message}</span>
            </div>
            <button
                onClick={() => {
                    onClose();
                }}
                className="p-1.5 rounded-full hover:bg-black hover:bg-opacity-20 "
            >
                <X size={16} className="opacity-60 hover:opacity-100" />
            </button>
        </div>
    );
}
