import { string } from "../../../src/fields"
import makeServer from "../../helpers/makeGQLServer"
import * as Cypher from "../../../src/cypher"

describe("models", () => {
  beforeEach(async () => {
    await Cypher.cypher(`MATCH (n) DETACH DELETE n;`)
  })

  const server = makeServer({
    schema: {
      Book: {
        fields: {
          title: string(),
          defaulted: string().default(() => "DEFAULTED"),
        },
        accessors: {
          find: true,
          list: true,
        },
        mutators: {
          create: true,
          update: true,
          delete: true,
        },
      },
    },
  })

  it("should create a model", async () => {
    const res = await server(
      `
    mutation TestCreate($book: BookInput!) {
      book: CreateBook(input: $book) {
        title
        defaulted
      }
    }
  `,
      {
        book: {
          title: "The Great Gatsby",
        },
      }
    )

    const { data } = res
    expect(data.book).toEqual({
      title: "The Great Gatsby",
      defaulted: "DEFAULTED",
    })
  })

  it("should update a model", async () => {
    const book = await Cypher.cypherCreate("Book", {
      title: "The High-Bouncing Lover",
    })

    const res = await server(
      `
    mutation TestUpdate($id: UUID, $input: BookInput!) {
      book: UpdateBook(id: $id, input: $input) {
        title
      }
    }
  `,
      {
        id: book.id,
        input: {
          title: "The Great Gatsby",
        },
      }
    )

    if (res.errors) console.log({ res })

    const { data } = res
    expect(data.book).toEqual({ title: "The Great Gatsby" })

    // let's make sure it's not creating anything new
    const list = await Cypher.cypherList("Book")
    expect(list.length).toBe(1)
  })

  it("should delete a model", async () => {
    const book = await Cypher.cypherCreate("Book", {
      title: "The Great Gatsby",
    })

    const res = await server(
      `
    mutation TestDelete($id: UUID) {
      book: DeleteBook(id: $id) {
        title
      }
    }
  `,
      {
        id: book.id,
      }
    )

    if (res.errors) console.log({ res })

    const { data } = res
    expect(data.book).toEqual({ title: "The Great Gatsby" })

    // let's make sure it's not creating anything new
    const list = await Cypher.cypherList("Book")
    expect(list.length).toBe(0)
  })
})
