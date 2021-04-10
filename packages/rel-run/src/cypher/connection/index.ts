import Neo4jConnection from "./neo4j"
import CypherInstance from "./instance"
export { default as CypherInstance } from "./instance"

export enum ConnectionType {
  NEO4J = "NEO4J",
}

export type ConnectionLogger = (cypher: string, time: [number, number]) => void

export type ConnectionConfig = {
  type: ConnectionType
  url: string
  username: string
  password: string
  logger?: (cypher: string, time: [number, number]) => void
}

export function init(c: ConnectionConfig): CypherInstance {
  if (c === null) {
    throw new Error("Missing Connection Credentials")
  }

  const { type, ...config } = c
  switch (type) {
    case ConnectionType.NEO4J:
      return new Neo4jConnection(config)
    default:
      throw new Error(`Unknown Cypher Connection Type '${type}'`)
  }
}
