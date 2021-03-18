import { Fields } from "../../../src"
import makeServer from "../../helpers/makeGQLServer"
import * as Cypher from "../../../src/cypher"
const { string } = Fields

describe("slugs", () => {
  beforeEach(async () => {
    await Cypher.cypher(`MATCH (n) DETACH DELETE n;`)
  })

  const server = makeServer({
    schema: {
      Book: {
        fields: {
          title: string().resolver(() => "OVERRIDDEN"),
        },
        accessors: {
          find: true,
        },
      },
    },
  })

  describe("resolver", () => {
    it("should use the custom resolver", async () => {
      const book = await Cypher.cypherCreate("Book", {
        title: "ORIGINAL",
      })

      const res = await server(
        `
      query TestResolver($id: UUID) {
        book: FindBook(id: $id) {
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
      expect(data.book).toEqual({
        title: "OVERRIDDEN",
      })

      // let's make sure it's not creating anything new
      const list = await Cypher.cypherList("Book")
      expect(list.length).toBe(1)
    })
  })
})
