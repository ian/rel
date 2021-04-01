import Runtime from "../../src/runtime/runtime"

describe("Runtime", () => {
  describe("initialization", () => {
    it("should have an empty reducer", () => {
      const runtime = new Runtime()
      expect(runtime.reducer).toBeDefined()
    })
  })

  describe("#generate", () => {})
})
