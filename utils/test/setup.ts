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
(window as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
(window as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock scrollIntoView
Element.prototype.scrollIntoView = function() {};
