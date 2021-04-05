import { AuthError, userLoader } from "../util"

export const authenticate = {
  resolver: async function (runtime) {
    const authUser = await userLoader(runtime)
    if (!authUser) throw new AuthError("Authorization required")
    Object.assign(runtime.context, { authUser })
  },
}
