import { string } from "../../src/fields"
import { generateProperty } from "../../src/generator/typeDefs/property"

describe("#generateProperty", () => {
  it("should generate the property", () => {
    expect(
      generateProperty("name", {
        typeDef: {
          guard: "admin",
          returns: string(),
        },
      })
    ).toBe("name: String @admin")
  })

  it("should be able to ignore guards", () => {
    expect(
      generateProperty(
        "name",
        {
          typeDef: {
            guard: "admin",
            returns: string(),
          },
        },
        { guards: false }
      )
    ).toBe("name: String")
  })
})
