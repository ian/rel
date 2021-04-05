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
      Book: Rel.model({ id: false, timestamps: false }).fields({
        field: Rel.geo(),
      }),
    })

    expect(typeDefs).toMatch(`type Book {
  field: Geo
}
`)
  })
})
