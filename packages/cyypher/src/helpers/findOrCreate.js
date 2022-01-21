export async function cypherFindOrCreate (
  label,
  find,
  create = {},
  opts = {}
) {
  let node = await this.find(label, find)
  if (!node) {
    node = await this.create(label, { ...find, ...create }, opts)
  }

  return node
}
