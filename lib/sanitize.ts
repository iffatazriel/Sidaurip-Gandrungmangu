import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li", "h2", "h3", "h4"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}

export function sanitizePlain(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
}
