import { EVENTS } from "../types"
import Server from "."
import Cypher from "../cypher"
import { RuntimeOpts } from "../runtime"

type JestServerOpts = {
  log?: boolean
}

export { RuntimeOpts } from "../runtime"

const testServer = (config: RuntimeOpts, opts?: JestServerOpts) => {
  const instance = Server({
    db: {
      type: Cypher.NEO4J,
      url: process.env.NEO4J_URI,
      username: process.env.NEO4J_USERNAME,
      password: process.env.NEO4J_PASSWORD,
      // logger: opts.log ? Events.cypher : null,
    },
    port: 1234,
  })

  const { auth, guards, plugins, schema } = config
  if (auth) {
    const { model, strategies } = auth
    instance.auth(model, strategies)
  }

  if (guards) {
    instance.guards(guards)
  }

  if (plugins) {
    plugins.forEach((p) => instance.plugin(p))
  }

  if (schema) {
    instance.schema(schema)
  }

  if (opts?.log) {
    instance.on(EVENTS.ERROR, (err) => {
      console.log("\x1b[31m", err, "\x1b[0m")
    })

    instance.on(EVENTS.GRAPHQL_ERROR, ({ query, errors }) => {
      console.error(errors[0], "\n", query)
    })

    instance.on(EVENTS.GRAPHQL, (gql, time) => {
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

    instance.on(EVENTS.CYPHER, (cypher, time) => {
      console.log(
        cypher,
        "\n",
        "Execution time (hr): %ds %dms",
        time[0],
        time[1] / 1000000
      )
    })
  }

  const { cypher, typeDefs, server } = instance.runtime()

  const handler = async (query, variables?) => {
    const context = {}
    const res = await server.executeOperation({ query, variables })
    return res
  }

  handler.typeDefs = typeDefs
  handler.cypher = cypher

  return handler
}

export default testServer
