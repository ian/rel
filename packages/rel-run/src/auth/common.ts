import moment from "moment"
import { ENDPOINTS } from "@reldb/types"
import { string, type } from "@reldb/meta"
import { cypher1 } from "../cypher"
import crypto from "../util/crypto"

export class AuthError extends Error {
  constructor(message) {
    super(message)
  }
}

export async function directiveLoader(context) {
  const { auth } = context
  if (!auth) throw new AuthError("Must be authenticated")

  const { userId, expiresAt } = auth

  if (expiresAt && moment()) {
    if (moment(expiresAt).isBefore(moment())) {
      throw new AuthError("Expired authentication")
    }
  }

  const authUser = await findUserById(userId)

  return authUser
}

export async function findUserById(id) {
  return cypher1(
    `
  MATCH (node:User)
  WHERE node.id = "${id}"
  RETURN node
  LIMIT 1;
`
  ).then((res) => res?.node)
}

export default {
  schema: {
    Auth: {
      id: false,
      timestamps: false,
      input: false,
      fields: {
        token: string().required(),
        user: type("User").required(),
      },
    },
    User: {
      fields: {
        name: string().required(),
      },
    },
  },
  guards: {
    authenticate: {
      resolver: async function ({ context }) {
        const authUser = await directiveLoader(context)
        Object.assign(context, { authUser })
      },
    },
    admin: {
      resolver: async function ({ context }) {
        const authUser = await directiveLoader(context)
        if (!authUser.admin) throw new AuthError("Operation not allowed")
        Object.assign(context, { authUser })
      },
    },
  },
  endpoints: {
    Me: {
      target: ENDPOINTS.ACCESSOR,
      params: { token: string().required() },
      returns: type("Auth"),
      resolver: async ({ params }) => {
        const decoded = await crypto.decode(params.token)

        if (decoded) {
          const user = await findUserById(decoded.userId)
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
  },
}
