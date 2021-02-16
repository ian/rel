import { cypher1 } from "./cypher"

export async function cypherFind(label, id) {
  return cypher1(`MATCH (n:${label} {id: "${id}"}) RETURN n;`).then(
    (res) => res?.n
  )
}
