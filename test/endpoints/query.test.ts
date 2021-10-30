import Server from "../../src/server"

describe("Rel.query", () => {
  const server = new Server({
    schema: `
    type Query {
      hello: String
    }
    `,
    resolvers: {
      Query: {
        hello: () => "world",
      },
    },
  })

  it("should return a response", async () => {
    const { data } = await server.graphql(`{ hello }`)

    // console.log(response)
    expect(data).toEqual({ hello: "world" })
  })
})
