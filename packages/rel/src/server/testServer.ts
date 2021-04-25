import { ServerEvents } from "../types"
import Server from "./server"

type JestServerOpts = {
  log?: boolean
}

class TestServer extends Server {
  constructor() {
    super({
      db: {
        url: process.env.NEO4J_URI,
        username: process.env.NEO4J_USERNAME,
        password: process.env.NEO4J_PASSWORD,
      },
      port: 1234,
    })
  }

  async start() {
    try {
      const { events, cypher, typeDefs, graphql } = this.runtime()

      return {
        cypher,
        events,
        typeDefs,
        port: 1234,
        graphql,
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export default (opts?: JestServerOpts) => {
  const server = new TestServer()

  if (opts?.log) {
    server.on(ServerEvents.ERROR, (err) => {
      console.log("\x1b[31m", err, "\x1b[0m")
    })

    server.on(ServerEvents.GRAPHQL_ERROR, ({ query, errors }) => {
      console.error(errors[0], "\n", query)
    })

    server.on(ServerEvents.GRAPHQL, (gql, time) => {
      console.log(
        gql.query,
        "\n",
        gql.variables,
        "\n",
        "\n",
        "Execution time (hr): %ds %dms",
        time[0],
        time[1] / 1000000
      )
    })

    server.on(ServerEvents.CYPHER, (cypher, time) => {
      console.log(
        cypher,
        "\n",
        "Execution time (hr): %ds %dms",
        time[0],
        time[1] / 1000000
      )
    })
  }

  return server
}