import { type, uuid } from "~/fields"
import { DeleteMutator, Fields, ReducedField } from "~/types"
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

function makeType(label: string, accessor: DeleteMutator): ReducedField {
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
) {
  if (!mutator) return null

  let _mutator = {
    ...DEFAULT_MUTATOR,
    ...(typeof mutator === "boolean" ? {} : mutator),
  }

  const mutationName = `Delete${label}`

  return {
    types: {
      Mutation: {
        [mutationName]: makeType(label, _mutator),
      },
    },
    resolvers: {
      Mutation: {
        [mutationName]: makeResolver(label, _mutator),
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
