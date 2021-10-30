import { Node, NodeRef } from '../types'
import { paramify } from '../util/params'

function normalizeNode(node: Node | string): Node {
  if (typeof node === 'string') {
    return {
      __typename: node,
    }
  } else {
    return node
  }
}

export function cypherNode(name, node: Node | string) {
  const _cypher = []

  const { __typename, ...params } = normalizeNode(node)

  _cypher.push(name)
  if (__typename) _cypher.push(`:${__typename}`)
  if (params) _cypher.push(` { ${paramify(params)}} `)

  return `(${_cypher.join('')})`
}
