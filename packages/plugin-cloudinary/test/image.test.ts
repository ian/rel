import Rel, { testServer } from "@reldb/run"
import Cloudinary, { image } from "../src"

describe("#image", () => {
  describe("errors", () => {
    it.todo("should error if cloudinary was not initialized")
  })

  describe("typeDefs", () => {
    it("should have a input type of String", () => {
      const { typeDefs } = server()
      expect(typeDefs).toMatch(`input ThingInput {
  name: String
  image: String
}
`)
    })

    it("should have a output type of CloudinaryImage", () => {
      const { typeDefs } = server()
      expect(typeDefs).toMatch(`type Thing {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  image: CloudinaryImage
}
`)
    })
  })

  describe("usage", () => {
    it("should accept a string and respond with an image signature", async (done) => {
      const { graphql, typeDefs } = server()

      const { data, errors } = await graphql(
        `
          mutation {
            CreateThing(input: { image: "sample" }) {
              image {
                publicId
                publicUrl
              }
            }
          }
        `
      )

      expect(errors).toBeUndefined()
      expect(data.CreateThing.image.publicId).toEqual("sample")
      expect(data.CreateThing.image.publicUrl).toEqual(
        `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/sample`
      )

      done()
    })
  })
})

const server = (addPlugin: boolean = true) => {
  const server = testServer({ log: false }).schema(
    Rel.model("Thing", {
      name: Rel.string(),
      image: image(),
    }).endpoints(true)
  )

  if (addPlugin) {
    server.plugins(
      Cloudinary({
        key: process.env.CLOUDINARY_KEY,
        secret: process.env.CLOUDINARY_SECRET,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      })
    )
  }

  return server.runtime()
}
