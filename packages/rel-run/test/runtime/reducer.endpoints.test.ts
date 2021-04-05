import Rel from "../../src"
import { ENDPOINTS } from "../../src/types"
import Reducer from "../../src/runtime/reducer"

describe("Reducer Endpoints", () => {
  describe("queries", () => {
    it("should add the query", () => {
      const reducer = new Reducer()
      reducer.reduce({
        endpoints: {
          CustomFind: {
            target: ENDPOINTS.ACCESSOR,
            params: { id: Rel.uuid() },
            returns: Rel.type("Object"),
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
            params: { id: Rel.uuid() },
            returns: Rel.type("Book"),
            resolver: () => {},
          },
        },
      })

      expect(reducer.endpoints).toHaveProperty("CustomUpdate")
    })
  })

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
          returns: Rel.type("Book"),
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
          returns: Rel.type("Book"),
          resolver: () => null,
        },
      },
    })

    const res = reducer.toReducible()
    expect(res.endpoints).toHaveProperty("CreateBook")
  })
})
