import Rel from "@reldb/run"
import { AuthError, userLoader } from "./util"

export const admin = Rel.guard("admin").handler(async function (runtime) {
  const authUser = await userLoader(runtime)
  if (!authUser.admin) throw new AuthError("Operation not allowed")
  Object.assign(runtime.context, { authUser })
})

export const authenticate = Rel.guard("authenticate").handler(async function (
  runtime
) {
  const authUser = await userLoader(runtime)
  if (!authUser) throw new AuthError("Authorization required")
  Object.assign(runtime.context, { authUser })
})
