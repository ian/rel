/* eslint-disable max-lines */
import { GraphQLInputObjectType, GraphQLNamedInputType, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLID, GraphQLEnumType, GraphQLObjectType, GraphQLNonNull, GraphQLField, getNamedType, isScalarType, GraphQLInputFieldMap, GraphQLScalarType, GraphQLNamedType, GraphQLInputField, isEnumType, isObjectType, isInputObjectType, GraphQLInputType, getNullableType, isListType } from 'graphql'
import { GraphbackOperationType, getInputTypeName, getInputFieldName, getInputFieldTypeName, getPrimaryKey, ModelDefinition, FILTER_SUPPORTED_SCALARS, isAutoPrimaryKey } from '@graphback/core'
import { SchemaComposer } from 'graphql-compose'
import { copyWrappingType } from './copyWrappingType'

const PageRequestTypeName = 'PageRequest'
const SortDirectionEnumName = 'SortDirectionEnum'
const OrderByInputTypeName = 'OrderByInput'
const aggFields = ["count", "sum", "max", "avg", "min"]

export const getInputName = (type: GraphQLNamedType) => {
  if (isEnumType(type)) {
    return 'StringInput'
  }

  if (isInputObjectType(type)) {
    return type.name
  }

  return `${type.name}Input`
}

export const createInputTypeForScalar = (scalarType: GraphQLScalarType) => {
  const newInput = new GraphQLInputObjectType({
    name: getInputName(scalarType),
    fields: {
      ne: { type: scalarType },
      eq: { type: scalarType },
      le: { type: scalarType },
      lt: { type: scalarType },
      ge: { type: scalarType },
      gt: { type: scalarType },
      in: { type: GraphQLList(GraphQLNonNull(scalarType)) },
      between: { type: GraphQLList(GraphQLNonNull(scalarType)) }
    }
  })

  return newInput
}

export const StringScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLString),
  fields: {
    ne: { type: GraphQLString },
    eq: { type: GraphQLString },
    le: { type: GraphQLString },
    lt: { type: GraphQLString },
    ge: { type: GraphQLString },
    gt: { type: GraphQLString },
    in: { type: GraphQLList(GraphQLNonNull(GraphQLString)) },
    contains: { type: GraphQLString },
    startsWith: { type: GraphQLString },
    endsWith: { type: GraphQLString }
  }
})

export const IDScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLID),
  fields: {
    ne: { type: GraphQLID },
    eq: { type: GraphQLID },
    le: { type: GraphQLID },
    lt: { type: GraphQLID },
    ge: { type: GraphQLID },
    gt: { type: GraphQLID },
    in: { type: GraphQLList(GraphQLNonNull(GraphQLID)) }
  }
})

export const BooleanScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLBoolean),
  fields: {
    ne: { type: GraphQLBoolean },
    eq: { type: GraphQLBoolean }
  }
})

export const PageRequest = new GraphQLInputObjectType({
  name: PageRequestTypeName,
  fields: {
    limit: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  }
})

export const SortDirectionEnum = new GraphQLEnumType({
  name: SortDirectionEnumName,
  values: {
    DESC: { value: 'desc' },
    ASC: { value: 'asc' }
  }
})

export const buildOrderByInputType = (modelName) => {
  return new GraphQLInputObjectType({
    name: modelName + "OrderByInput",
    fields: {
      field: { type: modelName + "FieldsEnum" },
      order: { type: SortDirectionEnum, defaultValue: 'asc' }
    }
  })
}

export const OrderByInputType = new GraphQLInputObjectType({
  name: OrderByInputTypeName,
  fields: {
    field: { type: GraphQLNonNull(GraphQLString) },
    order: { type: SortDirectionEnum, defaultValue: 'asc' }
  }
})

function addITC(schemaComposer, inputTypeName, fields) {
  let itc
  try {
    itc = schemaComposer.getITC(inputTypeName)
  } catch {
    itc = null
  }

  if (!itc) {
    schemaComposer.createInputTC({
      name: inputTypeName,
      fields
    })
  } else {
    itc.removeField("foo").addFields(fields)
  }
}

