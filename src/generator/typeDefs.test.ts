import { id, string } from "../fields"
import { generateTypeDefs } from "./typeDefs"

const subject = (opts) => {
  return generateTypeDefs(opts)
}

// describe("Query", () => {
//   it("should generate a type Query", () => {
//     expect(
//       subject({
//         Query: {
//           TestQuery: {
//             params: {
//               id: id(),
//             },
//             returns: "Test",
//           },
//         },
//       })
//     ).toEqual(`type Query {
//   TestQuery(id: ID): Test
// }`)
//   })
// })

describe("Mutation", () => {
  //   it("should generate a type Mutation", () => {
  //     expect(
  //       subject({
  //         Query: {
  //           TestQuery: {
  //             params: {
  //               id: id(),
  //             },
  //             returns: "Test",
  //           },
  //         },
  //       })
  //     ).toEqual(`type Query {
  //   TestQuery(id: ID): Test
  // }`)
  //   })
})

describe("types", () => {
  it("should generate a type", () => {
    expect(
      subject({
        Book: {
          name: string(),
        },
      })
    ).toEqual(`type Book {
  name: String
}`)
  })

  it("should generate a type with a required field", () => {
    expect(
      subject({
        Book: {
          name: string().required(),
        },
      })
    ).toEqual(`type Book {
  name: String!
}`)
  })
})
