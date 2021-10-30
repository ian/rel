import cypher from "../../src/cypher"

const makeMovie = async (opts = {}) => {
  return cypher.create("Movie", { title: "The Matrix" }, opts)
}

describe("#cypherUpdate", () => {
  describe("basic creation", () => {
    it("should create a node with the properties specified", async () => {
      let node = await makeMovie()

      node = await cypher.update("Movie", node.id, { year: 1999 })
      expect(node.title).toBe("The Matrix")
      expect(node.year).toBe(1999)
    })
  })

  describe("opts", () => {
    describe("id", () => {
      it("should not change the id", async () => {
        let node = await makeMovie()

        expect(node.id).toBeDefined()
        let origId = node.id

        node = await cypher.update("Movie", node.id, { title: "The Matrix" })

        expect(node.id).toBeDefined()
        expect(node.id).toBe(origId)
      })
    })

    describe("timestamps", () => {
      it("should change the updatedAt but not createdAt by default", async () => {
        const { id, createdAt, updatedAt } = await makeMovie()

        const node = await cypher.update("Movie", id, {
          director: "The Wachowskis",
        })

        expect(node.createdAt).toBe(createdAt)
        expect(node.updatedAt).toBeDefined()
        expect(node.updatedAt).not.toEqual(updatedAt)
      })

      it("should allow timestamps to be turned off", async () => {
        let { id, createdAt, updatedAt } = await makeMovie({
          timestamps: false,
        })

        expect(createdAt).not.toBeDefined()
        expect(updatedAt).not.toBeDefined()

        const node = await cypher.update(
          "Movie",
          id,
          { new: "property" },
          { timestamps: false }
        )

        expect(node.createdAt).not.toBeDefined()
        expect(node.updatedAt).not.toBeDefined()
      })
    })

    describe("slug", () => {
      it.todo("should auto generate a slug from the specified parameter")
      it.todo("should detect collisions and generate a unique slug")
    })

    describe("geo", () => {
      it.todo("should auto generate a geo from the specified parameter")
      it.todo("should should fail on inproper address lookup")
    })
  })
})
