#!/usr/bin/env node

let server

process.on("SIGINT", () => {
  server.stop()
})

async function run() {
  const dir = process.cwd()
  server = require(`${dir}/dist/server.js`).default

  server.on("log", (msg) => {
    console.log(msg)
    console.log()
  })

  server.on("error", (err) => {
    console.error("ERR")
    console.error(err)
    console.log()
  })

  server.on("graphql", (gql, time) => {
    const { operationName, query, variables } = gql

    console.log("GQL Query")
    console.log(query)
    console.log("Variables")
    console.log(JSON.stringify(variables))
    console.log(
      `${operationName || "GQL"} execution time (hr): %ds %dms`,
      time[0],
      time[1] / 1000000
    )
    console.log()
  })

  server.on("cypher", (cypher, time) => {
    console.log("CYPHER")
    console.log(cypher)
    console.log("Execution time (hr): %ds %dms", time[0], time[1] / 1000000)
    console.log()
  })

  return server.start().then(({ typeDefs, port }) => {
    console.log(`rel running on http://localhost:${port}`)
  })
}

run()
