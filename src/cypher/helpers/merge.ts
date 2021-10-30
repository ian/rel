import { Cypher1Response, CypherCreateOpts } from '../types'
import { paramify, setify, TIMESTAMPS } from '../util/params'

const DEFAULT_CREATE_OPTS = {
  id: true,
  timestamps: true,
}

const DEFAULT_UPDATE_OPTS = {
  id: false,
  timestamps: TIMESTAMPS.UPDATED,
}

export async function cypherMerge(
  label: string,
  matchParams: object,
  updateParams: object,
  opts: CypherCreateOpts = {},
): Promise<Cypher1Response> {
  const matchCypher = paramify(matchParams, opts)
  const createCypher = setify(updateParams, {
    ...DEFAULT_CREATE_OPTS,
    ...opts,
    prefix: 'node.',
  })
  const updateCypher = setify(updateParams, {
    ...DEFAULT_UPDATE_OPTS,
    ...opts,
    prefix: 'node.',
  })

  const node = await this.exec1(
    ` 
      MERGE (node:${label} { ${matchCypher} })
      ON CREATE SET ${createCypher}
      ON MATCH SET ${updateCypher}
      RETURN node;
    `,
  ).then((res) => res?.node)

  // if (opts.after) await opts.after(node)

  return node
}
