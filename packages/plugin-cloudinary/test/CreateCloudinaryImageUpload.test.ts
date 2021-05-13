import Rel, { testServer } from "@reldb/run"
import Cloudinary, { image } from "../src"

describe("#image", () => {
  it("should have the right typedefs", () => {
    const { typeDefs } = server()
    expect(typeDefs).toMatch(
      `CreateCloudinaryImageUpload: CloudinaryImageUpload`
    )
  })

  describe("usage", () => {
    it("should generate a upload signature", async (done) => {
      const { graphql } = server(
        Rel.model("Restaurant", {
          image: image(),
        }).endpoints(true)
      )
      const { data, errors } = await graphql(
        `
          mutation {
            CreateCloudinaryImageUpload {
              apiKey
              publicId
              timestamp
              signature
              uploadUrl
              publicUrl
            }
          }
        `
      )

      expect(errors).toBeUndefined()
      const { CreateCloudinaryImageUpload: img } = data

      expect(img.apiKey).toEqual("FAKE123")
      expect(img.publicId).toMatch(/images\d*/)
      expect(img.timestamp).toBeDefined()
      expect(img.signature).toBeDefined()
      expect(img.uploadUrl).toEqual(
        "https://api.cloudinary.com/v1_1/FAKE/auto/upload"
      )
      expect(img.publicUrl).toMatch(
        /https:\/\/res.cloudinary.com\/fake_cloud\/images\/\d*/
      )
      expect(img.apiKey).toBeDefined()

      done()
    })
  })
})

const server = (schema = null, addPlugin: boolean = true) => {
  const server = testServer({ log: false }).schema()

  if (addPlugin) {
    server.plugins(
      Cloudinary({
        key: "FAKE123",
        secret: "FAKE123",
        cloudName: "FAKE",
      })
    )
  }

  return server.runtime()
}
