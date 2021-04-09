export { default as server } from "./server"
export { default as testServer } from "./server/testServer"

export { default as Connection } from "./cypher"
export { Geo } from "./util/geo"
export * as Fields from "./fields"

// @todo change these to use default export as Rel object rollup
import * as Fields from "./fields"
import * as Models from "./models"
import * as Relations from "./relations"
import Endpoints from "./endpoints"

export default {
  ...Fields,
  ...Models,
  ...Relations,
  ...Endpoints,
}

export * from "./types"
