import Rel, { Types } from "@reldb/run"
import Auth from "../common/auth"
import crypto from "../util/crypto"

export default (hydration: Types.HydrationOpts) => {
  const { hydrator } = hydration
  hydrator.auth(Auth)

  // Add email to user model
  hydrator.schema(
    Rel.model("User", {
      email: Rel.string().required(),
    })
  )

  hydrator.endpoints(
    Rel.mutation(
      "LoginWithEmailPassword",
      { email: Rel.string().required(), password: Rel.string().required() },
      Rel.ref("Auth"),
      async (obj, params, context) => {
        const { cypher } = context
        const { email, password } = params
        const user = await cypher.find("User", { email })
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
      }
    ),
    Rel.mutation(
      "RegisterWithEmailPassword",
      { email: Rel.string().required(), password: Rel.string().required() },
      Rel.ref("Auth"),
      async (obj, params, context) => {
        const { cypher } = context
        const { email, password } = params

        const existing = await cypher.find("User", { email })
        if (existing)
          throw new Error("Registration failed, user with email already exists")

        const user = await cypher.create("User", {
          email,
          password: await crypto.hash(password),
        })

        const token = await crypto.sign({
          userId: user["id"],
        })

        return {
          user,
          token,
        }
      }
    )
  )
}
