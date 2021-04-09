import { HTTPMethods, Resolver } from "../types"
import HTTPEndpoint from "./http"

export default class DeleteEndpoint extends HTTPEndpoint {
  constructor(url: string) {
    super(HTTPMethods.DELETE, url)
  }
}
