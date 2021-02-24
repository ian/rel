import { Reducible, ReducedField, ReducedType, FindAccessor } from "~/types"
import { uuid, type } from "~/fields"
import { findResolver } from "~/resolvers"
import _ from "lodash"

// type ResolverFindQueryOpts = {
//   findBy?: string[]
//   // geo?: boolean
//   where?: string
//   only?: string[]
// }

const DEFAULT_ACCESSOR = {
  findBy: { id: uuid() }, //["id"],
}

function makeResolver(label: string, accessor: FindAccessor) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    accessor
  )
  return findResolver(label, standardizedOpts)
}

function makeType(label: string, accessor: FindAccessor): ReducedField {
  const { findBy, guard } = accessor

  // console.log({ findBy })

  return {
    params: findBy,
    guard,
    returns: type(label),
  }
}

export function generateFind(
  label,
  accessor: boolean | FindAccessor
  // fields: Fields
): Reducible {
  if (!accessor) return null

  let _accessor = {
    ...DEFAULT_ACCESSOR,
    ...(typeof accessor === "boolean" ? {} : accessor),
  }

  const name = `Find${label}`
  // let guard, params

  return {
    types: {
      Query: {
        [name]: makeType(label, _accessor),
      },
    },
    resolvers: {
      Query: {
        [name]: makeResolver(label, _accessor),
      },
    },
  }

  // if (accessor === true) {

  // } else {
  //   const { guard } = accessor
  //   const params = accessor.findBy

  //   return {
  //     types: {
  //       Query: {
  //         [name]: {
  //           params,
  //           guard,
  //           returns: label,
  //         },
  //       },
  //     },
  //     resolvers: {
  //       Query: {
  //         [name]: makeResolver(label, accessor),
  //       },
  //     },
  //   }
  // }
}
