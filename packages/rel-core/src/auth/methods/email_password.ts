import { string, type } from "../../fields"
import { ENDPOINTS, Module } from "../../types"
import { cypher1, cypherCreate } from "../../cypher"
import crypto from "../../util/crypto"

export async function createUser(params): Promise<object> {
  return cypherCreate("User", params)
}

export async function findUserByEmail(email) {
  return cypher1(
    `
  MATCH (node:User)
  WHERE node.email = "${email}"
  RETURN node
  LIMIT 1;
`
  ).then((res) => res?.node)
}

export default {
  schema: {
    User: {
      fields: {
        email: string().required(),
      },
    },
  },
  endpoints: {
    LoginViaEmailPassword: {
      type: ENDPOINTS.MUTATOR,
      typeDef: {
        params: { token: string().required() },
        returns: type("Auth"),
      },
      resolver: async ({ params }) => {
        const { email, password } = params
        const user = await findUserByEmail(email)
        if (!user) throw new Error("Login failed, check email and password")

        const isSamePassword = await crypto.hashCompare(password, user.password)
        if (!isSamePassword) {
          throw new Error("Login failed, check email and password")
        }

        const token = await crypto.sign({
          userId: user.id,
        })

        return {
          user,
          token,
        }
      },
    },

    RegisterViaEmailPassword: {
      type: ENDPOINTS.MUTATOR,
      typeDef: {
        params: { input: type("UserInput").required() },
        returns: type("Auth"),
      },
      resolver: async ({ params }) => {
        const { input } = params

        const existing = await findUserByEmail(input.email)
        if (existing) throw new Error("User with email already exists")

        const user = await createUser(input)
        const token = await crypto.sign({
          userId: user["id"],
        })

        return {
          user,
          token,
        }
      },
    },
  },
} as Module
