import * as Cloudinary from "cloudinary"
import { Config } from "./types"

export default function init(config: Config) {
  const { key: api_key, secret: api_secret, cloudName: cloud_name } = config

  Cloudinary.v2.config({
    cloud_name,
    api_key,
    api_secret,
  })

  return {
    signRequest: Cloudinary.v2.utils.sign_request,
    uploadUrl: Cloudinary.v2.utils.api_url,
  }
}
