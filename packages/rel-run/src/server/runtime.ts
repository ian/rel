import { AuthModel, AuthStrategy, Endpoint, Guards, Schema } from "../types"
import { ConnectionConfig } from "../cypher"

export type RuntimeOpts = {
  auth?: { model: AuthModel; strategies?: AuthStrategy[] }
  schema?: Schema
  endpoints?: Endpoint | Endpoint[]
  guards?: Guards
}

export type RuntimeConfig = {
  db: ConnectionConfig
} & RuntimeOpts
