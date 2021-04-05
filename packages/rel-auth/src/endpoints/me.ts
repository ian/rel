import { ENDPOINTS } from "@reldb/types"
import { string, type } from "@reldb/meta"
import { cypherFind } from "@reldb/cypher"
import crypto from "../util/crypto"

export default {
  Me: {
    target: ENDPOINTS.ACCESSOR,
    params: { token: string().required() },
    returns: type("Auth"),
    resolver: async ({ params }) => {
      const decoded = await crypto.decode(params.token)

      if (decoded) {
        const user = await cypherFind("User", { id: decoded.userId })
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
