import { GraphQLInputType, GraphQLOutputType } from 'graphql';
declare type InputOrOutTypeType = GraphQLInputType | GraphQLOutputType;
/**
 * Copies the wrapping type(s) from one GraphQLType to another
 *
 * @param {GraphQLType} copyFromType - Get the wrapping types from this type
 * @param {GraphQLType} copyToType - Add the wrapping types to this type
 */
export declare function copyWrappingType(copyFromType: InputOrOutTypeType, copyToType: InputOrOutTypeType): InputOrOutTypeType;
export {};
//# sourceMappingURL=copyWrappingType.d.ts.map