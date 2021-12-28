"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVersionedFields = exports.createVersionedInputFields = exports.createModelListResultType = exports.addUpdateObjectInputType = exports.addCreateObjectInputType = exports.buildMutationInputType = exports.buildSubscriptionFilterType = exports.buildCreateMutationInputType = exports.buildFilterInputType = exports.buildFindOneFieldMap = exports.OrderByInputType = exports.SortDirectionEnum = exports.PageRequest = exports.BooleanScalarInputType = exports.IDScalarInputType = exports.StringScalarInputType = exports.createInputTypeForScalar = exports.getInputName = void 0;
/* eslint-disable max-lines */
const graphql_1 = require("graphql");
const core_1 = require("@graphback/core");
const copyWrappingType_1 = require("./copyWrappingType");
const PageRequestTypeName = 'PageRequest';
const SortDirectionEnumName = 'SortDirectionEnum';
const OrderByInputTypeName = 'OrderByInput';
const getInputName = (type) => {
    if (graphql_1.isEnumType(type)) {
        return `StringInput`;
    }
    if (graphql_1.isInputObjectType(type)) {
        return type.name;
    }
    return `${type.name}Input`;
};
exports.getInputName = getInputName;
const createInputTypeForScalar = (scalarType) => {
    const newInput = new graphql_1.GraphQLInputObjectType({
        name: exports.getInputName(scalarType),
        fields: {
            ne: { type: scalarType },
            eq: { type: scalarType },
            le: { type: scalarType },
            lt: { type: scalarType },
            ge: { type: scalarType },
            gt: { type: scalarType },
            in: { type: graphql_1.GraphQLList(graphql_1.GraphQLNonNull(scalarType)) },
            between: { type: graphql_1.GraphQLList(graphql_1.GraphQLNonNull(scalarType)) }
        }
    });
    return newInput;
};
exports.createInputTypeForScalar = createInputTypeForScalar;
exports.StringScalarInputType = new graphql_1.GraphQLInputObjectType({
    name: exports.getInputName(graphql_1.GraphQLString),
    fields: {
        ne: { type: graphql_1.GraphQLString },
        eq: { type: graphql_1.GraphQLString },
        le: { type: graphql_1.GraphQLString },
        lt: { type: graphql_1.GraphQLString },
        ge: { type: graphql_1.GraphQLString },
        gt: { type: graphql_1.GraphQLString },
        in: { type: graphql_1.GraphQLList(graphql_1.GraphQLNonNull(graphql_1.GraphQLString)) },
        contains: { type: graphql_1.GraphQLString },
        startsWith: { type: graphql_1.GraphQLString },
        endsWith: { type: graphql_1.GraphQLString }
    }
});
exports.IDScalarInputType = new graphql_1.GraphQLInputObjectType({
    name: exports.getInputName(graphql_1.GraphQLID),
    fields: {
        ne: { type: graphql_1.GraphQLID },
        eq: { type: graphql_1.GraphQLID },
        le: { type: graphql_1.GraphQLID },
        lt: { type: graphql_1.GraphQLID },
        ge: { type: graphql_1.GraphQLID },
        gt: { type: graphql_1.GraphQLID },
        in: { type: graphql_1.GraphQLList(graphql_1.GraphQLNonNull(graphql_1.GraphQLID)) },
    }
});
exports.BooleanScalarInputType = new graphql_1.GraphQLInputObjectType({
    name: exports.getInputName(graphql_1.GraphQLBoolean),
    fields: {
        ne: { type: graphql_1.GraphQLBoolean },
        eq: { type: graphql_1.GraphQLBoolean }
    }
});
exports.PageRequest = new graphql_1.GraphQLInputObjectType({
    name: PageRequestTypeName,
    fields: {
        limit: {
            type: graphql_1.GraphQLInt
        },
        offset: {
            type: graphql_1.GraphQLInt
        }
    }
});
exports.SortDirectionEnum = new graphql_1.GraphQLEnumType({
    name: SortDirectionEnumName,
    values: {
        DESC: { value: 'desc' },
        ASC: { value: 'asc' }
    }
});
exports.OrderByInputType = new graphql_1.GraphQLInputObjectType({
    name: OrderByInputTypeName,
    fields: {
        field: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        order: { type: exports.SortDirectionEnum, defaultValue: 'asc' }
    }
});
function getModelInputFields(schemaComposer, modelType, operationType) {
    const inputFields = [];
    const fields = Object.values(modelType.getFields());
    for (const field of fields) {
        if (core_1.isTransientField(field) || core_1.isOneToManyField(field)) {
            continue;
        }
        const typeName = core_1.getInputFieldTypeName(modelType.name, field, operationType);
        if (!typeName) {
            continue;
        }
        const name = core_1.getInputFieldName(field);
        const type = schemaComposer.getAnyTC(typeName).getType();
        const wrappedType = copyWrappingType_1.copyWrappingType(field.type, type);
        const inputField = {
            name,
            type: wrappedType,
            description: undefined,
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
            type: graphql_1.GraphQLNonNull(schemaComposer.getAnyTC(type).getType()),
            description: undefined,
            extensions: undefined,
            deprecationReason: undefined
        }
    };
}
exports.buildFindOneFieldMap = buildFindOneFieldMap;
const filterInputBuilt = {};
const buildFilterInputType = (schemaComposer, modelType) => {
    if (filterInputBuilt[modelType.name]) {
        return;
    }
    filterInputBuilt[modelType.name] = true;
    const operationType = core_1.GraphbackOperationType.FIND;
    const inputTypeName = core_1.getInputTypeName(modelType.name, operationType);
    const inputFields = getModelInputFields(schemaComposer, modelType, operationType);
    const scalarInputFields = {};
    for (const field of inputFields) {
        const namedType = graphql_1.getNamedType(field.type);
        if (core_1.FILTER_SUPPORTED_SCALARS.includes(namedType.name) || graphql_1.isEnumType(namedType)) {
            const type = exports.getInputName(namedType);
            scalarInputFields[field.name] = {
                name: field.name,
                type
            };
        }
    }
    const filterInput = new graphql_1.GraphQLInputObjectType({
        name: inputTypeName,
        fields: Object.assign(Object.assign({}, scalarInputFields), { and: {
                type: `[${inputTypeName}!]`
            }, or: {
                type: `[${inputTypeName}!]`
            }, not: {
                type: `${inputTypeName}`
            } })
    });
    schemaComposer.add(filterInput);
};
exports.buildFilterInputType = buildFilterInputType;
const buildCreateMutationInputType = (schemaComposer, modelType) => {
    const operationType = core_1.GraphbackOperationType.CREATE;
    const inputTypeName = core_1.getInputTypeName(modelType.name, operationType);
    const idField = core_1.getPrimaryKey(modelType);
    const allModelFields = getModelInputFields(schemaComposer, modelType, operationType);
    const mutationInputType = new graphql_1.GraphQLInputObjectType({
        name: inputTypeName,
        fields: () => {
            const fields = {};
            for (const field of allModelFields) {
                if (field.name === idField.name && core_1.isAutoPrimaryKey(field)) {
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
exports.buildCreateMutationInputType = buildCreateMutationInputType;
const buildSubscriptionFilterType = (schemaComposer, modelType) => {
    const inputTypeName = core_1.getInputTypeName(modelType.name, core_1.GraphbackOperationType.SUBSCRIPTION_CREATE);
    const modelFields = Object.values(modelType.getFields());
    const subscriptionFilterFields = modelFields.filter((f) => {
        const namedType = graphql_1.getNamedType(f.type);
        return !core_1.isTransientField(f) && (graphql_1.isScalarType(namedType) && core_1.FILTER_SUPPORTED_SCALARS.includes(namedType.name)) || graphql_1.isEnumType(namedType);
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
        const fieldType = graphql_1.getNamedType(type);
        const inputFilterName = exports.getInputName(fieldType);
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
exports.buildSubscriptionFilterType = buildSubscriptionFilterType;
const buildMutationInputType = (schemaComposer, modelType) => {
    const operationType = core_1.GraphbackOperationType.UPDATE;
    const inputTypeName = core_1.getInputTypeName(modelType.name, operationType);
    const idField = core_1.getPrimaryKey(modelType);
    const allModelFields = getModelInputFields(schemaComposer, modelType, operationType);
    const mutationInputObject = new graphql_1.GraphQLInputObjectType({
        name: inputTypeName,
        fields: () => {
            const fields = {};
            for (const { name, type } of allModelFields) {
                let fieldType;
                if (name !== idField.name) {
                    fieldType = graphql_1.getNullableType(type);
                }
                if (graphql_1.isListType(fieldType)) {
                    fieldType = graphql_1.GraphQLList(graphql_1.getNamedType(fieldType));
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
exports.buildMutationInputType = buildMutationInputType;
function mapObjectInputFields(schemaComposer, fields, objectName) {
    return fields.map((field) => {
        let namedType = graphql_1.getNamedType(field.type);
        let typeName = namedType.name;
        let inputType;
        if (graphql_1.isObjectType(namedType)) {
            typeName = core_1.getInputTypeName(typeName, core_1.GraphbackOperationType.CREATE);
            namedType = schemaComposer.getOrCreateITC(typeName).getType();
            inputType = copyWrappingType_1.copyWrappingType(field.type, namedType);
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
    const operationType = core_1.GraphbackOperationType.CREATE;
    const inputType = new graphql_1.GraphQLInputObjectType({
        name: core_1.getInputTypeName(objectType.name, operationType),
        fields: mapObjectInputFields(schemaComposer, objectFields, objectType.name)
            .reduce((fieldObj, { name, type, description }) => {
            fieldObj[name] = { type, description };
            return fieldObj;
        }, {})
    });
    schemaComposer.add(inputType);
}
exports.addCreateObjectInputType = addCreateObjectInputType;
function addUpdateObjectInputType(schemaComposer, objectType) {
    const objectFields = Object.values(objectType.getFields());
    const operationType = core_1.GraphbackOperationType.UPDATE;
    const inputType = new graphql_1.GraphQLInputObjectType({
        name: core_1.getInputTypeName(objectType.name, operationType),
        fields: mapObjectInputFields(schemaComposer, objectFields, objectType.name)
            .reduce((fieldObj, { name, type, description }) => {
            fieldObj[name] = { type: graphql_1.getNullableType(type), description };
            return fieldObj;
        }, {})
    });
    schemaComposer.add(inputType);
}
exports.addUpdateObjectInputType = addUpdateObjectInputType;
const createModelListResultType = (modelType) => {
    return new graphql_1.GraphQLObjectType({
        name: `${modelType.name}ResultList`,
        fields: {
            items: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLList(modelType))
            },
            offset: { type: graphql_1.GraphQLInt },
            limit: { type: graphql_1.GraphQLInt },
            count: { type: graphql_1.GraphQLInt }
        }
    });
};
exports.createModelListResultType = createModelListResultType;
function createVersionedInputFields(versionedInputType) {
    return {
        [core_1.metadataMap.fieldNames.createdAt]: {
            type: versionedInputType
        },
        [core_1.metadataMap.fieldNames.updatedAt]: {
            type: versionedInputType
        }
    };
}
exports.createVersionedInputFields = createVersionedInputFields;
function createVersionedFields(type) {
    return {
        [core_1.metadataMap.fieldNames.createdAt]: {
            type,
            description: `@${core_1.metadataMap.markers.createdAt}`
        },
        [core_1.metadataMap.fieldNames.updatedAt]: {
            type,
            description: `@${core_1.metadataMap.markers.updatedAt}`
        }
    };
}
exports.createVersionedFields = createVersionedFields;
//# sourceMappingURL=schemaDefinitions.js.map