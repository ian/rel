import { model, string, type, uuid } from "@reldb/meta"
import { ENDPOINTS } from "@reldb/types"
import Reducer, { intersection } from "../../src/runtime/reducer"

describe("Reducer", () => {
  describe("#intersection", () => {
    it("should be empty [] on two empty {}", () => {
      expect(intersection({}, {}).length).toBe(0)
    })

    it("should not have any intersection when first object is empty", () => {
      expect(intersection({}, { test: "val" }).length).toBe(0)
    })

    it("should be empty [] when there is no overlap", () => {
      expect(intersection({ uniq: "val" }, { test: "val" }).length).toBe(0)
    })

    it("should be return keys when o1 has overlap with o2", () => {
      expect(intersection({ same: "val1" }, { same: "val2" }).length).toBe(1)
    })
  })

  describe("#reduce", () => {
    it("shouldn't error when adding a null reduce", () => {
      const reducer = new Reducer()

      expect(() => {
        reducer.reduce(null)
      }).not.toThrowError()

      expect(reducer.endpoints).toBeDefined()
    })

    it("shouldn't error when adding an empty reduce", () => {
      const reducer = new Reducer()

      expect(() => {
        reducer.reduce({})
      }).not.toThrowError()

      expect(reducer.endpoints).toBeDefined()
    })

    describe("schema", () => {
      it("should have a type and input for Book", () => {
        const reducer = new Reducer()

        reducer.reduce({
          schema: {
            Book: model("Book").fields({
              name: string().required(),
            }),
          },
        })

        expect(reducer.inputs).toHaveProperty("BookInput")
        expect(reducer.outputs).toHaveProperty("Book")
      })

      it("should should allow a model to be extended", () => {
        const reducer = new Reducer()

        reducer.reduce({
          schema: {
            Book: model("Book").fields({
              name: string().required(),
            }),
          },
        })

        reducer.reduce({
          schema: {
            Book: model("Book").fields({
              publisher: string(),
            }),
          },
        })

        expect(reducer.inputs).toHaveProperty("BookInput")
        expect(reducer.inputs.BookInput).toHaveProperty("name")
        expect(reducer.inputs.BookInput).toHaveProperty("publisher")

        expect(reducer.outputs).toHaveProperty("Book")
        expect(reducer.outputs.Book).toHaveProperty("name")
        expect(reducer.outputs.Book).toHaveProperty("publisher")
      })
    })

    describe("guards", () => {
      it("should add the guards to the reducer", () => {
        const reducer = new Reducer()

        reducer.reduce({
          guards: {
            authenticate: {
              typeDef: "directive @authenticate on FIELD_DEFINITION",
              resolver: async function () {
                throw new Error("AUTHENTICATE")
              },
            },
            admin: {
              typeDef: "directive @admin on FIELD_DEFINITION",
              resolver: async function () {
                throw new Error("ADMIN")
              },
            },
          },
        })

        const res = reducer.toReducible()
        expect(res).toHaveProperty("guards")

        expect(res.guards).toEqual(
          expect.objectContaining({
            authenticate: expect.any(Object),
            admin: expect.any(Object),
          })
        )
      })
    })

    describe("endpoints", () => {
      describe("queries", () => {
        it("should add the query", () => {
          const reducer = new Reducer()
          reducer.reduce({
            endpoints: {
              CustomFind: {
                target: ENDPOINTS.ACCESSOR,
                params: { id: uuid() },
                returns: type("Object"),
                resolver: () => {},
              },
            },
          })

          expect(reducer.endpoints).toHaveProperty("CustomFind")
        })
      })

      describe("mutations", () => {
        it("should add the mutation", () => {
          const reducer = new Reducer()
          reducer.reduce({
            endpoints: {
              CustomUpdate: {
                target: ENDPOINTS.MUTATOR,
                params: { id: uuid() },
                returns: type("Book"),
                resolver: () => {},
              },
            },
          })

          expect(reducer.endpoints).toHaveProperty("CustomUpdate")
        })
      })
    })
  })

  describe("#reduce", () => {
    describe("endpoints", () => {
      it("shouldn't error when reducing a null endpoint", () => {
        const reducer = new Reducer()

        expect(() => {
          reducer.reduce({
            endpoints: null,
          })
        }).not.toThrowError()

        expect(reducer.endpoints).toBeDefined()
      })

      it("should reduce an accessor", () => {
        const reducer = new Reducer()

        reducer.reduce({
          endpoints: {
            FindBook: {
              target: ENDPOINTS.ACCESSOR,
              returns: type("Book"),
              resolver: () => null,
            },
          },
        })

        const res = reducer.toReducible()
        expect(res.endpoints).toHaveProperty("FindBook")
      })

      it("should reduce a mutator", () => {
        const reducer = new Reducer()

        reducer.reduce({
          endpoints: {
            CreateBook: {
              target: ENDPOINTS.MUTATOR,
              returns: type("Book"),
              resolver: () => null,
            },
          },
        })

        const res = reducer.toReducible()
        expect(res.endpoints).toHaveProperty("CreateBook")
      })
    })

    describe("guards", () => {
      it("should start with empty guards", () => {
        const reducer = new Reducer()
        expect(reducer.toReducible()).toHaveProperty("guards")
      })

      it("should add a directive", () => {
        const reducer = new Reducer()

        reducer.reduce({
          guards: {
            authenticate: {
              typeDef: "directive @authenticate on FIELD_DEFINITION",
              resolver: async function () {},
            },
          },
        })

        expect(reducer.toReducible().guards).toHaveProperty("authenticate")
      })

      it("should throw an error when two guards are the same name", () => {
        const reducer = new Reducer()

        reducer.reduce({
          guards: {
            authenticate: {
              typeDef: "directive @authenticate on FIELD_DEFINITION",
              resolver: async function () {},
            },
          },
        })

        function testReducerAddThrowsError() {
          reducer.reduce({
            guards: {
              authenticate: {
                typeDef: "directive @authenticate on TYPE_DEFINITION",
                resolver: async function () {},
              },
            },
          })
        }

        expect(testReducerAddThrowsError).toThrowError(
          "Guards currently cannot overwrite eachother"
        )
      })
    })
  })
})
