var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/crud/mappingHelpers.ts
import { getNamedType, isObjectType, isScalarType, isEnumType } from "graphql";
import { parseMetadata } from "graphql-metadata";
import pluralize from "pluralize";
import { getUserTypesFromSchema } from "@graphql-tools/utils";

// src/crud/GraphbackOperationType.ts
var GraphbackOperationType = /* @__PURE__ */ ((GraphbackOperationType2) => {
  GraphbackOperationType2["CREATE"] = "create";
  GraphbackOperationType2["UPDATE"] = "update";
  GraphbackOperationType2["UPDATE_BY"] = "updateBy";
  GraphbackOperationType2["FIND"] = "find";
  GraphbackOperationType2["FIND_ONE"] = "findOne";
  GraphbackOperationType2["DELETE"] = "delete";
  GraphbackOperationType2["DELETE_BY"] = "deleteBy";
  GraphbackOperationType2["SUBSCRIPTION_CREATE"] = "subCreate";
  GraphbackOperationType2["SUBSCRIPTION_UPDATE"] = "subUpdate";
  GraphbackOperationType2["SUBSCRIPTION_DELETE"] = "subDelete";
  return GraphbackOperationType2;
})(GraphbackOperationType || {});

// src/crud/mappingHelpers.ts
function lowerCaseFirstChar(text) {
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}
function upperCaseFirstChar(text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
var getFieldName = (typeName, action) => {
  const finalName = upperCaseFirstChar(typeName);
  switch (action) {
    case "findOne" /* FIND_ONE */:
      return `get${finalName}`;
    case "find" /* FIND */:
      return `find${pluralize(finalName)}`;
    case "deleteBy" /* DELETE_BY */:
      return `delete${pluralize(finalName)}`;
    case "updateBy" /* UPDATE_BY */:
      return `update${pluralize(finalName)}`;
    default:
      return `${action}${finalName}`;
  }
};
var getInputTypeName = (typeName, action) => {
  const finalName = upperCaseFirstChar(typeName);
  switch (action) {
    case "find" /* FIND */:
      return `${finalName}Filter`;
    case "create" /* CREATE */:
      return `Create${finalName}Input`;
    case "update" /* UPDATE */:
    case "delete" /* DELETE */:
    case "updateBy" /* UPDATE_BY */:
    case "deleteBy" /* DELETE_BY */:
      return `Mutate${finalName}Input`;
    case "subCreate" /* SUBSCRIPTION_CREATE */:
    case "subUpdate" /* SUBSCRIPTION_UPDATE */:
    case "subDelete" /* SUBSCRIPTION_DELETE */:
      return `${finalName}SubscriptionFilter`;
    default:
      return "";
  }
};
var getSubscriptionName = (typeName, action) => {
  const finalName = upperCaseFirstChar(typeName);
  if (action === "create" /* CREATE */) {
    return `new${finalName}`;
  }
  if (action === "update" /* UPDATE */) {
    return `updated${finalName}`;
  }
  if (action === "delete" /* DELETE */) {
    return `deleted${finalName}`;
  }
  return "";
};
function isModelType(graphqlType) {
  return !!parseMetadata("model", graphqlType.description);
}
function filterModelTypes(schema) {
  return getUserTypesFromSchema(schema).filter(isModelType);
}
function filterNonModelTypes(schema) {
  return getUserTypesFromSchema(schema).filter((t) => !isModelType(t));
}
function getUserModels(modelTypes) {
  return modelTypes.filter(isModelType);
}
function isInputField(field) {
  const relationshipAnnotation = parseRelationshipAnnotation(field.description);
  return relationshipAnnotation == null || relationshipAnnotation.kind !== "oneToMany";
}
function getRelationFieldName(field, type) {
  let fieldName;
  if (field.annotations.OneToOne) {
    fieldName = field.annotations.OneToOne.field;
  } else if (field.annotations.ManyToOne) {
    fieldName = field.annotations.ManyToOne.field;
  } else if (field.annotations.OneToMany) {
    fieldName = field.annotations.OneToMany.field;
  } else {
    fieldName = type.name;
  }
  return fieldName;
}
function getInputFieldName(field) {
  const relationshipAnnotation = parseRelationshipAnnotation(field.description);
  if (relationshipAnnotation == null) {
    return field.name;
  }
  if (relationshipAnnotation.kind === "oneToMany") {
    throw new Error("Not inputtable field!");
  }
  return relationshipAnnotation.key || transformForeignKeyName(field.name);
}
function getInputFieldTypeName(modelName, field, operation) {
  const fieldType = getNamedType(field.type);
  if (isObjectType(fieldType) && isModelType(fieldType)) {
    const relationshipAnnotation = parseRelationshipAnnotation(field.description);
    if (relationshipAnnotation == null) {
      throw new Error(`Missing relationship definition on: "${modelName}.${field.name}". Visit https://graphback.dev/docs/model/datamodel#relationships to see how you can define relationship in your business model.`);
    }
    const idField = getPrimaryKey(fieldType);
    return getNamedType(idField.type).name;
  }
  if (isScalarType(fieldType) || isEnumType(fieldType)) {
    return fieldType.name;
  }
  if (isObjectType(fieldType) && !isModelType(fieldType)) {
    if (operation === "find" /* FIND */) {
      return void 0;
    }
    return getInputTypeName(fieldType.name, operation);
  }
  return void 0;
}

// src/plugin/GraphbackPlugin.ts
var GraphbackPlugin = class {
  transformSchema(metadata) {
    return metadata.getSchema();
  }
  createResources(metadata) {
    return void 0;
  }
  createResolvers(metadata) {
    return void 0;
  }
  logWarning(message) {
    console.log(`Warning - ${this.getPluginName()}: ${message}`);
  }
  logError(message) {
    console.error(`Error - ${this.getPluginName()}: ${message}`);
  }
};

// src/plugin/GraphbackPluginEngine.ts
import { buildSchema } from "graphql";

// src/plugin/GraphbackCoreMetadata.ts
import { parseMetadata as parseMetadata7 } from "graphql-metadata";
import { mergeResolvers } from "@graphql-tools/merge";
import { getNamedType as getNamedType5 } from "graphql";
import { getUserTypesFromSchema as getUserTypesFromSchema2 } from "@graphql-tools/utils";

// src/db/defaultNameTransforms.ts
function defaultTableNameTransform(name, direction) {
  if (direction === "to-db") {
    return name.toLowerCase();
  }
  return name;
}
function transformForeignKeyName(name, direction = "to-db") {
  if (direction === "to-db") {
    return `${name}Id`;
  }
  return name;
}

// src/db/getPrimaryKey.ts
import { getNamedType as getNamedType2, isScalarType as isScalarType2 } from "graphql";
import { parseMetadata as parseMetadata2 } from "graphql-metadata";
function getPrimaryKey(graphqlType) {
  const fields = Object.values(graphqlType.getFields());
  const autoPrimaryKeyFromScalar = [];
  let primaryKey;
  let primariesCount = 0;
  for (const field of fields) {
    const hasIdMarker = parseMetadata2("id", field);
    if (hasIdMarker) {
      primaryKey = field;
      primariesCount += 1;
    } else if (isAutoPrimaryKey(field)) {
      autoPrimaryKeyFromScalar.push(field);
    }
  }
  if (primariesCount > 1) {
    throw new Error(`${graphqlType.name} type should not have multiple '@id' annotations.`);
  }
  if (primaryKey) {
    return primaryKey;
  }
  if (autoPrimaryKeyFromScalar.length > 1) {
    throw new Error(`${graphqlType.name} type should not have two potential primary keys: "_id" and "id". Use '@id' annotations to indicate which one is to be used.`);
  }
  primaryKey = autoPrimaryKeyFromScalar.shift();
  if (!primaryKey) {
    throw new Error(`${graphqlType.name} type has no primary field.`);
  }
  return primaryKey;
}
function isAutoPrimaryKey(field) {
  const { type, name: fieldName } = field;
  const baseType = getNamedType2(type);
  const name = baseType.name;
  return fieldName === "id" && name === "ID" && isScalarType2(baseType);
}

// src/db/buildModelTableMap.ts
import { parseMetadata as parseMetadata3 } from "graphql-metadata";
function getTableName(model) {
  let tableName = defaultTableNameTransform(model.name, "to-db");
  const dbAnnotations = parseMetadata3("db", model);
  if (dbAnnotations && dbAnnotations.name) {
    tableName = dbAnnotations.name;
  }
  return tableName;
}
function getColumnName(field) {
  let columnName = field.name;
  const dbAnnotations = parseMetadata3("db", field);
  if (dbAnnotations && dbAnnotations.name) {
    columnName = dbAnnotations.name;
  }
  return columnName;
}
function mapFieldsToColumns(fieldMap) {
  return Object.values(fieldMap).reduce((obj, field) => {
    const columnName = getColumnName(field);
    if (field.name !== columnName) {
      obj[field.name] = columnName;
    }
    return obj;
  }, {});
}
var buildModelTableMap = (model) => {
  const primaryKeyField = getPrimaryKey(model);
  const tableName = getTableName(model);
  const fieldMap = mapFieldsToColumns(model.getFields());
  return {
    idField: getColumnName(primaryKeyField),
    typeName: model.name,
    tableName,
    fieldMap
  };
};

// src/relationships/RelationshipMetadataBuilder.ts
import { isObjectType as isObjectType2, GraphQLNonNull, GraphQLList, getNamedType as getNamedType4 } from "graphql";
import { parseMetadata as parseMetadata5 } from "graphql-metadata";

// src/utils/hasListType.ts
import { isWrappingType, isListType } from "graphql";
function hasListType(outputType) {
  if (isListType(outputType)) {
    return true;
  } else if (isWrappingType(outputType)) {
    return hasListType(outputType.ofType);
  }
  return false;
}

// src/relationships/relationshipHelpers.ts
import { parseMetadata as parseMetadata4 } from "graphql-metadata";
import { getNamedType as getNamedType3 } from "graphql";
function parseRelationshipAnnotation(description = "") {
  const relationshipKinds = ["oneToMany", "oneToOne", "manyToOne"];
  for (const kind of relationshipKinds) {
    const annotation = parseMetadata4(kind, description);
    if (!annotation) {
      continue;
    }
    if (!annotation.field && kind !== "oneToOne") {
      throw new Error(`'field' is required on "${kind}" relationship annotations`);
    }
    return __spreadValues({
      kind
    }, annotation);
  }
  return void 0;
}
function isOneToManyField(field) {
  const oneToManyAnnotation = parseMetadata4("oneToMany", field.description);
  return !!oneToManyAnnotation;
}
var relationshipFieldDescriptionTemplate = (relationshipKind, fieldName, columnKey) => {
  return `@${relationshipKind}(field: '${fieldName}', key: '${columnKey}')`;
};
var relationshipOneToOneFieldDescriptionTemplate = (relationshipKind, columnKey) => {
  return `@${relationshipKind}(key: '${columnKey}')`;
};
function addRelationshipFields(model, typeComposer) {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();
  const fieldsObj = {};
  for (const current of model.relationships) {
    if (!modelFields[current.ownerField.name]) {
      fieldsObj[current.ownerField.name] = {
        type: current.ownerField.type,
        description: current.ownerField.description
      };
    }
  }
  typeComposer.addFields(fieldsObj);
}
function extendRelationshipFields(model, typeComposer) {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();
  for (const fieldRelationship of model.relationships) {
    if (modelFields[fieldRelationship.ownerField.name]) {
      const modelField = modelFields[fieldRelationship.ownerField.name];
      const partialConfig = {
        type: modelField.type,
        description: fieldRelationship.ownerField.description
      };
      typeComposer.extendField(fieldRelationship.ownerField.name, partialConfig);
    }
  }
}
function extendOneToManyFieldArguments(model, typeComposer) {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();
  for (const current of model.relationships) {
    if (modelFields[current.ownerField.name]) {
      const fieldNamedType = getNamedType3(current.ownerField.type);
      if (current.kind !== "oneToMany") {
        continue;
      }
      const partialConfig = {
        args: {
          filter: getInputTypeName(fieldNamedType.name, "find" /* FIND */)
        }
      };
      typeComposer.extendField(current.ownerField.name, partialConfig);
    }
  }
}

// src/relationships/RelationshipMetadataBuilder.ts
var RelationshipMetadataBuilder = class {
  modelTypes;
  relationships;
  constructor(modelTypes) {
    this.relationships = [];
    this.modelTypes = modelTypes;
  }
  build() {
    for (const modelType of this.modelTypes) {
      this.buildModelRelationshipContext(modelType);
    }
  }
  getRelationships() {
    return this.relationships;
  }
  getModelRelationships(modelName) {
    return this.relationships.filter((relationship) => relationship.owner.name === modelName);
  }
  buildModelRelationshipContext(modelType) {
    const fields = Object.values(modelType.getFields());
    for (let field of fields) {
      const annotation = parseRelationshipAnnotation(field.description);
      if (annotation == null) {
        continue;
      }
      this.validateRelationshipField(modelType.name, field, annotation);
      const relationType = getNamedType4(field.type);
      let relationField = relationType.getFields()[annotation.field];
      if (annotation.kind === "oneToMany") {
        field = this.updateOneToManyField(field, annotation.field, annotation.key);
        if (!relationField) {
          relationField = this.createManyToOneField(annotation.field, modelType, field.name, annotation.key);
        } else {
          relationField = this.updateManyToOneField(relationField, field.name, annotation.key);
        }
        const oneToManyAnnotation = annotation.key ? annotation : parseRelationshipAnnotation(field.description);
        const manyToOneAnnotation = parseRelationshipAnnotation(relationField.description);
        this.addOneToMany(modelType, field, oneToManyAnnotation, manyToOneAnnotation);
        this.addManyToOne(relationType, relationField, manyToOneAnnotation);
      } else if (annotation.kind === "manyToOne") {
        if (!relationField) {
          relationField = this.createOneToManyField(annotation.field, modelType, field.name, annotation.key);
        }
        const oneToManyAnnotation = parseRelationshipAnnotation(relationField.description);
        this.addManyToOne(modelType, field, annotation);
        this.addOneToMany(relationType, relationField, oneToManyAnnotation, annotation);
      } else if (annotation.kind === "oneToOne") {
        field = this.updateOneToOneField(field, annotation.key);
        const oneToOneAnnotation = annotation.key ? annotation : parseRelationshipAnnotation(field.description);
        this.addOneToOne(modelType, field, oneToOneAnnotation);
      }
    }
  }
  createOneToManyField(fieldName, baseType, relationFieldName, columnName) {
    const columnField = columnName || transformForeignKeyName(relationFieldName);
    const fieldDescription = relationshipFieldDescriptionTemplate("oneToMany", relationFieldName, columnField);
    const fieldType = GraphQLNonNull(GraphQLList(baseType));
    return {
      name: fieldName,
      description: fieldDescription,
      type: fieldType,
      args: [],
      extensions: [],
      isDeprecated: false,
      deprecationReason: void 0
    };
  }
  createManyToOneField(fieldName, baseType, relationFieldName, columnName) {
    const columnField = columnName || transformForeignKeyName(fieldName);
    const fieldDescription = relationshipFieldDescriptionTemplate("manyToOne", relationFieldName, columnField);
    return {
      name: fieldName,
      description: fieldDescription,
      type: baseType,
      args: [],
      extensions: [],
      isDeprecated: false,
      deprecationReason: void 0
    };
  }
  updateOneToManyField(field, relationFieldName, columnName) {
    if (!columnName) {
      const columnField = transformForeignKeyName(relationFieldName);
      const fieldDescription = relationshipFieldDescriptionTemplate("oneToMany", relationFieldName, columnField);
      const oldDescription = field.description ? `
${field.description}` : "";
      return __spreadProps(__spreadValues({}, field), {
        description: `${fieldDescription}${oldDescription}`
      });
    }
    return field;
  }
  updateManyToOneField(field, relationFieldName, columnName) {
    const manyToOneMetadata = parseMetadata5("manyToOne", field.description);
    if (!manyToOneMetadata || !manyToOneMetadata.key) {
      const columnField = columnName || transformForeignKeyName(field.name);
      const fieldDescription = relationshipFieldDescriptionTemplate("manyToOne", relationFieldName, columnField);
      const oldDescription = field.description ? `
${field.description}` : "";
      return __spreadProps(__spreadValues({}, field), {
        description: `${fieldDescription}${oldDescription}`
      });
    }
    return field;
  }
  updateOneToOneField(field, columnName) {
    if (!columnName) {
      const columnField = transformForeignKeyName(field.name);
      const fieldDescription = relationshipOneToOneFieldDescriptionTemplate("oneToOne", columnField);
      const oldDescription = field.description ? `
${field.description}` : "";
      return __spreadProps(__spreadValues({}, field), {
        description: `${fieldDescription}${oldDescription}`
      });
    }
    return field;
  }
  addOneToMany(ownerType, field, oneToManyAnnotation, corresspondingManyToOneMetadata) {
    this.validateOneToManyRelationship(ownerType.name, field, oneToManyAnnotation, corresspondingManyToOneMetadata);
    if (!oneToManyAnnotation.key) {
      return;
    }
    const relationType = getNamedType4(field.type);
    const oneToMany = {
      kind: "oneToMany",
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: oneToManyAnnotation.field,
      relationForeignKey: oneToManyAnnotation.key
    };
    this.relationships.push(oneToMany);
  }
  addManyToOne(ownerType, field, manyToOneAnnotation) {
    this.validateManyToOneField(ownerType.name, field, manyToOneAnnotation);
    if (!manyToOneAnnotation.key) {
      return;
    }
    const relationType = getNamedType4(field.type);
    const manyToOne = {
      kind: "manyToOne",
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: manyToOneAnnotation.field,
      relationForeignKey: manyToOneAnnotation.key
    };
    this.relationships.push(manyToOne);
  }
  addOneToOne(ownerType, field, oneToOneAnnotation) {
    this.validateOneToOneRelationship(ownerType.name, field, oneToOneAnnotation);
    if (!oneToOneAnnotation.key) {
      return;
    }
    const relationType = getNamedType4(field.type);
    const oneToOne = {
      kind: "oneToOne",
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: oneToOneAnnotation.field,
      relationForeignKey: oneToOneAnnotation.key
    };
    this.relationships.push(oneToOne);
  }
  validateOneToManyRelationship(modelName, field, oneToManyMetadata, corresspondingManyToOneMetadata) {
    this.validateRelationshipField(modelName, field, oneToManyMetadata);
    if (oneToManyMetadata.kind !== "oneToMany") {
      throw new Error(`${modelName}.${field.name} should be a @oneToMany field, but has a @${oneToManyMetadata.kind} annotation`);
    }
    const relationModelType = getNamedType4(field.type);
    const relationField = relationModelType.getFields()[oneToManyMetadata.field];
    if (!relationField) {
      return;
    }
    if (hasListType(relationField.type)) {
      throw new Error(`${relationModelType.name}.${relationField.name} is a list type, but should be '${relationField.name}: ${modelName}'.`);
    }
    const relationFieldBaseType = getNamedType4(relationField.type);
    if (!isObjectType2(relationFieldBaseType) || relationFieldBaseType.name !== modelName) {
      throw new Error(`${modelName}.${field.name} relationship field maps to ${relationModelType.name}.${relationField.name} (${relationFieldBaseType.name} type) which should be ${modelName} type.`);
    }
    if ((oneToManyMetadata == null ? void 0 : oneToManyMetadata.key) !== (corresspondingManyToOneMetadata == null ? void 0 : corresspondingManyToOneMetadata.key)) {
      throw new Error(`${modelName}.${field.name} and ${relationModelType.name}.${relationField.name} 'key' annotations are different. Ensure both are the same, or remove one so that it can be generated.`);
    }
  }
  validateManyToOneField(modelName, field, manyToOneAnnotation) {
    this.validateRelationshipField(modelName, field, manyToOneAnnotation);
    if (manyToOneAnnotation.kind !== "manyToOne") {
      throw new Error(`${modelName}.${field.name} should be a @manyToOne field, but has a @${manyToOneAnnotation.kind} annotation`);
    }
  }
  validateOneToOneRelationship(modelName, field, oneToOneAnnotation) {
    this.validateRelationshipField(modelName, field, oneToOneAnnotation);
    if (oneToOneAnnotation.kind !== "oneToOne") {
      throw new Error(`${modelName}.${field.name} should be a @oneToOne field, but has a ${oneToOneAnnotation.kind} annotation`);
    }
    if (hasListType(field.type)) {
      throw new Error(`${modelName}.${field.name} is a list type, but should be an object.`);
    }
  }
  validateRelationshipField(modelName, field, relationshipAnnotation) {
    if (!relationshipAnnotation) {
      throw new Error(`${modelName}.${field.name} is missing a relationship annotation.`);
    }
    const fieldBaseType = getNamedType4(field.type);
    if (!isObjectType2(fieldBaseType)) {
      throw new Error(`${modelName}.${field.name} is marked as a relationship field, but has type ${fieldBaseType.name}. Relationship fields must be object types.`);
    }
    if (!isModelType(fieldBaseType)) {
      throw new Error(`${modelName}.${field.name} is marked as a relationship field, but type ${fieldBaseType.name} is missing the @model annotation.`);
    }
  }
};

// src/utils/isTransientField.ts
import { parseMetadata as parseMetadata6 } from "graphql-metadata";
function isTransientField(field) {
  return parseMetadata6("transient", field);
}

// src/plugin/GraphbackCoreMetadata.ts
var defaultCRUDGeneratorConfig = {
  create: true,
  update: true,
  updateBy: true,
  findOne: true,
  find: true,
  delete: true,
  deleteBy: true,
  subCreate: true,
  subUpdate: true,
  subDelete: true
};
var GraphbackCoreMetadata = class {
  supportedCrudMethods;
  schema;
  resolvers;
  models;
  constructor(globalConfig, schema) {
    this.schema = schema;
    this.supportedCrudMethods = Object.assign({}, defaultCRUDGeneratorConfig, globalConfig == null ? void 0 : globalConfig.crudMethods);
  }
  getSchema() {
    return this.schema;
  }
  setSchema(newSchema) {
    this.schema = newSchema;
  }
  addResolvers(resolvers) {
    if (resolvers) {
      const mergedResolvers = [
        this.resolvers,
        resolvers
      ];
      this.resolvers = mergeResolvers(mergedResolvers);
    }
  }
  getResolvers() {
    return this.resolvers;
  }
  getModelDefinitions() {
    this.models = [];
    const modelTypes = this.getGraphQLTypesWithModel();
    const relationshipBuilder = new RelationshipMetadataBuilder(modelTypes);
    relationshipBuilder.build();
    for (const modelType of modelTypes) {
      const model = this.buildModel(modelType, relationshipBuilder.getModelRelationships(modelType.name));
      this.models.push(model);
    }
    return this.models;
  }
  getGraphQLTypesWithModel() {
    const types = getUserTypesFromSchema2(this.schema);
    return types.filter((modelType) => parseMetadata7("model", modelType));
  }
  buildModel(modelType, relationships) {
    let crudOptions = parseMetadata7("model", modelType);
    crudOptions = Object.assign({}, this.supportedCrudMethods, crudOptions);
    const { type: primaryKeyType, name } = getPrimaryKey(modelType);
    const primaryKey = {
      name,
      type: getNamedType5(primaryKeyType).name
    };
    const modelFields = modelType.getFields();
    const fields = {};
    for (const field of Object.keys(modelFields)) {
      let fieldName = field;
      let type = "";
      const graphqlField = modelFields[field];
      if (isTransientField(graphqlField)) {
        fields[field] = {
          name: field,
          transient: true,
          type: getNamedType5(graphqlField.type).name
        };
        continue;
      }
      const foundRelationship = relationships.find((relationship) => relationship.ownerField.name === field);
      if (foundRelationship != null) {
        if (foundRelationship.kind !== "oneToMany") {
          fieldName = foundRelationship.relationForeignKey;
          type = getNamedType5(foundRelationship.relationType).name;
        } else {
          fieldName = primaryKey.name;
          type = primaryKey.type;
        }
      } else {
        type = getNamedType5(modelFields[field].type).name;
      }
      fields[field] = {
        name: fieldName,
        type,
        transient: false
      };
    }
    return {
      fields,
      primaryKey,
      crudOptions,
      relationships,
      graphqlType: modelType
    };
  }
};

// src/plugin/GraphbackPluginEngine.ts
var GraphbackPluginEngine = class {
  plugins;
  metadata;
  constructor({ schema, config, plugins = [] }) {
    this.plugins = plugins;
    if (!schema) {
      throw new Error("Plugin engine requires schema");
    }
    let graphQLSchema;
    if (typeof schema === "string") {
      graphQLSchema = buildSchema(schema);
    } else {
      graphQLSchema = schema;
    }
    this.metadata = new GraphbackCoreMetadata(config, graphQLSchema);
  }
  registerPlugin(...plugins) {
    this.plugins.push(...plugins);
  }
  createResources() {
    if (this.plugins.length === 0) {
      console.warn("GraphbackEngine: No Graphback plugins registered");
    }
    this.createSchema();
    this.createResolvers();
    for (const plugin of this.plugins) {
      plugin.createResources(this.metadata);
    }
    return this.metadata;
  }
  createSchema() {
    for (const plugin of this.plugins) {
      const newSchema = plugin.transformSchema(this.metadata);
      this.metadata.setSchema(newSchema);
    }
  }
  createResolvers() {
    for (const plugin of this.plugins) {
      const resolvers = plugin.createResolvers(this.metadata);
      this.metadata.addResolvers(resolvers);
    }
  }
};

// src/plugin/ModelDefinition.ts
function getModelByName(name, models) {
  if (!models) {
    return void 0;
  }
  return models.find((m) => m.graphqlType.name === name);
}

// src/plugin/getSelectedFieldsFromResolverInfo.ts
import graphqlFields from "graphql-fields";
var getSelectedFieldsFromResolverInfo = (info, model, isMutation = false, path) => {
  let projectionObj = graphqlFields(info, {}, { processArguments: true });
  if (path) {
    projectionObj = projectionObj[path];
  }
  const resolverFields = Object.keys(projectionObj);
  const fieldArgs = {};
  if (!isMutation) {
    resolverFields.forEach((k) => {
      if (projectionObj[k].__arguments) {
        fieldArgs[k] = projectionObj[k].__arguments;
      }
    });
  }
  return getModelFieldsFromResolverFields(resolverFields, fieldArgs, model);
};
var getModelFieldsFromResolverFields = (resolverFields, fieldArgs, model) => {
  const selectedFields = /* @__PURE__ */ new Set();
  for (const key of resolverFields) {
    const correspondingFieldInDatabase = model.fields[key];
    if (correspondingFieldInDatabase && !correspondingFieldInDatabase.transient) {
      selectedFields.add(correspondingFieldInDatabase.name);
    }
  }
  return [[...selectedFields], fieldArgs];
};
var getResolverInfoFieldsList = (info, path) => fieldsList(info, { path });

// src/utils/printSchemaWithDirectives.ts
import { SchemaComposer } from "graphql-compose";
function printSchemaWithDirectives(schemaOrSDL) {
  const schemaComposer = new SchemaComposer(schemaOrSDL);
  return schemaComposer.toSDL({ exclude: ["String", "ID", "Boolean", "Float", "Int"] });
}

// src/utils/metadataAnnotations.ts
var metadataMap = {
  markers: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    versioned: "versioned"
  },
  fieldNames: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
};

