import moment from "moment"
import AuthError from "./AuthError"
import { cypherFind } from "@reldb/cypher"

export default async function userLoader(context) {
  const { auth } = context
  if (!auth) throw new AuthError("Must be authenticated")

  const { userId, expiresAt } = auth

  if (expiresAt && moment()) {
    if (moment(expiresAt).isBefore(moment())) {
      throw new AuthError("Expired authentication")
    }
  }

  return cypherFind("User", { id: userId })
}