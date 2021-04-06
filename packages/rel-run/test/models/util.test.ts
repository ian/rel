import Rel from "../../src"
import { splitProps } from "../../src/models/util"

describe("#splitProps", () => {
  it("should split the props", () => {
    const props = {
      name: Rel.string(),
      phone: Rel.phoneNumber(),
      fields: Rel.relation("FRIEND", "User"),
    }

    const [fields, relations] = splitProps(props)
    expect(fields).toEqual({ name: Rel.string(), phone: Rel.phoneNumber() })
    expect(relations).toEqual({ fields: Rel.relation("FRIEND", "User") })
  })
})
