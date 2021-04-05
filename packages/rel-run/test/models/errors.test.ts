import Rel, { testServer } from "../../src"

describe("#model", () => {
  const server = (schema) => {
    return testServer(
      {
        schema,
      },
      {
        // log: true,
      }
    )
  }

  it("error when trying to run a model without fields", () => {
    expect(() =>
      server({
        Book: Rel.model(),
      })
    ).toThrowError("Model Book must have at least one field or relation")
  })
})
