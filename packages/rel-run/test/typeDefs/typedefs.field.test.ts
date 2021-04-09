import Rel from "../../src"
import { fieldToGQL } from "../../src/typeDefs/field"

describe("#fieldToGQL", () => {
  it("should generate the property", () => {
    expect(fieldToGQL("field", Rel.string().guard("admin"))).toBe(
      "field: String @admin"
    )
  })
})
