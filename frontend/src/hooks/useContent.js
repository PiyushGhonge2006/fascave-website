import { useCallback, useEffect, useState } from "react";

import { apiUrl, publicPath } from "../utils/apiBase";

/* ======================================================
   PUBLIC CONTENT HOOKS
   ======================================================

   The public pages used to hardcode their copy. These
   hooks read the same content from the CMS while keeping
   the hardcoded copy as a fallback, so a stopped backend
   or an empty collection leaves the page looking normal
   instead of blank.

   `status` is "loading" | "ready" | "empty" | "error".
   The fallback is what renders until the request
   succeeds with at least one record.
====================================================== */

const useContent = (path, fallback, shape) => {
  const [data, setData] = useState(fallback);
  const [status, setStatus] = useState("loading");
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = useCallback(() => {
    setRefreshKey((key) => key + 1);
  }, []);

  /*
   * Admin edits happen in another tab or browser session.
   * Re-reading when the visitor comes back to the tab keeps
   * the public site in sync without websockets or a rebuild.
   */
  useEffect(() => {
    const handleFocus = () => reload();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        reload();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [reload]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const response = await fetch(apiUrl(path), {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const payload = await response.json();

        if (!active) {
          return;
        }

        const received = payload?.data;
        const usable =
          shape === "list"
            ? Array.isArray(received) && received.length > 0
            : received &&
              typeof received === "object" &&
              Object.keys(received).length > 0;

        if (payload?.success && usable) {
          setData(received);
          setStatus("ready");
        } else {
          setStatus("empty");
        }
      } catch (error) {
        if (!active || error.name === "AbortError") {
          return;
        }

        setStatus("error");
      }
    };

    load();

    return () => {
      active = false;
      controller.abort();
    };
  }, [path, shape, refreshKey]);

  return { data, status, reload };
};


/* ======================================================
   COLLECTION
   Use for lists: services, portfolio, partners, faq,
   blog posts. Drafts are excluded by the public flag.
====================================================== */

export const useCollection = (path, fallback = []) => {
  const { data, status, reload } = useContent(
    publicPath(path),
    fallback,
    "list"
  );

  return { items: data, status, reload };
};


/* ======================================================
   SINGLETON
   Use for the home and about documents.
====================================================== */

export const useSingleton = (path, fallback = {}) => {
  const { data, status, reload } = useContent(
    path,
    fallback,
    "object"
  );

  return { data, status, reload };
};
