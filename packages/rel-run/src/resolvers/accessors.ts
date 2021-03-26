import { cypherFind, cypherList } from "../cypher"
import { FindAccessor } from "@reldb/types"

// type FindOpts = {
//   label: string
//   findBy?: string[]
//   where?: string
// }

export function findResolver(label: string, opts: FindAccessor) {
  const {
    // findBy,
    // where,
    // only,
  } = opts

  return async (runtime) => {
    const { params } = runtime

    // @todo allow more findBy types
    // const findParamName = findBy
    //   .map((f, i) => (i === 0 ? f : titleize(f)))
    //   .join("Or")
    return cypherFind(label, params.id)
  }
}

type ListOpts = {
  label: string
  findBy?: string[]
  where?: string
}

export function listResolver(opts: ListOpts) {
  const { label } = opts
  const defaultOrder = "id"

  return async (runtime) => {
    const { params } = runtime
    const { limit, skip = 0, order = defaultOrder } = params
    const {
      // boundingBox,
      filter,
    } = params

    return cypherList(label, { limit, skip, order })
  }
}
