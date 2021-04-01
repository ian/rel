import _ from "lodash"
import { Direction } from "@reldb/types"

export type ResolvedRel = {
  from: {
    label: string
  } | null
  to: {
    label: string
  }
  rel: {
    label: string
    direction: Direction
  }
  singular: boolean
  order: string
  guard?: string
}

export function resolveRel(rel) {
  return {
    name: _.camelCase(rel.label) + "Rel",
    direction: rel.direction,
    label: rel.label,
  }
}
