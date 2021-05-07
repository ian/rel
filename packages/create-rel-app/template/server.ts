import { Server, Types } from "@reldb/run"
const { ServerEvents } = Types

// @note - this will be automatically loaded from models/ and endpoints/ folders in future Rel versions
const schema = [require(__dirname + "/models/person").default]
const endpoints = [require(__dirname + "/endpoints/helloWorld").default]

const port = parseInt(process.env.PORT) || 3282

const server = new Server({
  port,
  db: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
})
  .schema(...schema)
  .endpoints(...endpoints)

server.on(ServerEvents.ERROR, (err) => {
  console.log()
  console.log("\x1b[31m")
  console.log(err.message)
  console.log("\x1b[0m")
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

export default server
