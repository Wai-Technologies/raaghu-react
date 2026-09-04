import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// vitest-safe matchMedia mock (vi.fn() not needed in browser mode)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: class IntersectionObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
    unobserve() {}
  },
});

const ResizeObserverMock = class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
};

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock,
});

// Also expose as a bare global so components using `new ResizeObserver()` work in jsdom
if (typeof global.ResizeObserver === 'undefined') {
  (global as any).ResizeObserver = ResizeObserverMock;
}

if (typeof HTMLCanvasElement !== 'undefined' && !HTMLCanvasElement.prototype.getContext) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    writable: true,
    value: () => ({
      measureText: () => ({ width: 0 }),
      fillRect: () => {},
      clearRect: () => {},
      getImageData: () => ({ data: [] }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      closePath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      arc: () => {},
      fill: () => {},
    }),
  });
}
