import { string, rel } from "@reldb/meta"
import { Model, Reducible } from "@reldb/types"
import { reduceModel } from "../../src/reducer/models"

describe("reduceModel", () => {
  const subject = (model: Model): Reducible => {
    return reduceModel("MyObject", model)
  }

  describe("defaults", () => {
    it("should set id, createdAt, and updatedAt by default on types", () => {
      const _subject = subject({
        fields: {},
      })

      expect(Object.keys(_subject.outputs.MyObject)).toEqual([
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
    it("by default it should generate", () => {
      const _subject = subject({})

      expect(_subject.outputs.MyObject).toHaveProperty("id")
    })

    it("should add id if set to true", () => {
      const _subject = subject({
        id: true,
      })

      expect(_subject.outputs.MyObject).toHaveProperty("id")
    })

    it("should allow id to be turned off", () => {
      const _subject = subject({
        id: false,
      })

      expect(_subject.outputs.MyObject).not.toHaveProperty("id")
    })
  })

  describe("timestamps", () => {
    it("by default it should generate createdAt and updatedAt", () => {
      const _subject = subject({})

      expect(_subject.outputs.MyObject).toHaveProperty("createdAt")
      expect(_subject.outputs.MyObject).toHaveProperty("updatedAt")
    })

    it("should add id if set to true", () => {
      const _subject = subject({
        timestamps: true,
      })
      expect(_subject.outputs.MyObject).toHaveProperty("createdAt")
      expect(_subject.outputs.MyObject).toHaveProperty("updatedAt")
    })

    it("should allow id to be turned off", () => {
      const _subject = subject({
        timestamps: false,
      })

      expect(_subject.outputs.MyObject).not.toHaveProperty("createdAt")
      expect(_subject.outputs.MyObject).not.toHaveProperty("updatedAt")
    })
  })

  describe("fields", () => {
    it("should generate a type MyObject with the custom field", () => {
      const _subject = subject({
        fields: {
          customField: string(),
        },
      }).outputs.MyObject

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
    const subject = (model: Model): Reducible => {
      return reduceModel("Book", model)
    }

    it("should generate a field", () => {
      const _subject = subject({
        relations: {
          author: rel("ACTED_IN").to("Movie"),
        },
      })

      expect(_subject.outputs.Book).toHaveProperty("author")
      // expect(_subject.outputs.Book.author).toHaveProperty("returns")
    })

    it("should be additive with fields", () => {
      const _subject = subject({
        fields: {
          name: string(),
        },
        relations: {
          author: rel("ACTED_IN").to("Movie"),
        },
      })

      expect(_subject.outputs.Book).toHaveProperty("name")
      expect(_subject.outputs.Book).toHaveProperty("author")
    })

    it("should have a resolver", () => {
      const _subject = subject({
        relations: {
          author: rel("ACTED_IN").to("Movie"),
        },
      })

      expect(_subject.outputs.Book.author).toHaveProperty("resolver")
    })
  })

  describe("accessors", () => {
    const subject = (model: Model): Reducible => {
      return reduceModel("Book", model)
    }

    describe("find", () => {
      it("should generate on boolean value", () => {
        const _subject = subject({
          accessors: {
            find: true,
          },
        })

        expect(_subject.endpoints).toHaveProperty("FindBook")
        expect(_subject.endpoints.FindBook.guard).toBe(undefined)
        expect(_subject.endpoints.FindBook.returns.toGQL()).toBe("Book")
      })

      it("should generate on empty Accessor input", () => {
        const _subject = subject({
          accessors: {
            find: {},
          },
        })

        expect(_subject.endpoints).toHaveProperty("FindBook")
        expect(_subject.endpoints.FindBook.guard).toBe(undefined)
        expect(_subject.endpoints.FindBook.returns.toGQL()).toBe("Book")
        expect(_subject.endpoints.FindBook.resolver).toBeDefined()
      })

      it("should allow guards", () => {
        const _subject = subject({
          accessors: {
            find: {
              guard: "admin",
            },
          },
        })

        expect(_subject.endpoints.FindBook.guard).toBe("admin")
      })
    })

    describe("list", () => {
      it("should generate on boolean value", () => {
        const _subject = subject({
          accessors: {
            list: true,
          },
        })

        expect(_subject.endpoints).toHaveProperty("ListBooks")
        expect(_subject.endpoints.ListBooks.guard).toBe(undefined)
        expect(_subject.endpoints.ListBooks.returns.toGQL()).toBe("[Book]!")
      })

      it("should generate on empty Accessor input", () => {
        const _subject = subject({
          accessors: {
            list: {},
          },
        })

        expect(_subject.endpoints).toHaveProperty("ListBooks")
        expect(_subject.endpoints.ListBooks.guard).toBe(undefined)
        expect(_subject.endpoints.ListBooks.returns.toGQL()).toBe("[Book]!")
        expect(_subject.endpoints.ListBooks.resolver).toBeDefined()
      })

      it("should generate allow guards", () => {
        const _subject = subject({
          accessors: {
            list: {
              guard: "admin",
            },
          },
        })

        expect(_subject.endpoints.ListBooks.guard).toBe("admin")
      })
    })
  })

  describe("mutators", () => {
    const subject = (model: Model): Reducible => {
      return reduceModel("Book", model)
    }

    describe("create", () => {
      it("should generate on boolean value", () => {
        const _subject = subject({
          mutators: {
            create: true,
          },
        })

        expect(_subject.endpoints).toHaveProperty("CreateBook")
        expect(_subject.endpoints.CreateBook.guard).toBe(undefined)
        expect(_subject.endpoints.CreateBook.returns.toGQL()).toBe("Book")
      })

      it("should generate on empty Accessor input", () => {
        const _subject = subject({
          mutators: {
            create: {},
          },
        })

        expect(_subject.endpoints).toHaveProperty("CreateBook")
        expect(_subject.endpoints.CreateBook.guard).toBe(undefined)
        expect(_subject.endpoints.CreateBook.returns.toGQL()).toBe("Book")
        expect(_subject.endpoints.CreateBook.resolver).toBeDefined()
      })

      it("should allow guards", () => {
        const _subject = subject({
          mutators: {
            create: {
              guard: "admin",
            },
          },
        })

        expect(_subject.endpoints.CreateBook.guard).toBe("admin")
      })
    })

    describe("update", () => {
      it("should generate on boolean value", () => {
        const _subject = subject({
          mutators: {
            update: true,
          },
        })

        expect(_subject.endpoints).toHaveProperty("UpdateBook")
        expect(_subject.endpoints.UpdateBook.guard).toBe(undefined)
        expect(_subject.endpoints.UpdateBook.returns.toGQL()).toBe("Book")
      })

      it("should generate on empty Accessor input", () => {
        const _subject = subject({
          mutators: {
            update: {},
          },
        })

        expect(_subject.endpoints).toHaveProperty("UpdateBook")
        expect(_subject.endpoints.UpdateBook.guard).toBe(undefined)
        expect(_subject.endpoints.UpdateBook.returns.toGQL()).toBe("Book")
        expect(_subject.endpoints.UpdateBook.resolver).toBeDefined()
      })

      it("should allow guards", () => {
        const _subject = subject({
          mutators: {
            update: {
              guard: "admin",
            },
          },
        })

        expect(_subject.endpoints.UpdateBook.guard).toBe("admin")
      })
    })

    describe("delete", () => {
      it("should generate on boolean value", () => {
        const _subject = subject({
          mutators: {
            delete: true,
          },
        })

        expect(_subject.endpoints).toHaveProperty("DeleteBook")
        expect(_subject.endpoints.DeleteBook.guard).toBe(undefined)
        expect(_subject.endpoints.DeleteBook.returns.toGQL()).toBe("Book")
      })

      it("should generate on empty Accessor input", () => {
        const _subject = subject({
          mutators: {
            delete: {},
          },
        })

        expect(_subject.endpoints).toHaveProperty("DeleteBook")
        expect(_subject.endpoints.DeleteBook.guard).toBe(undefined)
        expect(_subject.endpoints.DeleteBook.returns.toGQL()).toBe("Book")
        expect(_subject.endpoints.DeleteBook.resolver).toBeDefined()
      })

      it("should allow guards", () => {
        const _subject = subject({
          mutators: {
            delete: {
              guard: "admin",
            },
          },
        })

        expect(_subject.endpoints.DeleteBook.guard).toBe("admin")
      })
    })
  })
})
