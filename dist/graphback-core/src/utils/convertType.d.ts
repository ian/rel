import { ObjectID } from 'bson';
/**
 * Helper function to convert a value to another type
 *
 * @param {any} value - Value to convert
 * @param {any} toType - convert value to this type
 */
export declare function convertType(value: any, toType: any): string | number | boolean | BigInt | ObjectID;
/**
 * Check if value is a Date object
 *
 * @param {any} value
 */
export declare const isDateObject: (value: any) => boolean;
//# sourceMappingURL=convertType.d.ts.map