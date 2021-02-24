import { Reducer } from "~/reducer"
import { Fields, Mutators, Reducible } from "~/types"
import { generateCreate } from "./create"
import { generateUpdate } from "./update"
import { generateDelete } from "./delete"

export function generateMutators(
  label,
  mutators: Mutators,
  fields: Fields
): Reducible {
  const reducer = new Reducer()

  if (mutators) {
    if (mutators.create) {
      reducer.reduce(generateCreate(label, mutators.create, fields))
    }
    if (mutators.update) {
      reducer.reduce(generateUpdate(label, mutators.update, fields))
    }
    if (mutators.delete) {
      reducer.reduce(generateDelete(label, mutators.update, fields))
    }
  }

  return reducer.toReducible()
}
