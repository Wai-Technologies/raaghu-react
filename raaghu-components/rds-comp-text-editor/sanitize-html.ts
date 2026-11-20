import DOMPurify from 'dompurify';

export function sanitizeEditorHtml(html: string): string {
  if (!html) return html;
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
    ADD_DATA_URI_TAGS: ['img'],
  });
}
