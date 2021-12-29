import { GraphQLNamedType, GraphQLScalarType } from 'graphql';
export declare const BigInt_: GraphQLScalarType;
export declare const Byte: GraphQLScalarType;
export declare const Currency: GraphQLScalarType;
export declare const Duration: GraphQLScalarType;
export declare const EmailAddress: GraphQLScalarType;
export declare const GUID: GraphQLScalarType;
export declare const HSLA: GraphQLScalarType;
export declare const HSL: GraphQLScalarType;
export declare const HexColorCode: GraphQLScalarType;
export declare const Hexadecimal: GraphQLScalarType;
export declare const IBAN: GraphQLScalarType;
export declare const IPv4: GraphQLScalarType;
export declare const IPv6: GraphQLScalarType;
export declare const ISBN: GraphQLScalarType;
export declare const ISO8601Duration: GraphQLScalarType;
export declare const LocalDate: GraphQLScalarType;
export declare const LocalTime: GraphQLScalarType;
export declare const MAC: GraphQLScalarType;
export declare const NegativeFloat: GraphQLScalarType;
export declare const NegativeInt: GraphQLScalarType;
export declare const NonEmptyString: GraphQLScalarType;
export declare const NonNegativeFloat: GraphQLScalarType;
export declare const NonNegativeInt: GraphQLScalarType;
export declare const PhoneNumber: GraphQLScalarType;
export declare const Port: GraphQLScalarType;
export declare const PositiveFloat: GraphQLScalarType;
export declare const PositiveInt: GraphQLScalarType;
export declare const PostalCode: GraphQLScalarType;
export declare const RGBA: GraphQLScalarType;
export declare const RGB: GraphQLScalarType;
export declare const URL: GraphQLScalarType;
export declare const USCurrency: GraphQLScalarType;
export declare const UUID: GraphQLScalarType;
export declare const UtcOffset: GraphQLScalarType;
export declare const DID: GraphQLScalarType;
export declare const Latitude: GraphQLScalarType;
export declare const Longitude: GraphQLScalarType;
export declare const JWT: GraphQLScalarType;
export declare const LocalEndTime: GraphQLScalarType;
export declare const NonPositiveFloat: GraphQLScalarType;
export declare const NonPositiveInt: GraphQLScalarType;
export declare const Time: GraphQLScalarType;
export declare const Timestamp: GraphQLScalarType;
export declare const Date_: GraphQLScalarType;
export declare const DateTime: GraphQLScalarType;
export declare const GraphbackObjectID: GraphQLScalarType;
export declare const JSON_: GraphQLScalarType;
export declare const JSONObject: GraphQLScalarType;
export declare const graphbackScalarsTypes: GraphQLScalarType[];
/**
 * Checks if the type is on the default Graphback supported scalars
 *
 * @param type - GraphQL type
 */
export declare function isSpecifiedGraphbackScalarType(type: GraphQLNamedType): boolean;
/**
 * Checks if the type is on the known JSON Graphback supported scalars
 *
 * @param type - GraphQL type
 */
export declare function isSpecifiedGraphbackJSONScalarType(type: GraphQLNamedType): boolean;
//# sourceMappingURL=index.d.ts.map