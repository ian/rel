import { propertyToGQL } from "../../src/typeDefs/property"

describe("#propertyToGQL", () => {
  it("should generate the property", () => {
    expect(
      propertyToGQL("field", {
        returns: "String",
      })
    ).toBe("field: String")
  })
})
