import { Runtime } from "./index"

describe("Runtime", () => {
  describe("initialization", () => {
    it("should have an empty reducer", () => {
      const runtime = new Runtime()
      expect(runtime.reducer).toBeDefined()
    })
  })

  describe("#module", () => {
    describe("schema", () => {})

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
              schema: "directive @admin on FIELD_DEFINITION",
              typeDef: async function (next, src, args, context) {
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
})
