import { init, ConnectionType } from "./connection"

export { init, ConnectionConfig } from "./connection"

export default {
  init,
  ...ConnectionType,
}
