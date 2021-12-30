import { GraphQLNamedType, GraphQLScalarType } from 'graphql'
import {
  BigIntResolver, ByteResolver, CurrencyResolver, DurationResolver,
  EmailAddressResolver, GUIDResolver, HSLAResolver, HSLResolver,
  HexColorCodeResolver, HexadecimalResolver, IBANResolver, IPv4Resolver, IPv6Resolver,
  ISBNResolver, ISO8601DurationResolver, LocalDateResolver, LocalTimeResolver,
  MACResolver, NegativeFloatResolver, NegativeIntResolver,
  NonEmptyStringResolver, NonNegativeFloatResolver, NonNegativeIntResolver,
  PhoneNumberResolver, PortResolver, PositiveFloatResolver, PositiveIntResolver,
  PostalCodeResolver, RGBAResolver, RGBResolver,
  URLResolver, USCurrencyResolver, UUIDResolver,
  UtcOffsetResolver, DIDResolver, LatitudeResolver,
  JWTResolver, LongitudeResolver, LocalEndTimeResolver,
  NonPositiveFloatResolver, NonPositiveIntResolver,
  TimeResolver, TimestampResolver, DateResolver, DateTimeResolver,
  JSONResolver, JSONObjectResolver
} from 'graphql-scalars'

export const BigInt_ = new GraphQLScalarType({
  ...extractConfig(BigIntResolver),
  name: 'BigInt'
}); export const Byte = new GraphQLScalarType({
  ...extractConfig(ByteResolver),
  name: 'Byte'
}); export const Currency = new GraphQLScalarType({
  ...extractConfig(CurrencyResolver),
  name: 'Currency'
}); export const Duration = new GraphQLScalarType({
  ...extractConfig(DurationResolver),
  name: 'Duration'
}); export const EmailAddress = new GraphQLScalarType({
  ...extractConfig(EmailAddressResolver),
  name: 'Email'
}); export const GUID = new GraphQLScalarType({
  ...extractConfig(GUIDResolver),
  name: 'GUID'
}); export const HSLA = new GraphQLScalarType({
  ...extractConfig(HSLAResolver),
  name: 'HSLA'
}); export const HSL = new GraphQLScalarType({
  ...extractConfig(HSLResolver),
  name: 'HSL'
}); export const HexColorCode = new GraphQLScalarType({
  ...extractConfig(HexColorCodeResolver),
  name: 'HexColorCode'
}); export const Hexadecimal = new GraphQLScalarType({
  ...extractConfig(HexadecimalResolver),
  name: 'Hexadecimal'
}); export const IBAN = new GraphQLScalarType({
  ...extractConfig(IBANResolver),
  name: 'IBAN'
}); export const IPv4 = new GraphQLScalarType({
  ...extractConfig(IPv4Resolver),
  name: 'IPv4'
}); export const IPv6 = new GraphQLScalarType({
  ...extractConfig(IPv6Resolver),
  name: 'IPv6'
}); export const ISBN = new GraphQLScalarType({
  ...extractConfig(ISBNResolver),
  name: 'ISBN'
}); export const ISO8601Duration = new GraphQLScalarType({
  ...extractConfig(ISO8601DurationResolver),
  name: 'ISO8601Duration'
}); export const LocalDate = new GraphQLScalarType({
  ...extractConfig(LocalDateResolver),
  name: 'LocalDate'
}); export const LocalTime = new GraphQLScalarType({
  ...extractConfig(LocalTimeResolver),
  name: 'LocalTime'
}); export const MAC = new GraphQLScalarType({
  ...extractConfig(MACResolver),
  name: 'MAC'
}); export const NegativeFloat = new GraphQLScalarType({
  ...extractConfig(NegativeFloatResolver),
  name: 'NegativeFloat'
}); export const NegativeInt = new GraphQLScalarType({
  ...extractConfig(NegativeIntResolver),
  name: 'NegativeInt'
}); export const NonEmptyString = new GraphQLScalarType({
  ...extractConfig(NonEmptyStringResolver),
  name: 'NonEmptyString'
}); export const NonNegativeFloat = new GraphQLScalarType({
  ...extractConfig(NonNegativeFloatResolver),
  name: 'NonNegativeFloat'
}); export const NonNegativeInt = new GraphQLScalarType({
  ...extractConfig(NonNegativeIntResolver),
  name: 'NonNegativeInt'
}); export const PhoneNumber = new GraphQLScalarType({
  ...extractConfig(PhoneNumberResolver),
  name: 'PhoneNumber'
}); export const Port = new GraphQLScalarType({
  ...extractConfig(PortResolver),
  name: 'Port'
}); export const PositiveFloat = new GraphQLScalarType({
  ...extractConfig(PositiveFloatResolver),
  name: 'PositiveFloat'
}); export const PositiveInt = new GraphQLScalarType({
  ...extractConfig(PositiveIntResolver),
  name: 'PositiveInt'
}); export const PostalCode = new GraphQLScalarType({
  ...extractConfig(PostalCodeResolver),
  name: 'PostalCode'
}); export const RGBA = new GraphQLScalarType({
  ...extractConfig(RGBAResolver),
  name: 'RGBA'
}); export const RGB = new GraphQLScalarType({
  ...extractConfig(RGBResolver),
  name: 'RGB'
}); export const URL = new GraphQLScalarType({
  ...extractConfig(URLResolver),
  name: 'URL'
}); export const USCurrency = new GraphQLScalarType({
  ...extractConfig(USCurrencyResolver),
  name: 'USCurrency'
}); export const UUID = new GraphQLScalarType({
  ...extractConfig(UUIDResolver),
  name: 'UUID'
}); export const UtcOffset = new GraphQLScalarType({
  ...extractConfig(UtcOffsetResolver),
  name: 'UtcOffset'
}); export const DID = new GraphQLScalarType({
  ...extractConfig(DIDResolver),
  name: 'DID'
}); export const Latitude = new GraphQLScalarType({
  ...extractConfig(LatitudeResolver),
  name: 'Latitude'
}); export const Longitude = new GraphQLScalarType({
  ...extractConfig(LongitudeResolver),
  name: 'Longitude'
}); export const JWT = new GraphQLScalarType({
  ...extractConfig(JWTResolver),
  name: 'JWT'
}); export const LocalEndTime = new GraphQLScalarType({
  ...extractConfig(LocalEndTimeResolver),
  name: 'LocalEndTime'
}); export const NonPositiveFloat = new GraphQLScalarType({
  ...extractConfig(NonPositiveFloatResolver),
  name: 'NonPositiveFloat'
}); export const NonPositiveInt = new GraphQLScalarType({
  ...extractConfig(NonPositiveIntResolver),
  name: 'NonPositiveInt'
})

