export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const MIME_LABELS: Record<string, string> = {
  msword: 'doc',
  'vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'vnd.ms-excel': 'xls',
  'vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'vnd.ms-powerpoint': 'ppt',
  'vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
};

/** Turns an `accept` attribute (`.png,.jpg`, `image/*`, `application/pdf`) into a display label (`PNG, JPG`). */
export function formatAcceptLabel(accept?: string): string {
  const labels = (accept ?? '')
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean)
    .map((token) => {
      const [type, subtype] = token.split('/');
      const label = subtype === undefined || subtype === '*' ? type : subtype;
      return (MIME_LABELS[label] ?? label).replace(/^\./, '').toUpperCase();
    });
  return labels.length > 0 ? Array.from(new Set(labels)).join(', ') : 'All files';
}
