import { string } from "@reldb/meta"
import { fieldToGQL } from "../../src/typeDefs/field"

describe("#fieldToGQL", () => {
  it("should generate the property", () => {
    expect(fieldToGQL("field", string().guard("admin"))).toBe(
      "field: String @admin"
    )
  })
})
