import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect = jest.fn();
  observe = jest.fn();
  takeRecords() {
    return [];
  }
  unobserve = jest.fn();
} as any;

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    const errorStr = typeof args[0] === 'string' ? args[0] : (args[0]?.message || String(args[0]));
    
    if (errorStr.includes('Warning: ReactDOM.render')) {
      return;
    }
    if (errorStr.includes('Warning: React does not recognize') || 
        (errorStr.includes('Received') && errorStr.includes('for a non-boolean attribute'))) {
      return;
    }
    if (errorStr.includes('HTMLCanvasElement.prototype.getContext')) {
      return;
    }
    if (errorStr.includes('not wrapped in act')) {
      return;
    }
    if (errorStr.includes('Function components cannot be given refs') && 
        errorStr.includes('ForwardRef')) {
      return;
    }
    if (errorStr.includes('Encountered two children with the same key')) {
      return;
    }
    if (errorStr.includes('A component is `contentEditable` and contains `children` managed by React')) {
      return;
    }
    if (errorStr.includes('You have provided an out-of-range value') && errorStr.includes('select component')) {
      return;
    }
    if (errorStr.includes('value` prop on `input` should not be null')) {
      return;
    }
    
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args: any[]) => {
    const warnStr = typeof args[0] === 'string' ? args[0] : String(args[0]);
    
    if (warnStr.includes('You have provided an out-of-range value') && warnStr.includes('select')) {
      return;
    }
    
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
