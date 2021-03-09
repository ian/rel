import neo4j from "neo4j-driver"

// https://neo4j.com/docs/driver-manual/current/client-applications/
export async function runQuery(cypher) {
  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  )
  const session = driver.session()

  const res = await session.run(cypher)

  await session.close()
  await driver.close()

  return res
}
