require("dotenv").config()

import { cypher, Server } from "../src/"

const schema = `
type Thing {
  name: String!
}

type Query {
  listThings: [Thing]
}

type Mutation {
  createThing(name: String!): Thing
}
`

const resolvers = {
  Query: {
    listThings: async () => {
      return cypher.list("Thing")
    },
  },
  Mutation: {
    createThing: async (_, { name }) => {
      return cypher.create("Thing", { name })
    },
  },
}

async function run() {
  const server = new Server({
    schema,
    resolvers,
  })

  return server.start().then(() => {
    console.log()
    console.log("Edit ./example/server.ts to make changes.")
  })
}

run()
