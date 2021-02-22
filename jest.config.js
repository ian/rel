module.exports = {
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
    },
  },
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  modulePaths: ["src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
}
