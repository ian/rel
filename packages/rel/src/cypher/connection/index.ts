import Neo4jConnection from "./neo4j"
import CypherInstance from "./instance"
export { default as CypherInstance } from "./instance"

export enum ConnectionType {
  NEO4J = "NEO4J",
}

export type ConnectionLogger = (cypher: string, time: [number, number]) => void

export type ConnectionConfig = {
  url: string
  username: string
  password: string
  logger?: (cypher: string, time: [number, number]) => void
}

export function init(config: ConnectionConfig): CypherInstance {
  if (config === null) {
    throw new Error("Missing Connection Credentials")
  }

  return new Neo4jConnection(config)
}
