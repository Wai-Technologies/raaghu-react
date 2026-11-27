import DOMPurify from 'dompurify';

export function sanitizeEditorHtml(html: string): string {
  if (!html) return html;
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'oninput', 'onchange'],
    ADD_DATA_URI_TAGS: ['img'],
  });
}

const SAFE_URL = /^(?:https?:|mailto:|tel:|#|\/|\.{1,2}\/|[^:]*$)/i;

/** True for http(s), mailto, tel, fragment and relative URLs; false for `javascript:`, `data:`, `vbscript:` and other schemes. */
export function isSafeUrl(url: string): boolean {
  const normalized = Array.from(url)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code > 0x20 && (code < 0x7f || code > 0x9f);
    })
    .join('');
  return normalized !== '' && SAFE_URL.test(normalized);
}

