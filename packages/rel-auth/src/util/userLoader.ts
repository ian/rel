import moment from "moment"
import AuthError from "./AuthError"

export default async function userLoader(runtime) {
  const { cypher, context } = runtime
  const { auth } = context
  if (!auth) throw new AuthError("Must be authenticated")

  const { userId, expiresAt } = auth

  if (expiresAt && moment()) {
    if (moment(expiresAt).isBefore(moment())) {
      throw new AuthError("Expired authentication")
    }
  }

  return cypher.find("User", { id: userId })
}
