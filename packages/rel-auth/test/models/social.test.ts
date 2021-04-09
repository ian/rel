import Rel, { testServer } from "@reldb/run"
import { Models } from "../../src/index"

describe("Models.Social", () => {
  describe("#typedefs", () => {
    const { typeDefs } = testServer({ log: true })
      .schema({
        User: Rel.model(
          {
            name: Rel.string().required(),
          },
          { endpoints: true }
        ),
      })
      .auth(new Models.Social(), [])
      .runtime()

    it("should have Auth", () => {
      expect(typeDefs).toMatch(`
type Auth {
  token: String!
  user: User!
}`)
    })

    it("should have a User", () => {
      expect(typeDefs).toMatch(`
type User {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  following: [User]!
  followers: [User]!
}`)
    })
  })
})
