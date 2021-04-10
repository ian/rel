export async function cypherDelete(label, id) {
  const node = await this.find(label, { id })
  if (!node) {
    throw new Error(`Unknown ${label} id = ${id}`)
  }

  await this.exec1(
    `
      MATCH (node:${label})
      WHERE node.id = "${id}"
      DETACH DELETE node
      RETURN node;
    `
  )

  return node
}
