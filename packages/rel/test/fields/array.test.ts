import Rel, { testServer } from "../../src"

describe("default properties", () => {
  const server = async (schema) => {
    return testServer({ log: false }).schema(schema).start()
  }

  it("should output the right GQL type", async () => {
    const { typeDefs } = await server(
      Rel.model(
        "Book",
        {
          ary: Rel.array(Rel.string()),
        },
        { id: false, timestamps: false }
      )
    )

    expect(typeDefs).toMatch(`type Book {
  ary: [String]
}
`)
  })
})
