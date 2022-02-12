import { paramify, setify } from '../util/params.js'
import cleanPrefix from '../util/cleanPrefix.js'

const DEFAULT_CREATE_OPTS = {
  id: true
}

const DEFAULT_UPDATE_OPTS = {
  id: false
}

export async function cypherMerge (
  label,
  matchParams,
  updateParams,
  projection = [],
  opts = {}
) {
  const matchCypher = paramify(matchParams, opts)
  const createCypher = setify(updateParams, {
    ...DEFAULT_CREATE_OPTS,
    ...opts,
    prefix: 'node.'
  })
  const updateCypher = setify(updateParams, {
    ...DEFAULT_UPDATE_OPTS,
    ...opts,
    prefix: 'node.'
  })

  const res = await this.exec1(
    ` 
      MERGE (node:${label} { ${matchCypher} })
      ON CREATE SET ${createCypher}
      ON MATCH SET ${updateCypher}
      RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'};
    `
  )

  // if (opts.after) await opts.after(node)

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.node)
}
