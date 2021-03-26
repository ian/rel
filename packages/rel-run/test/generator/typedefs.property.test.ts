import { string } from "@reldb/meta"
import { generateProperty } from "../../src/generator/property"

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
