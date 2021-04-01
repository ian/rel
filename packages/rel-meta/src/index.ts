import { Direction } from "@reldb/types"

import Rel from "./rel"
import Model from "./model"

export { Geo } from "@reldb/cypher"

export const rel = (label) => new Rel(label)
rel.Inbound = (label) => rel(label).direction(Direction.IN)
rel.Direction = Direction

export const model = (opts?) => new Model(opts)

export * from "./fields"
export { default as ModelField } from "./model"
