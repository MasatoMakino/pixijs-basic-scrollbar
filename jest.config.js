const { defaults } = require("jest-config");
/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { useESM: true }],
  },
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    "__test__",
  ],
  setupFilesAfterEnv: ["<rootDir>/__test__/SetupFile.ts"],
};

export default jestConfig;
