import cleanPrefix from '../util/cleanPrefix.js'

export async function cypherDelete (label, _id, projection = []) {
  const node = await this.find(label, { _id })
  if (!node) {
    throw new Error(`Unknown ${label} _id = ${_id}`)
  }

  const res = await this.exec1(
    `
      MATCH (node:${label})
      WHERE node._id = "${_id}"
      DETACH DELETE node
      RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'};
    `
  )

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.node)
}
