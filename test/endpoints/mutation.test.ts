import Server from "../../src/server"

describe("Rel.mutation", () => {
  const server = new Server({
    schema: `
    type Query {
      hello: String
    }
    type Mutation {
      changeSomething: String
    }
    `,
    resolvers: {
      Mutation: {
        changeSomething: () => "done",
      },
    },
  })

  it("should return a response", async () => {
    const { data } = await server.graphql(`mutation { changeSomething }`)

    // console.log(response)
    expect(data).toEqual({ changeSomething: "done" })
  })
})
