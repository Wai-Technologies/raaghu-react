import { render, screen } from '@testing-library/react';
import { RaaghuThemeProvider } from './RaaghuThemeProvider';
import { safeGetItem, safeSetItem, THEME_STORAGE_KEY } from './theme-utils';

describe('safeGetItem / safeSetItem', () => {
  const original = globalThis.localStorage;

  afterEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: original,
    });
  });

  it('returns null and no-ops when localStorage throws SecurityError', () => {
    const throwingStorage = {
      getItem: () => {
        throw new DOMException('Blocked', 'SecurityError');
      },
      setItem: () => {
        throw new DOMException('Blocked', 'SecurityError');
      },
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    };
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: throwingStorage,
    });

    expect(safeGetItem(THEME_STORAGE_KEY)).toBeNull();
    expect(() => safeSetItem(THEME_STORAGE_KEY, 'dark')).not.toThrow();
  });
});

describe('RaaghuThemeProvider with blocked localStorage', () => {
  const original = globalThis.localStorage;

  afterEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: original,
    });
  });

  it('renders children when localStorage throws on access', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => {
          throw new DOMException('Blocked', 'SecurityError');
        },
        setItem: () => {
          throw new DOMException('Blocked', 'SecurityError');
        },
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      },
    });

    render(
      <RaaghuThemeProvider>
        <span>theme-child</span>
      </RaaghuThemeProvider>,
    );

    expect(screen.getByText('theme-child')).toBeInTheDocument();
  });
});
