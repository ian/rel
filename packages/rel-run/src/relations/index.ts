import { Direction } from "../types"
import Relation, { RelationOpts } from "./relation"

export const relation = (label: string, to: string, opts?: RelationOpts) =>
  new Relation(label, to, opts)
relation.Direction = Direction

export { default as Relation } from "./relation"
