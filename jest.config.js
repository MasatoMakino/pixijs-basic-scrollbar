module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["./src/**/*.ts"],
  setupFilesAfterEnv: ["<rootDir>/__test__/SetupFile.ts"],
};
