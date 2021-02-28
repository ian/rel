import { string } from "~/fields"
import { generateInput } from "./input"

const subject = (name, type) => {
  return generateInput(name, type)
}

describe("#generateInput", () => {
  describe("ReducedTypeDef as fields", () => {
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
