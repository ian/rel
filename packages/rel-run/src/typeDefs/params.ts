import { Params } from "@reldb/types"
import { fieldToGQL } from "./field"

export function paramsToGQL(params: Params) {
  return Object.entries(params)
    .map((entry) => fieldToGQL(...entry))
    .join(", ")
}
