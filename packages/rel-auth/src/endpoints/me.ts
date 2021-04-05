import Rel, { ENDPOINTS } from "@reldb/run"
import crypto from "../util/crypto"

export default {
  Me: {
    target: ENDPOINTS.ACCESSOR,
    params: { token: Rel.string().required() },
    returns: Rel.type("Auth"),
    resolver: async ({ cypher, params }) => {
      const decoded = await crypto.decode(params.token)

      if (decoded) {
        const user = await cypher.find("User", { id: decoded.userId })
        if (!user) return null
        const token = await crypto.token(user)

        return {
          admin: user.admin,
          user,
          token,
        }
      }

      throw new Error("Must be authenticated")
    },
  },
}
