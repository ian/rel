import { RuntimeOpts, EVENTS } from "@reldb/types"
import { server as Server } from "@reldb/run"

type JestServerOpts = {
  log?: true
}

export function makeServer(config: RuntimeOpts, opts?: JestServerOpts) {
  const instance = Server(config)

  if (opts?.log) {
    instance.on(EVENTS.ERROR, (err) => {
      console.log("\x1b[31m", err, "\x1b[0m")
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

  return async (query, variables?) => {
    const context = {}
    return server.executeOperation({ query, variables })
  }
}
