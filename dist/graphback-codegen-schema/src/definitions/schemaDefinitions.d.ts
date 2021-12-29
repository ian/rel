import { GraphQLInputObjectType, GraphQLEnumType, GraphQLObjectType, GraphQLInputFieldMap, GraphQLScalarType, GraphQLNamedType } from 'graphql';
import { ModelDefinition } from '@graphback/core';
import { SchemaComposer } from 'graphql-compose';
export declare const getInputName: (type: GraphQLNamedType) => string;
export declare const createInputTypeForScalar: (scalarType: GraphQLScalarType) => GraphQLInputObjectType;
export declare const StringScalarInputType: GraphQLInputObjectType;
export declare const IDScalarInputType: GraphQLInputObjectType;
export declare const BooleanScalarInputType: GraphQLInputObjectType;
export declare const PageRequest: GraphQLInputObjectType;
export declare const SortDirectionEnum: GraphQLEnumType;
export declare const OrderByInputType: GraphQLInputObjectType;
export declare function buildFindOneFieldMap(modelType: ModelDefinition, schemaComposer: SchemaComposer<any>): GraphQLInputFieldMap;
export declare const buildFilterInputType: (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => void;
export declare const buildCreateMutationInputType: (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => void;
export declare const buildSubscriptionFilterType: (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => void;
export declare const buildMutationInputType: (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => void;
export declare function addCreateObjectInputType(schemaComposer: SchemaComposer<any>, objectType: GraphQLObjectType): void;
export declare function addUpdateObjectInputType(schemaComposer: SchemaComposer<any>, objectType: GraphQLObjectType): void;
export declare const createMutationListResultType: (modelType: GraphQLObjectType) => GraphQLObjectType<any, any>;
export declare const createModelListResultType: (modelType: GraphQLObjectType) => GraphQLObjectType<any, any>;
export declare function createVersionedInputFields(versionedInputType: GraphQLInputObjectType): {
    [x: number]: {
        type: GraphQLInputObjectType;
    };
};
export declare function createVersionedFields(type: GraphQLScalarType): {
    [x: number]: {
        type: GraphQLScalarType;
        description: string;
    };
};
//# sourceMappingURL=schemaDefinitions.d.ts.map