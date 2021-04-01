import { model } from "../../src"
import { makeServer } from "@reldb/testing"

describe("#model", () => {
  const server = (schema) => {
    return makeServer(
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
        Book: model(),
      })
    ).toThrowError("Model Book must have at least one field or relation")
  })
})
