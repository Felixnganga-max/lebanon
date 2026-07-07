// Mirrors frontend/src/data/slugify.js exactly so category/program slugs
// generated here match how the frontend already builds detail-page links.
export function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

/**
 * Appends -2, -3, ... until `exists(candidate)` returns false.
 * @param {string} base - un-suffixed slug
 * @param {(slug: string) => Promise<boolean>} exists - checks if a slug is taken
 */
export async function uniqueSlug(base, exists) {
  let candidate = base;
  let n = 2;
  while (await exists(candidate)) {
    candidate = `${base}-${n}`;
    n += 1;
  }
  return candidate;
}

export default slugify;
