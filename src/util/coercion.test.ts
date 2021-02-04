const { paramsBuilder, TIMESTAMPS } = require("./helpers")

describe("paramsBuilder", () => {
  describe("id", () => {
    it("should not add ID by default", () => {
      const res = paramsBuilder({}, {})

      expect(res.id).not.toBeDefined()
    })

    it("should add both timestamps when true", () => {
      const res = paramsBuilder({}, { id: true })

      expect(res.id).toBeDefined()
    })
  })

  describe("timestamps", () => {
    it("should not add timestamps by default", () => {
      const res = paramsBuilder({}, {})

      expect(res.createdAt).not.toBeDefined()
      expect(res.updatedAt).not.toBeDefined()
    })

    it("should add both timestamps when true", () => {
      const res = paramsBuilder({}, { timestamps: true })

      expect(res.createdAt).toBeDefined()
      expect(res.updatedAt).toBeDefined()
    })

    it("should add specified created at", () => {
      const res = paramsBuilder({}, { timestamps: TIMESTAMPS.CREATED })

      expect(res.createdAt).toBeDefined()
      expect(res.updatedAt).not.toBeDefined()
    })

    it("should add specified updated at", () => {
      const res = paramsBuilder({}, { timestamps: TIMESTAMPS.UPDATED })

      expect(res.createdAt).not.toBeDefined()
      expect(res.updatedAt).toBeDefined()
    })
  })
})
