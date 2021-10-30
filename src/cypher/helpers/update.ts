import { isEmpty } from "lodash"
import { diff } from "../util/object"
import { Cypher1Response } from "../types"
import { paramify, TIMESTAMPS } from "../util/params"

export type UpdateOpts = {
  id?: boolean
  timestamps?: boolean
}

const DEFAULT_UPDATE_OPTS = {
  id: false,
  timestamps: TIMESTAMPS.UPDATED,
}

export async function cypherUpdate(
  label: string,
  id: string,
  params: object,
  opts: UpdateOpts = {}
): Promise<Cypher1Response> {
  const node = await this.find(label, { id })

  if (!node) {
    throw new Error(`Unknown ${label} id = ${id}`)
  }

  const toParams = diff(node, params, {
    ignore: ["id", "createdAt", "updatedAt", "__typename"],
  })

  if (isEmpty(toParams)) {
    // no changes necessary, just return the object
    return node
  }

  const paramsCypher = paramify(toParams, {
    ...DEFAULT_UPDATE_OPTS,
    ...opts,
    prefix: "node.",
    separator: "=",
  })

  const res = await this.exec1(
    `
      MATCH (node:${label} { ${paramify({ id })} })
      SET ${paramsCypher}
      RETURN node;
    `
  )

  if (!res) throw new Error(`${label} not found`)

  return res.node
}
