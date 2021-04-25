const pack = require("./package")
const base = require("../../jest.config.js")

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
  setupFiles: [__dirname + "/.jest/env.js"],
  setupFilesAfterEnv: [__dirname + "/.jest/db.js"],
  testMatch: ["**/*.test.ts"],
}
