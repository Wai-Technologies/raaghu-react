import {
  RAAGHU_LOGO_DARK_URL,
  RAAGHU_LOGO_LIGHT_URL,
  getRaaghuLogoUrl,
  setRaaghuLogoBase,
} from './raaghu-logo';

describe('raaghu-logo', () => {
  afterEach(() => {
    setRaaghuLogoBase();
  });

  it('points light logo at raaghu-blob and dark logo at raaghu-designsystem', () => {
    expect(RAAGHU_LOGO_LIGHT_URL).toBe(
      'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
    );
    expect(RAAGHU_LOGO_DARK_URL).toBe(
      'https://raaghustorageaccount.blob.core.windows.net/raaghu-designsystem/raaghu-design-system-darkmode3.png',
    );
    expect(getRaaghuLogoUrl('light')).toBe(RAAGHU_LOGO_LIGHT_URL);
    expect(getRaaghuLogoUrl('dark')).toBe(RAAGHU_LOGO_DARK_URL);
  });

  it('setRaaghuLogoBase updates getRaaghuLogoUrl for both modes', () => {
    setRaaghuLogoBase('https://cdn.example.com/logos');
    expect(getRaaghuLogoUrl('light')).toBe('https://cdn.example.com/logos/raaghu-design-system-lightmode.png');
    expect(getRaaghuLogoUrl('dark')).toBe('https://cdn.example.com/logos/raaghu-design-system-darkmode3.png');
  });
});
