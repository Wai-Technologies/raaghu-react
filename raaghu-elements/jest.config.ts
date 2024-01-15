// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: "jsdom",
//   roots: ["<rootDir>/__tests__"],
//   moduleNameMapper: {
//     "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
//   },
// };

import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(scss|sass|css)$": "<rootDir>/__mocks__/styleMock.ts",
    },
};

export default config;
