import { EVENTS } from "@reldb/types"
import Server from "../../rel-run/src/server"
import { RuntimeOpts } from "../../rel-run/src/runtime"

type JestServerOpts = {
  log?: true
}

export { RuntimeOpts } from "../../rel-run/src/runtime"

export function makeServer(config: RuntimeOpts, opts?: JestServerOpts) {
  const instance = Server({ port: 1234 })

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
      console.error(errors[0].message, "\n", query)
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

  const { typeDefs, server } = instance.runtime()

  const handler = async (query, variables?) => {
    const context = {}
    return server.executeOperation({ query, variables })
  }

  handler.typeDefs = typeDefs

  return handler
}
