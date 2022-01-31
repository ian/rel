import Server from '../dist/index.js'

async function run() {
  console.log('RUNNING')

  await Server({
    dir: './test',
  })
}

run()
