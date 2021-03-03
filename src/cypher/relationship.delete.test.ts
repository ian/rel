import { cypher, cypher1 } from "~/cypher"
import { Direction } from "~/types"
import {
  cypherListRelationship,
  cypherDeleteRelationship,
} from "./relationship"

describe("#cypherDeleteRelationship", () => {
  beforeEach(async () => {
    await cypher(`MATCH (n) DETACH DELETE n;`)
  })
  describe("rel = outbound", () => {
    it("should delete the relationship", async () => {
      const { keanu, matrix } = await createScene()

      await moviesFor(keanu).then((movies) => {
        expect(movies.map((m) => m.title)).toEqual([
          "The Matrix",
          "Bill and Ted's Excellent Adventure",
        ])
      })

      await cypherDeleteRelationship(
        {
          name: "actor",
          label: "Actor",
          params: { id: keanu.id },
        },
        {
          name: "movie",
          label: "Movie",
          params: { id: matrix.id },
        },
        {
          name: "rel",
          label: "ACTED_IN",
          direction: Direction.OUT,
        }
      )

      await moviesFor(keanu).then((movies) => {
        expect(movies.map((m) => m.title)).toEqual([
          "Bill and Ted's Excellent Adventure",
        ])
      })
    })
  })

  describe("rel = inbound", () => {
    it("should delete the relationship", async () => {
      const { keanu, matrix } = await createScene()

      await actorsFor(matrix).then((actors) => {
        expect(actors.map((a) => a.name)).toEqual([
          "Keanu Reeves",
          "Carrie-Anne Moss",
          "Laurence Fishburne",
        ])
      })

      await cypherDeleteRelationship(
        {
          name: "movie",
          label: "Movie",
          params: { id: matrix.id },
        },
        {
          name: "actor",
          label: "Actor",
          params: { id: keanu.id },
        },
        {
          name: "rel",
          label: "ACTED_IN",
          direction: Direction.IN,
        }
      )

      await actorsFor(matrix).then((actors) => {
        expect(actors.map((a) => a.name)).toEqual([
          "Carrie-Anne Moss",
          "Laurence Fishburne",
        ])
      })
    })
  })

  describe("polymorphic", () => {})
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
