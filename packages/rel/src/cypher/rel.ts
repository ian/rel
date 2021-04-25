import { RelationDirection } from "../types"
import { paramify } from "./util/params"

export type CypherRelOpts = {
  name: string
  direction?: RelationDirection
  label: string
  values?: object
}

export function cypherRel(rel: CypherRelOpts | string) {
  const { name, direction, label, values } = <CypherRelOpts>rel

  const inner = [`${name}:${label}`]
  if (values) inner.push(`{ ${paramify(values)} }`)

  switch (direction) {
    case RelationDirection.IN:
      return `<-[${inner.join(" ")}]-`
    case RelationDirection.OUT:
      return `-[${inner.join(" ")}]->`
    case RelationDirection.NONE:
    default:
      return `-[${inner.join(" ")}]-`
  }
}
