import { RelationDirection } from "../../src/types"
import { createScene, Cypher } from "./relationship.helpers"

describe("#cypherListRelationship", () => {
  describe("rel = outbound", () => {
    it("should list the correct movies", async () => {
      // @ts-ignore
      const { alex, keanu, carrie, laurence, kevin } = await createScene()

      expect((await moviesFor(keanu)).map((m) => m.title)).toEqual([
        "The Matrix",
        "Bill and Ted's Excellent Adventure",
      ])
      expect((await moviesFor(alex)).map((m) => m.title)).toEqual([
        "Bill and Ted's Excellent Adventure",
      ])
      expect((await moviesFor(carrie)).map((m) => m.title)).toEqual([
        "The Matrix",
      ])
      expect((await moviesFor(laurence)).map((m) => m.title)).toEqual([
        "The Matrix",
      ])
      expect((await moviesFor(kevin)).map((m) => m.title)).toEqual([])
    })
  })

  describe("rel = inbound", () => {
    it("should list the correct movies", async () => {
      // @ts-ignore
      const { matrix, billAndTeds } = await createScene()

      expect((await actorsFor(matrix)).map((m) => m.name)).toEqual([
        "Keanu Reeves",
        "Carrie-Anne Moss",
        "Laurence Fishburne",
      ])
      expect((await actorsFor(billAndTeds)).map((m) => m.name)).toEqual([
        "Keanu Reeves",
        "Alex Winter",
      ])
    })
  })

  describe("polymorphic queries", () => {
    it.todo("should support polymorphic queries")
  })

  describe("opts", () => {
    describe("order", () => {
      it("should allow changing of the order", async () => {
        const { keanu } = await createScene()

        const movie = await moviesFor(keanu)
        expect(movie.map((m) => m.title)).toEqual([
          "The Matrix",
          "Bill and Ted's Excellent Adventure",
        ])

        const orderedMovies = await moviesFor(keanu, { order: "title" })
        expect(orderedMovies.map((m) => m.title)).toEqual([
          "Bill and Ted's Excellent Adventure",
          "The Matrix",
        ])
      })
    })

    describe("singular", () => {
      it("should return one record", async () => {
        const { keanu } = await createScene()
        const movie = await moviesFor(keanu, { singular: true })
        expect(movie.title).toEqual("The Matrix")
      })
    })

    describe("where", () => {})
  })
})

const actorsFor = async (movie, opts = {}) => {
  return Cypher.listRelation(
    {
      name: "movie",
      label: "Movie",
      params: { id: movie.id },
    },
    {
      name: "actor",
      label: "Actor",
      params: {},
    },
    {
      name: "rel",
      direction: RelationDirection.IN,
      label: "ACTED_IN",
    },
    opts
  )
}

const moviesFor = async (actor, opts = {}) => {
  return Cypher.listRelation(
    {
      name: "actor",
      label: "Actor",
      params: { id: actor.id },
    },
    {
      name: "movie",
      label: "Movie",
      params: {},
    },
    {
      name: "rel",
      direction: RelationDirection.OUT,
      label: "ACTED_IN",
    },
    opts
  )
}
