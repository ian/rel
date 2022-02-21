export default function updateResolver(label: string) {
  return async (obj, args, context, info) => {
    const { where, data } = args
    const { cypher } = context

    return cypher.update(label, where, data)
  }
}
