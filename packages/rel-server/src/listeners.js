import RedisStreamHelper from 'redis-stream-helper'
import path from 'path'
import * as fsWalk from '@nodelib/fs.walk'
import Logger from '@ptkdev/logger'

const {
  listenForMessages,
  createStreamGroup,
  addListener,
  addStreamData,
  client,
} = RedisStreamHelper(process.env.REDIS_PORT, process.env.REDIS_HOST)

const logger = new Logger({
  debug: !!process.env.REL_DEBUG,
})

// const dir = packageDirectorySync()

export default async (config) => {
  const { dir } = config

  const listeners = {}
  const files = fsWalk.walkSync(dir + '/listeners', {
    entryFilter: (entry) => entry.name.endsWith('.js'),
  })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const streamKey = `rel:${file.path
      .replace(dir + '/listeners/', '')
      .replace('/' + file.name, '')}:${path.basename(file.name, '.js')}`
    listeners[streamKey] = await import(file.path)
    await createStreamGroup(streamKey)
    addListener(streamKey)
    logger.info('Found a listener for the stream key: ' + streamKey, 'INIT')
  }

  const run = () => {
    listenForMessages((key, streamId, data) => {
      if (listeners[key]) {
        listeners[key].default(key, streamId, data)
      }
    }).then(run)
  }

  return run()
}
