import { Connection } from "../../src"

const Cypher = Connection.init({
  url: process.env.NEO4J_URI,
  username: process.env.NEO4J_USERNAME,
  password: process.env.NEO4J_PASSWORD,
})

const makeMovie = async (opts = {}) => {
  return Cypher.create("Movie", { title: "The Matrix" }, opts)
}

describe("#cypherDelete", () => {
  describe("basic deletion", () => {
    it("should delete the node", async () => {
      let node = await makeMovie()
      await Cypher.delete("Movie", node.id)
      expect(await Cypher.find("Movie", { id: node.id })).toBe(null)
    })

    it("should return the deleted node", async () => {
      const { id } = await makeMovie()
      expect(id).toBeDefined()
      const node = await Cypher.delete("Movie", id)
      expect(node.id).toBe(id)
    })

    it("should throw an error when the node doesn't exist", async () => {
      expect(async () => {
        await Cypher.delete("Movie", "FAKE123")
      }).rejects.toThrow(`Unknown Movie id = FAKE123`)
    })
  })
})
