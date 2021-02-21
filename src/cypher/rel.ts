import { Direction } from "~/types"

export type CypherRelOpts = {
  name: string
  direction?: Direction
  label: string
}

export function cypherRel(rel: CypherRelOpts | string) {
  // if (typeof rel === "string") return `-[:${rel}]-`
  const { name, direction, label } = <CypherRelOpts>rel
  switch (direction) {
    case Direction.IN:
      return `<-[${name}:${label}]-`
    case Direction.OUT:
      return `-[${name}:${label}]->`
    default:
      return `-[${name}:${label}]-`
  }
}
