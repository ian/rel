import { type } from "../fields"
import { Reducer, intersection } from "."

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

  describe("types", () => {
    describe("Query", () => {
      it("should have a Query property", () => {
        const reducer = new Reducer()

        reducer.reduce({
          types: {
            Query: {},
          },
        })

        expect(reducer.toReducible().types).toHaveProperty("Query")
      })

      it("should be a ReducedType", () => {
        const reducer = new Reducer()

        reducer.reduce({
          types: {
            Query: {
              FindBook: {
                typeDef: {
                  returns: type("Book"),
                },
              },
            },
          },
        })

        const query = reducer.toReducible().types.Query
        expect(query).toHaveProperty("FindBook")
      })
    })

    describe("Mutation", () => {
      it("should have a Mutation property", () => {
        const reducer = new Reducer()

        reducer.reduce({
          types: {
            Mutation: {},
          },
        })

        expect(reducer.toReducible().types).toHaveProperty("Mutation")
      })

      it("should be a ReducedType", () => {
        const reducer = new Reducer()

        reducer.reduce({
          types: {
            Mutation: {
              CreateBook: {
                typeDef: {
                  returns: type("Book"),
                },
              },
            },
          },
        })

        const mutation = reducer.toReducible().types.Mutation
        expect(mutation).toHaveProperty("CreateBook")
      })
    })
  })

  describe("directives", () => {
    it("should start with empty directives", () => {
      const reducer = new Reducer()
      expect(reducer.toReducible()).toHaveProperty("directives")
    })

    it("should add a directive", () => {
      const reducer = new Reducer()

      reducer.reduce({
        directives: {
          authenticate: {
            typeDef: "directive @authenticate on FIELD_DEFINITION",
            handler: async function (next, src, args, context) {},
          },
        },
      })

      expect(reducer.toReducible().directives).toHaveProperty("authenticate")
    })

    it("should throw an error when two directives are the same name", () => {
      const reducer = new Reducer()

      reducer.reduce({
        directives: {
          authenticate: {
            typeDef: "directive @authenticate on FIELD_DEFINITION",
            handler: async function (next, src, args, context) {},
          },
        },
      })

      function testReducerAddThrowsError() {
        reducer.reduce({
          directives: {
            authenticate: {
              typeDef: "directive @authenticate on TYPE_DEFINITION",
              handler: async function (next, src, args, context) {},
            },
          },
        })
      }

      expect(testReducerAddThrowsError).toThrowError(
        "Directives currently cannot overwrite eachother"
      )
    })
  })
})
