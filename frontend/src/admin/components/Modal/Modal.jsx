import { useEffect } from "react";


const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    size = "default",
    footer,
    children,
}) => {

    useEffect(() => {

        if (!isOpen) {
            return;
        }


        // --------------------------------------------
        // ESCAPE TO CLOSE
        // --------------------------------------------

        const onKeyDown = (event) => {

            if (event.key === "Escape") {

                onClose();

            }

        };

        document.addEventListener(
            "keydown",
            onKeyDown
        );


        // --------------------------------------------
        // LOCK BODY SCROLL
        // --------------------------------------------

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {

            document.removeEventListener(
                "keydown",
                onKeyDown
            );

            document.body.style.overflow =
                previousOverflow;

        };

    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="admin-modal-backdrop"
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {

                    onClose();

                }

            }}
        >

            <div
                className={`admin-modal ${
                    size === "wide"
                        ? "admin-modal-wide"
                        : ""
                }`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >

                <div className="admin-modal-header">

                    <div>
                        <h2>{title}</h2>

                        {description && (
                            <p>{description}</p>
                        )}
                    </div>

                    <button
                        type="button"
                        className="admin-modal-close"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        ×
                    </button>

                </div>

                <div className="admin-modal-body">
                    {children}
                </div>

                {footer && (
                    <div className="admin-modal-footer">
                        {footer}
                    </div>
                )}

            </div>

        </div>
    );

};


export default Modal;
