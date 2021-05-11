import { init, ConnectionType } from "./connection"

export { default as Cypher } from "./instance"
export { init, ConnectionConfig } from "./connection"

export default {
  init,
  ...ConnectionType,
}
