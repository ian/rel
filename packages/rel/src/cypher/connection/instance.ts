import { Cypher1Response, Cypher, CypherResponse } from "../../types"
import { cypherNode } from "../node"
import { cypherRel } from "../rel"
import { cypherFind } from "../find"
import { cypherList } from "../list"
import { cypherCreate } from "../create"
import { cypherUpdate } from "../update"
import { cypherDelete } from "../delete"
import {
  cypherClearRelationship,
  cypherListRelationship,
  cypherCreateRelationship,
  cypherDeleteRelationship,
} from "../relationship"

export default abstract class CypherInstance implements Cypher {
  node = cypherNode
  rel = cypherRel

  find = cypherFind
  list = cypherList
  create = cypherCreate
  update = cypherUpdate
  delete = cypherDelete

  listRelation = cypherListRelationship
  clearRelation = cypherClearRelationship
  createRelation = cypherCreateRelationship
  deleteRelation = cypherDeleteRelationship

  abstract raw(cypher: string): Promise<object>
  abstract exec(cypher: string): Promise<CypherResponse>
  abstract exec1(cypher: string): Promise<Cypher1Response>
}
