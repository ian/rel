import { cypher, cypher1 } from "./cypher"

export { init } from "./connection"

export * from "./cypher"

export * from "./node"
export * from "./find"
export * from "./geolocation"
export * from "./list"
export * from "./create"
export * from "./update"
export * from "./delete"
export * from "./relationship"

export default {
  exec: cypher,
  exec1: cypher1,
}
