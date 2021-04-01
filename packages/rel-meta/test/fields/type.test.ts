import { type, model, string } from "../../src"
import { makeServer } from "@reldb/testing"

describe("default properties", () => {
  const server = (schema) => {
    return makeServer(
      {
        schema,
      },
      {
        // log: true,
      }
    )
  }

  // I'm not sure how to test this yet. It's tested via relationships right now but testing solo is proving to be tricky

  it.todo("should output the right GQL type")
})
