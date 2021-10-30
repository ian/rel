import { Cypher1Response, CypherCreateOpts } from '../types'

const DEFAULT_CREATE_OPTS = {
  id: true,
  timestamps: true,
}

export async function cypherFindOrCreate(
  label: string,
  find: object,
  create: object = {},
  opts: CypherCreateOpts = {},
): Promise<Cypher1Response> {
  let node = await this.find(label, find)
  if (!node) {
    node = await this.create(label, { ...find, ...create }, opts)
  }

  return node
}
