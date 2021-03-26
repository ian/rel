import { Direction } from "@reldb/types"
import { cypher, cypher1 } from "../../src/cypher"
import { cypherListRelationship } from "../../src/cypher/relationship"

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

const createScene = async () => {
  return cypher1(`
        CREATE (keanu:Actor { id: "1", name: "Keanu Reeves" }), 
               (alex: Actor { id: "2", name: "Alex Winter" }),
               (carrie:Actor { id: "3", name: "Carrie-Anne Moss" }), 
               (laurence:Actor { id: "4", name: "Laurence Fishburne" }),
               (kevin:Actor { id: "5", name: "Kevin Bacon" }),
               (matrix:Movie { id: "6", title: "The Matrix" }),
               (billAndTeds:Movie { id: "7", title: "Bill and Ted's Excellent Adventure" })
        
        MERGE (keanu)-[:ACTED_IN]->(matrix)
        MERGE (carrie)-[:ACTED_IN]->(matrix)
        MERGE (laurence)-[:ACTED_IN]->(matrix)
        MERGE (keanu)-[:ACTED_IN]->(billAndTeds)
        MERGE (alex)-[:ACTED_IN]->(billAndTeds)

        RETURN alex, keanu, carrie, laurence, kevin, matrix, billAndTeds;
      `)
}

const actorsFor = async (movie, opts = {}) => {
  return cypherListRelationship(
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
      direction: Direction.IN,
      label: "ACTED_IN",
    },
    opts
  )
}

const moviesFor = async (actor, opts = {}) => {
  return cypherListRelationship(
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
      direction: Direction.OUT,
      label: "ACTED_IN",
    },
    opts
  )
}
