const EmptyState = ({
    icon = "◇",
    title,
    description,
    action,
}) => {

    return (
        <div className="admin-empty">

            <div className="admin-empty-icon">
                {icon}
            </div>

            <h3>{title}</h3>

            {description && (
                <p>{description}</p>
            )}

            {action}

        </div>
    );

};


export default EmptyState;
