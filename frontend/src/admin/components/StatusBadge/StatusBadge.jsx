const VARIANTS = {
    published: "success",
    new: "info",
    replied: "success",
    read: "neutral",
    draft: "warning",
    active: "success",
    inactive: "neutral",
    preferred: "info",
    partner: "neutral",
    reseller: "warning",
};


const StatusBadge = ({
    status,
    label,
}) => {

    if (!status) {
        return null;
    }

    const key = String(status).toLowerCase();

    return (
        <span
            className={`admin-badge admin-badge-${
                VARIANTS[key] || "neutral"
            }`}
        >
            {label || status}
        </span>
    );

};


export default StatusBadge;
