const { defaults } = require("jest-config");

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    "__test__",
  ],
  setupFilesAfterEnv: ["<rootDir>/__test__/SetupFile.ts"],
};
