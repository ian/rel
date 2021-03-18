#!/usr/bin/env node
let server

process.on("SIGINT", () => {
  server.stop()
})

async function run() {
  const dir = process.cwd()
  server = require(`${dir}/dist/server.js`).default

  server.on("log", (msg) => {
    console.log()
    console.log(msg)
    console.log()
  })

  server.on("error", (err) => {
    console.log()
    console.log("\x1b[31m")
    console.log(err)
    console.log("\x1b[0m")
  })

  server.on("graphql", (gql, time) => {
    const { operationName, query, variables } = gql

    console.log()
    console.log("GQL Query")
    console.log(query)
    variables &&
      console.log("Variables", JSON.stringify(variables, null, 2), "\n")
    console.log(
      `${operationName || "GQL"} execution time (hr): %ds %dms`,
      time[0],
      time[1] / 1000000
    )
    console.log()
  })

  if (process.env.CYPHER_DEBUG) {
    server.on("cypher", (cypher, time) => {
      console.log()
      console.log("CYPHER")
      console.log(cypher)
      console.log("Execution time (hr): %ds %dms", time[0], time[1] / 1000000)
      console.log()
    })
  }

  return server.start().then(({ typeDefs, port }) => {
    console.log(typeDefs)
    console.log(`rel running on http://localhost:${port}`)
  })
}

run()
