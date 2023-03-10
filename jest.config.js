const { defaults } = require("jest-config");

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    "__test__",
  ],
  setupFilesAfterEnv: ["<rootDir>/__test__/SetupFile.ts"],
};
