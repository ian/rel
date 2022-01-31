// require('dotenv').config({ path: '.env' })

import chokidar from 'chokidar'
import debounce from 'debounce'
import ora from 'ora'
import startServer from 'rel-server'
import Logger from '@ptkdev/logger'

let server

const handleChange = debounce(async (opts) => {
  if (server) {
    await server.kill('SIGINT')
  }

  const { dir, verbose } = opts
  let reloadingIndicator
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
  } else {
    console.log()
    reloadingIndicator = ora('Reloading Rel').start()
  }

  server = await startServer({
    dir,
    logger,
  })
    .then(() => {
      reloadingIndicator?.succeed('Rel running on http://localhost:4000')
    })
    .catch((err) => {
      reloadingIndicator?.fail('Error during server start')
      console.error(err)
    })
}, 300)

type Opts = {
  dir: string
  logging: boolean
}

export default (opts: Opts): void => {
  const { dir } = opts
  chokidar
    .watch(dir + '/schema.graphql', { persistent: true })
    .on('all', () => handleChange(opts))
}
