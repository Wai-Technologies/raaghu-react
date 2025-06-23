import type { Config } from 'jest';

const config: Config = {
  // Use ts-jest to handle TypeScript files
  preset: 'ts-jest',

  // Simulate a browser-like environment
  testEnvironment: 'jsdom',

  // Match test files inside __tests__ folders or *.test.ts(x) anywhere
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  // File extensions Jest should recognize
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Mock style imports using identity-obj-proxy
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
    '^raaghu-components/(.*)$': '<rootDir>/raaghu-components/$1',
    '^raaghu-elements/(.*)$': '<rootDir>/raaghu-elements/$1',
  },

  // Set the root to current directory so Jest finds both folders
  roots: ['<rootDir>/raaghu-components', '<rootDir>/raaghu-elements'],

  // Optional: Add a setup file if needed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Optional: Enable code coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',
  
  // Ignore duplicate mocks in dist folders
  modulePathIgnorePatterns: [
    '<rootDir>/raaghu-elements/dist/',
    '<rootDir>/raaghu-components/dist/'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // Transform .ts/.tsx files using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
