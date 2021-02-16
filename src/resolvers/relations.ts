import _ from "lodash"
import { resolveNode } from "./node"
// import { Rel, Relation } from "./types"
import { cypher1, cypher, cypherListRelationship } from "../cypher"
import { Direction, Relation } from "../generator/types"

// export type Relation = {
//   from: RelationFrom
//   to: RelationTo
//   rel: Rel
//   direction?: Direction
//   singular?: boolean
//   order?: string
// }

// export enum Direction {
//   IN = "IN",
//   OUT = "OUT",
// }

export type RelOpts = {
  label: string
  direction?: Direction
}

export function resolveRel(rel: RelOpts) {
  // if (typeof rel === "string")
  //   return {
  //     name: _.camelCase(rel) + "Rel",
  //     label: rel,
  //   }

  return {
    name: _.camelCase(rel.label) + "Rel",
    direction: rel.direction,
    label: rel.label,
  }
}

export function relationResolver(definition: Relation) {
  const { from, to, direction, singular = false, order, rel } = definition

  return async (obj, params, context) => {
    // console.log("relationResolver", obj)
    const runtime = { obj, params, context }
    const fromResolved = resolveNode("from", from, runtime, {
      params: ({ obj }) => ({ id: obj.id }),
    })
    const toResolved = resolveNode("to", to, runtime)
    const relResolved = resolveRel(rel)

    const cypherQuery = cypherListRelationship({
      from: fromResolved,
      to: toResolved,
      rel: relResolved,
      order,
    })

    const mapper = (rec) => ({
      __parent: obj,
      // ...(direction === Direction.IN ? rec.from : rec.to),
      ...rec.to,
      [relResolved.name]: rec[relResolved.name],
    })

    if (singular) {
      return cypher1(cypherQuery).then((rec) => {
        // I'm pretty sure this shouldn't happen after we get all the restuarants in but if that happens then figure out why this occurs
        if (!rec) return null
        return mapper(rec)
      })
    } else {
      return cypher(cypherQuery).then((records) => records.map(mapper))
    }
  }
}
