import { model, string, type, uuid } from "@reldb/meta"
import { ENDPOINTS } from "@reldb/types"
import Reducer, { intersection } from "../../src/runtime/reducer"

describe("Reducer Schema", () => {
  it("should have a type and input for Book", () => {
    const reducer = new Reducer()

    reducer.reduce({
      schema: {
        Book: model("Book").fields({
          name: string().required(),
        }),
      },
    })

    expect(reducer.inputs).toHaveProperty("BookInput")
    expect(reducer.outputs).toHaveProperty("Book")
  })

  it("should should allow a model to be extended", () => {
    const reducer = new Reducer()

    reducer.reduce({
      schema: {
        Book: model("Book").fields({
          name: string().required(),
        }),
      },
    })

    reducer.reduce({
      schema: {
        Book: model("Book").fields({
          publisher: string(),
        }),
      },
    })

    expect(reducer.inputs).toHaveProperty("BookInput")
    expect(reducer.inputs.BookInput).toHaveProperty("name")
    expect(reducer.inputs.BookInput).toHaveProperty("publisher")

    expect(reducer.outputs).toHaveProperty("Book")
    expect(reducer.outputs.Book).toHaveProperty("name")
    expect(reducer.outputs.Book).toHaveProperty("publisher")
  })
})
