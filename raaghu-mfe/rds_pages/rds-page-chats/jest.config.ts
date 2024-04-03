import type { Config } from "@jest/types";
import { defaults } from "jest-config";
// Sync object
const config: Config.InitialOptions = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx", "js", "jsx", "mts"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
  moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
        "^raaghu-react-elements$": "<rootDir>/node_modules/raaghu-react-elements/dist/types/index.d.ts"
    },
    moduleDirectories: ["node_modules", "../../../raaghu-elements/src","../../../raaghu-components/src","../../../raaghu-react-core/src/index.tsx","../../libs/state-management/hooks.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest"
    },    
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es)/)"]
};
export default config;