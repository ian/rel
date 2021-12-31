var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/.pnpm/tsup@5.11.9_typescript@4.5.4/node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "../../node_modules/.pnpm/tsup@5.11.9_typescript@4.5.4/node_modules/tsup/assets/esm_shims.js"() {
  }
});

// ../../node_modules/.pnpm/dataloader@2.0.0/node_modules/dataloader/index.js
var require_dataloader = __commonJS({
  "../../node_modules/.pnpm/dataloader@2.0.0/node_modules/dataloader/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var DataLoader2 = /* @__PURE__ */ function() {
      function DataLoader3(batchLoadFn, options) {
        if (typeof batchLoadFn !== "function") {
          throw new TypeError("DataLoader must be constructed with a function which accepts " + ("Array<key> and returns Promise<Array<value>>, but got: " + batchLoadFn + "."));
        }
        this._batchLoadFn = batchLoadFn;
        this._maxBatchSize = getValidMaxBatchSize(options);
        this._batchScheduleFn = getValidBatchScheduleFn(options);
        this._cacheKeyFn = getValidCacheKeyFn(options);
        this._cacheMap = getValidCacheMap(options);
        this._batch = null;
      }
      var _proto = DataLoader3.prototype;
      _proto.load = function load(key) {
        if (key === null || key === void 0) {
          throw new TypeError("The loader.load() function must be called with a value," + ("but got: " + String(key) + "."));
        }
        var batch = getCurrentBatch(this);
        var cacheMap = this._cacheMap;
        var cacheKey = this._cacheKeyFn(key);
        if (cacheMap) {
          var cachedPromise = cacheMap.get(cacheKey);
          if (cachedPromise) {
            var cacheHits = batch.cacheHits || (batch.cacheHits = []);
            return new Promise(function(resolve2) {
              cacheHits.push(function() {
                return resolve2(cachedPromise);
              });
            });
          }
        }
        batch.keys.push(key);
        var promise = new Promise(function(resolve2, reject) {
          batch.callbacks.push({
            resolve: resolve2,
            reject
          });
        });
        if (cacheMap) {
          cacheMap.set(cacheKey, promise);
        }
        return promise;
      };
      _proto.loadMany = function loadMany(keys) {
        if (!isArrayLike(keys)) {
          throw new TypeError("The loader.loadMany() function must be called with Array<key> " + ("but got: " + keys + "."));
        }
        var loadPromises = [];
        for (var i = 0; i < keys.length; i++) {
          loadPromises.push(this.load(keys[i])["catch"](function(error) {
            return error;
          }));
        }
        return Promise.all(loadPromises);
      };
      _proto.clear = function clear(key) {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          var cacheKey = this._cacheKeyFn(key);
          cacheMap["delete"](cacheKey);
        }
        return this;
      };
      _proto.clearAll = function clearAll() {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          cacheMap.clear();
        }
        return this;
      };
      _proto.prime = function prime(key, value) {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          var cacheKey = this._cacheKeyFn(key);
          if (cacheMap.get(cacheKey) === void 0) {
            var promise;
            if (value instanceof Error) {
              promise = Promise.reject(value);
              promise["catch"](function() {
              });
            } else {
              promise = Promise.resolve(value);
            }
            cacheMap.set(cacheKey, promise);
          }
        }
        return this;
      };
      return DataLoader3;
    }();
    var enqueuePostPromiseJob = typeof process === "object" && typeof process.nextTick === "function" ? function(fn) {
      if (!resolvedPromise) {
        resolvedPromise = Promise.resolve();
      }
      resolvedPromise.then(function() {
        return process.nextTick(fn);
      });
    } : setImmediate || setTimeout;
    var resolvedPromise;
    function getCurrentBatch(loader) {
      var existingBatch = loader._batch;
      if (existingBatch !== null && !existingBatch.hasDispatched && existingBatch.keys.length < loader._maxBatchSize && (!existingBatch.cacheHits || existingBatch.cacheHits.length < loader._maxBatchSize)) {
        return existingBatch;
      }
      var newBatch = {
        hasDispatched: false,
        keys: [],
        callbacks: []
      };
      loader._batch = newBatch;
      loader._batchScheduleFn(function() {
        return dispatchBatch(loader, newBatch);
      });
      return newBatch;
    }
    function dispatchBatch(loader, batch) {
      batch.hasDispatched = true;
      if (batch.keys.length === 0) {
        resolveCacheHits(batch);
        return;
      }
      var batchPromise = loader._batchLoadFn(batch.keys);
      if (!batchPromise || typeof batchPromise.then !== "function") {
        return failedDispatch(loader, batch, new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise: " + String(batchPromise) + ".")));
      }
      batchPromise.then(function(values) {
        if (!isArrayLike(values)) {
          throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise of an Array: " + String(values) + "."));
        }
        if (values.length !== batch.keys.length) {
          throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys." + ("\n\nKeys:\n" + String(batch.keys)) + ("\n\nValues:\n" + String(values)));
        }
        resolveCacheHits(batch);
        for (var i = 0; i < batch.callbacks.length; i++) {
          var value = values[i];
          if (value instanceof Error) {
            batch.callbacks[i].reject(value);
          } else {
            batch.callbacks[i].resolve(value);
          }
        }
      })["catch"](function(error) {
        return failedDispatch(loader, batch, error);
      });
    }
    function failedDispatch(loader, batch, error) {
      resolveCacheHits(batch);
      for (var i = 0; i < batch.keys.length; i++) {
        loader.clear(batch.keys[i]);
        batch.callbacks[i].reject(error);
      }
    }
    function resolveCacheHits(batch) {
      if (batch.cacheHits) {
        for (var i = 0; i < batch.cacheHits.length; i++) {
          batch.cacheHits[i]();
        }
      }
    }
    function getValidMaxBatchSize(options) {
      var shouldBatch = !options || options.batch !== false;
      if (!shouldBatch) {
        return 1;
      }
      var maxBatchSize = options && options.maxBatchSize;
      if (maxBatchSize === void 0) {
        return Infinity;
      }
      if (typeof maxBatchSize !== "number" || maxBatchSize < 1) {
        throw new TypeError("maxBatchSize must be a positive number: " + maxBatchSize);
      }
      return maxBatchSize;
    }
    function getValidBatchScheduleFn(options) {
      var batchScheduleFn = options && options.batchScheduleFn;
      if (batchScheduleFn === void 0) {
        return enqueuePostPromiseJob;
      }
      if (typeof batchScheduleFn !== "function") {
        throw new TypeError("batchScheduleFn must be a function: " + batchScheduleFn);
      }
      return batchScheduleFn;
    }
    function getValidCacheKeyFn(options) {
      var cacheKeyFn = options && options.cacheKeyFn;
      if (cacheKeyFn === void 0) {
        return function(key) {
          return key;
        };
      }
      if (typeof cacheKeyFn !== "function") {
        throw new TypeError("cacheKeyFn must be a function: " + cacheKeyFn);
      }
      return cacheKeyFn;
    }
    function getValidCacheMap(options) {
      var shouldCache = !options || options.cache !== false;
      if (!shouldCache) {
        return null;
      }
      var cacheMap = options && options.cacheMap;
      if (cacheMap === void 0) {
        return /* @__PURE__ */ new Map();
      }
      if (cacheMap !== null) {
        var cacheFunctions = ["get", "set", "delete", "clear"];
        var missingFunctions = cacheFunctions.filter(function(fnName) {
          return cacheMap && typeof cacheMap[fnName] !== "function";
        });
        if (missingFunctions.length !== 0) {
          throw new TypeError("Custom cacheMap missing methods: " + missingFunctions.join(", "));
        }
      }
      return cacheMap;
    }
    function isArrayLike(x) {
      return typeof x === "object" && x !== null && typeof x.length === "number" && (x.length === 0 || x.length > 0 && Object.prototype.hasOwnProperty.call(x, x.length - 1));
    }
    module.exports = DataLoader2;
  }
});

