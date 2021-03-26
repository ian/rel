import { Reducer } from "."
import { Fields, Mutators, Reducible } from "@reldb/types"
import { generateCreate } from "./create"
import { generateUpdate } from "./update"
import { generateDelete } from "./delete"

export function reduceMutators(
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
      reducer.reduce(generateDelete(label, mutators.delete, fields))
    }
  }

  return reducer.toReducible()
}
