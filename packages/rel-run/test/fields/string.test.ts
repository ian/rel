import Rel, { testServer } from "../../src"

describe("default properties", () => {
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

  it("should output the right GQL type", () => {
    const { typeDefs } = server({
      Book: Rel.model(
        {
          field: Rel.string(),
        },
        { id: false, timestamps: false }
      ),
    })

    expect(typeDefs).toMatch(`type Book {
  field: String
}
`)
  })
})
