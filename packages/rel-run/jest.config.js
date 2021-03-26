const pack = require("./package");
const base = require ('../../jest.config.js')

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
  setupFilesAfterEnv: [__dirname + "/.jest/db.js"],
  setupFiles: [__dirname + "/.jest/env.js"],
  testMatch: ['**/*.test.ts'],
};
