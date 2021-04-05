import { AuthError, userLoader } from "../util"

export const admin = {
  resolver: async function ({ context }) {
    const authUser = await userLoader(context)
    if (!authUser.admin) throw new AuthError("Operation not allowed")
    Object.assign(context, { authUser })
  },
}
