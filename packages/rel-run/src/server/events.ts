import { EventEmitter } from "events"
import { EVENTS } from "@reldb/types"

const emitter = new EventEmitter()

export function log(message) {
  emitter.emit(EVENTS.LOG, message)
}

export function error(err: Error) {
  emitter.emit(EVENTS.ERROR, err)
}

export function graphql(gql, time) {
  emitter.emit(EVENTS.GRAPHQL, gql, time)
}

type GraphQLErrorOpts = {
  queryHash?: string
  query?: string
  typeDefs?: string
  errors?: object | Error
}

export function graphqlError(opts: GraphQLErrorOpts) {
  emitter.emit(EVENTS.GRAPHQL_ERROR, opts)
}

export function cypher(cypher, time) {
  emitter.emit(EVENTS.CYPHER, cypher, time)
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
