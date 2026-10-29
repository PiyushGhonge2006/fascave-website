import { useEffect, useState } from "react";

import { apiUrl } from "../utils/apiBase";

/* ======================================================
   SINGLE JOB OPENING
   ======================================================
   Reads one public role by slug (or id) so a details page
   survives direct navigation and refresh. `status` is
   "loading" | "ready" | "notfound" | "error".

   The resolved slug is stored with the result so a slug
   change is treated as loading until the matching response
   lands, without resetting state synchronously in the effect.
====================================================== */

export const useJobOpening = (slug) => {
    const [result, setResult] = useState({
        slug: null,
        job: null,
        status: "loading",
    });

    useEffect(() => {
        if (!slug) {
            return undefined;
        }

        let active = true;
        const controller = new AbortController();

        const finish = (job, status) => {
            if (active) {
                setResult({ slug, job, status });
            }
        };

        const load = async () => {
            try {
                const response = await fetch(
                    apiUrl(
                        `/api/content/careers/jobs/${encodeURIComponent(slug)}`
                    ),
                    {
                        signal: controller.signal,
                        headers: { Accept: "application/json" },
                    }
                );

                if (!active) {
                    return;
                }

                if (response.status === 404) {
                    finish(null, "notfound");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        `Request failed with status ${response.status}`
                    );
                }

                const payload = await response.json();
                const received = payload?.data;

                if (payload?.success && received) {
                    finish(received, "ready");
                } else {
                    finish(null, "notfound");
                }
            } catch (error) {
                if (!active || error.name === "AbortError") {
                    return;
                }

                finish(null, "error");
            }
        };

        load();

        return () => {
            active = false;
            controller.abort();
        };
    }, [slug]);

    const isCurrent = Boolean(slug) && result.slug === slug;

    return {
        job: isCurrent ? result.job : null,
        status: slug
            ? isCurrent
                ? result.status
                : "loading"
            : "notfound",
    };
};

export default useJobOpening;
