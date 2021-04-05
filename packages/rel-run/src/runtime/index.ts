import { AuthModel, AuthStrategy, Guards, Plugin, Schema } from "@reldb/types"
import { generateResolvers, generateDirectiveResolvers } from "./resolvers"
import { generateTypeDefs } from "./typeDefs"
import Reducer from "./reducer"

export { default as Reducer } from "./reducer"

export type RuntimeOpts = {
  auth?: { model: AuthModel; strategies?: AuthStrategy[] }
  schema?: Schema
  guards?: Guards
  plugins?: Plugin[]
}

export function runtime(opts: RuntimeOpts) {
  const { auth, guards, schema } = opts
  const reducer = new Reducer()

  if (auth) {
    auth.model?.reduce(reducer.reduce)
    auth.strategies?.forEach((strategy) => strategy.reduce(reducer.reduce))
  }

  reducer.reduce({ guards, schema })

  const reduced = reducer.toReducible()

  const typeDefs = generateTypeDefs(reduced)
  const resolvers = generateResolvers(reduced)
  const directives = generateDirectiveResolvers(reduced)

  try {
    return {
      typeDefs,
      resolvers,
      directives,
    }
  } catch (err) {
    throw err
  }
}
