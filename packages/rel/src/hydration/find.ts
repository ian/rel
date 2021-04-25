import { Hydrator } from "../server"
import { Fields, ModelEndpointOpts, GraphQLOperation, Reduced } from "../types"

import Rel from "../meta"

export default function reducedFind(
  label,
  endpoint: boolean | ModelEndpointOpts,
  fields: Fields
) {
  if (!endpoint) return null
  let _endpoint = typeof endpoint === "boolean" ? {} : endpoint

  return (hydrator: Hydrator) => {
    hydrator.endpoints(
      Rel.query(
        `Find${label}`,
        { where: Rel.ref(`${label}Where`).required() },
        Rel.ref(label),
        (runtime) => {
          const { cypher, params } = runtime
          return cypher.find(label, params.where)
        }
      ).guard(_endpoint.guard)
    )
  }
}
