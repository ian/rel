import { RuntimeOpts } from "@reldb/types"
import Runtime from "./runtime"

export { default as Reducer } from "./reducer"

export function generate(opts: RuntimeOpts) {
  const { auth, ...config } = opts
  const runtime = new Runtime()

  if (auth) runtime.auth(auth)

  runtime.module(config)

  return runtime.generate()
}
