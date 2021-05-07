import { testServer } from "../../src"
const { cypher } = testServer({ log: false }).runtime()

const makeMovie = async (opts = {}) => {
  return cypher.create("Movie", { title: "The Matrix" }, opts)
}

describe("#cypherFind", () => {
  describe("basic find", () => {
    it("should delete the node", async () => {
      const { id } = await makeMovie()
      const node = await cypher.find("Movie", { id })

      expect(node.id).toBe(id)
    })

    it("should return null when not found", async () => {
      const node = await cypher.find("Movie", { id: "FAKE123" })
      expect(node).toBe(null)
    })
  })

  describe("multiple parameters", () => {
    it("should delete the node", async () => {
      const { id } = await makeMovie()
      const node = await cypher.find("Movie", { id, title: "The Matrix" })

      expect(node.id).toBe(id)
    })

    it("should return null when not found", async () => {
      const { id } = await makeMovie()
      const node = await cypher.find("Movie", { id, title: "The Big Lebowski" })
      expect(node).toBe(null)
    })
  })
})
