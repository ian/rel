import { EventEmitter } from "events"

export enum EVENTS {
  LOG = "log",
  ERROR = "error",
  CYPHER = "cypher",
  GRAPHQL = "graphql",
}

const emitter = new EventEmitter()

export function log(message) {
  emitter.emit(EVENTS.LOG, message)
}

export function error(err) {
  emitter.emit(EVENTS.ERROR, err)
}

export function graphql(gql, time) {
  emitter.emit(EVENTS.GRAPHQL, gql, time)
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
  on,
}
