import { Direction } from "@reldb/types"

import Rel from "./relations/relation"
import Model from "./objects/model"

export { Geo } from "@reldb/cypher"

export const relation = (label, to?) => new Rel(label, to)
relation.Direction = Direction

export const model = (opts?) => new Model(opts)

export * from "./fields"
export * from "./objects"
