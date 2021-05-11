import Rel from "@reldb/run"
import crypto from "../util/crypto"

export default Rel.query(
  "Me",
  {
    token: Rel.string().required(),
  },
  Rel.ref("Auth"),
  async (obj, params, context) => {
    const { cypher } = context
    const decoded = await crypto.decode(params.token)

    if (decoded) {
      const user = await cypher.find("User", { id: decoded.userId })
      if (!user) return null
      const token = await crypto.token(user)

      return {
        user,
        token,
      }
    }

    throw new Error("Must be authenticated")
  }
)
