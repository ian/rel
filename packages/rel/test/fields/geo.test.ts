import Rel from "../../src"
import { testServer } from "../../src"

describe("default properties", () => {
  const server = (schema) => {
    return testServer({ log: false }).schema(schema).runtime()
  }

  it("should output the right GQL type", () => {
    const { typeDefs } = server(
      Rel.model(
        "Book",
        {
          field: Rel.geo(),
        },
        { id: false, timestamps: false }
      )
    )

    expect(typeDefs).toMatch(`type Book {
  field: Geo
}
`)
  })

  describe("changing Where input", () => {
    it.todo("should geo =")
    it.todo("should geo_near = { }")
    // , async (done) => {
    //   const { cypher, graphql, typeDefs } = server(
    //     Rel.model(
    //       "Place",
    //       {
    //         name: Rel.string(),
    //         geo: Rel.geo(),
    //       },
    //       { id: false, timestamps: false }
    //     ).endpoints(true)
    //   )

    //   await cypher.exec(
    //     `CREATE INDEX ON :Place(name);
    //      CREATE INDEX ON :Place(geo);`
    //   )

    //   const res = await graphql(`
    //     query {
    //       places: ListPlaces(
    //         where: { geo_near: { lat: 123, lng: 345, distance: 10 } }
    //       ) {
    //         name
    //       }
    //     }
    //   `)

    //   // console.log(typeDefs)
    //   // console.log(res)

    //   expect(res.errors).toBeUndefined()
    //   expect(res.data.places).toEqual([{ name: "Place" }])

    //   done()
    // })
  })

  it.todo("should support nearby")
})

// "CREATE INDEX ON :Person(age)"
// "WITH point({latitude:41.4045886, longitude:-75.6969532}) AS scranton MATCH (e:Employer) WHERE distance(e.location, scranton) < 5000 RETURN e"
