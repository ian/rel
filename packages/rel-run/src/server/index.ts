import { Server, ServerConfig } from "./server"

export { default as Hydrator } from "./hydrator"
export { default as Reducer } from "./reducer"
export { ServerConfig } from "./server"

export default (config: ServerConfig) => new Server(config)
