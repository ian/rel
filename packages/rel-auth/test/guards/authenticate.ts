import Rel, { testServer } from "@reldb/run"
import { authenticate } from "../../src"

describe("authenticate", () => {
  const server = () => {
    return testServer({ log: false })
      .endpoints(
        Rel.query("AuthenticatedQuery", Rel.boolean(), () => {
          return true
        }).guard(authenticate)
      )
      .runtime()
  }
  const { graphql, typeDefs } = server()

  // beforeEach(async (done) => {
  //   const { data, errors } = await graphql(`
  //     mutation {
  //       auth: LoginWithEmailPassword(
  //         email: "ian@rel.run"
  //         password: "supersecure123!"
  //       ) {
  //         token
  //         user {
  //           id
  //         }
  //       }
  //     }
  //   `)
  // })

  it("should require a user for authenticate guards", async (done) => {
    const { data, errors } = await graphql(`
      query {
        AuthenticatedQuery
      }
    `)

    expect(data.AuthenticatedQuery).toEqual(null)
    expect(errors[0].message).toEqual("Must be authenticated")

    done()
  })
})

describe("hasRole", () => {})

describe("admin", () => {})
