const Alert = ({
    message,
    variant = "error",
}) => {

    if (!message) {
        return null;
    }

    return (
        <div
            className={`admin-alert ${
                variant === "info"
                    ? "admin-alert-info"
                    : ""
            }`}
            role="alert"
        >
            <span aria-hidden="true">
                {variant === "info" ? "i" : "!"}
            </span>

            <span>{message}</span>
        </div>
    );

};


export default Alert;
