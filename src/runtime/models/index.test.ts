import { string } from "../../fields"
import { Reducible } from "../../types"
import { modelToRuntime } from "./index"

describe("modelToRuntime", () => {
  const subject = (model): Reducible => {
    return modelToRuntime("MyObject", model)
  }

  describe("defaults", () => {
    it("should set id, createdAt, and updatedAt by default on types", () => {
      const _subject = subject({
        fields: {},
      })

      expect(Object.keys(_subject.types.MyObject)).toEqual([
        "id",
        "createdAt",
        "updatedAt",
      ])
    })

    it("should not have any defaults on inputs", () => {
      const _subject = subject({
        fields: {},
      }).inputs.MyObjectInput

      expect(Object.keys(_subject)).toEqual([])
    })
  })

  describe("id", () => {
    it("should allow id to be turned off", () => {
      const _subject = subject({
        fields: {
          id: false,
        },
      })

      expect(Object.keys(_subject.types.MyObject)).toEqual([
        "createdAt",
        "updatedAt",
      ])
    })
  })

  describe("timestamps", () => {
    it("should allow id to be turned off", () => {
      const _subject = subject({
        fields: {
          timestamps: false,
        },
      })

      expect(Object.keys(_subject.types.MyObject)).toEqual(["id"])
    })
  })

  describe("fields", () => {
    it("should generate a type MyObject with the custom field", () => {
      const _subject = subject({
        fields: {
          customField: string(),
        },
      }).types.MyObject

      expect(_subject).toHaveProperty("customField")
    })

    it("should generate an input MyObjectInput with the custom field", () => {
      const _subject = subject({
        fields: {
          customField: string(),
        },
      }).inputs.MyObjectInput

      expect(_subject).toHaveProperty("customField")
    })
  })

  describe("relations", () => {
    const subject = (model): Reducible => {
      return modelToRuntime("Book", model)
    }

    it("should generate a field", () => {
      const _subject = subject({
        relations: {
          author: {
            from: {
              label: "Actor",
            },
            to: {
              label: "Movie",
            },
            rel: {
              label: "ACTED_IN",
            },
          },
        },
      })

      expect(_subject.types.Book).toHaveProperty("author")
      // expect(_subject.types.Book.author).toHaveProperty("returns")
    })

    it("should be additive with fields", () => {
      const _subject = subject({
        fields: {
          name: string(),
        },
        relations: {
          author: {
            from: {
              label: "Actor",
            },
            to: {
              label: "Movie",
            },
            rel: {
              label: "ACTED_IN",
            },
          },
        },
      })

      expect(_subject.types.Book).toHaveProperty("name")
      expect(_subject.types.Book).toHaveProperty("author")
    })
  })

  // describe("accessors", () => {
  //   const subject = (model): Reducible => {
  //     return modelToRuntime("Book", model)
  //   }

  //   describe("find", () => {
  //     it("should generate find on boolean default", () => {
  //       const _subject = subject({
  //         accessors: {
  //           find: true,
  //         },
  //       })

  //       expect(_subject.types.Query).toHaveProperty("FindBook")
  //       expect(_subject.types.Query.FindBook.guard).toBe(undefined)
  //       expect(_subject.types.Query.FindBook.returns).toBe("Book")
  //     })

  //     it("should generate find on empty Accessor input", () => {
  //       const _subject = subject({
  //         accessors: {
  //           find: {},
  //         },
  //       })

  //       expect(_subject.types.Query).toHaveProperty("FindBook")
  //       expect(_subject.types.Query.FindBook.guard).toBe(undefined)
  //       expect(_subject.types.Query.FindBook.returns).toBe("Book")
  //     })

  //     it("should generate allow guards", () => {
  //       const _subject = subject({
  //         accessors: {
  //           find: {
  //             guard: "admin",
  //           },
  //         },
  //       })

  //       expect(_subject.types.Query).toHaveProperty("FindBook")
  //       expect(_subject.types.Query.FindBook.guard).toBe("admin")
  //       expect(_subject.types.Query.FindBook.returns).toBe("Book")
  //     })
  //   })
  // })
})