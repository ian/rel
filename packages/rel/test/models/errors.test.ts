import Rel, { testServer } from "../../src"

describe("#model", () => {
  const server = async (schema) => {
    return testServer({ log: false }).models(schema).start()
  }

  it("error when trying to run a model without fields", async () => {
    try {
      await server(Rel.model("Book", {}))
    } catch (err) {
      expect(err.message).toEqual(
        "Model Book must have at least one field or relation"
      )
    }
  })
})