export declare type DatabaseNameTransformDirection = 'from-db' | 'to-db';
/**
 * Transform to/from database table or column name
 */
export declare type DatabaseNameTransform = (name: string, direction: DatabaseNameTransformDirection) => string;
/**
 * Transform to/from database table name
 *
 * @param name - model name
 * @param direction - transform to or from database
 */
export declare function defaultTableNameTransform(name: string, direction: DatabaseNameTransformDirection): string;
export declare function transformForeignKeyName(name: string, direction?: DatabaseNameTransformDirection): string;
//# sourceMappingURL=defaultNameTransforms.d.ts.map