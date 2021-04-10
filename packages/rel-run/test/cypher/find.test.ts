import { Connection } from "../../src"

const Cypher = Connection.init({
  type: Connection.NEO4J,
  url: process.env.NEO4J_URI,
  username: process.env.NEO4J_USERNAME,
  password: process.env.NEO4J_PASSWORD,
  // logger: console.log,
})

const makeMovie = async (opts = {}) => {
  return Cypher.create("Movie", { title: "The Matrix" }, opts)
}

describe("#cypherFind", () => {
  describe("basic find", () => {
    it("should delete the node", async () => {
      const { id } = await makeMovie()
      const node = await Cypher.find("Movie", { id })

      expect(node.id).toBe(id)
    })

    it("should return null when not found", async () => {
      const node = await Cypher.find("Movie", { id: "FAKE123" })
      expect(node).toBe(null)
    })
  })

  describe("multiple parameters", () => {
    it("should delete the node", async () => {
      const { id } = await makeMovie()
      const node = await Cypher.find("Movie", { id, title: "The Matrix" })

      expect(node.id).toBe(id)
    })

    it("should return null when not found", async () => {
      const { id } = await makeMovie()
      const node = await Cypher.find("Movie", { id, title: "The Big Lebowski" })
      expect(node).toBe(null)
    })
  })
})
