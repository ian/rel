import { Fields, Mutator } from "../generator/types"
import { cypherCreate, cypherUpdate, cypherDelete } from "../cypher"
import { buildResolver } from "./builder"

export function createResolver(
  label: string,
  fields: Fields,
  mutator: Mutator
) {
  return buildResolver(async ({ params }) => {
    const { input } = params

    // @todo validation
    // @todo slugs
    // @todo geo

    const created = await cypherCreate(label, input)
    if (mutator.after) {
      await mutator.after(created)
    }
    return created
  })
}

export function updateResolver(
  label: string,
  fields: Fields,
  mutator: Mutator
) {
  return buildResolver(async ({ params }) => {
    const { id, input } = params

    // @todo validation
    // @todo slugs
    // @todo geo

    const updated = await cypherUpdate(label, id, input)
    if (mutator.after) {
      await mutator.after(updated)
    }
    return updated
  })
}

export function deleteResolver(label: string, mutator: Mutator) {
  return buildResolver(async ({ params }) => {
    const { id } = params

    const updated = await cypherDelete(label, id)
    if (mutator.after) {
      await mutator.after(updated)
    }
    return updated
  })
}
