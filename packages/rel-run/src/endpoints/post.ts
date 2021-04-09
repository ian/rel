import { HTTPMethods, Resolver } from "../types"
import HTTPEndpoint from "./http"

export default class PostEndpoint extends HTTPEndpoint {
  constructor(url: string) {
    super(HTTPMethods.POST, url)
  }
}
