import Modal from "../Modal/Modal";


const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message,
    confirmLabel = "Delete",
    isBusy,
}) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={
                <>
                    <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        onClick={onClose}
                        disabled={isBusy}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="admin-btn admin-btn-danger"
                        onClick={onConfirm}
                        disabled={isBusy}
                    >
                        {isBusy
                            ? "Deleting…"
                            : confirmLabel}
                    </button>
                </>
            }
        >

            <p
                style={{
                    margin: 0,
                    color: "#55555e",
                    fontSize: "14px",
                    lineHeight: "1.6",
                }}
            >
                {message}
            </p>

        </Modal>
    );

};


export default ConfirmDialog;
