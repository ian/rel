import Rel, { AuthStrategy, GraphQLOperationType } from "@reldb/run"
import { model } from "../../../rel-run/dist/models"
export default class EmailPassword implements AuthStrategy {
  hydrate(hydrator) {
    hydrator.schema({
      User: model({
        fields: {
          email: Rel.string().required(),
        },
      }),
    })

    hydrator.endpoints([
      {
        label: "LoginViaEmailPassword",
        type: GraphQLOperationType.MUTATION,
        params: { token: Rel.string().required() },
        returns: Rel.ref("Auth"),
        resolver: async ({ params }) => {
          // const { email, password } = params
          // const user = await cypherFind("User", {email})
          // if (!user) throw new Error("Login failed, check email and password")

          // const isSamePassword = await crypto.hashCompare(password, user.password)
          // if (!isSamePassword) {
          //   throw new Error("Login failed, check email and password")
          // }

          // const token = await crypto.sign({
          //   userId: user.id,
          // })

          const user = {}
          const token = "FAKE"

          return {
            user,
            token,
          }
        },
      },
      {
        label: "RegisterViaEmailPassword",
        type: GraphQLOperationType.MUTATION,
        params: { input: Rel.ref("UserInput").required() },
        returns: Rel.ref("Auth"),
        resolver: async ({ params }) => {
          // const { input } = params

          // const existing = await findUserByEmail(input.email)
          // if (existing) throw new Error("User with email already exists")

          // const user = await createUser(input)
          // const token = await crypto.sign({
          //   userId: user["id"],
          // })

          const user = {}
          const token = "FAKE"

          return {
            user,
            token,
          }
        },
      },
    ])
  }
}
