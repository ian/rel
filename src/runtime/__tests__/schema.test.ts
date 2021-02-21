import { dateTime, uuid, string } from "../../fields"
import { Runtime } from "../index"

describe("types", () => {
  const subject = (module) => {
    const runtime = new Runtime()
    runtime.module(module)
    return runtime
  }

  it("should reduce a basic schema to types", () => {
    expect(
      subject({
        schema: {
          Book: {
            fields: {
              name: string(),
            },
          },
        },
      }).types.Book
    ).toBe({
      id: {
        returns: uuid(),
      },
      createdAt: {
        returns: dateTime(),
      },
      updatedAt: {
        returns: dateTime(),
      },
      name: {
        returns: string(),
      },
    })
  })
})
