import { ReducibleInputParams } from "../types"
import { propertyToGQL } from "./property"

export function paramsToGQL(params: ReducibleInputParams) {
  return Object.entries(params)
    .map((entry) => propertyToGQL(...entry))
    .join(", ")
}
