import Rel, { testServer } from "../../src"

describe("#output", () => {
  const server = (schema) => {
    return testServer({ log: true })
      .schema(schema)
      .endpoints(
        Rel.query("Placeholder", Rel.string()).resolver(() => {
          return "HI"
        })
      )
      .start()
  }

  it("should only have the fields defined, nothing autogenerated", async () => {
    const { typeDefs } = await server({
      Book: Rel.output({ name: Rel.string() }),
    })

    expect(typeDefs).not.toMatch(`input`)
    expect(typeDefs).toMatch(`type Book {
  name: String
}
`)
  })
})