// src/utils/fieldTransformHelpers.ts
import { parseMetadata as parseMetadata8 } from "graphql-metadata";
var TransformType = /* @__PURE__ */ ((TransformType2) => {
  TransformType2["UPDATE"] = "onUpdateFieldTransform";
  TransformType2["CREATE"] = "onCreateFieldTransform";
  return TransformType2;
})(TransformType || {});
function getFieldTransformations(baseType) {
  const fieldMap = baseType.getFields();
  const fieldTransformMap = {
    ["onCreateFieldTransform" /* CREATE */]: [],
    ["onUpdateFieldTransform" /* UPDATE */]: []
  };
  for (const field of Object.values(fieldMap)) {
    if (parseMetadata8("updatedAt", field.description)) {
      fieldTransformMap["onUpdateFieldTransform" /* UPDATE */].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
      fieldTransformMap["onCreateFieldTransform" /* CREATE */].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
    }
    if (parseMetadata8("createdAt", field.description)) {
      fieldTransformMap["onCreateFieldTransform" /* CREATE */].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
    }
  }
  return fieldTransformMap;
}

// src/runtime/CRUDService.ts
import DataLoader from "dataloader";
import { withFilter } from "graphql-subscriptions";

// src/utils/convertType.ts
function convertType(value, toType) {
  if (!value) {
    return void 0;
  }
  switch (typeof toType) {
    case "string":
      return String(value);
    case "number":
      return Number(value);
    case "bigint":
      return BigInt(value);
    case "boolean":
      return Boolean(value);
    case "object":
      if (isDateObject(value)) {
        return new Date(value).getTime();
      }
      return value;
    default:
      return String(value);
  }
}
var isDateObject = (value) => Object.prototype.toString.call(value) === "[object Date]";

