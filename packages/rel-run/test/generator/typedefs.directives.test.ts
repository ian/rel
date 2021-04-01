import { directivesToGQL } from "../../src/typeDefs/directives"

describe("#directivesToGQL", () => {
  it("should generate directives with typeDef specified", () => {
    expect(
      directivesToGQL({
        admin: {
          typeDef: "directive @admin on OBJECT",
          resolver: async () => {},
        },
      })
    ).toBe("directive @admin on OBJECT")
  })

  it("should generate directives with NO typeDef specified and use default everything", () => {
    expect(
      directivesToGQL({
        admin: {
          typeDef:
            "directive @admin on OBJECT | FIELD_DEFINITION | INPUT_OBJECT | INPUT_FIELD_DEFINITION",
          resolver: async () => {},
        },
      })
    ).toBe(
      "directive @admin on OBJECT | FIELD_DEFINITION | INPUT_OBJECT | INPUT_FIELD_DEFINITION"
    )
  })
})