function getModelInputFields(schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType, operationType: GraphbackOperationType): GraphQLInputField[] {
  const inputFields: GraphQLInputField[] = []
  const fields: Array<GraphQLField<any, any>> = Object.values(modelType.getFields())

  for (const field of fields) {
    const typeName = getInputFieldTypeName(modelType.name, field, operationType)
    if (!typeName) {
      continue
    }
    if (field?.extensions?.directives?.some?.(d => ["computed", "transient"].includes(d.name))) {
      continue
    }

    const name = getInputFieldName(field)

    let type
    try {
      type = schemaComposer.getAnyTC(typeName).getType()
    } catch {
      type = schemaComposer.createInputTC(`input ${typeName} { foo: Int }`).getType()
    }

    const wrappedType = copyWrappingType(field.type, type)

    const extensions = {}

    const constraintDirective = field?.extensions?.directives?.find?.(d => d.name === "constraint")

    if (constraintDirective) {
      extensions.directives = [constraintDirective]
    }

    const inputField: GraphQLInputField = {
      name,
      type: wrappedType,
      description: undefined,
      extensions,
      deprecationReason: field.deprecationReason
    }
    inputFields.push(inputField)
  }

  return inputFields
}

export function buildFindOneFieldMap(modelType: ModelDefinition, schemaComposer: SchemaComposer<any>): GraphQLInputFieldMap {
  const { type } = modelType.primaryKey

  return {
    _id: {
      name: '_id',
      type: GraphQLNonNull(schemaComposer.getAnyTC(type).getType()),
      description: undefined,
      extensions: undefined,
      deprecationReason: undefined
    }
  }
}

