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
import pluralize from "pluralize";

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
function getInputFieldName(field) {
  return field.name;
}
function getInputFieldTypeName(modelName, field, operation) {
  const fieldType = getNamedType(field.type);
  if (isObjectType(fieldType)) {
    const idField = getPrimaryKey(fieldType);
    return getNamedType(idField.type).name;
  }
  if (isScalarType(fieldType) || isEnumType(fieldType)) {
    return fieldType.name;
  }
  if (isObjectType(fieldType)) {
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
import { mergeResolvers } from "@graphql-tools/merge";
import { getNamedType as getNamedType2 } from "graphql";
import { getUserTypesFromSchema } from "@graphql-tools/utils";
var GraphbackCoreMetadata = class {
  schema;
  resolvers;
  models;
  constructor(schema) {
    this.schema = schema;
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
    for (const modelType of modelTypes) {
      const model = this.buildModel(modelType);
      this.models.push(model);
    }
    return this.models;
  }
  getGraphQLTypesWithModel() {
    return getUserTypesFromSchema(this.schema);
  }
  buildModel(modelType) {
    var _a, _b, _c, _d, _e, _f;
    const primaryKey = {
      name: "_id",
      type: "ID"
    };
    const modelFields = modelType.getFields();
    const fields = {};
    fields._id = {
      type: "ID"
    };
    const uniqueFields = [];
    for (const field of Object.keys(modelFields)) {
      let fieldName = field;
      let type = "";
      const graphqlField = modelFields[field];
      if ((_c = (_b = (_a = graphqlField.extensions) == null ? void 0 : _a.directives) == null ? void 0 : _b.some) == null ? void 0 : _c.call(_b, (d) => d.name === "transient")) {
        fields[field] = {
          name: field,
          transient: true,
          type: getNamedType2(graphqlField.type).name
        };
        continue;
      }
      if ((_f = (_e = (_d = graphqlField.extensions) == null ? void 0 : _d.directives) == null ? void 0 : _e.some) == null ? void 0 : _f.call(_e, (d) => d.name === "unique")) {
        uniqueFields.push(field);
      }
      type = getNamedType2(modelFields[field].type).name;
      fields[field] = {
        name: fieldName,
        type,
        transient: false
      };
    }
    return {
      fields,
      primaryKey,
      relationships: [],
      uniqueFields,
      graphqlType: modelType
    };
  }
};

// src/plugin/GraphbackPluginEngine.ts
var GraphbackPluginEngine = class {
  plugins;
  metadata;
  constructor({ schema, plugins = [] }) {
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
    this.metadata = new GraphbackCoreMetadata(graphQLSchema);
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

// src/db/getPrimaryKey.ts
import { getNamedType as getNamedType3, isScalarType as isScalarType2 } from "graphql";
function getPrimaryKey(graphqlType) {
  const fields = Object.values(graphqlType.getFields());
  const autoPrimaryKeyFromScalar = [];
  for (const field of fields) {
    if (isAutoPrimaryKey(field)) {
      autoPrimaryKeyFromScalar.push(field);
    }
  }
  if (autoPrimaryKeyFromScalar.length > 1) {
    throw new Error(`${graphqlType.name} type should not have two potential primary keys.`);
  }
  const primaryKey = autoPrimaryKeyFromScalar.shift();
  if (!primaryKey) {
    throw new Error(`${graphqlType.name} type has no primary field.`);
  }
  return primaryKey;
}
function isAutoPrimaryKey(field) {
  const { type, name: fieldName } = field;
  const baseType = getNamedType3(type);
  const name = baseType.name;
  return fieldName === "_id" && name === "ID" && isScalarType2(baseType);
}

// src/utils/printSchemaWithDirectives.ts
import { SchemaComposer } from "graphql-compose";
function printSchemaWithDirectives(schemaOrSDL) {
  const schemaComposer = new SchemaComposer(schemaOrSDL);
  return schemaComposer.toSDL({ exclude: ["String", "ID", "Boolean", "Float", "Int"] });
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
  constructor(model, db, config) {
    this.model = model;
    this.db = db;
    this.pubSub = config.pubSub;
  }
  async initializeUniqueIndex() {
    return await this.db.initializeUniqueIndex();
  }
  async create(data2, context, info) {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true);
    const result = await this.db.create(data2, selectedFields);
    if (this.pubSub) {
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
    if (this.pubSub) {
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
    if (this.pubSub) {
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
  return async (model, dataProvider) => {
    const serviceConfig = __spreadValues({
      pubSub: new PubSub()
    }, config);
    const crudService = new CRUDService(model, dataProvider, serviceConfig);
    await crudService.initializeUniqueIndex();
    return crudService;
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
import { GraphQLScalarType } from "graphql";
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
var BigInt_ = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(BigIntResolver)), {
  name: "BigInt"
}));
var Byte = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(ByteResolver)), {
  name: "Byte"
}));
var Currency = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(CurrencyResolver)), {
  name: "Currency"
}));
var Duration = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(DurationResolver)), {
  name: "Duration"
}));
var EmailAddress = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(EmailAddressResolver)), {
  name: "Email"
}));
var GUID = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(GUIDResolver)), {
  name: "GUID"
}));
var HSLA = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(HSLAResolver)), {
  name: "HSLA"
}));
var HSL = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(HSLResolver)), {
  name: "HSL"
}));
var HexColorCode = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(HexColorCodeResolver)), {
  name: "HexColorCode"
}));
var Hexadecimal = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(HexadecimalResolver)), {
  name: "Hexadecimal"
}));
var IBAN = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(IBANResolver)), {
  name: "IBAN"
}));
var IPv4 = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(IPv4Resolver)), {
  name: "IPv4"
}));
var IPv6 = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(IPv6Resolver)), {
  name: "IPv6"
}));
var ISBN = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(ISBNResolver)), {
  name: "ISBN"
}));
var ISO8601Duration = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(ISO8601DurationResolver)), {
  name: "ISO8601Duration"
}));
var LocalDate = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(LocalDateResolver)), {
  name: "LocalDate"
}));
var LocalTime = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(LocalTimeResolver)), {
  name: "LocalTime"
}));
var MAC = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(MACResolver)), {
  name: "MAC"
}));
var NegativeFloat = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(NegativeFloatResolver)), {
  name: "NegativeFloat"
}));
var NegativeInt = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(NegativeIntResolver)), {
  name: "NegativeInt"
}));
var NonEmptyString = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(NonEmptyStringResolver)), {
  name: "NonEmptyString"
}));
var NonNegativeFloat = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(NonNegativeFloatResolver)), {
  name: "NonNegativeFloat"
}));
var NonNegativeInt = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(NonNegativeIntResolver)), {
  name: "NonNegativeInt"
}));
var PhoneNumber = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(PhoneNumberResolver)), {
  name: "PhoneNumber"
}));
var Port = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(PortResolver)), {
  name: "Port"
}));
var PositiveFloat = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(PositiveFloatResolver)), {
  name: "PositiveFloat"
}));
var PositiveInt = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(PositiveIntResolver)), {
  name: "PositiveInt"
}));
var PostalCode = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(PostalCodeResolver)), {
  name: "PostalCode"
}));
var RGBA = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(RGBAResolver)), {
  name: "RGBA"
}));
var RGB = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(RGBResolver)), {
  name: "RGB"
}));
var URL = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(URLResolver)), {
  name: "URL"
}));
var USCurrency = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(USCurrencyResolver)), {
  name: "USCurrency"
}));
var UUID = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(UUIDResolver)), {
  name: "UUID"
}));
var UtcOffset = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(UtcOffsetResolver)), {
  name: "UtcOffset"
}));
var DID = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(DIDResolver)), {
  name: "DID"
}));
var Latitude = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(LatitudeResolver)), {
  name: "Latitude"
}));
var Longitude = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(LongitudeResolver)), {
  name: "Longitude"
}));
var JWT = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(JWTResolver)), {
  name: "JWT"
}));
var LocalEndTime = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(LocalEndTimeResolver)), {
  name: "LocalEndTime"
}));
var NonPositiveFloat = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(NonPositiveFloatResolver)), {
  name: "NonPositiveFloat"
}));
var NonPositiveInt = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(NonPositiveIntResolver)), {
  name: "NonPositiveInt"
}));
var Time = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(TimeResolver)), {
  name: "Time"
}));
var Timestamp = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(TimestampResolver)), {
  name: "Timestamp"
}));
var Date_ = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(DateResolver)), {
  name: "Date"
}));
var DateTime = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(DateTimeResolver)), {
  name: "DateTime"
}));
var JSON_ = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(JSONResolver)), {
  name: "JSON"
}));
var JSONObject = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(JSONObjectResolver)), {
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

// src/utils/directives.ts
var directives = `
      directive @model on OBJECT
      directive @unique on FIELD_DEFINITION
      directive @relation on FIELD_DEFINITION
      directive @transient on FIELD_DEFINITION
      directive @constraint(
            minLength: Int
            maxLength: Int
            startsWith: String
            endsWith: String
            contains: String
            notContains: String
            pattern: String
            format: String
            min: Float
            max: Float
            exclusiveMin: Float
            exclusiveMax: Float
            multipleOf: Float
        ) on INPUT_FIELD_DEFINITION | FIELD_DEFINITION`;
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
  Time,
  Timestamp,
  URL,
  USCurrency,
  UUID,
  UtcOffset,
  createCRUDService,
  createInMemoryFilterPredicate,
  directives,
  getFieldName,
  getInputFieldName,
  getInputFieldTypeName,
  getInputTypeName,
  getModelByName,
  getModelFieldsFromResolverFields,
  getPrimaryKey,
  getResolverInfoFieldsList,
  getSelectedFieldsFromResolverInfo,
  getSubscriptionName,
  graphbackScalarsTypes,
  isAutoPrimaryKey,
  isSpecifiedGraphbackJSONScalarType,
  isSpecifiedGraphbackScalarType,
  lowerCaseFirstChar,
  printSchemaWithDirectives,
  upperCaseFirstChar
};
//# sourceMappingURL=index.mjs.map