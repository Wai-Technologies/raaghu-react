import { applySkinTone } from './rds-comp-emoji-data';

describe('applySkinTone', () => {
  it('returns the emoji unchanged for the default tone', () => {
    expect(applySkinTone('👍️', 0)).toBe('👍️');
  });

  it('matches skins by tone value', () => {
    expect(applySkinTone('👍️', 1)).toBe('👍🏻');
    expect(applySkinTone('👍️', 3)).toBe('👍🏽');
    expect(applySkinTone('👍️', 5)).toBe('👍🏿');
  });

  it('returns the emoji when it has no skin variants', () => {
    expect(applySkinTone('🐶', 2)).toBe('🐶');
  });
});
