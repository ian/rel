import Rel from "../../src"
import { testServer } from "@reldb/run"

describe("default properties", () => {
  const server = async (schema) => {
    return testServer({ log: false }).schema(schema).start()
  }

  it("should output the right GQL type", async () => {
    const { typeDefs } = await server({
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
