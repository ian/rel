import { type, uuid } from "~/fields"
import { DeleteMutator, ENDPOINTS, Fields, Reducible, TypeDef } from "~/types"
import { deleteResolver } from "~/resolvers"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: DeleteMutator) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    mutator
  )

  return deleteResolver(label, standardizedOpts)
}

function makeType(label: string, accessor: DeleteMutator): TypeDef {
  const { guard } = accessor

  return {
    params: { id: uuid() },
    guard,
    returns: type(label),
  }
}

export function generateDelete(
  label: string,
  mutator: boolean | DeleteMutator,
  fields: Fields
): Reducible {
  if (!mutator) return null

  let _mutator = {
    ...DEFAULT_MUTATOR,
    ...(typeof mutator === "boolean" ? {} : mutator),
  }

  return {
    endpoints: {
      [`Delete${label}`]: {
        type: ENDPOINTS.MUTATOR,
        typeDef: makeType(label, _mutator),
        resolver: makeResolver(label, _mutator),
      },
    },
  }
}

// import { Fields, Resolver } from "~/types"
// import { findResolver } from "../../../resolvers"

// const DEFAULT_OPTS = {
//   findBy: ["id"],
// }
// const DEFAULT_RESOLVER = {}

// function makeResolver(label: string, resolver: Resolver) {
//   const standardizedOpts = Object.assign(
//     {
//       label,
//     },
//     DEFAULT_OPTS,
//     typeof resolver === "boolean" ? DEFAULT_RESOLVER : resolver
//   )
//   return findResolver(standardizedOpts)
// }

// export function generateDelete(label, definition, fields: Fields) {
//   return {}

//   // const name = `Find${label}`
//   // return {
//   //   schema: {
//   //     Query: {
//   //       [`${name}(id: UUID!)`]: label,
//   //     },
//   //   },
//   //   resolvers: {
//   //     Query: {
//   //       [name]: makeResolver(label, definition),
//   //     },
//   //   },
//   // }
// }
