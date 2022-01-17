import _ from 'lodash'
import { diff } from '../util/object.js'
import { paramify } from '../util/params.js'
import cleanPrefix from '../util/cleanPrefix.js'

const { isEmpty } = _

export async function cypherUpdate (
  label,
  __id,
  params,
  projection = [],
  opts = {}
) {
  const node = await this.find(label, { __id })

  if (!node) {
    throw new Error(`Unknown ${label} __id = ${__id}`)
  }

  const toParams = diff(node, params, {
    ignore: ['__id', '__typename']
  })

  if (isEmpty(toParams)) {
    // no changes necessary, just return the object
    return node
  }

  const paramsCypher = paramify(toParams, {
    ...opts,
    prefix: 'node.',
    separator: '='
  })

  let query = ''

  if(params.__unique) {
    query += `OPTIONAL MATCH (unique_node:${label} { __unique: "${params.__unique}"}) WITH unique_node WHERE unique_node IS NULL `
  }
  query += `
      MATCH (node:${label} { ${paramify({ __id })} })
      SET ${paramsCypher}
      RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'};
    `

  const res = await this.exec1(query)

  if (!res) throw new Error(`${label} not found${params.__unique ? " or UNIQUE constraint violated" : ""}`)

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.node)
}
