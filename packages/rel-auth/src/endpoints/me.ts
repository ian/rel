import Rel from "@reldb/run"
import crypto from "../util/crypto"

export default Rel.query("Me", Rel.ref("Auth"), {
  params: { token: Rel.string().required() },
}).resolver(async (runtime) => {
  const { params, cypher } = runtime
  const decoded = await crypto.decode(params.token)

  if (decoded) {
    const user = await cypher.find("User", { id: decoded.userId })
    if (!user) return null
    const token = await crypto.token(user)

    return {
      // admin: user.admin,
      user,
      token,
    }
  }

  throw new Error("Must be authenticated")
})
