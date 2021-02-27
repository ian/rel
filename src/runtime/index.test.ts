import { string } from "~/fields"
import { Runtime } from "./index"

describe("Runtime", () => {
  describe("initialization", () => {
    it("should have an empty reducer", () => {
      const runtime = new Runtime()
      expect(runtime.reducer).toBeDefined()
    })
  })

  describe("#generate", () => {
    describe("typeDefs", () => {
      it("should have a typedef for Book", () => {
        const runtime = new Runtime()

        runtime.module({
          schema: {
            Book: {
              fields: {
                name: string().required(),
              },
            },
          },
        })
        const generated = runtime.generate()
        expect(generated.typeDefs).toMatch(`type Book {
  id: UUID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}`)
      })
    })
  })
})
