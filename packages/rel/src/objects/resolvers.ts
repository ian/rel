import { ModelEndpointOpts, Hydrator, Runtime, InputProperties } from "../types"

export function createResolver(
  label: string,
  endpoint: ModelEndpointOpts,
  inputProps: InputProperties
) {
  return async (...runtime: Runtime) => {
    const [obj, params, context] = runtime
    const { cypher } = context

    // @todo validation

    const defaults = await objectDefaults(
      runtime,
      label,
      params.input,
      inputProps
    )

    const values = {
      ...defaults,
      ...params.input,
    }

    const created = await cypher.create(label, values)

    // if (endpoint.after) {
    //   await endpoint.after(created)
    // }

    return created
  }
}

export function updateResolver(
  label: string,
  endpoint: ModelEndpointOpts,
  inputProps
) {
  return async (obj, params, context) => {
    const { cypher } = context
    const { id, input } = params

    // @todo validation

    // @todo we need to split this logic into a models format
    // ie instead of:
    //   await cypherUpdate(...)
    // it should be:
    //   await models[label].update(...)
    // Models should contain the fields/resolvers -> cypher mapping

    const updated = await cypher.update(label, id, input)

    // if (endpoint.after) {
    //   await endpoint.after(updated)
    // }

    return updated
  }
}

export function deleteResolver(label: string, endpoint: ModelEndpointOpts) {
  return async (obj, params, context) => {
    const { cypher } = context
    const { id } = params

    const updated = await cypher.delete(label, id)
    return updated
  }
}

export function findResolver(label) {
  return async (obj, params, context) => {
    const { cypher } = context
    return cypher.find(label, params.where)
  }
}

export function listResolver(label: string, endpoint: ModelEndpointOpts) {
  return async (obj, params, context) => {
    const { cypher } = context
    const { limit, skip = 0, order = "id" } = params
    const {
      // boundingBox,
      // filter,
    } = params

    return cypher.list(label, { where: params.where, limit, skip, order })
  }
}

export async function objectDefaults(
  runtime: Runtime,
  modelName: string,
  obj: object,
  props: InputProperties
) {
  const _defaults = {}
  for (const entry of Object.entries(props)) {
    const [fieldName, prop] = entry
    const [_, params, context, info] = runtime
    const val = await prop.defaulted([obj, params, context, info], {
      modelName,
      fieldName,
    })
    if (typeof val !== "undefined") _defaults[fieldName] = val
  }

  return _defaults
}
