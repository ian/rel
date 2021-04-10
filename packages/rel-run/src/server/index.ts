import Server, { ServerConfig } from "./server"

export { default as Hydrator } from "./hydrator"
export { default as Reducer } from "./reducer"
export { default as Server, ServerConfig } from "./server"

export default (config: ServerConfig) => new Server(config)
