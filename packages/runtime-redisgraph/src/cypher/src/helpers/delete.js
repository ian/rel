import cleanPrefix from '../util/cleanPrefix.js'

export async function cypherDelete (label, id, projection = []) {
  const node = await this.find(label, { id })
  if (!node) {
    throw new Error(`Unknown ${label} id = ${id}`)
  }

  const res = await this.exec1(
    `
      MATCH (node:${label})
      WHERE node.id = "${id}"
      DELETE node
      RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'};
    `
  )

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.node)
}
