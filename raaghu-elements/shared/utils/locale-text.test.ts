import { mergeLocaleText } from './locale-text';

const DEFAULTS = { close: 'Close', count: (n: number) => `${n} items` };

describe('mergeLocaleText', () => {
  it('returns the defaults object when there are no overrides', () => {
    expect(mergeLocaleText(DEFAULTS)).toBe(DEFAULTS);
  });

  it('applies defined overrides', () => {
    const text = mergeLocaleText(DEFAULTS, { close: 'Schließen' });
    expect(text.close).toBe('Schließen');
    expect(text.count(2)).toBe('2 items');
  });

  it('keeps defaults for keys passed as undefined', () => {
    const text = mergeLocaleText(DEFAULTS, { close: undefined, count: undefined });
    expect(text.close).toBe('Close');
    expect(text.count(3)).toBe('3 items');
  });

  it('keeps an explicit empty string', () => {
    expect(mergeLocaleText(DEFAULTS, { close: '' }).close).toBe('');
  });
});
