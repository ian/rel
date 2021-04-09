import Rel from "../../src"
import { testServer } from "../../src"

describe("runtime Endpoints", () => {
  it("should hydrate", async (done) => {
    const server = await testServer({ log: true })
      .endpoints(Rel.query("TestQuery", Rel.string()).resolver(() => "hi"))
      .start()

    console.log(server.typeDefs)
    done()
  })
})
