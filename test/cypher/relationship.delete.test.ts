import cypher, { RelationDirection } from "../../src/cypher"
import { createScene } from "./relationship.helpers"

describe("#cypherDeleteRelationship", () => {
  describe("rel = outbound", () => {
    it("should delete the relationship", async () => {
      const { keanu, matrix } = await createScene()

      await moviesFor(keanu).then((movies) => {
        expect(movies.map((m) => m.title)).toEqual([
          "The Matrix",
          "Bill and Ted's Excellent Adventure",
        ])
      })

      await cypher.deleteRelationship(
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
          direction: RelationDirection.OUT,
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

      await cypher.deleteRelationship(
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
          direction: RelationDirection.IN,
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

const actorsFor = async (movie, opts = {}) => {
  return cypher.listRelationship(
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
  return cypher.listRelationship(
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
