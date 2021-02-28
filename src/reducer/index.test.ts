import { ENDPOINTS } from "../types"
import { string, type, uuid } from "../fields"
import { Reducer, intersection } from "."

describe("Reducer", () => {
  describe("#intersection", () => {
    it("should be empty [] on two empty {}", () => {
      expect(intersection({}, {}).length).toBe(0)
    })

    it("should not have any intersection when first object is empty", () => {
      expect(intersection({}, { test: "val" }).length).toBe(0)
    })

    it("should be empty [] when there is no overlap", () => {
      expect(intersection({ uniq: "val" }, { test: "val" }).length).toBe(0)
    })

    it("should be return keys when o1 has overlap with o2", () => {
      expect(intersection({ same: "val1" }, { same: "val2" }).length).toBe(1)
    })
  })

  describe("#module", () => {
    it("shouldn't error when adding a null module", () => {
      const reducer = new Reducer()

      expect(() => {
        reducer.reduce(null)
      }).not.toThrowError()

      expect(reducer.endpoints).toBeDefined()
    })

    it("shouldn't error when adding an empty module", () => {
      const reducer = new Reducer()

      expect(() => {
        reducer.reduce({})
      }).not.toThrowError()

      expect(reducer.endpoints).toBeDefined()
    })

    describe("schema", () => {
      it("should have a type and input for Book", () => {
        const reducer = new Reducer()

        reducer.module({
          schema: {
            Book: {
              fields: {
                name: string().required(),
              },
            },
          },
        })

        expect(reducer.inputs).toHaveProperty("BookInput")
        expect(reducer.types).toHaveProperty("Book")
      })

      it("should should allow a model to be extended", () => {
        const reducer = new Reducer()

        reducer.module({
          schema: {
            Book: {
              fields: {
                name: string().required(),
              },
            },
          },
        })

        reducer.module({
          schema: {
            Book: {
              fields: {
                publisher: string(),
              },
            },
          },
        })

        expect(reducer.inputs).toHaveProperty("BookInput")
        expect(reducer.inputs.BookInput).toHaveProperty("name")
        expect(reducer.inputs.BookInput).toHaveProperty("publisher")

        expect(reducer.types).toHaveProperty("Book")
        expect(reducer.types.Book).toHaveProperty("name")
        expect(reducer.types.Book).toHaveProperty("publisher")
      })
    })

    describe("directives", () => {
      it("should add the directives to the reducer", () => {
        const reducer = new Reducer()

        reducer.module({
          directives: {
            authenticate: {
              typeDef: "directive @authenticate on FIELD_DEFINITION",
              resolver: async function (next, src, args, context) {
                throw new Error("AUTHENTICATE")
              },
            },
            admin: {
              typeDef: "directive @admin on FIELD_DEFINITION",
              resolver: async function (next, src, args, context) {
                throw new Error("ADMIN")
              },
            },
          },
        })

        const res = reducer.toReducible()
        expect(res).toHaveProperty("directives")

        expect(res.directives).toEqual(
          expect.objectContaining({
            authenticate: expect.any(Object),
            admin: expect.any(Object),
          })
        )
      })
    })

    describe("endpoints", () => {
      describe("queries", () => {
        it("should add the query", () => {
          const reducer = new Reducer()
          reducer.module({
            endpoints: {
              CustomFind: {
                type: ENDPOINTS.ACCESSOR,
                typeDef: {
                  params: { id: uuid() },
                  returns: type("Object"),
                },
                resolver: (next, src, args, context) => {},
              },
            },
          })

          expect(reducer.endpoints).toHaveProperty("CustomFind")
        })
      })

      describe("mutations", () => {
        it("should add the mutation", () => {
          const reducer = new Reducer()
          reducer.module({
            endpoints: {
              CustomUpdate: {
                type: ENDPOINTS.MUTATOR,
                typeDef: {
                  params: { id: uuid() },
                  returns: type("Book"),
                },
                resolver: (next, src, args, context) => {},
              },
            },
          })

          expect(reducer.endpoints).toHaveProperty("CustomUpdate")
        })
      })
    })
  })

  // describe("types", () => {
  //   it("should add the type and resolver", () => {
  //     const reducer = new Reducer()

  //     reducer.module({
  //       extend: {
  //         Book: {
  //           fields: {
  //             customField: string(),
  //           },
  //         },
  //       },
  //     })

  //     expect(reducer.types).toHaveProperty("Book")
  //     expect(reducer.resolvers).toHaveProperty("Book")
  //   })

  //   it("should extend an existing type", () => {
  //     const reducer = new Reducer()

  //     reducer.module({
  //       schema: {
  //         Book: {
  //           fields: {
  //             name: string().required(),
  //           },
  //         },
  //       },
  //     })

  //     reducer.module({
  //       extend: {
  //         Book: {
  //           fields: {
  //             customField: string(),
  //           },
  //         },
  //       },
  //     })

  //     console.log(reducer.types.Book)

  //     expect(reducer.types).toHaveProperty("Book")
  //     // expect(reducer.types.Book)
  //   })
  // })

  describe("#reduce", () => {
    describe("endpoints", () => {
      it("shouldn't error when reducing a null endpoint", () => {
        const reducer = new Reducer()

        expect(() => {
          reducer.reduce({
            endpoints: null,
          })
        }).not.toThrowError()

        expect(reducer.endpoints).toBeDefined()
      })

      it("should reduce an accessor", () => {
        const reducer = new Reducer()

        reducer.reduce({
          endpoints: {
            FindBook: {
              type: ENDPOINTS.ACCESSOR,
              typeDef: {
                returns: type("Book"),
              },
              resolver: () => null,
            },
          },
        })

        const res = reducer.toReducible()
        expect(res.endpoints).toHaveProperty("FindBook")
      })

      it("should reduce a mutator", () => {
        const reducer = new Reducer()

        reducer.reduce({
          endpoints: {
            CreateBook: {
              type: ENDPOINTS.MUTATOR,
              typeDef: {
                returns: type("Book"),
              },
              resolver: () => null,
            },
          },
        })

        const res = reducer.toReducible()
        expect(res.endpoints).toHaveProperty("CreateBook")
      })
    })

    describe("directives", () => {
      it("should start with empty directives", () => {
        const reducer = new Reducer()
        expect(reducer.toReducible()).toHaveProperty("directives")
      })

      it("should add a directive", () => {
        const reducer = new Reducer()

        reducer.reduce({
          directives: {
            authenticate: {
              typeDef: "directive @authenticate on FIELD_DEFINITION",
              resolver: async function (next, src, args, context) {},
            },
          },
        })

        expect(reducer.toReducible().directives).toHaveProperty("authenticate")
      })

      it("should throw an error when two directives are the same name", () => {
        const reducer = new Reducer()

        reducer.reduce({
          directives: {
            authenticate: {
              typeDef: "directive @authenticate on FIELD_DEFINITION",
              resolver: async function (next, src, args, context) {},
            },
          },
        })

        function testReducerAddThrowsError() {
          reducer.reduce({
            directives: {
              authenticate: {
                typeDef: "directive @authenticate on TYPE_DEFINITION",
                resolver: async function (next, src, args, context) {},
              },
            },
          })
        }

        expect(testReducerAddThrowsError).toThrowError(
          "Directives currently cannot overwrite eachother"
        )
      })
    })
  })
})