// src/runtime/createInMemoryFilterPredicate.ts
var predicateMap = {
  eq: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return (parsedFieldValue == null ? void 0 : parsedFieldValue.toString()) === (parsedFilterValue == null ? void 0 : parsedFilterValue.toString());
  },
  ne: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return (parsedFilterValue == null ? void 0 : parsedFilterValue.toString()) !== (parsedFieldValue == null ? void 0 : parsedFieldValue.toString());
  },
  gt: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return parsedFieldValue > parsedFilterValue;
  },
  ge: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return parsedFieldValue >= parsedFilterValue;
  },
  le: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return parsedFieldValue <= parsedFilterValue;
  },
  lt: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return parsedFieldValue < parsedFilterValue;
  },
  in: (filterValue) => (fieldValue) => {
    return filterValue.map((f) => f == null ? void 0 : f.toString()).includes(fieldValue == null ? void 0 : fieldValue.toString());
  },
  between: ([fromVal, toVal]) => (fieldValue) => {
    if (isDateObject(fieldValue)) {
      const fieldValDate = convertType(fieldValue, fieldValue);
      const fromValDate = convertType(fromVal, fieldValue);
      const toValDate = convertType(toVal, fieldValue);
      return fieldValDate >= fromValDate && fieldValDate <= toValDate;
    }
    const parsedFieldValue = Number(fieldValue);
    return parsedFieldValue >= Number(fromVal) && parsedFieldValue <= Number(toVal);
  },
  contains: (filterValue = "") => (fieldValue = "") => {
    return fieldValue == null ? void 0 : fieldValue.toString().includes(filterValue == null ? void 0 : filterValue.toString());
  },
  startsWith: (filterValue = "") => (fieldValue = "") => {
    return fieldValue == null ? void 0 : fieldValue.toString().startsWith(filterValue == null ? void 0 : filterValue.toString());
  },
  endsWith: (filterValue = "") => (fieldValue = "") => {
    return fieldValue == null ? void 0 : fieldValue.toString().endsWith(filterValue == null ? void 0 : filterValue.toString());
  }
};
function createInMemoryFilterPredicate(filter) {
  filter = filter || {};
  const andFilter = filter.and;
  const orFilter = filter.or;
  const notFilter = filter.not;
  const filterFields = Object.keys(filter).filter((key) => !["and", "or", "not"].includes(key));
  return (payload) => {
    let predicateResult = true;
    for (const fieldName of filterFields) {
      if (["and", "or", "not"].includes(fieldName)) {
        continue;
      }
      const fieldFilter = filter[fieldName];
      for (const [expr, exprVal] of Object.entries(fieldFilter)) {
        const predicateFn = predicateMap[expr](exprVal);
        if (!predicateFn(payload[fieldName])) {
          predicateResult = false;
          break;
        }
      }
    }
    if (orFilter != null) {
      const orPredicateResult = getOrPredicateResult(orFilter, payload);
      predicateResult = predicateResult && orPredicateResult;
      if (!predicateResult) {
        return false;
      }
    }
    if (andFilter != null) {
      const andPredicateResult = getAndPredicateResult(andFilter, payload);
      predicateResult = predicateResult && andPredicateResult;
    }
    if (notFilter != null) {
      const notPredicateResult = createInMemoryFilterPredicate(notFilter)(payload);
      predicateResult = predicateResult && !notPredicateResult;
    }
    return predicateResult;
  };
}
function getAndPredicateResult(and, payload) {
  let andResult = true;
  for (const andItem of and) {
    andResult = createInMemoryFilterPredicate(andItem)(payload);
    if (!andResult) {
      break;
    }
  }
  return andResult;
}
function getOrPredicateResult(or, payload) {
  let orResult = true;
  for (const orItem of or) {
    orResult = createInMemoryFilterPredicate(orItem)(payload);
    if (orResult) {
      break;
    }
  }
  return orResult;
}

