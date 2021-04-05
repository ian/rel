export async function cypherFind(label, id) {
  return this.exec1(`MATCH (n:${label} {id: "${id}"}) RETURN n;`).then(
    (res) => res?.n || null
  )
}
