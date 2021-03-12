import { cypherCreate } from "../../src/cypher/create"
import { cypherFind } from "../../src/cypher/find"

const makeMovie = async (opts = {}) => {
  return cypherCreate("Movie", { title: "The Matrix" }, opts)
}

describe("#cypherFind", () => {
  describe("basic find", () => {
    it("should delete the node", async () => {
      const { id } = await makeMovie()
      const node = await cypherFind("Movie", id)

      expect(node.id).toBe(id)
    })

    it("should return null when not found", async () => {
      const node = await cypherFind("Movie", "FAKE123")
      expect(node).toBe(null)
    })
  })
})
