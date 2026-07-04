/**
 * slugify.js
 * ─────────────────────────────────────────────────────────────
 * Turns a program title into a URL-safe slug.
 * "Data Analysis Using Advanced Excel & Power BI"
 *   -> "data-analysis-using-advanced-excel-and-power-bi"
 *
 * Used by Programs.jsx (to build links) and ProgramDetail.jsx
 * (to match the :slug param back to a program object), so both
 * files must import from here rather than rolling their own.
 */
export function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

export default slugify;
