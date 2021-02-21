import { string } from "../../fields"
import { generateType } from "./type"

const subject = (name, type) => {
  return generateType(name, type)
}

describe("generating types", () => {
  it("should generate the type name", () => {
    expect(
      subject("Book", {
        name: {
          params: null,
          returns: string(),
        },
      })
    ).toEqual(`type Book {
  name: String
}`)
  })
})
