import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// Mock window matching media
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

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    const errorStr = typeof args[0] === 'string' ? args[0] : (args[0]?.message || String(args[0]));
    
    // Suppress ReactDOM.render warnings
    if (errorStr.includes('Warning: ReactDOM.render')) {
      return;
    }
    // Suppress non-standard prop warnings (stroke, fill, colorVariant, isCursorPointer, etc.)
    if (errorStr.includes('Warning: React does not recognize') || 
        (errorStr.includes('Received') && errorStr.includes('for a non-boolean attribute'))) {
      return;
    }
    // Suppress HTMLCanvasElement.getContext errors from jsdom (expected in test environment)
    if (errorStr.includes('HTMLCanvasElement.prototype.getContext')) {
      return;
    }
    // Suppress "not wrapped in act" warnings from MutationObserver in chart components
    if (errorStr.includes('not wrapped in act')) {
      return;
    }
    // Suppress forwardRef warnings for mocked drag-drop components
    if (errorStr.includes('Function components cannot be given refs') && 
        errorStr.includes('ForwardRef')) {
      return;
    }
    // Suppress duplicate key warnings from tests deliberately rendering same data
    if (errorStr.includes('Encountered two children with the same key')) {
      return;
    }
    // Suppress contentEditable React warning from Draft.js/react-draft-wysiwyg
    if (errorStr.includes('A component is `contentEditable` and contains `children` managed by React')) {
      return;
    }
    // Suppress MUI Select out-of-range value warnings from tests
    if (errorStr.includes('You have provided an out-of-range value') && errorStr.includes('select component')) {
      return;
    }
    // Suppress input value null warnings from MUI Select
    if (errorStr.includes('value` prop on `input` should not be null')) {
      return;
    }
    
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Suppress console.warn for MUI warnings
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args: any[]) => {
    const warnStr = typeof args[0] === 'string' ? args[0] : String(args[0]);
    
    // Suppress MUI Select out-of-range value warnings
    if (warnStr.includes('You have provided an out-of-range value') && warnStr.includes('select')) {
      return;
    }
    
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
