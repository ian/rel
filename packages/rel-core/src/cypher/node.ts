import { paramify } from "../util/params"

export type CypherNodeOpts = {
  name: string
  params?: object
  label?: string
}

export function cypherNode(optsOrLabel: CypherNodeOpts) {
  const _cypher = []

  const { name, params, label } = optsOrLabel
  _cypher.push(name)
  if (label) _cypher.push(`:${label}`)
  if (params) _cypher.push(` { ${paramify(params)}} `)

  return `(${_cypher.join("")})`
}
