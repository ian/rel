import { RelationDirection } from "../../src/types"
import { createActorsAndMovies, cypher } from "./relationship.helpers"

describe("#cypherCreateAssociation", () => {
  describe("rel = outbound", () => {
    it("should create the relationship", async () => {
      const { keanu, matrix } = await createActorsAndMovies()
      expect(await moviesFor(keanu)).toEqual([])
      await cypher.createRelation(
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
          direction: RelationDirection.OUT,
          label: "ACTED_IN",
        }
      )
      const movies = await moviesFor(keanu)
      expect(movies.map((m) => m.title)).toEqual(["The Matrix"])
    })
  })

  describe("rel = inbound", () => {
    it("should create the relationship", async () => {
      const { keanu, matrix } = await createActorsAndMovies()
      expect(await actorsFor(matrix)).toEqual([])
      await cypher.createRelation(
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
          direction: RelationDirection.IN,
          label: "ACTED_IN",
        }
      )
      const movies = await actorsFor(matrix)
      expect(movies.map((m) => m.name)).toEqual(["Keanu Reeves"])
    })
  })

  describe("polymorphic creates", () => {
    it.todo("should support polymorphic creates")
  })

  describe("opts", () => {
    describe("singular", () => {
      it("should only allow for one record association", async () => {
        const { keanu, matrix, billAndTeds } = await createActorsAndMovies()
        expect(await moviesFor(keanu)).toEqual([])

        await cypher.createRelation(
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
            direction: RelationDirection.OUT,
            label: "ACTED_IN",
          },
          {
            singular: true,
          }
        )

        let movies = await moviesFor(keanu)
        expect(movies.map((m) => m.title)).toEqual(["The Matrix"])

        await cypher.createRelation(
          {
            name: "actor",
            label: "Actor",
            params: { id: keanu.id },
          },
          {
            name: "movie",
            label: "Movie",
            params: { id: billAndTeds.id },
          },
          {
            name: "rel",
            direction: RelationDirection.OUT,
            label: "ACTED_IN",
          },
          {
            singular: true,
          }
        )

        movies = await moviesFor(keanu)
        expect(movies.map((m) => m.title)).toEqual([
          "Bill and Ted's Excellent Adventure",
        ])
      })

      it("should not affect other relationships if the params signature doesn't match", async () => {
        const { keanu, matrix, billAndTeds } = await createActorsAndMovies()
        expect(await moviesFor(keanu)).toEqual([])

        await cypher.createRelation(
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
            direction: RelationDirection.OUT,
            label: "ACTED_IN",
            values: { year: 1999 },
          },
          {
            singular: true,
          }
        )

        await cypher.createRelation(
          {
            name: "actor",
            label: "Actor",
            params: { id: keanu.id },
          },
          {
            name: "movie",
            label: "Movie",
            params: { id: billAndTeds.id },
          },
          {
            name: "rel",
            direction: RelationDirection.OUT,
            label: "ACTED_IN",
            values: { year: 1989 },
          },
          {
            singular: true,
          }
        )

        const movies = await moviesFor(keanu, { orderRaw: "rel.year ASC" })
        expect(movies.map((m) => m.title)).toEqual([
          "Bill and Ted's Excellent Adventure",
          "The Matrix",
        ])
      })
    })
  })
})

const actorsFor = async (movie, opts = {}) => {
  return cypher.listRelation(
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
  return cypher.listRelation(
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
