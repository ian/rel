const pack = require("./package");
const base = require ('../../jest.config.js')

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
  testMatch: ['**/*.test.ts'],
};
