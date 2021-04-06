import { Direction } from "../types"
import Relation from "./relation"

export const relation = (label, to?) => new Relation(label, to)
relation.Direction = Direction

export { default as Relation } from "./relation"
