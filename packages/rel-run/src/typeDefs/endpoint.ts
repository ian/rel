import { Endpoint } from "../types"
import { paramsToGQL } from "./params"

export function endpointToGQL(name: string, endpoint: Endpoint) {
  const fieldDef = [name]
  const { guard, params, returns } = endpoint

  if (params) {
    fieldDef.push(`( ${paramsToGQL(params)} )`)
  }
  fieldDef.push(": ")

  fieldDef.push(returns._label)
  if (returns._required) fieldDef.push("!")

  if (guard) fieldDef.push(` @${guard}`)

  return fieldDef.join("")
}