// src/index.ts
init_esm_shims();

// src/SchemaCRUDPlugin.ts
init_esm_shims();
var import_dataloader = __toESM(require_dataloader());
import { resolve, dirname, join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { parseMetadata } from "graphql-metadata";
import { SchemaComposer } from "graphql-compose";
import { GraphQLNonNull as GraphQLNonNull3, GraphQLObjectType as GraphQLObjectType2, GraphQLSchema, GraphQLInt as GraphQLInt2, GraphQLFloat, isScalarType as isScalarType2, isSpecifiedScalarType, isObjectType as isObjectType2 } from "graphql";
import { Timestamp, getFieldName, metadataMap as metadataMap2, printSchemaWithDirectives, getSubscriptionName, GraphbackOperationType as GraphbackOperationType2, GraphbackPlugin, addRelationshipFields, extendRelationshipFields, extendOneToManyFieldArguments, getInputTypeName as getInputTypeName2, getSelectedFieldsFromResolverInfo, isModelType, getPrimaryKey as getPrimaryKey2, graphbackScalarsTypes, FILTER_SUPPORTED_SCALARS as FILTER_SUPPORTED_SCALARS2 } from "@graphback/core";

// src/writer/schemaFormatters.ts
init_esm_shims();
var noteString = "NOTE: This schema was generated by Rel and should not be changed manually";
var tsSchemaFormatter = {
  format: (schemaString) => {
    return `
// ${noteString}
export const schemaString = \`
${schemaString}
\`;
`;
  }
};
var jsSchemaFormatter = {
  format: (schemaString) => {
    return `
// ${noteString}
const schemaString = \`
${schemaString}
\`;

module.exports = { schemaString };
`;
  }
};
var gqlSchemaFormatter = {
  format: (schemaString) => {
    return `## ${noteString}

${schemaString}`;
  }
};

// src/definitions/schemaDefinitions.ts
init_esm_shims();
import { GraphQLInputObjectType, GraphQLList as GraphQLList2, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLID, GraphQLEnumType, GraphQLObjectType, GraphQLNonNull as GraphQLNonNull2, getNamedType as getNamedType2, isScalarType, isEnumType, isObjectType, isInputObjectType, getNullableType, isListType as isListType2 } from "graphql";
import { GraphbackOperationType, getInputTypeName, getInputFieldName, getInputFieldTypeName, isOneToManyField, getPrimaryKey, metadataMap, FILTER_SUPPORTED_SCALARS, isTransientField, isAutoPrimaryKey } from "@graphback/core";

// src/definitions/copyWrappingType.ts
init_esm_shims();
import { isWrappingType, GraphQLNonNull, isListType, GraphQLList, getNamedType } from "graphql";
function copyWrappingType(copyFromType, copyToType) {
  const wrappers = [];
  let oldTypeCopy = copyFromType;
  while (isWrappingType(oldTypeCopy)) {
    if (isListType(oldTypeCopy)) {
      wrappers.push("GraphQLList");
    } else {
      wrappers.push("GraphQLNonNull");
    }
    oldTypeCopy = oldTypeCopy.ofType;
  }
  let namedNewType = getNamedType(copyToType);
  while (wrappers.length > 0) {
    const wrappingType = wrappers.pop();
    if (wrappingType === "GraphQLList") {
      namedNewType = GraphQLList(namedNewType);
    } else {
      namedNewType = GraphQLNonNull(namedNewType);
    }
  }
  return namedNewType;
}

// src/definitions/schemaDefinitions.ts
var PageRequestTypeName = "PageRequest";
var SortDirectionEnumName = "SortDirectionEnum";
var OrderByInputTypeName = "OrderByInput";
var getInputName = (type) => {
  if (isEnumType(type)) {
    return "StringInput";
  }
  if (isInputObjectType(type)) {
    return type.name;
  }
  return `${type.name}Input`;
};
var createInputTypeForScalar = (scalarType) => {
  const newInput = new GraphQLInputObjectType({
    name: getInputName(scalarType),
    fields: {
      ne: { type: scalarType },
      eq: { type: scalarType },
      le: { type: scalarType },
      lt: { type: scalarType },
      ge: { type: scalarType },
      gt: { type: scalarType },
      in: { type: GraphQLList2(GraphQLNonNull2(scalarType)) },
      between: { type: GraphQLList2(GraphQLNonNull2(scalarType)) }
    }
  });
  return newInput;
};
var StringScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLString),
  fields: {
    ne: { type: GraphQLString },
    eq: { type: GraphQLString },
    le: { type: GraphQLString },
    lt: { type: GraphQLString },
    ge: { type: GraphQLString },
    gt: { type: GraphQLString },
    in: { type: GraphQLList2(GraphQLNonNull2(GraphQLString)) },
    contains: { type: GraphQLString },
    startsWith: { type: GraphQLString },
    endsWith: { type: GraphQLString }
  }
});
var IDScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLID),
  fields: {
    ne: { type: GraphQLID },
    eq: { type: GraphQLID },
    le: { type: GraphQLID },
    lt: { type: GraphQLID },
    ge: { type: GraphQLID },
    gt: { type: GraphQLID },
    in: { type: GraphQLList2(GraphQLNonNull2(GraphQLID)) }
  }
});
var BooleanScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLBoolean),
  fields: {
    ne: { type: GraphQLBoolean },
    eq: { type: GraphQLBoolean }
  }
});
var PageRequest = new GraphQLInputObjectType({
  name: PageRequestTypeName,
  fields: {
    limit: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  }
});
var SortDirectionEnum = new GraphQLEnumType({
  name: SortDirectionEnumName,
  values: {
    DESC: { value: "desc" },
    ASC: { value: "asc" }
  }
});
var OrderByInputType = new GraphQLInputObjectType({
  name: OrderByInputTypeName,
  fields: {
    field: { type: GraphQLNonNull2(GraphQLString) },
    order: { type: SortDirectionEnum, defaultValue: "asc" }
  }
});
function getModelInputFields(schemaComposer, modelType, operationType) {
  const inputFields = [];
  const fields = Object.values(modelType.getFields());
  for (const field of fields) {
    if (isTransientField(field) || isOneToManyField(field)) {
      continue;
    }
    const typeName = getInputFieldTypeName(modelType.name, field, operationType);
    if (!typeName) {
      continue;
    }
    const name = getInputFieldName(field);
    const type = schemaComposer.getAnyTC(typeName).getType();
    const wrappedType = copyWrappingType(field.type, type);
    const inputField = {
      name,
      type: wrappedType,
      description: void 0,
      extensions: [],
      deprecationReason: field.deprecationReason
    };
    inputFields.push(inputField);
  }
  return inputFields;
}
function buildFindOneFieldMap(modelType, schemaComposer) {
  const { type } = modelType.primaryKey;
  return {
    id: {
      name: "id",
      type: GraphQLNonNull2(schemaComposer.getAnyTC(type).getType()),
      description: void 0,
      extensions: void 0,
      deprecationReason: void 0
    }
  };
}
var buildFilterInputType = (schemaComposer, modelType) => {
  const operationType = GraphbackOperationType.FIND;
  const inputTypeName = getInputTypeName(modelType.name, operationType);
  const inputFields = getModelInputFields(schemaComposer, modelType, operationType);
  const scalarInputFields = {};
  for (const field of inputFields) {
    const namedType = getNamedType2(field.type);
    if (FILTER_SUPPORTED_SCALARS.includes(namedType.name) || isEnumType(namedType)) {
      const type = getInputName(namedType);
      scalarInputFields[field.name] = {
        name: field.name,
        type
      };
    }
  }
  const filterInput = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: __spreadProps(__spreadValues({}, scalarInputFields), {
      and: {
        type: `[${inputTypeName}!]`
      },
      or: {
        type: `[${inputTypeName}!]`
      },
      not: {
        type: `${inputTypeName}`
      }
    })
  });
  schemaComposer.add(filterInput);
};
var buildCreateMutationInputType = (schemaComposer, modelType) => {
  const operationType = GraphbackOperationType.CREATE;
  const inputTypeName = getInputTypeName(modelType.name, operationType);
  const idField = getPrimaryKey(modelType);
  const allModelFields = getModelInputFields(schemaComposer, modelType, operationType);
  const mutationInputType = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => {
      const fields = {};
      for (const field of allModelFields) {
        if (field.name === idField.name && isAutoPrimaryKey(field)) {
          continue;
        }
        fields[field.name] = {
          name: field.name,
          type: field.type
        };
      }
      return fields;
    }
  });
  schemaComposer.add(mutationInputType);
};
var buildSubscriptionFilterType = (schemaComposer, modelType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.SUBSCRIPTION_CREATE);
  const modelFields = Object.values(modelType.getFields());
  const subscriptionFilterFields = modelFields.filter((f) => {
    const namedType = getNamedType2(f.type);
    return !isTransientField(f) && (isScalarType(namedType) && FILTER_SUPPORTED_SCALARS.includes(namedType.name)) || isEnumType(namedType);
  });
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
  };
  for (const { name, type } of subscriptionFilterFields) {
    const fieldType = getNamedType2(type);
    const inputFilterName = getInputName(fieldType);
    fields[name] = {
      name,
      type: schemaComposer.get(inputFilterName)
    };
  }
  schemaComposer.createInputTC({
    name: inputTypeName,
    fields
  });
};
var buildMutationInputType = (schemaComposer, modelType) => {
  const operationType = GraphbackOperationType.UPDATE;
  const inputTypeName = getInputTypeName(modelType.name, operationType);
  const idField = getPrimaryKey(modelType);
  const allModelFields = getModelInputFields(schemaComposer, modelType, operationType);
  const mutationInputObject = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => {
      const fields = {};
      for (const { name, type } of allModelFields) {
        let fieldType;
        if (name !== idField.name) {
          fieldType = getNullableType(type);
        }
        if (isListType2(fieldType)) {
          fieldType = GraphQLList2(getNamedType2(fieldType));
        }
        fields[name] = {
          name,
          type: fieldType || type
        };
      }
      return fields;
    }
  });
  schemaComposer.add(mutationInputObject);
};
function mapObjectInputFields(schemaComposer, fields, objectName) {
  return fields.map((field) => {
    let namedType = getNamedType2(field.type);
    let typeName = namedType.name;
    let inputType;
    if (isObjectType(namedType)) {
      typeName = getInputTypeName(typeName, GraphbackOperationType.CREATE);
      namedType = schemaComposer.getOrCreateITC(typeName).getType();
      inputType = copyWrappingType(field.type, namedType);
    }
    return {
      name: field.name,
      type: inputType || field.type,
      extensions: [],
      deprecationReason: field.deprecationReason
    };
  });
}
function addCreateObjectInputType(schemaComposer, objectType) {
  const objectFields = Object.values(objectType.getFields());
  const operationType = GraphbackOperationType.CREATE;
  const inputType = new GraphQLInputObjectType({
    name: getInputTypeName(objectType.name, operationType),
    fields: mapObjectInputFields(schemaComposer, objectFields, objectType.name).reduce((fieldObj, { name, type, description }) => {
      fieldObj[name] = { type, description };
      return fieldObj;
    }, {})
  });
  schemaComposer.add(inputType);
}
function addUpdateObjectInputType(schemaComposer, objectType) {
  const objectFields = Object.values(objectType.getFields());
  const operationType = GraphbackOperationType.UPDATE;
  const inputType = new GraphQLInputObjectType({
    name: getInputTypeName(objectType.name, operationType),
    fields: mapObjectInputFields(schemaComposer, objectFields, objectType.name).reduce((fieldObj, { name, type, description }) => {
      fieldObj[name] = { type: getNullableType(type), description };
      return fieldObj;
    }, {})
  });
  schemaComposer.add(inputType);
}
var createMutationListResultType = (modelType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}MutationResultList`,
    fields: {
      items: {
        type: GraphQLNonNull2(GraphQLList2(modelType))
      }
    }
  });
};
var createModelListResultType = (modelType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}ResultList`,
    fields: {
      items: {
        type: GraphQLNonNull2(GraphQLList2(modelType))
      },
      offset: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      count: { type: GraphQLInt }
    }
  });
};
function createVersionedInputFields(versionedInputType) {
  return {
    [metadataMap.fieldNames.createdAt]: {
      type: versionedInputType
    },
    [metadataMap.fieldNames.updatedAt]: {
      type: versionedInputType
    }
  };
}
function createVersionedFields(type) {
  return {
    [metadataMap.fieldNames.createdAt]: {
      type,
      description: `@${metadataMap.markers.createdAt}`
    },
    [metadataMap.fieldNames.updatedAt]: {
      type,
      description: `@${metadataMap.markers.updatedAt}`
    }
  };
}

