/* =========================================================
   CAREERS CONFIGURATION
   ------------------------------------------------------------
   Paste the published Google Form URL between the quotes below.
   This is the only place the resume form URL is stored — both the
   Careers page CTA and every role details page read it from here.

   Leave it empty until the real form exists. When it is empty the
   "Send Your Resume" actions are disabled instead of navigating to
   a placeholder or broken destination.
   ========================================================= */

export const CAREERS_RESUME_FORM_URL = "";


/* Returns a usable http(s) URL, or an empty string when the value is
   missing or is not a safe external link. */
export const getCareersResumeFormUrl = () => {
    const value = String(CAREERS_RESUME_FORM_URL || "").trim();

    if (!value) {
        return "";
    }

    try {
        const url = new URL(value);

        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.toString();
        }
    } catch {
        /* Invalid URL — treat as unconfigured. */
    }

    return "";
};
