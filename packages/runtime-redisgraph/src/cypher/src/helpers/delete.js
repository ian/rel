import cleanPrefix from '../util/cleanPrefix.js'

export async function cypherDelete (label, __id, projection = []) {
  const node = await this.find(label, { __id })
  if (!node) {
    throw new Error(`Unknown ${label} __id = ${__id}`)
  }

  const res = await this.exec1(
    `
      MATCH (node:${label})
      WHERE node.__id = "${__id}"
      DELETE node
      RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'};
    `
  )

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.node)
}
