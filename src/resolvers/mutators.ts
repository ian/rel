import { Fields, Mutator } from "../generator/types"
import { cypherCreate, cypherUpdate } from "../cypher"
import { buildResolver } from "./builder"

export function createResolver(
  label: string,
  fields: Fields,
  mutator: Mutator
) {
  return buildResolver(async ({ params }) => {
    const { input } = params
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

    const updated = await cypherUpdate(label, id, input)
    if (mutator.after) {
      await mutator.after(updated)
    }
    return updated
  })
}
