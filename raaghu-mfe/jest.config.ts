import type { Config } from "@jest/types";
import { defaults } from "jest-config";
// Sync object
const config: Config.InitialOptions = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx", "js", "jsx", "mts"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(scss|sass|css)$": "<rootDir>/__mocks__/styleMock.ts",
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es)/)"]
};
export default config;