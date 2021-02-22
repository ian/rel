import Field from "./field"
import { object } from "yup"

export default class Type extends Field {
  _contains = null
  _validator = object()

  constructor(contains: Field) {
    super(`[${contains._name}]`)
    this._contains = contains
  }

  // toGQL(): string {
  //   const fieldDef = [`[${this._contains.toGQL()}]`]
  //   if (this._required) fieldDef.push("!")
  //   // if (this._guard) fieldDef.push(` @${this._guard}`)
  //   // const fieldDef = [this._name]
  //   // if (this._required) fieldDef.push("!")
  //   // if (this._guard) fieldDef.push(` @${this._guard}`)

  //   // return fieldDef.join("")
  // }
}
