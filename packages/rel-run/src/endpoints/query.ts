import { Field, GraphQLOperationType } from "../types"
import GraphQLEndpoint, { GraphQLEndpointOpts } from "./graphql"

export default class Query extends GraphQLEndpoint {
  constructor(label: string, returns: Field, opts?: GraphQLEndpointOpts) {
    super(GraphQLOperationType.QUERY, label, returns, opts)
  }
}
