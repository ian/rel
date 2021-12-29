import Logger from '@ptkdev/logger'
const logger = new Logger({
  debug: !!process.env.REL_DEBUG
})

export default logger
