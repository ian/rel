export default function updateManyResolver(label: string) {
  return async (obj, args, context, info) => {
    const { where, data } = args
    const { cypher } = context

    return cypher.updateMany(label, where, data)
  }
}
