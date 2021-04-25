import Rel from "../../src"
import { testServer } from "../../src"

describe("runtime Endpoints", () => {
  it("should hydrate", async (done) => {
    const server = await testServer({ log: false })
      .endpoints(Rel.query("TestQuery", Rel.string(), () => "hi"))
      .start()

    console.log(server.typeDefs)
    done()
  })
})
