import { Direction } from "@reldb/types"
import { cypher1 } from "../../src/cypher"
import {
  cypherListRelationship,
  cypherCreateRelationship,
} from "../../src/cypher/relationship"

describe("#cypherCreateAssociation", () => {
  describe("rel = outbound", () => {
    it("should create the relationship", async () => {
      const { keanu, matrix } = await createActorsAndMovies()
      expect(await moviesFor(keanu)).toEqual([])
      await cypherCreateRelationship(
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
          direction: Direction.OUT,
          label: "ACTED_IN",
        }
      )
      const movies = await moviesFor(keanu)
      console.log({ movies })
      expect(movies.map((m) => m.title)).toEqual(["The Matrix"])
    })
  })

  describe("rel = inbound", () => {
    it("should create the relationship", async () => {
      const { keanu, matrix } = await createActorsAndMovies()
      expect(await actorsFor(matrix)).toEqual([])
      await cypherCreateRelationship(
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
          direction: Direction.IN,
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

        await cypherCreateRelationship(
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
            direction: Direction.OUT,
            label: "ACTED_IN",
          },
          {
            singular: true,
          }
        )

        let movies = await moviesFor(keanu)
        expect(movies.map((m) => m.title)).toEqual(["The Matrix"])

        await cypherCreateRelationship(
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
            direction: Direction.OUT,
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

        await cypherCreateRelationship(
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
            direction: Direction.OUT,
            label: "ACTED_IN",
            values: { year: 1999 },
          },
          {
            singular: true,
          }
        )

        await cypherCreateRelationship(
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
            direction: Direction.OUT,
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

type Actor = {
  id: string
  name: string
}

type Movie = {
  id: string
  title: string
}

type ActorsAndMovies = {
  keanu: Actor
  alex: Actor
  carrie: Actor
  laurence: Actor
  kevin: Actor
  billAndTeds: Movie
  matrix: Movie
}

const createActorsAndMovies = async (): Promise<ActorsAndMovies> => {
  return cypher1(`
      CREATE (keanu:Actor { id: "1", name: "Keanu Reeves" }), 
             (alex: Actor { id: "2", name: "Alex Winter" }),
             (carrie:Actor { id: "3", name: "Carrie-Anne Moss" }), 
             (laurence:Actor { id: "4", name: "Laurence Fishburne" }),
             (kevin:Actor { id: "5", name: "Kevin Bacon" }),
             (matrix:Movie { id: "6", title: "The Matrix" }),
             (billAndTeds:Movie { id: "7", title: "Bill and Ted's Excellent Adventure" })
      
      RETURN alex, keanu, carrie, laurence, kevin, matrix, billAndTeds;
    `) as Promise<ActorsAndMovies>
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
