import _ from "lodash"
import { resolveNode } from "./node"
import { cypher1, cypher, cypherListRelationship } from "../cypher"
import { Rel, Relation } from "~/types"

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

export function relationResolver(relation: Relation) {
  const { from, to, singular = false, order, rel } = relation

  return async (obj, params, context) => {
    const runtime = { obj, params, context }
    const fromResolved = resolveNode("from", from, runtime, {
      // default the from to be the current object
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
