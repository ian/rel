const pack = require("./package")

module.exports = {
  displayName: pack.name,
  verbose: true,
  rootDir: "./",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  name: pack.name,
  setupFiles: [__dirname + "/.jest/env.js"],
  setupFilesAfterEnv: [__dirname + "/.jest/db.js"],
  testMatch: ["**/*.test.ts"],
}
