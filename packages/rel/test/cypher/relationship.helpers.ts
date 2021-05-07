import { testServer } from "../../src"
export const { cypher } = testServer({ log: false }).runtime()

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

export const createActorsAndMovies = async (): Promise<ActorsAndMovies> => {
  return cypher.exec1(`
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

export const createScene = async (): Promise<ActorsAndMovies> => {
  return cypher.exec1(`
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
    `) as Promise<ActorsAndMovies>
}