// src/SchemaCRUDPlugin.ts
var SCHEMA_CRUD_PLUGIN_NAME = "SchemaCRUD";
var SchemaCRUDPlugin = class extends GraphbackPlugin {
  pluginConfig;
  constructor(pluginConfig) {
    super();
    this.pluginConfig = __spreadValues({}, pluginConfig);
  }
  transformSchema(metadata) {
    const schema = metadata.getSchema();
    const models = metadata.getModelDefinitions();
    if (models.length === 0) {
      this.logWarning("Provided schema has no models. Returning original schema without any changes.");
      return schema;
    }
    ;
    const schemaComposer = new SchemaComposer(schema);
    this.createAggregationForModelFields(schemaComposer, models);
    this.buildSchemaModelRelationships(schemaComposer, models);
    this.buildSchemaForModels(schemaComposer, models);
    this.addVersionedMetadataFields(schemaComposer, models);
    return schemaComposer.buildSchema();
  }
  createResolvers(metadata) {
    const models = metadata.getModelDefinitions();
    if (models.length === 0) {
      return void 0;
    }
    const resolvers = {};
    const schema = metadata.getSchema();
    for (const graphbackScalar of graphbackScalarsTypes) {
      if (schema.getType(graphbackScalar.name)) {
        resolvers[graphbackScalar.name] = graphbackScalar;
      }
    }
    const modelNameToModelDefinition = models.reduce((acc, model) => {
      return __spreadProps(__spreadValues({}, acc), {
        [model.graphqlType.name]: model
      });
    }, {});
    for (const model of models) {
      this.addQueryResolvers(model, resolvers);
      this.addMutationResolvers(model, resolvers);
      this.addSubscriptionResolvers(model, resolvers);
      this.addRelationshipResolvers(model, resolvers, modelNameToModelDefinition);
    }
    return resolvers;
  }
  createResources(metadata) {
    if (!this.pluginConfig.outputPath) {
      return;
    }
    let schemaPath = resolve(this.pluginConfig.outputPath);
    if (!schemaPath.includes(".")) {
      schemaPath = join(schemaPath, "schema.graphql");
    }
    const fileExtension = schemaPath.split(".").pop();
    const schemaString = this.transformSchemaToString(metadata.getSchema(), fileExtension);
    const outputDir = resolve(dirname(this.pluginConfig.outputPath));
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
    writeFileSync(schemaPath, schemaString);
  }
  getPluginName() {
    return SCHEMA_CRUD_PLUGIN_NAME;
  }
  buildSchemaForModels(schemaComposer, models) {
    this.createSchemaCRUDTypes(schemaComposer);
    for (const model of Object.values(models)) {
      this.createQueries(model, schemaComposer);
      this.createMutations(model, schemaComposer);
      this.createSubscriptions(model, schemaComposer);
    }
    for (const model of Object.values(models)) {
      const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
      extendOneToManyFieldArguments(model, modifiedType);
    }
  }
  createSubscriptions(model, schemaComposer) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const modelType = modelTC.getType();
    buildSubscriptionFilterType(schemaComposer, modelType);
    const subscriptionFields = {};
    if (model.crudOptions.subCreate) {
      const operation = getSubscriptionName(name, GraphbackOperationType2.CREATE);
      const filterInputName = getInputTypeName2(name, GraphbackOperationType2.SUBSCRIPTION_CREATE);
      const subCreateFilterInputType = schemaComposer.getITC(filterInputName).getType();
      subscriptionFields[operation] = {
        type: GraphQLNonNull3(modelType),
        args: {
          filter: {
            type: subCreateFilterInputType
          }
        }
      };
    }
    if (model.crudOptions.subUpdate) {
      const operation = getSubscriptionName(name, GraphbackOperationType2.UPDATE);
      const filterInputName = getInputTypeName2(name, GraphbackOperationType2.SUBSCRIPTION_UPDATE);
      const subUpdateFilterInputType = schemaComposer.getITC(filterInputName).getType();
      subscriptionFields[operation] = {
        type: GraphQLNonNull3(modelType),
        args: {
          filter: {
            type: subUpdateFilterInputType
          }
        }
      };
    }
    if (model.crudOptions.subDelete) {
      const operation = getSubscriptionName(name, GraphbackOperationType2.DELETE);
      const filterInputName = getInputTypeName2(name, GraphbackOperationType2.SUBSCRIPTION_DELETE);
      const subDeleteFilterInputType = schemaComposer.getITC(filterInputName).getType();
      subscriptionFields[operation] = {
        type: GraphQLNonNull3(modelType),
        args: {
          filter: {
            type: subDeleteFilterInputType
          }
        }
      };
    }
    schemaComposer.Subscription.addFields(subscriptionFields);
  }
  createSchema(queryTypes, mutationTypes, subscriptionTypes) {
    const queryType = new GraphQLObjectType2({
      name: "Query",
      fields: () => queryTypes
    });
    let mutationType;
    if (Object.keys(mutationTypes).length !== 0) {
      mutationType = new GraphQLObjectType2({
        name: "Mutation",
        fields: () => mutationTypes
      });
    }
    let subscriptionType;
    if (Object.keys(subscriptionTypes).length !== 0) {
      subscriptionType = new GraphQLObjectType2({
        name: "Subscription",
        fields: () => subscriptionTypes
      });
    }
    return new GraphQLSchema({
      query: queryType,
      mutation: mutationType,
      subscription: subscriptionType
    });
  }
  createMutations(model, schemaComposer) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const modelType = modelTC.getType();
    const resultListType = createMutationListResultType(modelType);
    buildMutationInputType(schemaComposer, modelType);
    const mutationFields = {};
    if (model.crudOptions.create) {
      const operationType = GraphbackOperationType2.CREATE;
      buildCreateMutationInputType(schemaComposer, modelType);
      const inputTypeName = getInputTypeName2(name, operationType);
      const createMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      const operation = getFieldName(name, operationType);
      mutationFields[operation] = {
        type: modelType,
        args: {
          input: {
            type: GraphQLNonNull3(createMutationInputType)
          }
        }
      };
    }
    if (model.crudOptions.update) {
      const operationType = GraphbackOperationType2.UPDATE;
      const operation = getFieldName(name, operationType);
      const inputTypeName = getInputTypeName2(name, operationType);
      const updateMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      mutationFields[operation] = {
        type: modelType,
        args: {
          input: {
            type: GraphQLNonNull3(updateMutationInputType)
          }
        }
      };
    }
    if (model.crudOptions.updateBy) {
      const operationType = GraphbackOperationType2.UPDATE_BY;
      const operation = getFieldName(name, operationType);
      const inputTypeName = getInputTypeName2(name, operationType);
      const updateMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      const filterInputType = schemaComposer.getITC(getInputTypeName2(name, GraphbackOperationType2.FIND)).getType();
      mutationFields[operation] = {
        type: resultListType,
        args: {
          filter: {
            type: filterInputType
          },
          input: {
            type: GraphQLNonNull3(updateMutationInputType)
          }
        }
      };
    }
    if (model.crudOptions.delete) {
      const operationType = GraphbackOperationType2.DELETE;
      const operation = getFieldName(name, operationType);
      const inputTypeName = getInputTypeName2(name, operationType);
      const deleteMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      mutationFields[operation] = {
        type: modelType,
        args: buildFindOneFieldMap(model, schemaComposer)
      };
    }
    if (model.crudOptions.deleteBy) {
      const operationType = GraphbackOperationType2.DELETE_BY;
      const operation = getFieldName(name, operationType);
      const inputTypeName = getInputTypeName2(name, operationType);
      const deleteMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      const filterInputType = schemaComposer.getITC(getInputTypeName2(name, GraphbackOperationType2.FIND)).getType();
      mutationFields[operation] = {
        type: resultListType,
        args: {
          filter: {
            type: filterInputType
          }
        }
      };
    }
    schemaComposer.Mutation.addFields(mutationFields);
  }
  createQueries(model, schemaComposer) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const modelType = modelTC.getType();
    const aggFields = {};
    const aggregations = ["count", "avg", "max", "min", "sum"];
    aggregations.forEach((agg) => {
      aggFields[agg] = {
        type: "Int",
        args: {
          of: {
            type: `Of${name}Input`
          }
        },
        description: "@transient"
      };
    });
    modelTC.addFields(aggFields);
    buildFilterInputType(schemaComposer, modelType);
    const queryFields = {};
    if (model.crudOptions.findOne) {
      const operation = getFieldName(name, GraphbackOperationType2.FIND_ONE);
      queryFields[operation] = {
        type: model.graphqlType,
        args: buildFindOneFieldMap(model, schemaComposer)
      };
    }
    if (model.crudOptions.find) {
      const operationType = GraphbackOperationType2.FIND;
      const operation = getFieldName(name, operationType);
      const inputTypeName = getInputTypeName2(name, operationType);
      const filterInputType = schemaComposer.getITC(inputTypeName).getType();
      const resultListType = createModelListResultType(modelType);
      queryFields[operation] = {
        type: GraphQLNonNull3(resultListType),
        args: {
          filter: {
            type: filterInputType
          },
          page: {
            type: PageRequest
          },
          orderBy: {
            type: OrderByInputType
          }
        }
      };
    }
    schemaComposer.Query.addFields(queryFields);
  }
  createAggregationForModelFields(schemaComposer, models) {
    for (const model of models) {
      const modelName = model.graphqlType.name;
      const enumName = `Enum${modelName}Fields`;
      const fields = Object.keys(model.fields).filter((field) => {
        return !model.fields[field].transient;
      }).join(" ");
      schemaComposer.createEnumTC(`enum ${enumName} { ${fields} }`);
      schemaComposer.createInputTC(`input Of${modelName}Input { of: ${enumName}}`);
    }
  }
  addVersionedMetadataFields(schemaComposer, models) {
    const timeStampInputName = getInputName(Timestamp);
    let timestampInputType;
    let timestampType;
    for (const model of models) {
      const name = model.graphqlType.name;
      const modelTC = schemaComposer.getOTC(name);
      const desc = model.graphqlType.description;
      const { markers } = metadataMap2;
      if (parseMetadata(markers.versioned, desc)) {
        const updateField = model.fields[metadataMap2.fieldNames.updatedAt];
        const createAtField = model.fields[metadataMap2.fieldNames.createdAt];
        const errorMessage = (field) => `Type "${model.graphqlType.name}" annotated with @versioned, cannot contain custom "${field}" field since it is generated automatically. Either remove the @versioned annotation, change the type of the field to "${Timestamp.name}" or remove the field.`;
        if (createAtField && createAtField.type !== Timestamp.name) {
          throw new Error(errorMessage(metadataMap2.fieldNames.createdAt));
        }
        if (updateField && updateField.type !== Timestamp.name) {
          throw new Error(errorMessage(metadataMap2.fieldNames.updatedAt));
        }
        if (!timestampInputType) {
          if (schemaComposer.has(Timestamp.name)) {
            timestampInputType = schemaComposer.getITC(timeStampInputName).getType();
          } else {
            schemaComposer.createScalarTC(Timestamp);
            timestampInputType = createInputTypeForScalar(Timestamp);
            schemaComposer.add(timestampInputType);
          }
          timestampType = schemaComposer.getSTC(Timestamp.name).getType();
        }
        const metadataFields = createVersionedFields(timestampType);
        modelTC.addFields(metadataFields);
        const inputType = schemaComposer.getITC(getInputTypeName2(name, GraphbackOperationType2.FIND));
        if (inputType) {
          const metadataInputFields = createVersionedInputFields(timestampInputType);
          inputType.addFields(metadataInputFields);
        }
      }
    }
    ;
  }
  transformSchemaToString(schema, fileExtension) {
    const schemaString = printSchemaWithDirectives(schema);
    if (this.pluginConfig) {
      if (fileExtension === "ts") {
        return tsSchemaFormatter.format(schemaString);
      }
      if (fileExtension === "js") {
        return jsSchemaFormatter.format(schemaString);
      }
      if (fileExtension === "graphql") {
        return gqlSchemaFormatter.format(schemaString);
      }
    }
    throw Error(`Invalid format '${fileExtension}' specified. \`options.format\` supports only \`ts\`, \`js\` and \`graphql\` flags`);
  }
  addQueryResolvers(model, resolvers) {
    if (model.crudOptions.findOne || model.crudOptions.find) {
      resolvers.Query = resolvers.Query || {};
      if (model.crudOptions.findOne) {
        this.addFindOneQueryResolver(model, resolvers.Query);
      }
      if (model.crudOptions.find) {
        this.addFindQueryResolver(model, resolvers.Query);
      }
    }
  }
  addMutationResolvers(model, resolvers) {
    if (model.crudOptions.create || model.crudOptions.update || model.crudOptions.delete) {
      resolvers.Mutation = resolvers.Mutation || {};
      if (model.crudOptions.create) {
        this.addCreateMutationResolver(model, resolvers.Mutation);
      }
      if (model.crudOptions.update) {
        this.addUpdateMutationResolver(model, resolvers.Mutation);
      }
      if (model.crudOptions.updateBy) {
        this.addUpdateByMutationResolver(model, resolvers.Mutation);
      }
      if (model.crudOptions.delete) {
        this.addDeleteMutationResolver(model, resolvers.Mutation);
      }
      if (model.crudOptions.deleteBy) {
        this.addDeleteByMutationResolver(model, resolvers.Mutation);
      }
    }
  }
  addSubscriptionResolvers(model, resolvers) {
    const modelType = model.graphqlType;
    if (model.crudOptions.subCreate || model.crudOptions.subUpdate || model.crudOptions.subDelete) {
      resolvers.Subscription = resolvers.Subscription || {};
      if (model.crudOptions.subCreate) {
        this.addCreateSubscriptionResolver(modelType, resolvers.Subscription);
      }
      if (model.crudOptions.subUpdate) {
        this.addUpdateSubscriptionResolver(modelType, resolvers.Subscription);
      }
      if (model.crudOptions.subDelete) {
        this.addDeleteSubscriptionResolver(modelType, resolvers.Subscription);
      }
    }
  }
  addRelationshipResolvers(model, resolversObj, modelNameToModelDefinition) {
    const relationResolvers = {};
    for (const relationship of model.relationships) {
      if (relationship.kind === "oneToMany") {
        this.addOneToManyResolver(relationship, relationResolvers, modelNameToModelDefinition);
      } else {
        this.addOneToOneResolver(relationship, relationResolvers, modelNameToModelDefinition);
      }
    }
    if (Object.keys(relationResolvers).length > 0) {
      resolversObj[model.graphqlType.name] = relationResolvers;
    }
  }
  addCreateMutationResolver(model, mutationObj) {
    const modelType = model.graphqlType;
    const modelName = modelType.name;
    const resolverCreateField = getFieldName(modelName, GraphbackOperationType2.CREATE);
    mutationObj[resolverCreateField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].create(args.input, context, info);
    };
  }
  addUpdateMutationResolver(model, mutationObj) {
    const modelName = model.graphqlType.name;
    const updateField = getFieldName(modelName, GraphbackOperationType2.UPDATE);
    mutationObj[updateField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].update(args.input, context, info);
    };
  }
  addUpdateByMutationResolver(model, mutationObj) {
    const modelName = model.graphqlType.name;
    const updateField = getFieldName(modelName, GraphbackOperationType2.UPDATE_BY);
    mutationObj[updateField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].updateBy(args, context, info);
    };
  }
  addDeleteMutationResolver(model, mutationObj) {
    const modelName = model.graphqlType.name;
    const deleteField = getFieldName(modelName, GraphbackOperationType2.DELETE);
    mutationObj[deleteField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].delete(args, context, info);
    };
  }
  addDeleteByMutationResolver(model, mutationObj) {
    const modelName = model.graphqlType.name;
    const deleteField = getFieldName(modelName, GraphbackOperationType2.DELETE_BY);
    mutationObj[deleteField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].deleteBy(args, context, info);
    };
  }
  addFindQueryResolver(model, queryObj) {
    const modelType = model.graphqlType;
    const modelName = modelType.name;
    const findField = getFieldName(modelName, GraphbackOperationType2.FIND);
    queryObj[findField] = async (_, args, context, info) => {
      return await context.graphback[modelName].findBy(args, context, info, "items");
    };
  }
  addFindOneQueryResolver(model, queryObj) {
    const modelType = model.graphqlType;
    const modelName = modelType.name;
    const findOneField = getFieldName(modelName, GraphbackOperationType2.FIND_ONE);
    const primaryKeyLabel = model.primaryKey.name;
    queryObj[findOneField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].findOne({ [primaryKeyLabel]: args.id }, context, info);
    };
  }
  addCreateSubscriptionResolver(modelType, subscriptionObj) {
    const modelName = modelType.name;
    const operation = getSubscriptionName(modelName, GraphbackOperationType2.CREATE);
    subscriptionObj[operation] = {
      subscribe: (_, args, context) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }
        return context.graphback[modelName].subscribeToCreate(args.filter, context);
      }
    };
  }
  addUpdateSubscriptionResolver(modelType, subscriptionObj) {
    const modelName = modelType.name;
    const operation = getSubscriptionName(modelName, GraphbackOperationType2.UPDATE);
    subscriptionObj[operation] = {
      subscribe: (_, args, context) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }
        return context.graphback[modelName].subscribeToUpdate(args.filter, context);
      }
    };
  }
  addDeleteSubscriptionResolver(modelType, subscriptionObj) {
    const modelName = modelType.name;
    const operation = getSubscriptionName(modelName, GraphbackOperationType2.DELETE);
    subscriptionObj[operation] = {
      subscribe: (_, args, context) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }
        return context.graphback[modelName].subscribeToDelete(args.filter, context);
      }
    };
  }
  addOneToManyResolver(relationship, resolverObj, modelNameToModelDefinition) {
    const modelName = relationship.relationType.name;
    const relationOwner = relationship.ownerField.name;
    const model = modelNameToModelDefinition[modelName];
    resolverObj[relationOwner] = (parent, args, context, info) => {
      if (Object.keys(parent).includes(relationOwner)) {
        return parent[relationOwner];
      }
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].batchLoadData(relationship.relationForeignKey, parent[model.primaryKey.name], args.filter, context, info);
    };
  }
  addOneToOneResolver(relationship, resolverObj, modelNameToModelDefinition) {
    const modelName = relationship.relationType.name;
    const relationIdField = getPrimaryKey2(relationship.relationType);
    const relationOwner = relationship.ownerField.name;
    const model = modelNameToModelDefinition[modelName];
    resolverObj[relationOwner] = (parent, _, context, info) => {
      if (Object.keys(parent).includes(relationOwner)) {
        return parent[relationOwner];
      }
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      const selectedFields = getSelectedFieldsFromResolverInfo(info, model);
      selectedFields.push(relationIdField.name);
      const fetchedKeys = selectedFields.join("-");
      const dataLoaderName = `${modelName}-${relationship.kind}-${relationIdField.name}-${relationship.relationForeignKey}-${fetchedKeys}-DataLoader`;
      if (!context[dataLoaderName]) {
        context[dataLoaderName] = new import_dataloader.default(async (keys) => {
          const service = context.graphback[modelName];
          const results = await service.findBy({ [relationIdField.name]: { in: keys } }, context, info);
          return keys.map((key) => {
            return results.items.find((item) => item[relationIdField.name].toString() === key.toString());
          });
        });
      }
      const relationForeignKey = parent[relationship.relationForeignKey];
      if (relationForeignKey === void 0 || relationForeignKey === null) {
        return null;
      }
      return context[dataLoaderName].load(relationForeignKey);
    };
  }
  createSchemaCRUDTypes(schemaComposer) {
    schemaComposer.add(PageRequest);
    schemaComposer.add(IDScalarInputType);
    schemaComposer.add(SortDirectionEnum);
    schemaComposer.add(StringScalarInputType);
    schemaComposer.add(BooleanScalarInputType);
    schemaComposer.add(createInputTypeForScalar(GraphQLInt2));
    schemaComposer.add(createInputTypeForScalar(GraphQLFloat));
    schemaComposer.forEach((tc) => {
      const namedType = tc.getType();
      if (isScalarType2(namedType) && !isSpecifiedScalarType(namedType) && FILTER_SUPPORTED_SCALARS2.includes(namedType.name)) {
        schemaComposer.add(createInputTypeForScalar(namedType));
        return;
      }
      const isRootType = ["Query", "Subscription", "Mutation"].includes(namedType.name);
      if (isObjectType2(namedType) && !isModelType(namedType) && !isRootType) {
        addCreateObjectInputType(schemaComposer, namedType);
        addUpdateObjectInputType(schemaComposer, namedType);
      }
    });
  }
  buildSchemaModelRelationships(schemaComposer, models) {
    for (const model of models) {
      const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
      addRelationshipFields(model, modifiedType);
      extendRelationshipFields(model, modifiedType);
    }
  }
};
export {
  BooleanScalarInputType,
  IDScalarInputType,
  OrderByInputType,
  PageRequest,
  SchemaCRUDPlugin as Plugin,
  SCHEMA_CRUD_PLUGIN_NAME,
  SchemaCRUDPlugin,
  SortDirectionEnum,
  StringScalarInputType,
  addCreateObjectInputType,
  addUpdateObjectInputType,
  buildCreateMutationInputType,
  buildFilterInputType,
  buildFindOneFieldMap,
  buildMutationInputType,
  buildSubscriptionFilterType,
  createInputTypeForScalar,
  createModelListResultType,
  createMutationListResultType,
  createVersionedFields,
  createVersionedInputFields,
  getInputName
};
