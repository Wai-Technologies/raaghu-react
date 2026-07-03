export function capitalizeFirstWord(text: string) {
  if (!text) return '';
  const [first, ...rest] = text.split(' ');
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() + (rest.length ? ' ' + rest.join(' ').toLowerCase() : '');
}
