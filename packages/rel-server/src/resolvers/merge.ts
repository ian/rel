export default function mergeResolver(label: string) {
  return async (obj, args, context, info) => {
    const { where, data } = args
    const { cypher } = context

    return cypher.merge(label, where, data)
  }
}
