export default function createResolver(label: string) {
  return async (obj, args, context, info) => {
    const { data } = args
    const { cypher } = context

    return cypher.create(label, data)
  }
}
