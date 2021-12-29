import { paramify } from '../util/params.js'
import cleanPrefix from '../util/cleanPrefix.js'

const DEFAULT_CREATE_OPTS = {
  id: false
}

export async function cypherCreate (label, params, projection = [], opts = {}) {
  const toParams = {
    ...params
  }

  const paramsCypher = paramify(toParams, {
    ...DEFAULT_CREATE_OPTS,
    ...opts
  })

  const res = await this.exec1(
    ` 
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
  )

  // if (opts.after) await opts.after(node)

  return projection.length > 0 ? cleanPrefix(res, 'node.') : res.node
}