// src/runtime/CRUDService.ts
var CRUDService = class {
  db;
  model;
  pubSub;
  crudOptions;
  constructor(model, db, config) {
    this.model = model;
    this.crudOptions = config.crudOptions;
    this.db = db;
    this.pubSub = config.pubSub;
  }
  async create(data2, context, info) {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true);
    const result = await this.db.create(data2, selectedFields);
    if (this.pubSub && this.crudOptions.subCreate) {
      const topic = this.subscriptionTopicMapping("create" /* CREATE */, this.model.graphqlType.name);
      const payload = this.buildEventPayload("new", result);
      this.pubSub.publish(topic, payload).catch((error) => {
        console.error(`Publishing of new "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }
    return result;
  }
  async update(data2, context, info) {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true);
    const result = await this.db.update(data2, selectedFields);
    if (this.pubSub && this.crudOptions.subUpdate) {
      const topic = this.subscriptionTopicMapping("update" /* UPDATE */, this.model.graphqlType.name);
      const payload = this.buildEventPayload("updated", result);
      this.pubSub.publish(topic, payload).catch((error) => {
        console.error(`Publishing of updates of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }
    return result;
  }
  async updateBy(args, context, info) {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.mode, true);
    const result = await this.db.updateBy(args, selectedFields);
    return {
      items: result
    };
  }
  async delete(args, context, info) {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true);
    const result = await this.db.delete(data, selectedFields);
    if (this.pubSub && this.crudOptions.subDelete) {
      const topic = this.subscriptionTopicMapping("delete" /* DELETE */, this.model.graphqlType.name);
      const payload = this.buildEventPayload("deleted", result);
      this.pubSub.publish(topic, payload).catch((error) => {
        console.error(`Publishing of deletion of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }
    return result;
  }
  async deleteBy(args, context, info) {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true);
    const result = await this.db.deleteBy(args, selectedFields);
    return {
      items: result
    };
  }
  async findOne(args, context, info) {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model);
    return await this.db.findOne(args, selectedFields);
  }
  async findBy(args, context, info, path) {
    let requestedCount = false;
    const [selectedFields, fieldArgs] = getSelectedFieldsFromResolverInfo(info, this.model, false, path);
    requestedCount = path === "items" && getResolverInfoFieldsList(info).some((field) => field === "count");
    const items = await this.db.findBy(args, selectedFields, fieldArgs);
    const resultPageInfo = __spreadValues({
      offset: 0
    }, args == null ? void 0 : args.page);
    let count;
    if (requestedCount) {
      count = await this.db.count(args.filter);
    }
    return __spreadValues({
      items,
      count,
      offset: 0
    }, resultPageInfo);
  }
  subscribeToCreate(filter) {
    if (!this.pubSub) {
      throw Error("Missing PubSub implementation in CRUDService");
    }
    const operationType = "create" /* CREATE */;
    const createSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
    const asyncIterator = this.pubSub.asyncIterator(createSubKey);
    const subscriptionFilter = createInMemoryFilterPredicate(filter);
    return withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
  }
  subscribeToUpdate(filter) {
    if (!this.pubSub) {
      throw Error("Missing PubSub implementation in CRUDService");
    }
    const operationType = "update" /* UPDATE */;
    const updateSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
    const asyncIterator = this.pubSub.asyncIterator(updateSubKey);
    const subscriptionFilter = createInMemoryFilterPredicate(filter);
    return withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
  }
  subscribeToDelete(filter) {
    if (!this.pubSub) {
      throw Error("Missing PubSub implementation in CRUDService");
    }
    const operationType = "delete" /* DELETE */;
    const deleteSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
    const asyncIterator = this.pubSub.asyncIterator(deleteSubKey);
    const subscriptionFilter = createInMemoryFilterPredicate(filter);
    return withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
  }
  batchLoadData(relationField, id, filter, context, info) {
    const selectedFields = [];
    const [selectedFieldsFromInfo, fieldArgs] = getSelectedFieldsFromResolverInfo(info, this.model);
    selectedFields.push(...selectedFieldsFromInfo);
    if (selectedFields.length > 0) {
      selectedFields.push(relationField);
    }
    const fetchedKeys = selectedFields.join("-");
    const keyName = `${this.model.graphqlType.name}-${upperCaseFirstChar(relationField)}-${fetchedKeys}-${JSON.stringify(filter)}-DataLoader`;
    if (!context[keyName]) {
      context[keyName] = new DataLoader(async (keys) => {
        return await this.db.batchRead(relationField, keys, filter, selectedFields, fieldArgs);
      });
    }
    if (id === void 0 || id === null) {
      return [];
    }
    return context[keyName].load(id);
  }
  subscriptionTopicMapping(triggerType, objectName) {
    return `${triggerType}_${objectName}`.toUpperCase();
  }
  buildEventPayload(action, result) {
    const payload = {};
    payload[`${action}${this.model.graphqlType.name}`] = result;
    return payload;
  }
};

// src/runtime/createCRUDService.ts
import { PubSub } from "graphql-subscriptions";
function createCRUDService(config) {
  return (model, dataProvider) => {
    const serviceConfig = __spreadProps(__spreadValues({
      pubSub: new PubSub()
    }, config), {
      crudOptions: model.crudOptions
    });
    return new CRUDService(model, dataProvider, serviceConfig);
  };
}

// src/runtime/NoDataError.ts
var NoDataError = class extends Error {
  constructor(message) {
    super(`No result from database: ${message}`);
  }
};

// src/runtime/QueryFilter.ts
var FILTER_SUPPORTED_SCALARS = [
  "ID",
  "String",
  "Boolean",
  "Int",
  "Float",
  "Timestamp",
  "Time",
  "Date",
  "DateTime",
  "BigInt",
  "Byte",
  "Currency",
  "DID",
  "Duration",
  "EmailAddress",
  "GUID",
  "HSL",
  "HSLA",
  "HexColorCode",
  "Hexadecimal",
  "IBAN",
  "IPv4",
  "IPv6",
  "ISBN",
  "ISO8601Duration",
  "Latitude",
  "LocalDate",
  "LocalEndTime",
  "LocalTime",
  "Longitude",
  "MAC",
  "NegativeFloat",
  "NegativeInt",
  "NonEmptyString",
  "NonNegativeFloat",
  "NonNegativeInt",
  "NonPositiveFloat",
  "NonPositiveInt",
  "PhoneNumber",
  "Port",
  "PositiveFloat",
  "PositiveInt",
  "PostalCode",
  "RGB",
  "RGBA",
  "URL",
  "USCurrency",
  "UUID",
  "UtcOffset"
];

// src/scalars/index.ts
import { GraphQLScalarType as GraphQLScalarType2 } from "graphql";
import {
  BigIntResolver,
  ByteResolver,
  CurrencyResolver,
  DurationResolver,
  EmailAddressResolver,
  GUIDResolver,
  HSLAResolver,
  HSLResolver,
  HexColorCodeResolver,
  HexadecimalResolver,
  IBANResolver,
  IPv4Resolver,
  IPv6Resolver,
  ISBNResolver,
  ISO8601DurationResolver,
  LocalDateResolver,
  LocalTimeResolver,
  MACResolver,
  NegativeFloatResolver,
  NegativeIntResolver,
  NonEmptyStringResolver,
  NonNegativeFloatResolver,
  NonNegativeIntResolver,
  PhoneNumberResolver,
  PortResolver,
  PositiveFloatResolver,
  PositiveIntResolver,
  PostalCodeResolver,
  RGBAResolver,
  RGBResolver,
  URLResolver,
  USCurrencyResolver,
  UUIDResolver,
  UtcOffsetResolver,
  DIDResolver,
  LatitudeResolver,
  JWTResolver,
  LongitudeResolver,
  LocalEndTimeResolver,
  NonPositiveFloatResolver,
  NonPositiveIntResolver,
  TimeResolver,
  TimestampResolver,
  DateResolver,
  DateTimeResolver,
  JSONResolver,
  JSONObjectResolver
} from "graphql-scalars";
var BigInt_ = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(BigIntResolver)), {
  name: "BigInt"
}));
var Byte = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(ByteResolver)), {
  name: "Byte"
}));
var Currency = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(CurrencyResolver)), {
  name: "Currency"
}));
var Duration = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(DurationResolver)), {
  name: "Duration"
}));
var EmailAddress = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(EmailAddressResolver)), {
  name: "Email"
}));
var GUID = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(GUIDResolver)), {
  name: "GUID"
}));
var HSLA = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(HSLAResolver)), {
  name: "HSLA"
}));
var HSL = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(HSLResolver)), {
  name: "HSL"
}));
var HexColorCode = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(HexColorCodeResolver)), {
  name: "HexColorCode"
}));
var Hexadecimal = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(HexadecimalResolver)), {
  name: "Hexadecimal"
}));
var IBAN = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(IBANResolver)), {
  name: "IBAN"
}));
var IPv4 = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(IPv4Resolver)), {
  name: "IPv4"
}));
var IPv6 = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(IPv6Resolver)), {
  name: "IPv6"
}));
var ISBN = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(ISBNResolver)), {
  name: "ISBN"
}));
var ISO8601Duration = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(ISO8601DurationResolver)), {
  name: "ISO8601Duration"
}));
var LocalDate = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(LocalDateResolver)), {
  name: "LocalDate"
}));
var LocalTime = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(LocalTimeResolver)), {
  name: "LocalTime"
}));
var MAC = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(MACResolver)), {
  name: "MAC"
}));
var NegativeFloat = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(NegativeFloatResolver)), {
  name: "NegativeFloat"
}));
var NegativeInt = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(NegativeIntResolver)), {
  name: "NegativeInt"
}));
var NonEmptyString = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(NonEmptyStringResolver)), {
  name: "NonEmptyString"
}));
var NonNegativeFloat = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(NonNegativeFloatResolver)), {
  name: "NonNegativeFloat"
}));
var NonNegativeInt = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(NonNegativeIntResolver)), {
  name: "NonNegativeInt"
}));
var PhoneNumber = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(PhoneNumberResolver)), {
  name: "PhoneNumber"
}));
var Port = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(PortResolver)), {
  name: "Port"
}));
var PositiveFloat = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(PositiveFloatResolver)), {
  name: "PositiveFloat"
}));
var PositiveInt = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(PositiveIntResolver)), {
  name: "PositiveInt"
}));
var PostalCode = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(PostalCodeResolver)), {
  name: "PostalCode"
}));
var RGBA = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(RGBAResolver)), {
  name: "RGBA"
}));
var RGB = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(RGBResolver)), {
  name: "RGB"
}));
var URL = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(URLResolver)), {
  name: "URL"
}));
var USCurrency = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(USCurrencyResolver)), {
  name: "USCurrency"
}));
var UUID = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(UUIDResolver)), {
  name: "UUID"
}));
var UtcOffset = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(UtcOffsetResolver)), {
  name: "UtcOffset"
}));
var DID = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(DIDResolver)), {
  name: "DID"
}));
var Latitude = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(LatitudeResolver)), {
  name: "Latitude"
}));
var Longitude = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(LongitudeResolver)), {
  name: "Longitude"
}));
var JWT = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(JWTResolver)), {
  name: "JWT"
}));
var LocalEndTime = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(LocalEndTimeResolver)), {
  name: "LocalEndTime"
}));
var NonPositiveFloat = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(NonPositiveFloatResolver)), {
  name: "NonPositiveFloat"
}));
var NonPositiveInt = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(NonPositiveIntResolver)), {
  name: "NonPositiveInt"
}));
var Time = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(TimeResolver)), {
  name: "Time"
}));
var Timestamp = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(TimestampResolver)), {
  name: "Timestamp"
}));
var Date_ = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(DateResolver)), {
  name: "Date"
}));
var DateTime = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(DateTimeResolver)), {
  name: "DateTime"
}));
var JSON_ = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(JSONResolver)), {
  name: "JSON"
}));
var JSONObject = new GraphQLScalarType2(__spreadProps(__spreadValues({}, extractConfig(JSONObjectResolver)), {
  name: "JSONObject"
}));
var graphbackScalarsTypes = [
  BigInt_,
  Byte,
  Currency,
  DID,
  Duration,
  EmailAddress,
  GUID,
  HSL,
  HSLA,
  HexColorCode,
  Hexadecimal,
  IBAN,
  IPv4,
  IPv6,
  ISBN,
  ISO8601Duration,
  JWT,
  Latitude,
  LocalDate,
  LocalEndTime,
  LocalTime,
  Longitude,
  MAC,
  NegativeFloat,
  NegativeInt,
  NonEmptyString,
  NonNegativeFloat,
  NonNegativeInt,
  NonPositiveFloat,
  NonPositiveInt,
  PhoneNumber,
  Port,
  PositiveFloat,
  PositiveInt,
  PostalCode,
  RGB,
  RGBA,
  URL,
  USCurrency,
  UUID,
  UtcOffset,
  Time,
  Date_,
  JSON_,
  DateTime,
  Timestamp,
  JSONObject
];
function isSpecifiedGraphbackScalarType(type) {
  return graphbackScalarsTypes.some(({ name }) => type.name === name);
}
function isSpecifiedGraphbackJSONScalarType(type) {
  const name = type.name;
  return name === JSONObject.name || name === JSON_.name;
}
function extractConfig(wrappedScalar) {
  const _a = wrappedScalar.toConfig(), { name } = _a, config = __objRest(_a, ["name"]);
  return config;
}
export {
  BigInt_,
  Byte,
  CRUDService,
  Currency,
  DID,
  DateTime,
  Date_,
  Duration,
  EmailAddress,
  FILTER_SUPPORTED_SCALARS,
  GUID,
  GraphbackCoreMetadata,
  GraphbackOperationType,
  GraphbackPlugin,
  GraphbackPluginEngine,
  HSL,
  HSLA,
  HexColorCode,
  Hexadecimal,
  IBAN,
  IPv4,
  IPv6,
  ISBN,
  ISO8601Duration,
  JSONObject,
  JSON_,
  JWT,
  Latitude,
  LocalDate,
  LocalEndTime,
  LocalTime,
  Longitude,
  MAC,
  NegativeFloat,
  NegativeInt,
  NoDataError,
  NonEmptyString,
  NonNegativeFloat,
  NonNegativeInt,
  NonPositiveFloat,
  NonPositiveInt,
  PhoneNumber,
  Port,
  PositiveFloat,
  PositiveInt,
  PostalCode,
  RGB,
  RGBA,
  RelationshipMetadataBuilder,
  Time,
  Timestamp,
  TransformType,
  URL,
  USCurrency,
  UUID,
  UtcOffset,
  addRelationshipFields,
  buildModelTableMap,
  createCRUDService,
  createInMemoryFilterPredicate,
  defaultTableNameTransform,
  extendOneToManyFieldArguments,
  extendRelationshipFields,
  filterModelTypes,
  filterNonModelTypes,
  getColumnName,
  getFieldName,
  getFieldTransformations,
  getInputFieldName,
  getInputFieldTypeName,
  getInputTypeName,
  getModelByName,
  getModelFieldsFromResolverFields,
  getPrimaryKey,
  getRelationFieldName,
  getResolverInfoFieldsList,
  getSelectedFieldsFromResolverInfo,
  getSubscriptionName,
  getTableName,
  getUserModels,
  graphbackScalarsTypes,
  isAutoPrimaryKey,
  isInputField,
  isModelType,
  isOneToManyField,
  isSpecifiedGraphbackJSONScalarType,
  isSpecifiedGraphbackScalarType,
  isTransientField,
  lowerCaseFirstChar,
  metadataMap,
  parseRelationshipAnnotation,
  printSchemaWithDirectives,
  relationshipFieldDescriptionTemplate,
  relationshipOneToOneFieldDescriptionTemplate,
  transformForeignKeyName,
  upperCaseFirstChar
};
//# sourceMappingURL=index.mjs.map