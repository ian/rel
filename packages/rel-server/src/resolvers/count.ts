export default function countResolver(label: string) {
  return async (obj, args, context, info) => {
    const { cypher } = context
    return cypher.count(label, args)
  }
}
