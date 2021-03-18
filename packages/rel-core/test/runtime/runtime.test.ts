import { Fields } from "../../src"
import { Runtime } from "../../src/runtime/index"
const { string } = Fields

describe("Runtime", () => {
  describe("initialization", () => {
    it("should have an empty reducer", () => {
      const runtime = new Runtime()
      expect(runtime.reducer).toBeDefined()
    })
  })

  describe("#generate", () => {})
})
