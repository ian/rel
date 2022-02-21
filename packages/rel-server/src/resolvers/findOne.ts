import { Context } from "../types"

export default function findOneResolver(label: string) {
  return async (obj, args, context: Context, info) => {
    const { where } = args
    const { cypher } = context

    return cypher.find(label, where)
  }
}
