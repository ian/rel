const pack = require("./package");

module.exports = {
  verbose: true,
  testMatch: ['**/*.test.ts'],
  verbose: true,
  rootDir: 'test',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFiles: ["<rootDir>/.jest/set-env.js"],
  displayName: pack.name,
  name: pack.name,
  rootDir: "../..",
  modulePaths: ["<rootDir>/packages/rel-core/src"],
};
