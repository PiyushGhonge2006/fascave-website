import { useEffect, useState } from "react";


const Toast = ({ toast, onClose }) => {

    useEffect(() => {

        if (!toast) {
            return;
        }

        const timer = setTimeout(
            () => onClose(),
            toast.duration || 4000
        );

        return () => clearTimeout(timer);

    }, [toast, onClose]);

    if (!toast) {
        return null;
    }

    return (
        <div
            className={`admin-toast admin-toast-${toast.type}`}
            role="status"
            aria-live="polite"
        >
            <span className="admin-toast-icon">

                {toast.type === "success"
                    ? "✓"
                    : toast.type === "error"
                        ? "!"
                        : "i"}

            </span>

            <span className="admin-toast-message">
                {toast.message}
            </span>

            <button
                type="button"
                className="admin-toast-close"
                onClick={onClose}
                aria-label="Dismiss notification"
            >
                ×
            </button>
        </div>
    );

};


export const useToast = () => {

    const [toast, setToast] = useState(null);

    const showToast = (
        message,
        type = "success"
    ) => {

        setToast({ message, type });

    };

    const closeToast = () => setToast(null);

    return {
        toast,
        showToast,
        closeToast,
    };

};


export default Toast;
