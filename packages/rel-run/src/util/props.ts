import { Field } from "../fields"
import { Relation } from "../relations"
import { ModelProps } from "../types"
import { getTopmostParentClass } from "./object"

type SplitProps = [{ [name: string]: Field }, { [name: string]: Relation }]

export function splitProps(props: ModelProps): SplitProps {
  const fields = {}
  const relations = {}

  Object.entries(props).forEach((entry) => {
    const [name, prop] = entry
    const baseClass = getTopmostParentClass(prop.constructor)
    switch (baseClass) {
      case "Field":
        fields[name] = prop
        break
      case "Relation":
        relations[name] = prop
        break
    }
  })

  return [fields, relations]
}
