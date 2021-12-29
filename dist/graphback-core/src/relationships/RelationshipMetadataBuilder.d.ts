import { GraphQLObjectType, GraphQLField, GraphQLScalarType } from 'graphql';
export interface FieldRelationshipMetadata {
    kind: 'oneToMany' | 'oneToOne' | 'manyToOne';
    owner: GraphQLObjectType;
    ownerField: GraphQLField<any, any>;
    relationType: GraphQLObjectType;
    relationFieldName: string;
    relationFieldType?: GraphQLScalarType;
    relationForeignKey?: string;
}
export interface RelationshipAnnotation {
    kind: 'oneToMany' | 'oneToOne' | 'manyToOne';
    field?: string;
    key?: string;
}
/**
 * Builds relationship context for entire data model.
 * Performs validation on relationship fields and metadata
 * Dynamically creates relationship fields and maps values to data layer.
 */
export declare class RelationshipMetadataBuilder {
    private readonly modelTypes;
    private readonly relationships;
    constructor(modelTypes: GraphQLObjectType[]);
    /**
     * Builds relationship context for entire data model
     * Generates fields and anotations
     */
    build(): void;
    /**
     * Get all relationships
     */
    getRelationships(): FieldRelationshipMetadata[];
    /**
     * Get all relationships where the model is the parent.
     * @param modelName
     */
    getModelRelationships(modelName: string): FieldRelationshipMetadata[];
    /**
     * Collects relationship information for a model based on relationship field annotations
     * and pushes to list of all relationships in data model.
     *
     * @param modelType
     */
    private buildModelRelationshipContext;
    private createOneToManyField;
    private createManyToOneField;
    private updateOneToManyField;
    private updateManyToOneField;
    private updateOneToOneField;
    private addOneToMany;
    private addManyToOne;
    private addOneToOne;
    private validateOneToManyRelationship;
    private validateManyToOneField;
    private validateOneToOneRelationship;
    private validateRelationshipField;
}
//# sourceMappingURL=RelationshipMetadataBuilder.d.ts.map