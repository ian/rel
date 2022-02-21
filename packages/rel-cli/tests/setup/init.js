import { spawn } from 'child_process'
import { packageDirectorySync } from 'pkg-dir'

const dir = packageDirectorySync()
const relCli = spawn("node", [dir + '/dist/rel.js', 'dev'])

relCli.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
})

relCli.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
})

relCli.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
})