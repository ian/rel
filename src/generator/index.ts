import {
  Schema,
  convertToSchemaType,
  convertToSchemaFindQuery,
  convertToSchemaListQuery,
} from "./schema"
import { convertToResoverFindQuery } from "./resolvers"

export function generate(obj) {
  const typeSchema = {}
  const querySchema = {}
  const mutationSchema = {}

  const queryResolvers = {}
  const mutationResolvers = {}

  Object.entries(obj).forEach((types) => {
    const [name, def] = types
    const { fields, accessors } = def as Schema

    // Generate the type definition
    typeSchema[name] = convertToSchemaType(name, fields)

    // Generate Queries and Mutations
    if (accessors) {
      if (accessors.find) {
        const [schemaName, schemaDef] = convertToSchemaFindQuery(
          name,
          accessors.find,
          fields
        )
        querySchema[schemaName] = schemaDef

        const {
          name: resolverName,
          handler: resolverHandler,
        } = convertToResoverFindQuery(name, accessors.find)

        console.log({ resolverName })
        console.log({ resolverHandler })

        queryResolvers[resolverName] = resolverHandler
      }

      if (accessors.list) {
        const [queryName, queryDef] = convertToSchemaListQuery(
          name,
          accessors.list,
          fields
        )
        querySchema[queryName] = queryDef
      }
    }
  })

  const gqlSchema = [Object.values(typeSchema).join("\n\n")]
  gqlSchema.push(`type Query {
  ${Object.values(querySchema).join("\n  ")}
}`)
  gqlSchema.push(`type Mutation {
  ${Object.values(mutationSchema).join("\n  ")}
}`)

  return {
    schema: gqlSchema,
    resolvers: {
      Query: queryResolvers,
      Mutation: mutationResolvers,
    },
  }
}
