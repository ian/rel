import { Field } from "../types"
import { Relation } from "../meta"
import { ModelProperties } from "../types"
import { getTopmostParentClass } from "./object"

type SplitProps = [{ [name: string]: Field }, { [name: string]: Relation }]

export function splitProps(props: ModelProperties): SplitProps {
  const fields = {}
  const relations = {}

  Object.entries(props).forEach((entry) => {
    const [name, prop] = entry
    const baseClass = getTopmostParentClass(prop.constructor)
    switch (baseClass) {
      case "Field":
      case "FieldImpl":
        fields[name] = prop
        break
      case "Relation":
      case "RelationImpl":
        relations[name] = prop
        break
    }
  })

  return [fields, relations]
}

export function duplicateProps(fields: { [fieldName: string]: Field }) {
  return Object.entries(fields).reduce((acc, entry) => {
    const [name, field] = entry
    const clone = Object.assign({}, field)
    Object.setPrototypeOf(clone, Object.getPrototypeOf(field))
    acc[name] = clone.required(false)
    return acc
  }, {})
}
