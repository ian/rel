import { AuthError, userLoader } from "../util"

export const authenticate = {
  resolver: async function ({ context }) {
    const authUser = await userLoader(context)
    if (!authUser) throw new AuthError("Authorization required")
    Object.assign(context, { authUser })
  },
}
