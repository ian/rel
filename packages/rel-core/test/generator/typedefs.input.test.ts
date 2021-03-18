import { Fields } from "../../src"
import { generateInput } from "../../src/generator/input"
const { string } = Fields

const subject = (name, type) => {
  return generateInput(name, type)
}

describe("#generateInput", () => {
  describe("fields", () => {
    it("should generate the type name", () => {
      expect(
        subject("BookInput", {
          name: {
            params: null,
            returns: string(),
          },
        })
      ).toEqual(`input BookInput {
  name: String
}`)
    })
  })
})
