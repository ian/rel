import Rel from "../../src"
import { testServer } from "@reldb/run"

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
          field: Rel.geo(),
        },
        { id: false, timestamps: false }
      ),
    })

    expect(typeDefs).toMatch(`type Book {
  field: Geo
}
`)
  })
})
