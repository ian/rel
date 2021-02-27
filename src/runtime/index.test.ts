import { string } from "~/fields"
import { Runtime } from "./index"

describe("Runtime", () => {
  describe("initialization", () => {
    it("should have an empty reducer", () => {
      const runtime = new Runtime()
      expect(runtime.reducer).toBeDefined()
    })
  })

  describe("#module", () => {
    describe("schema", () => {
      it("should have a type for Book", () => {
        const runtime = new Runtime()
        runtime.module({
          schema: {
            Book: {
              fields: {
                name: string().required()
              }
            }
          }
        })

        expect(runtime.reducer.types).toHaveProperty("Book")

      })
    })

    describe("directives", () => {
      it("should add the directives to the reducer", () => {
        const runtime = new Runtime()

        runtime.module({
          directives: {
            authenticate: {
              typeDef: "directive @authenticate on FIELD_DEFINITION",
              handler: async function (next, src, args, context) {
                throw new Error("AUTHENTICATE")
              },
            },
            admin: {
              typeDef: "directive @admin on FIELD_DEFINITION",
              handler: async function (next, src, args, context) {
                throw new Error("ADMIN")
              },
            },
          },
        })

        const res = runtime.reducer.toReducible()
        expect(res).toHaveProperty("directives")

        expect(res.directives).toEqual(
          expect.objectContaining({
            authenticate: expect.any(Object),
            admin: expect.any(Object),
          })
        )
        // expect(res.directives).toBe(
        //   // expect.objectContaining({
        //   //   authenticate: expect.any(Object),
        //   //   admin: expect.any(Object),
        //   // })
        // )
      })
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
                name: string().required()
              }
            }
          }
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
