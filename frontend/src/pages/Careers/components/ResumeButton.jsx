import { useId } from "react";

import { Send } from "lucide-react";

import { getCareersResumeFormUrl } from "../../../config/careers";

/* Shared resume action for the Careers CTA and every role details
   page. Keeping the external-link handling here means the Google Form
   URL is never duplicated and an unconfigured URL can never navigate. */
const ResumeButton = ({
    variant = "primary",
    className = "",
    showNote = true,
}) => {
    const noteId = useId();

    const url = getCareersResumeFormUrl();

    const classes = [
        "careers-btn",
        `careers-btn--${variant}`,
        "careers-resume-btn",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (!url) {
        return (
            <span className="careers-resume-action">
                <button
                    type="button"
                    className={classes}
                    disabled
                    aria-describedby={showNote ? noteId : undefined}
                    title="Resume submission is not configured yet."
                >
                    Send Your Resume
                    <Send size={16} strokeWidth={2.2} aria-hidden="true" />
                </button>

                {showNote && (
                    <span className="careers-resume-note" id={noteId}>
                        Resume submissions are being configured. Please check
                        back soon.
                    </span>
                )}
            </span>
        );
    }

    return (
        <a
            className={classes}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            Send Your Resume
            <Send size={16} strokeWidth={2.2} aria-hidden="true" />
        </a>
    );
};

export default ResumeButton;
