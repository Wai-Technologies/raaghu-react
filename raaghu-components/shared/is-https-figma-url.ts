/** True for https URLs whose host is figma.com or www.figma.com. */
export const isHttpsFigmaUrl = (value: string): boolean => {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' && (url.hostname === 'figma.com' || url.hostname === 'www.figma.com');
  } catch {
    return false;
  }
};
