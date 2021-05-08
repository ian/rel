import Rel, { testServer } from "@reldb/run"
import { Strategies } from "../../src/index"
import crypto from "../../src/util/crypto"

describe("EmailPassword", () => {
  const server = () => {
    return testServer({ log: false }).auth(Strategies.EmailPassword).runtime()
  }

  describe("LoginWithEmailPassword", () => {
    const { cypher, graphql, typeDefs } = server()

    beforeEach(async (done) => {
      await cypher.create("User", {
        email: "ian@rel.run",
        password: await crypto.hash("supersecure123!"),
      })
      done()
    })

    describe("typeDef", () => {
      it("should generate the RegisterWithEmailPassword endpoint", () => {
        expect(typeDefs).toMatch(
          `LoginWithEmailPassword(email: String!, password: String!): Auth`
        )
      })
    })

    it("should login", async (done) => {
      const { data, errors } = await graphql(`
        mutation {
          auth: LoginWithEmailPassword(
            email: "ian@rel.run"
            password: "supersecure123!"
          ) {
            token
            user {
              id
            }
          }
        }
      `)

      expect(errors).toBeUndefined()
      expect(data?.auth.token).toBeDefined()
      expect(data?.auth.user).toBeDefined()

      done()
    })

    it("should error on wrong email", async (done) => {
      const { data, errors } = await graphql(`
        mutation {
          auth: LoginWithEmailPassword(
            email: "fake@example.com"
            password: "supersecure123!"
          ) {
            token
            user {
              id
            }
          }
        }
      `)

      expect(errors[0].message).toEqual(
        "Login failed, check email and password"
      )
      expect(data.auth).toBeNull()

      done()
    })

    it("should error on wrong password", async (done) => {
      const { data, errors } = await graphql(`
        mutation {
          auth: LoginWithEmailPassword(
            email: "ian@rel.run"
            password: "NOTREAL!"
          ) {
            token
            user {
              id
            }
          }
        }
      `)

      expect(errors[0].message).toEqual(
        "Login failed, check email and password"
      )
      expect(data.auth).toBeNull()

      done()
    })
  })

  describe("RegisterWithEmailPassword", () => {
    const { cypher, graphql, typeDefs } = server()

    describe("typeDef", () => {
      it("should generate the RegisterWithEmailPassword endpoint", () => {
        expect(typeDefs).toMatch(
          `RegisterWithEmailPassword(email: String!, password: String!): Auth`
        )
      })
    })

    it("should register", async (done) => {
      const { data, errors } = await graphql(`
        mutation {
          auth: RegisterWithEmailPassword(
            email: "ian@rel.run"
            password: "supersecure123!"
          ) {
            token
            user {
              id
            }
          }
        }
      `)

      expect(data.errors).toBeUndefined()
      expect(data?.auth.token).toBeDefined()
      expect(data?.auth.user).toBeDefined()

      done()
    })

    it("should error if email already exists", async (done) => {
      await cypher.create("User", {
        email: "ian@rel.run",
        password: await crypto.hash("supersecure123!"),
      })

      const { data, errors } = await graphql(`
        mutation {
          auth: RegisterWithEmailPassword(
            email: "ian@rel.run"
            password: "supersecure123!"
          ) {
            token
            user {
              id
            }
          }
        }
      `)

      expect(errors[0].message).toEqual(
        "Registration failed, user with email already exists"
      )
      expect(data.auth).toBeNull()

      done()
    })
  })
})
