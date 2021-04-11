import { ref, uuid } from "../../fields"
import {
  ModelEndpointsDeleteOpts,
  Fields,
  GraphQLOperationType,
  Reduced,
} from "../../types"

export default function reducedDelete(
  label: string,
  endpointOrBoolean: boolean | ModelEndpointsDeleteOpts,
  fields: Fields
): Reduced {
  if (!endpointOrBoolean) return null

  let endpoint = typeof endpointOrBoolean === "boolean" ? {} : endpointOrBoolean

  const { guard } = endpoint

  return {
    graphQLEndpoints: [
      {
        label: `Delete${label}`,
        type: GraphQLOperationType.MUTATION,
        params: { id: uuid().required() },
        guard,
        returns: ref(label),
        resolver: async ({ cypher, params }) => {
          const { id } = params

          const updated = await cypher.delete(label, id)
          if (endpoint.after) {
            await endpoint.after(updated)
          }
          return updated
        },
      },
    ],
  }
}
