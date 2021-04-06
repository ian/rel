import { Field } from "../fields"
import { Relation } from "../relations"
import { ModelProps } from "../types"

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

function getTopmostParentClass(targetClass) {
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
