import { paramify } from '../util/params.js'
import cleanPrefix from '../util/cleanPrefix.js'

export async function cypherFind (label, params, projection = []) {
  const query = `MATCH (node:${label} { ${paramify(params)} }) 
    RETURN ${
      projection.length > 0
        ? projection.reduce(
            (previous, current, idx, arr) =>
              previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`,
            ''
          )
        : 'node'
    };`
  const res = await this.exec1(query)
  return projection.length > 0 ? cleanPrefix(res, 'node.') : res.node
}
