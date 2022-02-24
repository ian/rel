import fs from "fs"
import chokidar from "chokidar"
import debounce from "debounce"
import ora from "ora"
import Rel from "rel-server"
import Generate from "./gen"
import Logger from "@ptkdev/logger"

let server

const handleChange = debounce(async (opts) => {
  console.clear()

  if (server) {
    await server.kill()
  }

  const { dir, verbose } = opts
  const reloadingIndicator = ora("Starting Rel ...").start()

  let logger

  if (verbose) {
    logger = new Logger({
      debug: true,
      write: true,

      // @todo - do we want to support file logging?
      // type: 'log',
      // path: {
      //   // remember: add string *.log to .gitignore
      //   debug_log: dir + '/logs/debug.log',
      //   error_log: dir + '/logs/errors.log',
      // },
    })
  }

  const typeDefs = fs.readFileSync(dir + "/schema.graphql").toString()
  const connection = "redis://localhost:6379"

  server = new Rel({
    typeDefs,
    connection,
  })

  await Generate()

  const port = process.env.PORT || 4000

  server
    .listen(port)
    .then(({ port, generatedSchema }) => {
      reloadingIndicator?.succeed(`Rel running`)
      console.log()
      console.log(`GraphQL Playground: http://localhost:${port}`)
      console.log(`GraphQL Endpoint: http://localhost:${port}/graphql`)
      // console.log(generatedSchema)
    })
    .catch((err) => {
      reloadingIndicator?.fail("Error during server start")
      console.error(err)
    })
}, 300)

type Opts = {
  dir: string
  logging: boolean
}

export default (opts: Opts): void => {
  const currentDir = process.cwd()
  const config = fs.readFileSync(`${currentDir}/rel.config.json`).toString()
  const { baseDir } = JSON.parse(config)

  chokidar
    .watch(baseDir + "/schema.graphql", { persistent: true })
    .on("all", () =>
      handleChange({
        dir: baseDir,
        ...opts,
      })
    )
}
