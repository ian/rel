import { Direction } from "../types"
import { paramify } from "./util/params"

export type CypherRelOpts = {
  name: string
  direction?: Direction
  label: string
  values?: object
}

export function cypherRel(rel: CypherRelOpts | string) {
  const { name, direction, label, values } = <CypherRelOpts>rel

  const inner = [`${name}:${label}`]
  if (values) inner.push(`{ ${paramify(values)} }`)

  switch (direction) {
    case Direction.IN:
      return `<-[${inner.join(" ")}]-`
    case Direction.OUT:
      return `-[${inner.join(" ")}]->`
    case Direction.NONE:
    default:
      return `-[${inner.join(" ")}]-`
  }
}
