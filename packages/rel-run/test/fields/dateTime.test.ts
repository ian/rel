import Rel, { testServer } from "../../src"

describe("default properties", () => {
  const server = async (schema) => {
    return testServer({ log: false }).schema(schema).start()
  }

  it("should output the right GQL type", async () => {
    const { typeDefs } = await server({
      Book: Rel.model(
        {
          field: Rel.dateTime(),
        },
        { id: false, timestamps: false }
      ),
    })

    expect(typeDefs).toMatch(`type Book {
  field: DateTime
}
`)
  })
})
