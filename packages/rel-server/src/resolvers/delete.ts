export default function deleteResolver(label: string) {
  return async (obj, args, context, info) => {
    const { where } = args
    const { cypher } = context

    // In an ideal world we'd be able to alias the deleted node and return its
    // contents. This unfortunately isn't possible in redis-graph right now.
    //
    // If it were it'd look something like this:
    // MATCH (node:Label)
    // WHERE node.id = "..."
    // WITH node, properties(node) AS match
    // DETACH DELETE node
    // RETURN match
    // LIMIT 1
    //
    // For now, let's just find an then delete the node.

    const node = await cypher.find(label, where)
    if (node) {
      const count = await cypher.delete(label, { id: node.id })
      console.log({ count })
    }
    return node
  }
}
