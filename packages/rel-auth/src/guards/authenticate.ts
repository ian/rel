import Rel from "@reldb/run"
import { AuthError, userLoader } from "../util"

export const authenticate = Rel.guard("authenticate").resolve(async function (
  ...runtime
) {
  const authUser = await userLoader(runtime)
  if (!authUser) throw new AuthError("Authorization required")
  // Object.assign(runtime.context, { authUser })
})
