import Reducer from "../../src/runtime/reducer"

describe("Reducer Errors", () => {
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
})
