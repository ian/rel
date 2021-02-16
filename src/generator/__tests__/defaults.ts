import { generate } from "../index"

function subject(config) {
  return generate(config)
}

describe(".schema", () => {
  const config = {}

  test("should set default Query", () => {
    const { schema, typeDefs } = subject(config)
    expect(schema).toBeDefined()
  })
})
