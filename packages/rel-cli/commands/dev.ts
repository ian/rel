// require('dotenv').config({ path: '.env' })

import chokidar from 'chokidar'
import debounce from 'debounce'
import ora from 'ora'
import startServer from 'rel-server'
import Logger from '@ptkdev/logger'

let server

const handleChange = debounce(async (dir) => {
  console.clear()
  const reloading = ora('Reloading Rel').start()

  if (server) {
    await server.kill('SIGINT')
  }

  const logger = new Logger({
    // debug: !!process.env.REL_DEBUG,
    debug: false
  })

  server = await startServer({
    dir
  })
    .then(() => {
      reloading.succeed('Rel running on http://localhost:4000')
    })
    .catch((err) => {
      reloading.fail('Error during server start')
      console.error(err)
    })
}, 300)

export default (dir:string): void => {
  chokidar
    .watch(dir + '/schema.graphql', { persistent: true })
    .on('all', () => handleChange(dir))
}
