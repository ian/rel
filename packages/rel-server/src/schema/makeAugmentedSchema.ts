import {
  DirectiveDefinitionNode,
  EnumTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
} from "graphql"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { pluralize, SchemaComposer } from "graphql-compose"

import { parseObject } from "./parser"
import { fieldsToComposer } from "./fields"

import * as Resolvers from "../resolvers"
import Scalars from "../scalars"
import { Relation } from "../types"

export function makeAugmentedSchema(typeDefs: string) {
  const composer = new SchemaComposer()
  const document = mergeTypeDefs(typeDefs)

  // const scalars = document.definitions.filter(
  //   (x) => x.kind === "ScalarTypeDefinition"
  // ) as ScalarTypeDefinitionNode[]

  Object.keys(Scalars).forEach((scalar) =>
    composer.addTypeDefs(`scalar ${scalar}`)
  )

  const objectNodes = document.definitions.filter(
    (x) =>
      x.kind === "ObjectTypeDefinition" &&
      !["Query", "Mutation", "Subscription"].includes(x.name.value)
  ) as ObjectTypeDefinitionNode[]

  const enums = document.definitions.filter(
    (x) => x.kind === "EnumTypeDefinition"
  ) as EnumTypeDefinitionNode[]

  const inputs = document.definitions.filter(
    (x) => x.kind === "InputObjectTypeDefinition"
  ) as InputObjectTypeDefinitionNode[]

  let interfaces = document.definitions.filter(
    (x) => x.kind === "InterfaceTypeDefinition"
  ) as InterfaceTypeDefinitionNode[]

  const directives = document.definitions.filter(
    (x) => x.kind === "DirectiveDefinition"
  ) as DirectiveDefinitionNode[]

  // const unions = document.definitions.filter(
  //   (x) => x.kind === "UnionTypeDefinition"
  // ) as UnionTypeDefinitionNode[]

  // console.log({
  //   scalars,
  //   objectNodes,
  //   enums,
  //   inputs,
  //   interfaces,
  //   directives,
  //   unions,
  // })

  const nodes = objectNodes.map((definition) => {
    const { name, fields, relations } = parseObject(definition)

    // console.log("objectNodes.map", { name, fields, relations })

    const objectType = composer.createObjectTC({
      name,
      fields: {
        id: "ID!",
        createdAt: "DateTime!",
        updatedAt: "DateTime",
        ...fieldsToComposer(fields),
      },
    })

    const whereInput = composer.createInputTC({
      name: `${name}Where`,
      fields: {
        id: "ID",
        ...fieldsToComposer(fields, { optional: true }),
        AND: `[${name}Where!]`,
        OR: `[${name}Where!]`,
        NOT: `[${name}Where!]`,
      },
    })

    Object.values(relations).forEach((rel: Relation) => {
      const { name, type, relation } = rel
      const args = {
        where: `${relation.type}Where`,
        skip: "Int",
        limit: "Int",
      }

      objectType.addFields({
        [name]: {
          type: `[${relation.type}]!`,
          args,
          resolve: Resolvers.relationResolver(rel),
        },
      })
    })

    // Queries

    composer.Query.addFields({
      [`findOne${name}`]: {
        args: {
          where: whereInput,
        },
        description: `Find one ${name} matching 'where'`,
        type: name,
        resolve: Resolvers.findOneResolver(name),
      },
    })

    composer.Query.addFields({
      [`findMany${pluralize(name)}`]: {
        args: {
          where: whereInput,
          offset: "Int",
          limit: "Int",
        },
        description: `Find multiple ${pluralize(name)} matching 'where'`,
        type: objectType.List.NonNull,
        resolve: Resolvers.findManyResolver(name),
      },
    })

    composer.Query.addFields({
      [`count${pluralize(name)}`]: {
        args: {
          where: whereInput,
        },
        description: `Count number of ${name} nodes matching 'where'`,
        type: `Int!`,
        resolve: Resolvers.countResolver(name),
      },
    })

    // Mutations

    const createInput = composer.createInputTC({
      name: `${name}CreateInput`,
      fields: fieldsToComposer(fields),
    })

    const updateInput = composer.createInputTC({
      name: `${name}UpdateInput`,
      fields: fieldsToComposer(fields, { optional: true }),
    })

    composer.Mutation.addFields({
      [`create${name}`]: {
        args: {
          data: createInput.NonNull,
        },
        description: `Create a single ${name} using 'data' values`,
        type: objectType,
        resolve: Resolvers.createResolver(name),
      },
    })

    // @todo
    // composer.Mutation.addFields({
    //   [`createMany${name}`]: {
    //     args: {
    //       where: whereInput.NonNull,
    //       data: updateInput.NonNull.List.NonNull,
    //     },
    //     // description: ``,
    //     type: name,
    //     resolve: Resolvers.updateManyResolver(name),
    //   },
    // })

    composer.Mutation.addFields({
      [`update${name}`]: {
        args: {
          where: whereInput.NonNull,
          data: updateInput.NonNull,
        },
        description: `Update first ${name} matching 'where'`,
        type: objectType,
        resolve: Resolvers.updateResolver(name),
      },
    })

    composer.Mutation.addFields({
      [`updateMany${name}`]: {
        args: {
          where: whereInput.NonNull,
          data: updateInput.NonNull,
        },
        description: `Update multiple ${pluralize(
          name
        )} matching 'where', sets all nodes to 'data' values`,
        type: objectType.List.NonNull,
        resolve: Resolvers.updateManyResolver(name),
      },
    })

    composer.Mutation.addFields({
      [`merge${name}`]: {
        args: {
          where: whereInput.NonNull,
          data: updateInput,
        },
        description: `Merge will find or create a ${name} matching 'where', if found will update using data, if not found will create using data + where`,
        type: objectType,
        resolve: Resolvers.mergeResolver(name),
      },
    })

    composer.Mutation.addFields({
      [`delete${name}`]: {
        args: {
          where: whereInput.NonNull,
        },
        description: `Delete one ${name} by 'where', returns node if found otherwise null`,
        type: objectType,
        resolve: Resolvers.deleteResolver(name),
      },
    })

    composer.Mutation.addFields({
      [`deleteMany${name}`]: {
        args: {
          where: whereInput.NonNull,
        },
        description: `Delete multiple ${pluralize(
          name
        )} by 'where', returns number of nodes deleted`,
        type: "Int!",
        resolve: Resolvers.deleteManyResolver(name),
      },
    })
  })

  const sortDirection = composer.createEnumTC({
    name: "SortDirection",
    values: {
      ASC: {
        value: "ASC",
        description: "Sort by field values in ascending order.",
      },
      DESC: {
        value: "DESC",
        description: "Sort by field values in descending order.",
      },
    },
  })

  return composer.buildSchema()
}
