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

// Mock ResizeObserver (not available in jsdom)
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Fail any test that logs an unexpected console.error / console.warn.
// Tests that expect a warning should spy on it: jest.spyOn(console, 'warn').mockImplementation(() => {}).
const ALLOWED_CONSOLE_MESSAGES: RegExp[] = [
  /^\[Rds\w*\] The `.+` prop is deprecated/,
  /^A component is `contentEditable` and contains `children` managed by React/,
  /not wrapped in act\(\.\.\.\)/,
];

HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext;

const formatConsoleArgs = (args: unknown[]): string => {
  const [first, ...rest] = args;
  if (typeof first !== 'string') return first instanceof Error ? first.message : String(first);
  let index = 0;
  return first.replace(/%[sdifoOc]/g, () => String(rest[index++]));
};

let unexpectedConsoleMessages: string[] = [];

(['error', 'warn'] as const).forEach((method) => {
  const original = console[method];
  console[method] = (...args: unknown[]) => {
    const message = formatConsoleArgs(args);
    if (ALLOWED_CONSOLE_MESSAGES.some((pattern) => pattern.test(message))) return;
    unexpectedConsoleMessages.push(`console.${method}: ${message}`);
    original.call(console, ...args);
  };
});

afterEach(() => {
  if (unexpectedConsoleMessages.length === 0) return;
  const messages = unexpectedConsoleMessages;
  unexpectedConsoleMessages = [];
  throw new Error(`Unexpected console output:\n${messages.join('\n')}`);
});
