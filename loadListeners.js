import RedisStreamHelper from "redis-stream-helper"
import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
import * as fsWalk from '@nodelib/fs.walk'
const {
  listenForMessages,
  createStreamGroup,
  addListener,
  addStreamData,
  client,
} = RedisStreamHelper(process.env.REDIS_PORT, process.env.REDIS_HOST)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const listeners = {}

const files = fsWalk.walkSync('listeners', {entryFilter: entry => entry.name.endsWith('.js')})

for(let i = 0; i < files.length; i++) {
    const file = files[i]
    const streamKey = `rel:${file.path.replace("listeners/", "").replace("/"+file.name, "")}:${path.basename(file.name, '.js')}`
    listeners[streamKey] = await import("./" + file.path)
    await createStreamGroup(streamKey)
    addListener(streamKey)
    console.log("Found a listener for the stream key: " + streamKey)
}

const run = () => {
  listenForMessages((key, streamId, data) => {
    if(listeners[key]) {
        listeners[key].default(key, streamId, data)
    }
  }).then(run)
}

export default run