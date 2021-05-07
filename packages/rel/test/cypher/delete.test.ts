import { testServer } from "../../src"
const { cypher } = testServer({ log: false }).runtime()

const makeMovie = async (opts = {}) => {
  return cypher.create("Movie", { title: "The Matrix" }, opts)
}

describe("#cypherDelete", () => {
  describe("basic deletion", () => {
    it("should delete the node", async () => {
      let node = await makeMovie()
      await cypher.delete("Movie", node.id)
      expect(await cypher.find("Movie", { id: node.id })).toBe(null)
    })

    it("should return the deleted node", async () => {
      const { id } = await makeMovie()
      expect(id).toBeDefined()
      const node = await cypher.delete("Movie", id)
      expect(node.id).toBe(id)
    })

    it("should throw an error when the node doesn't exist", async () => {
      expect(async () => {
        await cypher.delete("Movie", "FAKE123")
      }).rejects.toThrow(`Unknown Movie id = FAKE123`)
    })
  })
})
