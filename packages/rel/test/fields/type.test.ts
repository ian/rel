import Rel, { testServer } from "../../src"

describe("default properties", () => {
  const server = (schema) => {
    return testServer({ log: false }).schema(schema).start()
  }

  // I'm not sure how to test this yet. It's tested via relationships right now but testing solo is proving to be tricky

  it.todo("should output the right GQL type")
})
