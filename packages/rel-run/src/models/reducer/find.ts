import {
  Fields,
  ModelEndpointsFindOpts,
  GraphQLOperationType,
  Reduced,
} from "../../types"
import { ref } from "../../fields"

export default function reducedFind(
  label,
  endpoint: boolean | ModelEndpointsFindOpts,
  fields: Fields
): Reduced {
  if (!endpoint) return null
  let _endpoint = typeof endpoint === "boolean" ? {} : endpoint

  const { guard } = _endpoint

  return {
    graphQLEndpoints: [
      {
        label: `Find${label}`,
        type: GraphQLOperationType.QUERY,
        params: {
          where: ref(`_${label}Where`).required(),
        },
        guard,
        returns: ref(label),
        resolver: (runtime) => {
          const { cypher, params } = runtime
          return cypher.find(label, params.where)
        },
      },
    ],
  }
}
