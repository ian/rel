import { Fields, Mutator } from "../types"
import { cypherCreate, cypherUpdate, cypherDelete } from "../cypher"

export function createResolver(
  label: string,
  mutator: Mutator
  // fields: Fields,
) {
  return async ({ params }) => {
    const { input } = params

    // @todo validation
    // @todo slugs
    // @todo geo

    const created = await cypherCreate(label, input)
    if (mutator.after) {
      await mutator.after(created)
    }
    return created
  }
}

export function updateResolver(
  label: string,
  mutator: Mutator
  // fields: Fields,
) {
  return async ({ params }) => {
    const { id, input } = params

    // @todo validation
    // @todo slugs
    // @todo geo

    const updated = await cypherUpdate(label, id, input)
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
