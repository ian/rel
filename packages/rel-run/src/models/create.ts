import { ref } from "../fields"
import {
  ModelEndpointsCreateOpts,
  Fields,
  GraphQLOperationType,
  ReducedGQLEndpoint,
} from "../types"

const DEFAULT_MUTATOR = {}

function makeResolver(
  label: string,
  endpoint: ModelEndpointsCreateOpts,
  fields: Fields
) {
  return async (runtime) => {
    const { params, cypher } = runtime
    const { input } = params

    // @todo validation

    const values = await resolveFieldsForCreate(label, fields, input, cypher)

    // @todo we need to split this logic into a models format
    // ie instead of:
    //   await cypherCreate(...)
    // it should be:
    //   await models[label].create(...)
    // Models should contain the fields/resolvers -> cypher mapping

    const created = await cypher.create(label, values)
    if (endpoint.after) {
      await endpoint.after(created)
    }

    return created
  }
}

export async function resolveFieldsForCreate(
  label: string,
  fields: Fields,
  input,
  cypher
) {
  let values = {}

  for (const field of Object.entries(fields)) {
    const [fieldName, fieldDef] = field
    if (fieldDef._default) {
      if (typeof fieldDef._default === "function") {
        values[fieldName] = await fieldDef._default({
          label,
          fieldName,
          values: input,
          cypher,
        })
      } else {
        values[fieldName] = await fieldDef._default
      }
    } else {
      values[fieldName] = input[fieldName]
    }
  }

  return values
}

export function createEndpoints(
  label: string,
  endpoint: boolean | ModelEndpointsCreateOpts,
  fields: Fields
): ReducedGQLEndpoint {
  if (!endpoint) return null

  let _endpoint = {
    ...DEFAULT_MUTATOR,
    ...(typeof endpoint === "boolean" ? {} : endpoint),
  }

  const { guard } = _endpoint

  return {
    label: `Create${label}`,
    type: GraphQLOperationType.MUTATION,
    params: { input: ref(`${label}Input`).required() },
    guard,
    returns: ref(label),
    resolver: makeResolver(label, _endpoint, fields),
  }
}
