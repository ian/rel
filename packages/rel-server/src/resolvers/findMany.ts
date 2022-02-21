export default function findManyResolver(label: string) {
  return async (obj, args, context, info) => {
    const { cypher } = context
    return cypher.list(label, args)
  }
}
