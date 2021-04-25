import Rel from "@reldb/run"
import { AuthStrategy } from "./types"

export default class EmailPassword implements AuthStrategy {
  hydrate(hydrator) {
    hydrator.schema(
      Rel.model("User", {
        email: Rel.string().required(),
      })
    )

    hydrator.endpoints(
      Rel.mutation(
        "LoginViaEmailPassword",
        { token: Rel.string().required() },
        Rel.ref("Auth"),
        async ({ params }) => {
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
        }
      ),
      Rel.mutation(
        "RegisterViaEmailPassword",
        { token: Rel.string().required() },
        Rel.ref("Auth"),
        async ({ params }) => {
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
        }
      )
    )
  }
}
