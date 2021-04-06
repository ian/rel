import Rel, { AuthStrategy, ENDPOINTS } from "@reldb/run"
export default class EmailPassword implements AuthStrategy {
  reduce(reducer) {
    reducer({
      schema: {
        User: {
          fields: {
            email: Rel.string().required(),
          },
        },
      },
      endpoints: {
        LoginViaEmailPassword: {
          target: ENDPOINTS.MUTATOR,
          params: { token: Rel.string().required() },
          returns: Rel.type("Auth"),
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

        RegisterViaEmailPassword: {
          target: ENDPOINTS.MUTATOR,
          params: { input: Rel.type("UserInput").required() },
          returns: Rel.type("Auth"),
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
      },
    })
  }
}
