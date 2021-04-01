import { cypher1 } from "./cypher"
import { cypherFind } from "./find"

export async function cypherDelete(label, id) {
  const node = await cypherFind(label, id)
  if (!node) {
    throw new Error(`Unknown ${label} id = ${id}`)
  }

  await cypher1(
    `
      MATCH (node:${label})
      WHERE node.id = "${id}"
      DETACH DELETE node
      RETURN node;
    `
  )

  return node
}
