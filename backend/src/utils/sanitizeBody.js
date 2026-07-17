import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "img",
  "span",
];

// Sanitizes TipTap's HTML output before it's stored — even though only
// authenticated admin/staff write blog bodies, this is the one place raw
// HTML ever gets persisted and rendered back with dangerouslySetInnerHTML,
// so it's worth stripping anything beyond what the editor's own toolbar
// can produce (scripts, event handlers, iframes, etc).
export function sanitizeBody(html) {
  return sanitizeHtml(html || "", {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
      "*": ["style"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$|^right$|^center$|^justify$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

export default sanitizeBody;
