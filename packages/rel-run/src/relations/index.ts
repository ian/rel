import { Direction } from "../types"
import Rel from "./relation"

export const relation = (label, to?) => new Rel(label, to)
relation.Direction = Direction
