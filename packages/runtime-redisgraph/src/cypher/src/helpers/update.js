import _ from 'lodash'
import { diff } from '../util/object.js'
import { paramify } from '../util/params.js'
import cleanPrefix from '../util/cleanPrefix.js'

const { isEmpty } = _

const DEFAULT_UPDATE_OPTS = {
  id: false
}

export async function cypherUpdate (
  label,
  id,
  params,
  projection = [],
  opts = {}
) {
  const node = await this.find(label, { id })

  if (!node) {
    throw new Error(`Unknown ${label} id = ${id}`)
  }

  const toParams = diff(node, params, {
    ignore: ['id', '__typename']
  })

  if (isEmpty(toParams)) {
    // no changes necessary, just return the object
    return node
  }

  const paramsCypher = paramify(toParams, {
    ...DEFAULT_UPDATE_OPTS,
    ...opts,
    prefix: 'node.',
    separator: '='
  })

  const query = `
      MATCH (node:${label} { ${paramify({ id })} })
      SET ${paramsCypher}
      RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'};
    `

  const res = await this.exec1(query)

  if (!res) throw new Error(`${label} not found`)

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.node)
}
