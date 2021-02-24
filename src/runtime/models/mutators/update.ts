import { string, uuid, type } from "~/fields"
import { UpdateMutator, Fields, ReducedField, ReducedType } from "~/types"
import { updateResolver } from "~/resolvers"
import { generateInput } from "../input"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: UpdateMutator) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    mutator
  )

  return updateResolver(label, standardizedOpts)
}

function makeType(label: string, accessor: UpdateMutator): ReducedField {
  const { guard } = accessor

  return {
    params: { id: uuid(), input: type(`${label}Input`) },
    guard,
    returns: type(label),
  }
}

export function generateUpdate(
  label: string,
  mutator: boolean | UpdateMutator,
  fields: Fields
) {
  if (!mutator) return null

  let _mutator = {
    ...DEFAULT_MUTATOR,
    ...(typeof mutator === "boolean" ? {} : mutator),
  }

  const mutationName = `Update${label}`
  const inputName = `${label}Input`

  return {
    inputs: {
      [inputName]: generateInput(fields),
    },
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
// import { updateResolver } from "~/resolvers"

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
//   return updateResolver(standardizedOpts)
// }

// export function generateUpdate(label, definition, fields: Fields) {
//   throw new Error("@todo generateUpdate()")

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
