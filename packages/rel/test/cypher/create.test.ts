import { Connection } from "../../src"

const Cypher = Connection.init({
  url: process.env.NEO4J_URI,
  username: process.env.NEO4J_USERNAME,
  password: process.env.NEO4J_PASSWORD,
})

describe("#cypherCreate", () => {
  describe("basic creation", () => {
    it("should create a node with the properties specified", async () => {
      const node = await Cypher.create("Movie", { title: "The Matrix" })
      expect(node.title).toBe("The Matrix")
    })
  })
  describe("opts", () => {
    describe("id", () => {
      it("should have id turned on by default", async () => {
        const node = await Cypher.create("Movie", { title: "The Matrix" })
        expect(node.id).toBeDefined()
      })

      it("should allow id to be turned off", async () => {
        const node = await Cypher.create(
          "Movie",
          { title: "The Matrix" },
          { id: false }
        )
        expect(node.id).not.toBeDefined()
      })
    })
    describe("timestamps", () => {
      it("should have timestamps turned on by default", async () => {
        const node = await Cypher.create("Movie", { title: "The Matrix" })
        expect(node.createdAt).toBeDefined()
        expect(node.updatedAt).toBeDefined()
      })

      it("should allow timestamps to be turned off", async () => {
        const node = await Cypher.create(
          "Movie",
          { title: "The Matrix" },
          { timestamps: false }
        )
        expect(node.createdAt).not.toBeDefined()
        expect(node.updatedAt).not.toBeDefined()
      })
    })
    describe("slug", () => {})
    describe("geo", () => {})
  })
})