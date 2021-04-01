import { array, model, string } from "../../src"
import { makeServer } from "@reldb/testing"

describe("default properties", () => {
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

  it("should output the right GQL type", () => {
    const { typeDefs } = server({
      Book: model({ id: false, timestamps: false }).fields({
        ary: array(string()),
      }),
    })

    expect(typeDefs).toMatch(`type Book {
  ary: [String]
}
`)
  })
})
