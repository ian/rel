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

// src/SchemaCRUDPlugin.ts
import { resolve, dirname, join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { SchemaComposer } from "graphql-compose";
import { GraphQLNonNull as GraphQLNonNull3, GraphQLObjectType as GraphQLObjectType2, GraphQLSchema, GraphQLInt as GraphQLInt2, GraphQLFloat, isScalarType as isScalarType2, isSpecifiedScalarType, isObjectType as isObjectType2 } from "graphql";
import { Timestamp, getFieldName, printSchemaWithDirectives, getSubscriptionName, GraphbackOperationType as GraphbackOperationType2, GraphbackPlugin, getInputTypeName as getInputTypeName2, graphbackScalarsTypes, FILTER_SUPPORTED_SCALARS as FILTER_SUPPORTED_SCALARS2 } from "@graphback/core";

// src/writer/schemaFormatters.ts
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
import { GraphQLInputObjectType, GraphQLList as GraphQLList2, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLID, GraphQLEnumType, GraphQLObjectType, GraphQLNonNull as GraphQLNonNull2, getNamedType as getNamedType2, isScalarType, isEnumType, isObjectType, isInputObjectType, getNullableType, isListType as isListType2 } from "graphql";
import { GraphbackOperationType, getInputTypeName, getInputFieldName, getInputFieldTypeName, getPrimaryKey, FILTER_SUPPORTED_SCALARS, isAutoPrimaryKey } from "@graphback/core";

// src/definitions/copyWrappingType.ts
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
var buildOrderByInputType = (modelName) => {
  return new GraphQLInputObjectType({
    name: modelName + "OrderByInput",
    fields: {
      field: { type: modelName + "FieldsEnum" },
      order: { type: SortDirectionEnum, defaultValue: "asc" }
    }
  });
};
var OrderByInputType = new GraphQLInputObjectType({
  name: OrderByInputTypeName,
  fields: {
    field: { type: GraphQLNonNull2(GraphQLString) },
    order: { type: SortDirectionEnum, defaultValue: "asc" }
  }
});
function getModelInputFields(schemaComposer, modelType, operationType) {
  var _a, _b, _c, _d, _e, _f;
  const inputFields = [];
  const fields = Object.values(modelType.getFields());
  for (const field of fields) {
    const typeName = getInputFieldTypeName(modelType.name, field, operationType);
    if (!typeName) {
      continue;
    }
    if ((_c = (_b = (_a = field == null ? void 0 : field.extensions) == null ? void 0 : _a.directives) == null ? void 0 : _b.some) == null ? void 0 : _c.call(_b, (d) => ["computed", "transient"].includes(d.name))) {
      continue;
    }
    const name = getInputFieldName(field);
    const type = schemaComposer.getAnyTC(typeName).getType();
    const wrappedType = copyWrappingType(field.type, type);
    const extensions = {};
    const constraintDirective = (_f = (_e = (_d = field == null ? void 0 : field.extensions) == null ? void 0 : _d.directives) == null ? void 0 : _e.find) == null ? void 0 : _f.call(_e, (d) => d.name === "constraint");
    if (constraintDirective) {
      extensions.directives = [constraintDirective];
    }
    const inputField = {
      name,
      type: wrappedType,
      description: void 0,
      extensions,
      deprecationReason: field.deprecationReason
    };
    inputFields.push(inputField);
  }
  return inputFields;
}
function buildFindOneFieldMap(modelType, schemaComposer) {
  const { type } = modelType.primaryKey;
  return {
    _id: {
      name: "_id",
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
          type: field.type,
          extensions: field.extensions
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
    var _a, _b, _c;
    const namedType = getNamedType2(f.type);
    return !((_c = (_b = (_a = f.extensions) == null ? void 0 : _a.directives) == null ? void 0 : _b.some) == null ? void 0 : _c.call(_b, (d) => ["transient", "computed"].includes(d.name))) && (isScalarType(namedType) && FILTER_SUPPORTED_SCALARS.includes(namedType.name)) || isEnumType(namedType);
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
      for (const { name, type, extensions } of allModelFields) {
        let fieldType;
        if (name !== idField.name) {
          fieldType = getNullableType(type);
        }
        if (isListType2(fieldType)) {
          fieldType = GraphQLList2(getNamedType2(fieldType));
        }
        fields[name] = {
          name,
          type: fieldType || type,
          extensions
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
      extensions: {},
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
    createdAt: {
      type: versionedInputType
    },
    updatedAt: {
      type: versionedInputType
    }
  };
}
function createVersionedFields(type) {
  return {
    createdAt: {
      type
    },
    updatedAt: {
      type
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
    this.buildSchemaForModels(schemaComposer, models);
    this.addMetadataFields(schemaComposer, models);
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
      const modelName = model.graphqlType.name;
      let modifiedType = schemaComposer.getOTC(modelName);
      const errorMessage = (field) => `${modelName} cannot contain custom "${field}" field since it is generated automatically.`;
      if (model.fields.id) {
        throw new Error(errorMessage("id"));
      }
      if (model.fields.__unique) {
        throw new Error(errorMessage("__unique"));
      }
      modifiedType.addFields({
        _id: {
          type: "ID"
        }
      });
      this.createQueries(model, schemaComposer);
      this.createMutations(model, schemaComposer);
      this.createSubscriptions(model, schemaComposer);
      modifiedType = schemaComposer.getOTC(modelName);
    }
  }
  createSubscriptions(model, schemaComposer) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const modelType = modelTC.getType();
    buildSubscriptionFilterType(schemaComposer, modelType);
    const subscriptionFields = {};
    let operation = getSubscriptionName(name, GraphbackOperationType2.CREATE);
    let filterInputName = getInputTypeName2(name, GraphbackOperationType2.SUBSCRIPTION_CREATE);
    const subCreateFilterInputType = schemaComposer.getITC(filterInputName).getType();
    subscriptionFields[operation] = {
      type: GraphQLNonNull3(modelType),
      args: {
        filter: {
          type: subCreateFilterInputType
        }
      }
    };
    operation = getSubscriptionName(name, GraphbackOperationType2.UPDATE);
    filterInputName = getInputTypeName2(name, GraphbackOperationType2.SUBSCRIPTION_UPDATE);
    const subUpdateFilterInputType = schemaComposer.getITC(filterInputName).getType();
    subscriptionFields[operation] = {
      type: GraphQLNonNull3(modelType),
      args: {
        filter: {
          type: subUpdateFilterInputType
        }
      }
    };
    operation = getSubscriptionName(name, GraphbackOperationType2.DELETE);
    filterInputName = getInputTypeName2(name, GraphbackOperationType2.SUBSCRIPTION_DELETE);
    const subDeleteFilterInputType = schemaComposer.getITC(filterInputName).getType();
    subscriptionFields[operation] = {
      type: GraphQLNonNull3(modelType),
      args: {
        filter: {
          type: subDeleteFilterInputType
        }
      }
    };
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
    let operationType = GraphbackOperationType2.CREATE;
    buildCreateMutationInputType(schemaComposer, modelType);
    let inputTypeName = getInputTypeName2(name, operationType);
    const createMutationInputType = schemaComposer.getITC(inputTypeName).getType();
    let operation = getFieldName(name, operationType);
    mutationFields[operation] = {
      type: modelType,
      args: {
        input: {
          type: GraphQLNonNull3(createMutationInputType)
        }
      }
    };
    operationType = GraphbackOperationType2.UPDATE;
    operation = getFieldName(name, operationType);
    inputTypeName = getInputTypeName2(name, operationType);
    let updateMutationInputType = schemaComposer.getITC(inputTypeName).getType();
    mutationFields[operation] = {
      type: modelType,
      args: {
        input: {
          type: GraphQLNonNull3(updateMutationInputType)
        }
      }
    };
    operationType = GraphbackOperationType2.UPDATE_BY;
    operation = getFieldName(name, operationType);
    inputTypeName = getInputTypeName2(name, operationType);
    updateMutationInputType = schemaComposer.getITC(inputTypeName).getType();
    let filterInputType = schemaComposer.getITC(getInputTypeName2(name, GraphbackOperationType2.FIND)).getType();
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
    operationType = GraphbackOperationType2.DELETE;
    operation = getFieldName(name, operationType);
    inputTypeName = getInputTypeName2(name, operationType);
    mutationFields[operation] = {
      type: modelType,
      args: buildFindOneFieldMap(model, schemaComposer)
    };
    operationType = GraphbackOperationType2.DELETE_BY;
    operation = getFieldName(name, operationType);
    inputTypeName = getInputTypeName2(name, operationType);
    filterInputType = schemaComposer.getITC(getInputTypeName2(name, GraphbackOperationType2.FIND)).getType();
    mutationFields[operation] = {
      type: resultListType,
      args: {
        filter: {
          type: filterInputType
        }
      }
    };
    schemaComposer.Mutation.addFields(mutationFields);
  }
  createQueries(model, schemaComposer) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const modelType = modelTC.getType();
    const aggFields = {};
    const aggregations = ["avg", "max", "min", "sum"];
    aggFields.count = {
      type: "Int",
      args: {
        of: {
          type: `Of${name}Input`
        },
        distinct: {
          type: "Boolean"
        }
      },
      extensions: {
        directives: {
          transient: {}
        }
      }
    };
    if (schemaComposer.has(`Of${name}NumberInput`)) {
      aggregations.forEach((agg) => {
        aggFields[agg] = {
          type: "Int",
          args: {
            of: {
              type: `Of${name}NumberInput`
            },
            distinct: {
              type: "Boolean"
            }
          },
          extensions: {
            directives: {
              transient: {}
            }
          }
        };
      });
    }
    modelTC.addFields(aggFields);
    buildFilterInputType(schemaComposer, modelType);
    const queryFields = {};
    let operation = getFieldName(name, GraphbackOperationType2.FIND_ONE);
    queryFields[operation] = {
      type: model.graphqlType,
      args: buildFindOneFieldMap(model, schemaComposer)
    };
    const operationType = GraphbackOperationType2.FIND;
    operation = getFieldName(name, operationType);
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
          type: [buildOrderByInputType(name)]
        }
      }
    };
    schemaComposer.Query.addFields(queryFields);
  }
  createAggregationForModelFields(schemaComposer, models) {
    for (const model of models) {
      const modelName = model.graphqlType.name;
      const enumName = `${modelName}FieldsEnum`;
      const numberEnumName = `${modelName}NumberFieldsEnum`;
      const fieldKeys = Object.keys(model.fields);
      const fields = fieldKeys.filter((f) => !model.fields[f].transient && !model.fields[f].computed).join(" ");
      const numberTypes = [
        "Int",
        "Float",
        "BigInt",
        "NonPositiveFloat",
        "NonPositiveInt",
        "NonNegativeInt",
        "NonNegativeFloat",
        "NegativeFloat",
        "NegativeInt",
        "PositiveInt",
        "PositiveFloat"
      ];
      const numberFields = fieldKeys.filter((f) => {
        return !model.fields[f].transient && !model.fields[f].computed && numberTypes.includes(model.fields[f].type.replace("!", ""));
      }).join(" ");
      schemaComposer.createEnumTC(`enum ${enumName} { ${fields} createdAt updatedAt }`);
      schemaComposer.createInputTC(`input Of${modelName}Input { of: ${enumName}}`);
      if (numberFields !== "") {
        schemaComposer.createEnumTC(`enum ${numberEnumName} { ${numberFields} }`);
        schemaComposer.createInputTC(`input Of${modelName}NumberInput { of: ${numberEnumName}}`);
      }
    }
  }
  addMetadataFields(schemaComposer, models) {
    const timeStampInputName = getInputName(Timestamp);
    let timestampInputType;
    let timestampType;
    for (const model of models) {
      const name = model.graphqlType.name;
      const modelTC = schemaComposer.getOTC(name);
      const updateField = model.fields.updatedAt;
      const createAtField = model.fields.createdAt;
      const errorMessage = (field) => `${name} cannot contain custom "${field}" field since it is generated automatically.`;
      if (createAtField) {
        throw new Error(errorMessage("createdAt"));
      }
      if (updateField) {
        throw new Error(errorMessage("updatedAt"));
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
    resolvers.Query = resolvers.Query || {};
    this.addFindOneQueryResolver(model, resolvers.Query);
    this.addFindQueryResolver(model, resolvers.Query);
  }
  addMutationResolvers(model, resolvers) {
    resolvers.Mutation = resolvers.Mutation || {};
    this.addCreateMutationResolver(model, resolvers.Mutation);
    this.addUpdateMutationResolver(model, resolvers.Mutation);
    this.addUpdateByMutationResolver(model, resolvers.Mutation);
    this.addDeleteMutationResolver(model, resolvers.Mutation);
    this.addDeleteByMutationResolver(model, resolvers.Mutation);
  }
  addSubscriptionResolvers(model, resolvers) {
    const modelType = model.graphqlType;
    resolvers.Subscription = resolvers.Subscription || {};
    this.addCreateSubscriptionResolver(modelType, resolvers.Subscription);
    this.addUpdateSubscriptionResolver(modelType, resolvers.Subscription);
    this.addDeleteSubscriptionResolver(modelType, resolvers.Subscription);
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
      if (isObjectType2(namedType) && !isRootType) {
        addCreateObjectInputType(schemaComposer, namedType);
        addUpdateObjectInputType(schemaComposer, namedType);
      }
    });
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
  buildOrderByInputType,
  buildSubscriptionFilterType,
  createInputTypeForScalar,
  createModelListResultType,
  createMutationListResultType,
  createVersionedFields,
  createVersionedInputFields,
  getInputName
};
//# sourceMappingURL=index.mjs.map