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
      Book: Rel.model({ id: false, timestamps: false }).fields({
        ary: Rel.array(Rel.string()),
      }),
    })

    expect(typeDefs).toMatch(`type Book {
  ary: [String]
}
`)
  })
})
