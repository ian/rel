import Rel, { testServer } from "@reldb/run"
import { Models } from "../../src/index"

describe("Models.Social", () => {
  describe("#typedefs", () => {
    const { typeDefs } = testServer({
      auth: {
        model: new Models.Social(),
        strategies: [],
      },
      schema: {
        User: Rel.model()
          .fields({
            name: Rel.string().required(),
          })
          .accessors(false)
          .mutators(false),
      },
    })

    it("should have a User", () => {
      expect(typeDefs).toMatch(`
type User {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  following: [User]!
  followers: [User]!
  name: String!
}`)
    })
  })
})