export const Time = new GraphQLScalarType({
  ...extractConfig(TimeResolver),
  name: 'Time'
})

export const Timestamp = new GraphQLScalarType({
  ...extractConfig(TimestampResolver),
  name: 'Timestamp'
})

export const Date_ = new GraphQLScalarType({
  ...extractConfig(DateResolver),
  name: 'Date'
})

export const DateTime = new GraphQLScalarType({
  ...extractConfig(DateTimeResolver),
  name: 'DateTime'
})

export const JSON_ = new GraphQLScalarType({
  ...extractConfig(JSONResolver),
  name: 'JSON'
})

export const JSONObject = new GraphQLScalarType({
  ...extractConfig(JSONObjectResolver),
  name: 'JSONObject'
})

export const graphbackScalarsTypes = [BigInt_, Byte, Currency, DID, Duration, EmailAddress,
  GUID, HSL, HSLA, HexColorCode, Hexadecimal, IBAN, IPv4, IPv6, ISBN, ISO8601Duration,
  JWT, Latitude, LocalDate, LocalEndTime, LocalTime, Longitude, MAC, NegativeFloat,
  NegativeInt, NonEmptyString, NonNegativeFloat, NonNegativeInt, NonPositiveFloat,
  NonPositiveInt, PhoneNumber, Port, PositiveFloat, PositiveInt, PostalCode,
  RGB, RGBA, URL, USCurrency, UUID, UtcOffset,
  Time, Date_, JSON_, DateTime, Timestamp, JSONObject]

/**
 * Checks if the type is on the default Graphback supported scalars
 *
 * @param type - GraphQL type
 */
export function isSpecifiedGraphbackScalarType (type: GraphQLNamedType): boolean {
  return graphbackScalarsTypes.some(({ name }: GraphQLScalarType) => type.name === name)
}

/**
 * Checks if the type is on the known JSON Graphback supported scalars
 *
 * @param type - GraphQL type
 */
export function isSpecifiedGraphbackJSONScalarType (type: GraphQLNamedType): boolean {
  const name = type.name

  return name === JSONObject.name || name === JSON_.name
}

/**
 * Extract config from wrapped scalar type
 * @param scalar
 */
function extractConfig (wrappedScalar: GraphQLScalarType) {
  const { name, ...config } = wrappedScalar.toConfig()

  return config
}
