// require('dotenv').config({ path: '.env' })

import chokidar from 'chokidar'
import debounce from 'debounce'
import ora from 'ora'
// import { spawn } from 'child_process'
import startServer from 'rel-server'

let server

const handleDirChange = debounce(async () => {
  // console.clear()
  const reloading = ora('Reloading Rel').start()

  if (server) {
    await server.kill('SIGINT')
  }
  server = await startServer({
    dir: process.cwd() + '/rel',
  })
    .then(() => {
      reloading.succeed('Rel running on http://localhost:4000')
    })
    .catch((err) => {
      reloading.fail('Error during server start')
      console.error(err)
    })
}, 300)

export default () => {
  chokidar
    .watch(process.cwd() + '/./rel/schema.graphql', { persistent: true })
    .on('all', handleDirChange)
}
