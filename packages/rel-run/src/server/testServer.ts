import { EVENTS } from "../types"
import { Server } from "./server"
import Cypher from "../cypher"

type JestServerOpts = {
  log?: boolean
}

export { RuntimeOpts } from "./runtime"

class TestServer extends Server {
  _opts: JestServerOpts

  constructor(opts?: JestServerOpts) {
    super({
      db: {
        type: Cypher.NEO4J,
        url: process.env.NEO4J_URI,
        username: process.env.NEO4J_USERNAME,
        password: process.env.NEO4J_PASSWORD,
      },
      port: 1234,
    })

    this._opts = opts
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
  const server = new TestServer(opts)

  if (opts?.log) {
    server.on(EVENTS.ERROR, (err) => {
      console.log("\x1b[31m", err, "\x1b[0m")
    })

    server.on(EVENTS.GRAPHQL_ERROR, ({ query, errors }) => {
      console.error(errors[0], "\n", query)
    })

    server.on(EVENTS.GRAPHQL, (gql, time) => {
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

    server.on(EVENTS.CYPHER, (cypher, time) => {
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
