import pluralize from "pluralize"
import _ from "lodash"
import {
  Fields,
  ModelEndpointsListOpts,
  GraphQLOperationType,
  Reducible,
} from "../../types"

import { array, int, string, ref } from "../../fields"

export default function reducedList(
  label: string,
  endpoint: boolean | ModelEndpointsListOpts,
  fields: Fields
): Reducible {
  if (!endpoint) return null

  const _endpoint = typeof endpoint === "boolean" ? {} : endpoint
  const { guard } = _endpoint

  return {
    graphQLEndpoints: {
      label: `List${pluralize(label)}`,
      type: GraphQLOperationType.QUERY,
      params: {
        limit: int(),
        skip: int(),
        order: string(),
        where: ref(`_${label}Where`),
      },
      guard,
      returns: array(ref(label)).required(),
      resolver: (runtime) => {
        const { cypher, params } = runtime
        const { limit, skip = 0, order = "id" } = params
        const {
          // boundingBox,
          // filter,
        } = params

        return cypher.list(label, { where: params.where, limit, skip, order })
      },
    },
  }
}
