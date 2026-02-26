/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@raaghu/elements/(.*)$': '<rootDir>/raaghu-elements/$1',
    '^@raaghu/layouts/(.*)$': '<rootDir>/raaghu-layouts/$1',
    '^@raaghu/themes/(.*)$': '<rootDir>/raaghu-react-themes/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{ts,tsx,js}',
    '<rootDir>/**/*.test.{ts,tsx,js}',
    '<rootDir>/**/*.spec.{ts,tsx,js}'
  ],
  collectCoverageFrom: [
    'raaghu-elements/**/*.{ts,tsx}',
    'raaghu-layouts/**/*.{ts,tsx}',
    'raaghu-react-themes/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/index.ts'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        target: 'ES2022',
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        skipLibCheck: true,
        strict: true,
      },
      useESM: true
    }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  }
};
