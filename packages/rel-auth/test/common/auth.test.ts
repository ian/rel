import { testServer } from "@reldb/run"
import { Auth } from "../../src/index"

describe("Common Auth", () => {
  const server = () => {
    return testServer({ log: false }).auth(Auth).runtime()
  }
  const { typeDefs } = server()

  describe("typeDef", () => {
    it("should generate Auth", () => {
      expect(typeDefs).toMatch(
        `type Profile {
  id: UUID!
}`
      )
    })

    it("should generate Auth", () => {
      expect(typeDefs).toMatch(
        `type User {
  id: UUID!
}`
      )
    })

    it("should generate Auth", () => {
      expect(typeDefs).toMatch(
        `type Auth {
  token: String!
  user: User!
}`
      )
    })
  })
})
