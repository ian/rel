import pluralize from "pluralize"
import _ from "lodash"
import {
  Fields,
  ModelEndpointOpts,
  GraphQLOperation,
  Hydrator,
  Reduced,
} from "../types"

import Rel from "../meta"

export default function reducedList(
  label: string,
  endpoint: boolean | ModelEndpointOpts,
  fields: Fields
) {
  if (!endpoint) return null

  const _endpoint = typeof endpoint === "boolean" ? {} : endpoint
  const { guard } = _endpoint

  return (hydrator: Hydrator) => {
    hydrator.endpoints(
      Rel.query(
        `List${pluralize(label)}`,
        {
          limit: Rel.int(),
          skip: Rel.int(),
          order: Rel.string(),
          where: Rel.ref(`${label}Where`),
        },
        Rel.array(Rel.ref(label)).required(),
        (runtime) => {
          const { cypher, params } = runtime
          const { limit, skip = 0, order = "id" } = params
          const {
            // boundingBox,
            // filter,
          } = params

          return cypher.list(label, { where: params.where, limit, skip, order })
        }
      ).guard(_endpoint.guard)
    )
  }
}
