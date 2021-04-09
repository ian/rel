import { Field, GraphQLOperationType } from "../types"
import GraphQLEndpoint, { GraphQLEndpointOpts } from "./graphql"
export default class Mutation extends GraphQLEndpoint {
  constructor(label: string, returns: Field, opts?: GraphQLEndpointOpts) {
    super(GraphQLOperationType.MUTATION, label, returns, opts)
  }
}
