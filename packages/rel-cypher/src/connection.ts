import neo4j from "neo4j-driver"

type Config = {
  url: string
  username: string
  password: string
  logger: (cypher: string, time: [number, number]) => void
}

let config: Config = null

export function init(conf: Config) {
  config = conf
}

function beautifyCypher(query) {
  return query
    .split("\n")
    .map((s) => s.trim())
    .join("\n")
}

// https://neo4j.com/docs/driver-manual/current/client-applications/
export async function run(cypher) {
  const driver = neo4j.driver(
    config.url,
    neo4j.auth.basic(config.username, config.password)
  )

  const session = driver.session()
  const startTime = process.hrtime()
  const res = await session.run(cypher)
  const time = process.hrtime(startTime)

  if (config.logger) {
    config.logger(beautifyCypher(cypher), time)
  }

  await session.close()
  await driver.close()

  return res
}
