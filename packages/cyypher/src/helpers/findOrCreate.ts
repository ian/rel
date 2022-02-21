import { Node } from 'src/types.js'

type Params = Record<string, unknown>
type CreateOpts = Params | (() => Promise<Params>)

export async function cypherFindOrCreate(
  label: string,
  find: Params,
  create: CreateOpts = {},
  opts = {}
): Promise<Node> {
  let node = await this.find(label, find)
  if (!node) {
    const createOpts = typeof create === 'function' ? await create() : create
    node = await this.create(label, { ...find, ...createOpts }, opts)
  }

  return node
}
