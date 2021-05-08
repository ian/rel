import Rel from "@reldb/run"
import { AuthError, userLoader } from "../util"

export const admin = Rel.guard("admin").handler(async function (runtime) {
  const authUser = await userLoader(runtime)
  if (!authUser.admin) throw new AuthError("Operation not allowed")
  Object.assign(runtime.context, { authUser })
})
