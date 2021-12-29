import { GraphQLObjectType } from 'graphql';
export declare type FieldTransformer = (value?: any) => any;
export interface FieldTransform {
    fieldName: string;
    transform: FieldTransformer;
}
export declare enum TransformType {
    UPDATE = "onUpdateFieldTransform",
    CREATE = "onCreateFieldTransform"
}
export interface FieldTransformMap {
    [TransformType.CREATE]: FieldTransform[];
    [TransformType.UPDATE]: FieldTransform[];
}
export declare function getFieldTransformations(baseType: GraphQLObjectType): FieldTransformMap;
//# sourceMappingURL=fieldTransformHelpers.d.ts.map