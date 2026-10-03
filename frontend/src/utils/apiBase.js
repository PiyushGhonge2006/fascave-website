/* ======================================================
   API BASE
   ======================================================

   One place that turns a server path into a URL the
   browser can actually load.

   - VITE_API_URL is used when it is set, which is what
     a deployed build needs when the API lives on
     another host.
   - When it is not set the path is left relative and the
     Vite dev proxy (vite.config.js) forwards it to the
     backend.
   - Absolute URLs, data URIs and blob URLs are always
     passed through untouched, so the database can hold a
     full image URL when that is what is wanted.
====================================================== */

const BASE = (
  import.meta.env.VITE_API_URL || ""
).replace(/\/+$/, "");

const ABSOLUTE = /^(https?:)?\/\//i;
const INLINE = /^(data:|blob:)/i;

const withLeadingSlash = (value) =>
  value.startsWith("/") ? value : `/${value}`;


/* ======================================================
   API URL
   For JSON endpoints such as /api/content/services.
====================================================== */

export const apiUrl = (path) => {
  const value = String(path || "").trim();

  if (!value) {
    return BASE;
  }

  if (ABSOLUTE.test(value) || INLINE.test(value)) {
    return value;
  }

  return `${BASE}${withLeadingSlash(value)}`;
};


/* ======================================================
   IMAGE URL
   For anything rendered inside an <img src>.

   Seeded and uploaded images are stored as server paths
   such as /uploads/seed-assets/service-web-development.png
   so they survive a host change; this resolves them.
====================================================== */

export const imageUrl = (src) => {
  const value = String(src || "").trim();

  if (!value) {
    return "";
  }

  if (ABSOLUTE.test(value) || INLINE.test(value)) {
    return value;
  }

  return `${BASE}${withLeadingSlash(value)}`;
};


/* ======================================================
   PUBLIC CONTENT FLAG
   Every public collection request asks the backend to
   leave drafts out, so unpublished items never reach a
   visitor.
====================================================== */

export const publicPath = (path) => {
  const separator = path.includes("?") ? "&" : "?";

  return `${path}${separator}published=true`;
};
