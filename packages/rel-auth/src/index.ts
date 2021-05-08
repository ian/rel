import { AuthStrategy } from "./types"

export { default as Auth } from "./common/auth"
export { default as Strategies } from "./strategies"
export * from "./guards"

export type AuthOpts = {
  strategies: AuthStrategy[]
}
