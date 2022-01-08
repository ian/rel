// require('dotenv').config({ path: '.env' })

import chokidar from 'chokidar'
import debounce from 'debounce'
import ora from 'ora'
// import { spawn } from 'child_process'
import startServer from 'rel-server'

console.log({ startServer })

let server

const handleDirChange = debounce(async () => {
  console.clear()
  const reloading = ora('Reloading Rel').start()

  if (server) {
    await server.kill('SIGINT')
  }
  server = await startServer()
    .then(() => {
      reloading.succeed('Rel running on http://localhost:4000')
    })
    .catch((err) => {
      reloading.fail('Error during server start')
      console.error(err)
    })

  // spawn('tsc', ['--project', 'tsconfig.json'], {
  //   // stdio: ['inherit', 'inherit', 'inherit'],
  // }).on('close', async (code) => {
  //   if (code === 0) {
  //     reloading.succeed()

  //     server = spawn('node', [`${__dirname}/../lib/devServer.js`], {
  //       stdio: 'inherit',
  //     })
  //   } else {
  //     reloading.fail('Error: Compilation failed. Watching for changes')
  //   }
  // })
}, 300)

export default () => {
  chokidar
    .watch(process.cwd() + '/./rel/schema.graphql', { persistent: true })
    .on('all', handleDirChange)
}
