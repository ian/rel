import { Direction } from "../types"
import Fields from "./fields"
import RelClass from "./rel"

export const Rel = (label) => new RelClass(label)
Rel.Inbound = (label) => new RelClass(label).direction(Direction.IN)
Rel.Direction = Direction

export { default as Fields } from "./fields"

export default {
  Fields,
  Rel,
}
