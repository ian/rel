import { cypherCreate } from "../src/create"
import { cypherFind } from "../src/find"
import { cypherDelete } from "../src/delete"

const makeMovie = async (opts = {}) => {
  return cypherCreate("Movie", { title: "The Matrix" }, opts)
}

describe("#cypherDelete", () => {
  describe("basic deletion", () => {
    it("should delete the node", async () => {
      let node = await makeMovie()
      await cypherDelete("Movie", node.id)
      expect(await cypherFind("Movie", node.id)).toBe(null)
    })

    it("should return the deleted node", async () => {
      const { id } = await makeMovie()
      expect(id).toBeDefined()
      const node = await cypherDelete("Movie", id)
      expect(node.id).toBe(id)
    })

    it("should throw an error when the node doesn't exist", async () => {
      expect(async () => {
        await cypherDelete("Movie", "FAKE123")
      }).rejects.toThrow(`Unknown Movie id = FAKE123`)
    })
  })
})
