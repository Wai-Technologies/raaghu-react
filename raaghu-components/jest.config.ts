// import type { Config } from "@jest/types";
// import { defaults } from "jest-config";
// // Sync object
// const config: Config.InitialOptions = {
//     moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
//     preset: "ts-jest",
//     testEnvironment: "jsdom",
//     moduleNameMapper: {
//         "\\.(scss|sass|css)$": "<rootDir>/__mocks__/styleMock.ts",
//         "^raaghu-react-elements$": "<rootDir>/node_modules/raaghu-react-elements/dist/types/index.d.ts"
//     },
//     transform: {
//         "^.+\\.tsx?$": "ts-jest",
//     },
//     coveragePathIgnorePatterns: [
//         "/rds-comp-teams/",
//         "/rds-comp-login-attempts/",
//         "/rds-comp-user-delegations/",
//         "/rds-comp-components/",
//         "/rds-comp-permission-tree-new/",
//     ],
// };
// export default config;
import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        "\\.(scss|sass|css)$": "../../__mocks__/styleMock.ts",
    },
};

export default config;