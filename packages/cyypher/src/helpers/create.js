import { paramify } from '../util/params.js'
import cleanPrefix from '../util/cleanPrefix.js'

export async function cypherCreate (label, params, projection = [], opts = {}) {
  const toParams = {
    ...params
  }

  const paramsCypher = paramify(toParams, {
    ...opts
  })

  let query = ''

  if(params.__unique) {
    query += `OPTIONAL MATCH (unique_node:${label} { __unique: "${params.__unique}"}) WITH unique_node WHERE unique_node IS NULL `
  }

  query += ` 
      CREATE (node:${label} { ${paramsCypher} })
      RETURN ${
        projection.length > 0
          ? projection.reduce(
              (previous, current, idx, arr) =>
                previous +
                `node.${current}${idx === arr.length - 1 ? '' : ','}`,
              ''
            )
          : 'node'
      };
    `

  const res = await this.exec1(query)
  
  // if (opts.after) await opts.after(node)

  return projection.length > 0 ? cleanPrefix(res, 'node.') : res.node
}
