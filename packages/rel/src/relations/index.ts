import Relation from "./relation"

export { default as Relation } from "../relations/relation"

export default {
  relation: (label: string) => new Relation(label),
}
