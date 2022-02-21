export default function deleteManyResolver(label: string) {
  return async (obj, args, context, info) => {
    const { where, data } = args
    const { cypher } = context

    return cypher.deleteMany(label, where, data)
  }
}
