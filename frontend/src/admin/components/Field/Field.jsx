const Field = ({
    label,
    hint,
    error,
    required,
    children,
    className = "",
}) => {

    return (
        <div className={`admin-field ${className}`}>

            {label && (
                <label>
                    {label}

                    {required && (
                        <span
                            style={{
                                color: "#dc2626",
                                marginLeft: "3px",
                            }}
                        >
                            *
                        </span>
                    )}
                </label>
            )}

            {children}

            {error ? (
                <span className="admin-field-error">
                    {error}
                </span>
            ) : hint ? (
                <span className="admin-field-hint">
                    {hint}
                </span>
            ) : null}

        </div>
    );

};


export default Field;
