import {
  RAAGHU_LOGO_DARK_URL,
  RAAGHU_LOGO_LIGHT_URL,
  getRaaghuLogoUrl,
  setRaaghuLogoBase,
} from './raaghu-logo';

describe('raaghu-logo (G2-413)', () => {
  const originalBase = 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob';

  afterEach(() => {
    setRaaghuLogoBase(originalBase);
  });

  it('serves light and dark logos from the same blob container', () => {
    expect(RAAGHU_LOGO_LIGHT_URL).toContain('/raaghu-blob/');
    expect(RAAGHU_LOGO_DARK_URL).toContain('/raaghu-blob/');
    expect(RAAGHU_LOGO_DARK_URL).not.toContain('/raaghu-designsystem/');
    expect(getRaaghuLogoUrl('light')).toContain('/raaghu-blob/');
    expect(getRaaghuLogoUrl('dark')).toContain('/raaghu-blob/');
  });

  it('setRaaghuLogoBase updates getRaaghuLogoUrl', () => {
    setRaaghuLogoBase('https://cdn.example.com/logos');
    expect(getRaaghuLogoUrl('light')).toBe('https://cdn.example.com/logos/raaghu-design-system-lightmode.png');
    expect(getRaaghuLogoUrl('dark')).toBe('https://cdn.example.com/logos/raaghu-design-system-darkmode3.png');
  });
});
