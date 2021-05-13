import Rel, { Fields, Types } from "@reldb/run"
import { Config } from "./types"
import Cloudinary from "./cloudinary"

let CONFIG
class ImageField extends Fields.Field {
  constructor() {
    super("CloudinaryImage")
  }

  get inputType() {
    return "String"
  }

  get resolver() {
    return (obj, _, __, info) => {
      const publicId = obj[info.fieldName]
      return {
        publicId,
        publicUrl: `https://res.cloudinary.com/${CONFIG.cloudName}/${publicId}`,
      }
    }
  }
}

export function image() {
  return new ImageField().resolve((obj) => {})
}

export default (config: Config): Types.Plugin => {
  if (!config?.key || !config?.secret || !config.cloudName)
    throw new Error(
      "Cloudinary requires { key: '...', secret: '...', cloudName: '...' } to be specified"
    )

  const { path = "images", ...init } = config
  CONFIG = config
  const cloudinary = Cloudinary(init)

  return (hydration) => {
    const { hydrator } = hydration

    hydrator.outputs(
      Rel.output("CloudinaryImage", {
        publicId: Rel.string().required(),
        publicUrl: Rel.string().required(),
      }),
      Rel.output("CloudinaryImageUpload", {
        apiKey: Rel.string().required(),
        timestamp: Rel.string().required(),
        signature: Rel.string().required(),
        uploadUrl: Rel.string().required(),
        publicId: Rel.string().required(),
        publicUrl: Rel.string().required(),
      })
    )

    hydrator.endpoints(
      Rel.mutation(
        "CreateCloudinaryImageUpload",
        Rel.ref("CloudinaryImageUpload"),
        () => {
          const timestamp = Math.round(Date.now() / 1000)
          const publicId = `${path}/${timestamp}`
          const uploadUrl = cloudinary.uploadUrl("upload", {
            resource_type: "auto",
          })
          const { api_key: apiKey, signature } = cloudinary.signRequest({
            timestamp,
            public_id: publicId,
          })

          const publicUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${publicId}`

          return {
            apiKey,
            publicId,
            timestamp,
            signature,
            uploadUrl,
            publicUrl,
          }
        }
      )
    )
  }
}
