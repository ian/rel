import { Reducer } from "~/reducer"
import { Fields, Accessors } from "~/types"
import { generateFind } from "./find"
import { generateList } from "./list"

export function generateAccessors(label, accessors: Accessors, fields: Fields) {
  const reducer = new Reducer()

  if (accessors) {
    if (accessors.find) {
      reducer.reduce(generateFind(label, accessors.find /*fields*/))
    }
    if (accessors.list) {
      reducer.reduce(generateList(label, accessors.list /*fields*/))
    }
  }

  return reducer.toReducible()
}
