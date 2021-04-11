import { uuid, ref } from "../../fields"
import {
  ModelEndpointsUpdateOpts,
  Fields,
  GraphQLOperationType,
  Reduced,
} from "../../types"

async function resolveFieldsForUpdate(input) {
  let values = {}

  for (const inputEntry of Object.entries(input)) {
    const [fieldName, inputValue] = inputEntry
    values[fieldName] = inputValue
  }

  return values
}

export default function reducedFind(
  label: string,
  endpointOrBoolean: boolean | ModelEndpointsUpdateOpts,
  fields: Fields
): Reduced {
  if (!endpointOrBoolean) return null
  const endpoint =
    typeof endpointOrBoolean === "boolean" ? {} : endpointOrBoolean
  const { guard } = endpoint

  return {
    graphQLEndpoints: [
      {
        label: `Update${label}`,
        type: GraphQLOperationType.MUTATION,
        guard,
        params: {
          id: uuid().required(),
          input: ref(`${label}Input`).required(),
        },
        returns: ref(label),

        resolver: async ({ cypher, params }) => {
          const { id, input } = params

          // @todo validation

          const values = await resolveFieldsForUpdate(input)

          // @todo we need to split this logic into a models format
          // ie instead of:
          //   await cypherUpdate(...)
          // it should be:
          //   await models[label].update(...)
          // Models should contain the fields/resolvers -> cypher mapping

          const updated = await cypher.update(label, id, values)
          if (endpoint.after) {
            await endpoint.after(updated)
          }
          return updated
        },
      },
    ],
  }
}
