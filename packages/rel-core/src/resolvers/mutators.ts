import { Fields, Mutator } from "../types"
import { resolveFieldsForCreate, resolveFieldsForUpdate } from "./fields"
import { cypherCreate, cypherUpdate, cypherDelete } from "../cypher"

export function createResolver(
  label: string,
  mutator: Mutator,
  fields: Fields
) {
  return async ({ params }) => {
    const { input } = params

    // @todo validation
    // @todo geo

    const values = await resolveFieldsForCreate(label, fields, input)

    // @todo we need to split this logic into a models format
    // ie instead of:
    //   await cypherCreate(...)
    // it should be:
    //   await models[label].create(...)
    // Models should contain the fields/resolvers -> cypher mapping

    const created = await cypherCreate(label, values)
    if (mutator.after) {
      await mutator.after(created)
    }
    return created
  }
}

export function updateResolver(
  label: string,
  mutator: Mutator,
  fields: Fields
) {
  return async ({ params }) => {
    const { id, input } = params

    // @todo validation
    // @todo geo

    const values = await resolveFieldsForUpdate(label, fields, input)

    // @todo we need to split this logic into a models format
    // ie instead of:
    //   await cypherUpdate(...)
    // it should be:
    //   await models[label].update(...)
    // Models should contain the fields/resolvers -> cypher mapping

    const updated = await cypherUpdate(label, id, values)
    if (mutator.after) {
      await mutator.after(updated)
    }
    return updated
  }
}

export function deleteResolver(label: string, mutator: Mutator) {
  return async ({ params }) => {
    const { id } = params

    const updated = await cypherDelete(label, id)
    if (mutator.after) {
      await mutator.after(updated)
    }
    return updated
  }
}
