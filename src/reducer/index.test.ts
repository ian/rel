import { Reducer, intersection } from "./index"

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

  describe("schema", () => {})

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
            schema: "directive @authenticate on FIELD_DEFINITION",
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
            schema: "directive @authenticate on FIELD_DEFINITION",
            handler: async function (next, src, args, context) {},
          },
        },
      })

      function testReducerAddThrowsError() {
        reducer.reduce({
          directives: {
            authenticate: {
              schema: "directive @authenticate on TYPE_DEFINITION",
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
