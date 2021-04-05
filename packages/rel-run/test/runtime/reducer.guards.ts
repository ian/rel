import Reducer from "../../src/runtime/reducer"

describe("Reducer Guards", () => {
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
