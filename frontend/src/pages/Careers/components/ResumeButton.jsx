
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResumeButton = ({
    variant = "primary",
    className = "",
    showNote = false,
}) => {
    const navigate = useNavigate();

    const classes = [
        "careers-btn",
        `careers-btn--${variant}`,
        "careers-resume-btn",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const handleApply = () => {
        navigate("/careers#careers-apply");
    };

    return (
        <button
            type="button"
            className={classes}
            onClick={handleApply}
        >
            Send Your Resume
            <Send size={16} strokeWidth={2.2} aria-hidden="true" />
        </button>
    );
};

export default ResumeButton;