export const buildFilterInputType = (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => {
  const operationType = GraphbackOperationType.FIND

  const inputTypeName = getInputTypeName(modelType.name, operationType)

  const inputFields = getModelInputFields(schemaComposer, modelType, operationType)

  const scalarInputFields: any = {}

  for (const field of inputFields) {
    const namedType = getNamedType(field.type)
    if (aggFields.includes(field.name)) {
      continue
    }
    if (FILTER_SUPPORTED_SCALARS.includes(namedType.name) || isEnumType(namedType) || isInputObjectType(namedType)) {
      const type = getInputName(namedType)
      scalarInputFields[field.name] = {
        name: field.name,
        type
      }
    }
  }

  const fields = {
    ...scalarInputFields,
    and: {
      type: `[${inputTypeName}!]`
    },
    or: {
      type: `[${inputTypeName}!]`
    },
    not: {
      type: `${inputTypeName}`
    }
  }

  addITC(schemaComposer, inputTypeName, fields)
}

export const buildCreateMutationInputType = (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => {
  const operationType = GraphbackOperationType.CREATE
  const inputTypeName = getInputTypeName(modelType.name, operationType)

  const idField = getPrimaryKey(modelType)
  const allModelFields = getModelInputFields(schemaComposer, modelType, operationType)

  const fields: any = {}
  for (const field of allModelFields) {
    if ((field.name === idField.name && isAutoPrimaryKey(field)) || aggFields.includes(field.name)) {
      continue
    }

    fields[field.name] = {
      name: field.name,
      type: field.type,
      extensions: field.extensions
    }
  }

  addITC(schemaComposer, inputTypeName, fields)
  const relationFields = {}
  Object.keys(fields).forEach(k => {
    if (!(["ID", "ID!"].includes(fields[k].type.toString()) || fields[k].name === "_id") && !aggFields.includes(fields[k].name)) {
      relationFields[k] = fields[k]
    }
  })
  addITC(schemaComposer, `Create${modelType.name}RelationInput`, relationFields)
}

export const buildSubscriptionFilterType = (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.SUBSCRIPTION_CREATE)
  const modelFields = Object.values(modelType.getFields())
  const subscriptionFilterFields = modelFields.filter((f: GraphQLField<any, any>) => {
    const namedType = getNamedType(f.type)
    return !f.extensions?.directives?.some?.(d => ["transient", "computed"].includes(d.name)) && (isScalarType(namedType) && FILTER_SUPPORTED_SCALARS.includes(namedType.name)) || isEnumType(namedType)
  })

  const fields = {
    and: {
      type: `[${inputTypeName}!]`
    },
    or: {
      type: `[${inputTypeName}!]`
    },
    not: {
      type: `${inputTypeName}`
    }
  }
  for (const { name, type } of subscriptionFilterFields) {
    const fieldType: GraphQLNamedType = getNamedType(type)
    const inputFilterName = getInputName(fieldType)

    fields[name] = {
      name,
      type: schemaComposer.get(inputFilterName)
    }
  }

  addITC(schemaComposer, inputTypeName, fields)
}

export const buildMutationInputType = (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => {
  const operationType = GraphbackOperationType.UPDATE
  const inputTypeName = getInputTypeName(modelType.name, operationType)

  const idField = getPrimaryKey(modelType)
  const allModelFields = getModelInputFields(schemaComposer, modelType, operationType)

  const fields: any = {}
  for (const { name, type, extensions } of allModelFields) {
    if (aggFields.includes(name)) {
      continue
    }
    let fieldType: GraphQLInputType

    if (name !== idField.name) {
      fieldType = getNullableType(type)
    }

    if (isListType(fieldType)) {
      fieldType = GraphQLList(getNamedType(fieldType))
    }

    fields[name] = {
      name,
      type: fieldType || type,
      extensions
    }
  }

  addITC(schemaComposer, inputTypeName, fields)
  const relationFields = {}
  Object.keys(fields).forEach(k => {
    if ((fields[k].type.toString() !== "ID" || fields[k].name === "_id") && !aggFields.includes(fields[k].name)) {
      relationFields[k] = fields[k]
    }
  })
  addITC(schemaComposer, `Mutate${modelType.name}RelationInput`, relationFields)
}

function mapObjectInputFields(schemaComposer: SchemaComposer<any>, fields: Array<GraphQLField<any, any>>, objectName: string): GraphQLInputField[] {
  return fields.map((field: GraphQLField<any, any>) => {
    let namedType = getNamedType(field.type) as GraphQLNamedInputType
    let typeName = namedType.name

    let inputType
    if (isObjectType(namedType)) {
      typeName = getInputTypeName(typeName, GraphbackOperationType.CREATE)
      namedType = schemaComposer.getOrCreateITC(typeName).getType()

      inputType = copyWrappingType(field.type, namedType)
    }

    return {
      name: field.name,
      type: inputType || field.type,
      extensions: {},
      deprecationReason: field.deprecationReason
    }
  })
}

export function addCreateObjectInputType(schemaComposer: SchemaComposer<any>, objectType: GraphQLObjectType) {
  const objectFields = Object.values(objectType.getFields())
  const operationType = GraphbackOperationType.CREATE
  const inputTypeName = getInputTypeName(objectType.name, operationType)
  const fields = mapObjectInputFields(schemaComposer, objectFields, objectType.name)
    .reduce((fieldObj: any, { name, type, description }: any) => {
      fieldObj[name] = { type, description }

      return fieldObj
    }, {})

  addITC(schemaComposer, inputTypeName, fields)
}

export function addUpdateObjectInputType(schemaComposer: SchemaComposer<any>, objectType: GraphQLObjectType) {
  const objectFields = Object.values(objectType.getFields())
  const operationType = GraphbackOperationType.UPDATE
  const inputTypeName = getInputTypeName(objectType.name, operationType)
  const fields = mapObjectInputFields(schemaComposer, objectFields, objectType.name)
    .reduce((fieldObj: any, { name, type, description }: any) => {
      fieldObj[name] = { type: getNullableType(type), description }

      return fieldObj
    }, {})

  addITC(schemaComposer, inputTypeName, fields)
}

export const createMutationListResultType = (modelType: GraphQLObjectType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}MutationResultList`,
    fields: {
      items: {
        type: GraphQLNonNull(GraphQLList(modelType))
      }
    }
  })
}

export const createModelListResultType = (modelType: GraphQLObjectType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}ResultList`,
    fields: {
      items: {
        type: GraphQLNonNull(GraphQLList(modelType))
      },
      offset: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      count: { type: GraphQLInt }
    }
  })
}

export function createVersionedInputFields(versionedInputType: GraphQLInputObjectType) {
  return {
    createdAt: {
      type: versionedInputType
    },
    updatedAt: {
      type: versionedInputType
    }
  }
}

export function createVersionedFields(type: GraphQLScalarType) {
  return {
    createdAt: {
      type,
    },
    updatedAt: {
      type,
    }
  }
}
