import Rel from "../../src"
import Reducer from "../../src/runtime/reducer"

describe("Reducer Schema", () => {
  it("should have a type and input for Book", () => {
    const reducer = new Reducer()

    reducer.reduce({
      schema: {
        Book: Rel.model("Book").fields({
          name: Rel.string().required(),
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
        Book: Rel.model("Book").fields({
          name: Rel.string().required(),
        }),
      },
    })

    reducer.reduce({
      schema: {
        Book: Rel.model("Book").fields({
          publisher: Rel.string(),
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
