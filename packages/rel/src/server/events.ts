import { EventEmitter } from "events"
import { ServerEvents } from "../types"

const emitter = new EventEmitter()

export function log(message) {
  emitter.emit(ServerEvents.LOG, message)
}

export function error(err: Error) {
  console.log({ err })
  emitter.emit(ServerEvents.ERROR, err)
}

export function graphql(gql, time) {
  emitter.emit(ServerEvents.GRAPHQL, gql, time)
}

type GraphQLErrorOpts = {
  queryHash?: string
  query?: string
  typeDefs?: string
  errors?: object | Error
}

export function graphqlError(opts: GraphQLErrorOpts) {
  emitter.emit(ServerEvents.GRAPHQL_ERROR, opts)
}

export function cypher(cypher, time) {
  emitter.emit(ServerEvents.CYPHER, cypher, time)
}

export function on(event, callback) {
  emitter.on(event, callback)
}

export default {
  log,
  error,
  cypher,
  graphql,
  graphqlError,
  on,
}
