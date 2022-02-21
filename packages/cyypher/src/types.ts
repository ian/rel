export type Cypher1Response = {
  [key: string]: any
}

export type CypherResponse = Cypher1Response[]

export type CypherNodeOpts = {
  name: string
  params?: object
  label?: string
}

export type CypherCreateOpts = {
  id?: boolean
  timestamps?: boolean
}

export type CypherMergeOpts = {
  id?: boolean
  timestamps?: boolean
}

export type CypherUpdateOpts = {
  id?: boolean
  timestamps?: boolean
}

export type CypherListAssociationOpts = {
  where?: string
  order?: string
  skip?: number
  limit?: number
  orderRaw?: string
  singular?: boolean
}

export type CypherCreateAssociationOpts = {
  singular?: boolean
}

export type CypherDeleteAssociationOpts = {
  // @todo cascading?
}

export type Cypher = {
  raw(cypher: string, opts?: QueryConfig): Promise<RawResponse>
  exec(cypher: string, opts?: QueryConfig): Promise<CypherResponse>
  exec1(cypher: string, opts?: QueryConfig): Promise<Cypher1Response>
}

export type RawResponse = {
  records: {
    _headers: any
    _values: any
  }[]
}

// A node must conform to the id and __typename
export type NodeRef = {
  id?: string
  __typename: string
}

export type Node = {
  [propName: string]: any
} & NodeRef

export type Rel = {
  __direction?: RelationDirection
  __typename: string
  [propName: string]: any
}

export enum RelationDirection {
  IN = 'IN',
  OUT = 'OUT',
  NONE = 'NONE',
}

export type ConnectionLogger = (cypher: string, time: [number, number]) => void
export type ConnectionConfig = {
  host: string
  port: number | string
  username: string
  password: string
} & QueryConfig

export type QueryConfig = {
  logger?: (cypher: any, time: [number, number]) => void
}
