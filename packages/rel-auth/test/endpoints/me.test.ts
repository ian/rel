import { testServer } from "@reldb/run"
import { Strategies } from "../../src/index"
import crypto from "../../src/util/crypto"

describe("Me", () => {
  const server = () => {
    return testServer({ log: false }).auth(Strategies.EmailPassword).runtime()
  }
  const { cypher, graphql, typeDefs } = server()

  describe("typeDef", () => {
    it("should generate the Me endpoint", () => {
      expect(typeDefs).toMatch(`Me(token: String!): Auth`)
    })
  })

  it("should Me", async (done) => {
    const user = await cypher.create("User", {
      email: "ian@rel.run",
      password: await crypto.hash("supersecure123!"),
    })
    const token = await crypto.sign({
      userId: user.id,
    })

    const { data, errors } = await graphql(`
      query {
        Me(token: "${token}") {
          user {
            id
          }
        }
      }
    `)

    expect(errors).toBeUndefined()
    expect(data?.Me.user.id).toEqual(user.id)

    done()
  })

  it("should error on wrong email", async (done) => {
    const { data, errors } = await graphql(`
      query {
        Me(token: "FAKE123") {
          user {
            id
          }
        }
      }
    `)

    expect(errors[0].message).toEqual("Must be authenticated")
    expect(data.Me).toBeNull()

    done()
  })
})
