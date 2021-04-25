import _ from "lodash"
import { InputProperties } from "../types"

export const clean = (obj) => {
  return _.pickBy(obj, function (value, key) {
    return !(value === undefined || value === null)
  })
}

export function getTopmostParentClass(targetClass) {
  if (targetClass instanceof Function) {
    let baseClass = targetClass

    while (baseClass) {
      const newBaseClass = Object.getPrototypeOf(baseClass)

      if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
        baseClass = newBaseClass
      } else {
        break
      }
    }

    return baseClass.name
  }
}
