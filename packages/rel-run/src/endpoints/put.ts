import { HTTPMethods, Resolver } from "../types"
import HTTPEndpoint from "./http"

export default class PutEndpoint extends HTTPEndpoint {
  constructor(url: string) {
    super(HTTPMethods.PUT, url)
  }
}
