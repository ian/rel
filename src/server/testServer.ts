// import { ServerEvents } from "../types"
import Server, { ServerInstance, Config } from "."

export default function ServerInstance(config: Config) {
  return new Server(config)
}

// class TestServer extends Server {
//   constructor() {
//     super({
//       db: {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//       },
//       port: 1234,
//     })
//   }

//   async start() {
//     try {
//       const { events, cypher, typeDefs, graphql } = this.runtime()

//       return {
//         cypher,
//         events,
//         typeDefs,
//         port: 1234,
//         graphql,
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

// export default (opts?: JestServerOpts) => {
//   const server = new Server()

//   if (opts?.log) {
//     server.on(ServerEvents.ERROR, (err) => {
//       console.log("\x1b[31m", err, "\x1b[0m")
//     })

//     server.on(ServerEvents.GRAPHQL_ERROR, ({ query, errors }) => {
//       console.error(errors[0], "\n", query)
//     })

//     server.on(ServerEvents.GRAPHQL, (gql, time) => {
//       console.log(
//         gql.query,
//         "\n",
//         gql.variables,
//         "\n",
//         "\n",
//         "Execution time (hr): %ds %dms",
//         time[0],
//         time[1] / 1000000
//       )
//     })

//     server.on(ServerEvents.CYPHER, (cypher, time) => {
//       console.log(
//         cypher,
//         "\n",
//         "Execution time (hr): %ds %dms",
//         time[0],
//         time[1] / 1000000
//       )
//     })
//   }

//   return server
// }
