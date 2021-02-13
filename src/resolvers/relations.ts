import _ from "lodash"
import { resolveNode } from "./node"
import { Direction, Rel, Relation } from "../types"
import { cypher1, cypher, cypherListRelationship } from "../cypher"

export enum RelDirection {
  IN = "IN",
  OUT = "OUT",
}

// export type BuildRelOpts = {
//   label: string
//   direction?: RelDirection
// }

export function resolveRel(rel: Rel) {
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
