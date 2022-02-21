import buildWhereQuery from "../util/buildWhereQuery.js"

export async function cypherDeleteMany(label, where, projection = []) {
  const query = []
  query.push(`MATCH (node:${label})`)

  if (typeof where === "object" && Object.keys(where).length > 0) {
    query.push(`WHERE ${buildWhereQuery(where, { prefix: "node." })}`)
  }

  query.push(`DETACH DELETE node`)
  query.push(`RETURN COUNT(node) as count`)

  const res = await this.exec1(query.join("\n"))

  return res?.count || 0
}
