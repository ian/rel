import { Reducer } from "."
import { Fields, Accessors, Reducible } from "@reldb/types"
import { generateFind } from "./find"
import { generateList } from "./list"

export function reduceAccessors(
  label,
  accessors: Accessors,
  fields: Fields
): Reducible {
  const reducer = new Reducer()

  if (accessors) {
    if (accessors.find) {
      reducer.reduce(generateFind(label, accessors.find, fields))
    }
    if (accessors.list) {
      reducer.reduce(generateList(label, accessors.list, fields))
    }
  }

  return reducer.toReducible()
}
