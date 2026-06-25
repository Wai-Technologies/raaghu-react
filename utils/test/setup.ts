import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure testing library - removed invalid property
configure({});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: function(query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {},
    };
  },
});

// Mock ResizeObserver
// Mock ResizeObserver
const noopObserver = () => undefined;
(window as any).ResizeObserver = class ResizeObserver {
  observe = noopObserver;
  unobserve = noopObserver;
  disconnect = noopObserver;
};

// Mock IntersectionObserver
(window as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe = noopObserver;
  unobserve = noopObserver;
  disconnect = noopObserver;
};

// Mock scrollIntoView
Element.prototype.scrollIntoView = function() {};
