import { model, string } from "@reldb/meta"
import { makeServer } from "@reldb/testing"
import { Models } from "../../src/index"

describe("Models.Social", () => {
  describe("#typedefs", () => {
    const { typeDefs } = makeServer({
      auth: {
        model: new Models.Social(),
        strategies: [],
      },
      schema: {
        User: model()
          .fields({
            name: string().required(),
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
