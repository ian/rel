import { Fields } from "../../src"
import { generateProperty } from "../../src/generator/property"
const { string } = Fields

describe("#generateProperty", () => {
  it("should generate the property", () => {
    expect(
      generateProperty("name", {
        guard: "admin",
        returns: string(),
      })
    ).toBe("name: String @admin")
  })
})
