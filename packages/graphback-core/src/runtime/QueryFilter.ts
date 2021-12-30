/**
 * Filter mapping for scalars that exit
 */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  JSON: any
  JSONObject: { [key: string]: any }
  BigInt: number
  Byte: string
  Currency: string
  DID: string
  Duration: string
  EmailAddress: string
  GUID: string
  HSL: string
  HSLA: string
  HexColorCode: string
  Hexadecimal: string
  IBAN: string
  IPv4: string
  IPv6: string
  ISBN: string
  ISO8601Duration: string
  JWT: any
  Latitude: number
  LocalDate: string
  LocalEndTime: string
  LocalTime: string
  Longitude: number
  MAC: string
  NegativeFloat: number
  NegativeInt: number
  NonEmptyString: string
  NonNegativeFloat: number
  NonNegativeInt: number
  NonPositiveFloat: number
  NonPositiveInt: number
  PhoneNumber: string
  Port: number
  PositiveFloat: number
  PositiveInt: number
  PostalCode: string
  RGB: string
  RGBA: string
  URL: string
  USCurrency: string
  UUID: string
  UtcOffset: string
  Timestamp: number
  Time: string
  Date: Date
  DateTime: Date
}

// Names of the scalars that support Graphback filter type generation
export const FILTER_SUPPORTED_SCALARS = [
  'ID', 'String', 'Boolean', 'Int', 'Float', 'Timestamp',
  'Time', 'Date', 'DateTime', 'BigInt', 'Byte', 'Currency', 'DID', 'Duration', 'EmailAddress',
  'GUID', 'HSL', 'HSLA', 'HexColorCode', 'Hexadecimal', 'IBAN', 'IPv4', 'IPv6', 'ISBN',
  'ISO8601Duration', 'Latitude', 'LocalDate', 'LocalEndTime', 'LocalTime',
  'Longitude', 'MAC', 'NegativeFloat', 'NegativeInt', 'NonEmptyString', 'NonNegativeFloat',
  'NonNegativeInt', 'NonPositiveFloat', 'NonPositiveInt', 'PhoneNumber', 'Port', 'PositiveFloat',
  'PositiveInt', 'PostalCode', 'RGB', 'RGBA', 'URL', 'USCurrency', 'UUID', 'UtcOffset'
]

export type Maybe<T> = T | null

export interface BooleanInput {
  ne?: Maybe<Scalars['Boolean']>
  eq?: Maybe<Scalars['Boolean']>
}

export interface FloatInput {
  ne?: Maybe<Scalars['Float']>
  eq?: Maybe<Scalars['Float']>
  le?: Maybe<Scalars['Float']>
  lt?: Maybe<Scalars['Float']>
  ge?: Maybe<Scalars['Float']>
  gt?: Maybe<Scalars['Float']>
  in?: Maybe<Array<Scalars['Float']>>
  between?: Maybe<Array<Scalars['Float']>>
}

export interface IdInput {
  ne?: Maybe<Scalars['ID']>
  eq?: Maybe<Scalars['ID']>
  le?: Maybe<Scalars['ID']>
  lt?: Maybe<Scalars['ID']>
  ge?: Maybe<Scalars['ID']>
  gt?: Maybe<Scalars['ID']>
  in?: Maybe<Array<Scalars['ID']>>
}

export interface IntInput {
  ne?: Maybe<Scalars['Int']>
  eq?: Maybe<Scalars['Int']>
  le?: Maybe<Scalars['Int']>
  lt?: Maybe<Scalars['Int']>
  ge?: Maybe<Scalars['Int']>
  gt?: Maybe<Scalars['Int']>
  in?: Maybe<Scalars['Int']>
  between?: Maybe<Array<Scalars['Int']>>
}

export interface StringInput {
  ne?: Maybe<Scalars['String']>
  eq?: Maybe<Scalars['String']>
  le?: Maybe<Scalars['String']>
  lt?: Maybe<Scalars['String']>
  ge?: Maybe<Scalars['String']>
  gt?: Maybe<Scalars['String']>
  in?: Maybe<Array<Scalars['String']>>
  contains?: Maybe<Scalars['String']>
  startsWith?: Maybe<Scalars['String']>
  endsWith?: Maybe<Scalars['String']>
}

export interface DateInput {
  ne?: Maybe<Scalars['Date']>
  eq?: Maybe<Scalars['Date']>
  le?: Maybe<Scalars['Date']>
  lt?: Maybe<Scalars['Date']>
  ge?: Maybe<Scalars['Date']>
  gt?: Maybe<Scalars['Date']>
  in?: Maybe<Array<Scalars['Date']>>
  between?: Maybe<Array<Scalars['Date']>>
}

export interface DateTimeInput {
  ne?: Maybe<Scalars['DateTime']>
  eq?: Maybe<Scalars['DateTime']>
  le?: Maybe<Scalars['DateTime']>
  lt?: Maybe<Scalars['DateTime']>
  ge?: Maybe<Scalars['DateTime']>
  gt?: Maybe<Scalars['DateTime']>
  in?: Maybe<Array<Scalars['DateTime']>>
  between?: Maybe<Array<Scalars['DateTime']>>
}

export interface TimeInput {
  ne?: Maybe<Scalars['Time']>
  eq?: Maybe<Scalars['Time']>
  le?: Maybe<Scalars['Time']>
  lt?: Maybe<Scalars['Time']>
  ge?: Maybe<Scalars['Time']>
  gt?: Maybe<Scalars['Time']>
  in?: Maybe<Array<Scalars['Time']>>
  between?: Maybe<Array<Scalars['Time']>>
}

export interface TimestampInput {
  ne?: Maybe<Scalars['Timestamp']>
  eq?: Maybe<Scalars['Timestamp']>
  le?: Maybe<Scalars['Timestamp']>
  lt?: Maybe<Scalars['Timestamp']>
  ge?: Maybe<Scalars['Timestamp']>
  gt?: Maybe<Scalars['Timestamp']>
  in?: Maybe<Array<Scalars['Timestamp']>>
  between?: Maybe<Array<Scalars['Timestamp']>>
}

export interface BigIntInput {
  ne?: Maybe<Scalars['BigInt']>
  eq?: Maybe<Scalars['BigInt']>
  le?: Maybe<Scalars['BigInt']>
  lt?: Maybe<Scalars['BigInt']>
  ge?: Maybe<Scalars['BigInt']>
  gt?: Maybe<Scalars['BigInt']>
  in?: Maybe<Scalars['BigInt']>
  between?: Maybe<Array<Scalars['BigInt']>>
}
export interface ByteInput {
  ne?: Maybe<Scalars['Byte']>
  eq?: Maybe<Scalars['Byte']>
  le?: Maybe<Scalars['Byte']>
  lt?: Maybe<Scalars['Byte']>
  ge?: Maybe<Scalars['Byte']>
  gt?: Maybe<Scalars['Byte']>
  in?: Maybe<Array<Scalars['Byte']>>
  contains?: Maybe<Scalars['Byte']>
  startsWith?: Maybe<Scalars['Byte']>
  endsWith?: Maybe<Scalars['Byte']>
}
export interface CurrencyInput {
  ne?: Maybe<Scalars['Currency']>
  eq?: Maybe<Scalars['Currency']>
  le?: Maybe<Scalars['Currency']>
  lt?: Maybe<Scalars['Currency']>
  ge?: Maybe<Scalars['Currency']>
  gt?: Maybe<Scalars['Currency']>
  in?: Maybe<Array<Scalars['Currency']>>
  contains?: Maybe<Scalars['Currency']>
  startsWith?: Maybe<Scalars['Currency']>
  endsWith?: Maybe<Scalars['Currency']>
}
export interface DIDInput {
  ne?: Maybe<Scalars['DID']>
  eq?: Maybe<Scalars['DID']>
  le?: Maybe<Scalars['DID']>
  lt?: Maybe<Scalars['DID']>
  ge?: Maybe<Scalars['DID']>
  gt?: Maybe<Scalars['DID']>
  in?: Maybe<Array<Scalars['DID']>>
  contains?: Maybe<Scalars['DID']>
  startsWith?: Maybe<Scalars['DID']>
  endsWith?: Maybe<Scalars['DID']>
}
export interface DurationInput {
  ne?: Maybe<Scalars['Duration']>
  eq?: Maybe<Scalars['Duration']>
  le?: Maybe<Scalars['Duration']>
  lt?: Maybe<Scalars['Duration']>
  ge?: Maybe<Scalars['Duration']>
  gt?: Maybe<Scalars['Duration']>
  in?: Maybe<Array<Scalars['Duration']>>
  contains?: Maybe<Scalars['Duration']>
  startsWith?: Maybe<Scalars['Duration']>
  endsWith?: Maybe<Scalars['Duration']>
}
export interface EmailAddressInput {
  ne?: Maybe<Scalars['EmailAddress']>
  eq?: Maybe<Scalars['EmailAddress']>
  le?: Maybe<Scalars['EmailAddress']>
  lt?: Maybe<Scalars['EmailAddress']>
  ge?: Maybe<Scalars['EmailAddress']>
  gt?: Maybe<Scalars['EmailAddress']>
  in?: Maybe<Array<Scalars['EmailAddress']>>
  contains?: Maybe<Scalars['EmailAddress']>
  startsWith?: Maybe<Scalars['EmailAddress']>
  endsWith?: Maybe<Scalars['EmailAddress']>
}
export interface GUIDInput {
  ne?: Maybe<Scalars['GUID']>
  eq?: Maybe<Scalars['GUID']>
  le?: Maybe<Scalars['GUID']>
  lt?: Maybe<Scalars['GUID']>
  ge?: Maybe<Scalars['GUID']>
  gt?: Maybe<Scalars['GUID']>
  in?: Maybe<Array<Scalars['GUID']>>
  contains?: Maybe<Scalars['GUID']>
  startsWith?: Maybe<Scalars['GUID']>
  endsWith?: Maybe<Scalars['GUID']>
}
export interface HSLInput {
  ne?: Maybe<Scalars['HSL']>
  eq?: Maybe<Scalars['HSL']>
  le?: Maybe<Scalars['HSL']>
  lt?: Maybe<Scalars['HSL']>
  ge?: Maybe<Scalars['HSL']>
  gt?: Maybe<Scalars['HSL']>
  in?: Maybe<Array<Scalars['HSL']>>
  contains?: Maybe<Scalars['HSL']>
  startsWith?: Maybe<Scalars['HSL']>
  endsWith?: Maybe<Scalars['HSL']>
}
export interface HSLAInput {
  ne?: Maybe<Scalars['HSLA']>
  eq?: Maybe<Scalars['HSLA']>
  le?: Maybe<Scalars['HSLA']>
  lt?: Maybe<Scalars['HSLA']>
  ge?: Maybe<Scalars['HSLA']>
  gt?: Maybe<Scalars['HSLA']>
  in?: Maybe<Array<Scalars['HSLA']>>
  contains?: Maybe<Scalars['HSLA']>
  startsWith?: Maybe<Scalars['HSLA']>
  endsWith?: Maybe<Scalars['HSLA']>
}
export interface HexColorCodeInput {
  ne?: Maybe<Scalars['HexColorCode']>
  eq?: Maybe<Scalars['HexColorCode']>
  le?: Maybe<Scalars['HexColorCode']>
  lt?: Maybe<Scalars['HexColorCode']>
  ge?: Maybe<Scalars['HexColorCode']>
  gt?: Maybe<Scalars['HexColorCode']>
  in?: Maybe<Array<Scalars['HexColorCode']>>
  contains?: Maybe<Scalars['HexColorCode']>
  startsWith?: Maybe<Scalars['HexColorCode']>
  endsWith?: Maybe<Scalars['HexColorCode']>
}
export interface HexadecimalInput {
  ne?: Maybe<Scalars['Hexadecimal']>
  eq?: Maybe<Scalars['Hexadecimal']>
  le?: Maybe<Scalars['Hexadecimal']>
  lt?: Maybe<Scalars['Hexadecimal']>
  ge?: Maybe<Scalars['Hexadecimal']>
  gt?: Maybe<Scalars['Hexadecimal']>
  in?: Maybe<Array<Scalars['Hexadecimal']>>
  contains?: Maybe<Scalars['Hexadecimal']>
  startsWith?: Maybe<Scalars['Hexadecimal']>
  endsWith?: Maybe<Scalars['Hexadecimal']>
}
export interface IBANInput {
  ne?: Maybe<Scalars['IBAN']>
  eq?: Maybe<Scalars['IBAN']>
  le?: Maybe<Scalars['IBAN']>
  lt?: Maybe<Scalars['IBAN']>
  ge?: Maybe<Scalars['IBAN']>
  gt?: Maybe<Scalars['IBAN']>
  in?: Maybe<Array<Scalars['IBAN']>>
  contains?: Maybe<Scalars['IBAN']>
  startsWith?: Maybe<Scalars['IBAN']>
  endsWith?: Maybe<Scalars['IBAN']>
}
export interface IPv4Input {
  ne?: Maybe<Scalars['IPv4']>
  eq?: Maybe<Scalars['IPv4']>
  le?: Maybe<Scalars['IPv4']>
  lt?: Maybe<Scalars['IPv4']>
  ge?: Maybe<Scalars['IPv4']>
  gt?: Maybe<Scalars['IPv4']>
  in?: Maybe<Array<Scalars['IPv4']>>
  contains?: Maybe<Scalars['IPv4']>
  startsWith?: Maybe<Scalars['IPv4']>
  endsWith?: Maybe<Scalars['IPv4']>
}
export interface IPv6Input {
  ne?: Maybe<Scalars['IPv6']>
  eq?: Maybe<Scalars['IPv6']>
  le?: Maybe<Scalars['IPv6']>
  lt?: Maybe<Scalars['IPv6']>
  ge?: Maybe<Scalars['IPv6']>
  gt?: Maybe<Scalars['IPv6']>
  in?: Maybe<Array<Scalars['IPv6']>>
  contains?: Maybe<Scalars['IPv6']>
  startsWith?: Maybe<Scalars['IPv6']>
  endsWith?: Maybe<Scalars['IPv6']>
}
export interface ISBNInput {
  ne?: Maybe<Scalars['ISBN']>
  eq?: Maybe<Scalars['ISBN']>
  le?: Maybe<Scalars['ISBN']>
  lt?: Maybe<Scalars['ISBN']>
  ge?: Maybe<Scalars['ISBN']>
  gt?: Maybe<Scalars['ISBN']>
  in?: Maybe<Array<Scalars['ISBN']>>
  contains?: Maybe<Scalars['ISBN']>
  startsWith?: Maybe<Scalars['ISBN']>
  endsWith?: Maybe<Scalars['ISBN']>
}
export interface ISO8601DurationInput {
  ne?: Maybe<Scalars['ISO8601Duration']>
  eq?: Maybe<Scalars['ISO8601Duration']>
  le?: Maybe<Scalars['ISO8601Duration']>
  lt?: Maybe<Scalars['ISO8601Duration']>
  ge?: Maybe<Scalars['ISO8601Duration']>
  gt?: Maybe<Scalars['ISO8601Duration']>
  in?: Maybe<Array<Scalars['ISO8601Duration']>>
  contains?: Maybe<Scalars['ISO8601Duration']>
  startsWith?: Maybe<Scalars['ISO8601Duration']>
  endsWith?: Maybe<Scalars['ISO8601Duration']>
}
export interface LatitudeInput {
  ne?: Maybe<Scalars['Latitude']>
  eq?: Maybe<Scalars['Latitude']>
  le?: Maybe<Scalars['Latitude']>
  lt?: Maybe<Scalars['Latitude']>
  ge?: Maybe<Scalars['Latitude']>
  gt?: Maybe<Scalars['Latitude']>
  in?: Maybe<Scalars['Latitude']>
  between?: Maybe<Array<Scalars['Latitude']>>
}
export interface LocalDateInput {
  ne?: Maybe<Scalars['LocalDate']>
  eq?: Maybe<Scalars['LocalDate']>
  le?: Maybe<Scalars['LocalDate']>
  lt?: Maybe<Scalars['LocalDate']>
  ge?: Maybe<Scalars['LocalDate']>
  gt?: Maybe<Scalars['LocalDate']>
  in?: Maybe<Array<Scalars['LocalDate']>>
  between?: Maybe<Array<Scalars['LocalDate']>>
}
export interface LocalEndTimeInput {
  ne?: Maybe<Scalars['LocalEndTime']>
  eq?: Maybe<Scalars['LocalEndTime']>
  le?: Maybe<Scalars['LocalEndTime']>
  lt?: Maybe<Scalars['LocalEndTime']>
  ge?: Maybe<Scalars['LocalEndTime']>
  gt?: Maybe<Scalars['LocalEndTime']>
  in?: Maybe<Array<Scalars['LocalEndTime']>>
  contains?: Maybe<Scalars['LocalEndTime']>
  startsWith?: Maybe<Scalars['LocalEndTime']>
  endsWith?: Maybe<Scalars['LocalEndTime']>
}
export interface LocalTimeInput {
  ne?: Maybe<Scalars['LocalTime']>
  eq?: Maybe<Scalars['LocalTime']>
  le?: Maybe<Scalars['LocalTime']>
  lt?: Maybe<Scalars['LocalTime']>
  ge?: Maybe<Scalars['LocalTime']>
  gt?: Maybe<Scalars['LocalTime']>
  in?: Maybe<Array<Scalars['LocalTime']>>
  between?: Maybe<Array<Scalars['LocalTime']>>
}
export interface LongitudeInput {
  ne?: Maybe<Scalars['Longitude']>
  eq?: Maybe<Scalars['Longitude']>
  le?: Maybe<Scalars['Longitude']>
  lt?: Maybe<Scalars['Longitude']>
  ge?: Maybe<Scalars['Longitude']>
  gt?: Maybe<Scalars['Longitude']>
  in?: Maybe<Scalars['Longitude']>
  between?: Maybe<Array<Scalars['Longitude']>>
}
export interface MACInput {
  ne?: Maybe<Scalars['MAC']>
  eq?: Maybe<Scalars['MAC']>
  le?: Maybe<Scalars['MAC']>
  lt?: Maybe<Scalars['MAC']>
  ge?: Maybe<Scalars['MAC']>
  gt?: Maybe<Scalars['MAC']>
  in?: Maybe<Array<Scalars['MAC']>>
  contains?: Maybe<Scalars['MAC']>
  startsWith?: Maybe<Scalars['MAC']>
  endsWith?: Maybe<Scalars['MAC']>
}
export interface NegativeFloatInput {
  ne?: Maybe<Scalars['NegativeFloat']>
  eq?: Maybe<Scalars['NegativeFloat']>
  le?: Maybe<Scalars['NegativeFloat']>
  lt?: Maybe<Scalars['NegativeFloat']>
  ge?: Maybe<Scalars['NegativeFloat']>
  gt?: Maybe<Scalars['NegativeFloat']>
  in?: Maybe<Array<Scalars['NegativeFloat']>>
  between?: Maybe<Array<Scalars['NegativeFloat']>>
}
export interface NegativeIntInput {
  ne?: Maybe<Scalars['NegativeInt']>
  eq?: Maybe<Scalars['NegativeInt']>
  le?: Maybe<Scalars['NegativeInt']>
  lt?: Maybe<Scalars['NegativeInt']>
  ge?: Maybe<Scalars['NegativeInt']>
  gt?: Maybe<Scalars['NegativeInt']>
  in?: Maybe<Scalars['NegativeInt']>
  between?: Maybe<Array<Scalars['NegativeInt']>>
}
export interface NonEmptyStringInput {
  ne?: Maybe<Scalars['NonEmptyString']>
  eq?: Maybe<Scalars['NonEmptyString']>
  le?: Maybe<Scalars['NonEmptyString']>
  lt?: Maybe<Scalars['NonEmptyString']>
  ge?: Maybe<Scalars['NonEmptyString']>
  gt?: Maybe<Scalars['NonEmptyString']>
  in?: Maybe<Array<Scalars['NonEmptyString']>>
  contains?: Maybe<Scalars['NonEmptyString']>
  startsWith?: Maybe<Scalars['NonEmptyString']>
  endsWith?: Maybe<Scalars['NonEmptyString']>
}
export interface NonNegativeFloatInput {
  ne?: Maybe<Scalars['NonNegativeFloat']>
  eq?: Maybe<Scalars['NonNegativeFloat']>
  le?: Maybe<Scalars['NonNegativeFloat']>
  lt?: Maybe<Scalars['NonNegativeFloat']>
  ge?: Maybe<Scalars['NonNegativeFloat']>
  gt?: Maybe<Scalars['NonNegativeFloat']>
  in?: Maybe<Array<Scalars['NonNegativeFloat']>>
  between?: Maybe<Array<Scalars['NonNegativeFloat']>>
}
export interface NonNegativeIntInput {
  ne?: Maybe<Scalars['NonNegativeInt']>
  eq?: Maybe<Scalars['NonNegativeInt']>
  le?: Maybe<Scalars['NonNegativeInt']>
  lt?: Maybe<Scalars['NonNegativeInt']>
  ge?: Maybe<Scalars['NonNegativeInt']>
  gt?: Maybe<Scalars['NonNegativeInt']>
  in?: Maybe<Scalars['NonNegativeInt']>
  between?: Maybe<Array<Scalars['NonNegativeInt']>>
}
export interface NonPositiveFloatInput {
  ne?: Maybe<Scalars['NonPositiveFloat']>
  eq?: Maybe<Scalars['NonPositiveFloat']>
  le?: Maybe<Scalars['NonPositiveFloat']>
  lt?: Maybe<Scalars['NonPositiveFloat']>
  ge?: Maybe<Scalars['NonPositiveFloat']>
  gt?: Maybe<Scalars['NonPositiveFloat']>
  in?: Maybe<Array<Scalars['NonPositiveFloat']>>
  between?: Maybe<Array<Scalars['NonPositiveFloat']>>
}
export interface NonPositiveIntInput {
  ne?: Maybe<Scalars['NonPositiveInt']>
  eq?: Maybe<Scalars['NonPositiveInt']>
  le?: Maybe<Scalars['NonPositiveInt']>
  lt?: Maybe<Scalars['NonPositiveInt']>
  ge?: Maybe<Scalars['NonPositiveInt']>
  gt?: Maybe<Scalars['NonPositiveInt']>
  in?: Maybe<Scalars['NonPositiveInt']>
  between?: Maybe<Array<Scalars['NonPositiveInt']>>
}
export interface PhoneNumberInput {
  ne?: Maybe<Scalars['PhoneNumber']>
  eq?: Maybe<Scalars['PhoneNumber']>
  le?: Maybe<Scalars['PhoneNumber']>
  lt?: Maybe<Scalars['PhoneNumber']>
  ge?: Maybe<Scalars['PhoneNumber']>
  gt?: Maybe<Scalars['PhoneNumber']>
  in?: Maybe<Array<Scalars['PhoneNumber']>>
  contains?: Maybe<Scalars['PhoneNumber']>
  startsWith?: Maybe<Scalars['PhoneNumber']>
  endsWith?: Maybe<Scalars['PhoneNumber']>
}
export interface PortInput {
  ne?: Maybe<Scalars['Port']>
  eq?: Maybe<Scalars['Port']>
  le?: Maybe<Scalars['Port']>
  lt?: Maybe<Scalars['Port']>
  ge?: Maybe<Scalars['Port']>
  gt?: Maybe<Scalars['Port']>
  in?: Maybe<Scalars['Port']>
  between?: Maybe<Array<Scalars['Port']>>
}
export interface PositiveFloatInput {
  ne?: Maybe<Scalars['PositiveFloat']>
  eq?: Maybe<Scalars['PositiveFloat']>
  le?: Maybe<Scalars['PositiveFloat']>
  lt?: Maybe<Scalars['PositiveFloat']>
  ge?: Maybe<Scalars['PositiveFloat']>
  gt?: Maybe<Scalars['PositiveFloat']>
  in?: Maybe<Array<Scalars['PositiveFloat']>>
  between?: Maybe<Array<Scalars['PositiveFloat']>>
}
export interface PositiveIntInput {
  ne?: Maybe<Scalars['PositiveInt']>
  eq?: Maybe<Scalars['PositiveInt']>
  le?: Maybe<Scalars['PositiveInt']>
  lt?: Maybe<Scalars['PositiveInt']>
  ge?: Maybe<Scalars['PositiveInt']>
  gt?: Maybe<Scalars['PositiveInt']>
  in?: Maybe<Scalars['PositiveInt']>
  between?: Maybe<Array<Scalars['PositiveInt']>>
}
export interface PostalCodeInput {
  ne?: Maybe<Scalars['PostalCode']>
  eq?: Maybe<Scalars['PostalCode']>
  le?: Maybe<Scalars['PostalCode']>
  lt?: Maybe<Scalars['PostalCode']>
  ge?: Maybe<Scalars['PostalCode']>
  gt?: Maybe<Scalars['PostalCode']>
  in?: Maybe<Array<Scalars['PostalCode']>>
  contains?: Maybe<Scalars['PostalCode']>
  startsWith?: Maybe<Scalars['PostalCode']>
  endsWith?: Maybe<Scalars['PostalCode']>
}
export interface RGBInput {
  ne?: Maybe<Scalars['RGB']>
  eq?: Maybe<Scalars['RGB']>
  le?: Maybe<Scalars['RGB']>
  lt?: Maybe<Scalars['RGB']>
  ge?: Maybe<Scalars['RGB']>
  gt?: Maybe<Scalars['RGB']>
  in?: Maybe<Array<Scalars['RGB']>>
  contains?: Maybe<Scalars['RGB']>
  startsWith?: Maybe<Scalars['RGB']>
  endsWith?: Maybe<Scalars['RGB']>
}
export interface RGBAInput {
  ne?: Maybe<Scalars['RGBA']>
  eq?: Maybe<Scalars['RGBA']>
  le?: Maybe<Scalars['RGBA']>
  lt?: Maybe<Scalars['RGBA']>
  ge?: Maybe<Scalars['RGBA']>
  gt?: Maybe<Scalars['RGBA']>
  in?: Maybe<Array<Scalars['RGBA']>>
  contains?: Maybe<Scalars['RGBA']>
  startsWith?: Maybe<Scalars['RGBA']>
  endsWith?: Maybe<Scalars['RGBA']>
}
export interface URLInput {
  ne?: Maybe<Scalars['URL']>
  eq?: Maybe<Scalars['URL']>
  le?: Maybe<Scalars['URL']>
  lt?: Maybe<Scalars['URL']>
  ge?: Maybe<Scalars['URL']>
  gt?: Maybe<Scalars['URL']>
  in?: Maybe<Array<Scalars['URL']>>
  contains?: Maybe<Scalars['URL']>
  startsWith?: Maybe<Scalars['URL']>
  endsWith?: Maybe<Scalars['URL']>
}
export interface USCurrencyInput {
  ne?: Maybe<Scalars['USCurrency']>
  eq?: Maybe<Scalars['USCurrency']>
  le?: Maybe<Scalars['USCurrency']>
  lt?: Maybe<Scalars['USCurrency']>
  ge?: Maybe<Scalars['USCurrency']>
  gt?: Maybe<Scalars['USCurrency']>
  in?: Maybe<Array<Scalars['USCurrency']>>
  contains?: Maybe<Scalars['USCurrency']>
  startsWith?: Maybe<Scalars['USCurrency']>
  endsWith?: Maybe<Scalars['USCurrency']>
}
export interface UUIDInput {
  ne?: Maybe<Scalars['UUID']>
  eq?: Maybe<Scalars['UUID']>
  le?: Maybe<Scalars['UUID']>
  lt?: Maybe<Scalars['UUID']>
  ge?: Maybe<Scalars['UUID']>
  gt?: Maybe<Scalars['UUID']>
  in?: Maybe<Array<Scalars['UUID']>>
  contains?: Maybe<Scalars['UUID']>
  startsWith?: Maybe<Scalars['UUID']>
  endsWith?: Maybe<Scalars['UUID']>
}
export interface UtcOffsetInput {
  ne?: Maybe<Scalars['UtcOffset']>
  eq?: Maybe<Scalars['UtcOffset']>
  le?: Maybe<Scalars['UtcOffset']>
  lt?: Maybe<Scalars['UtcOffset']>
  ge?: Maybe<Scalars['UtcOffset']>
  gt?: Maybe<Scalars['UtcOffset']>
  in?: Maybe<Array<Scalars['UtcOffset']>>
  contains?: Maybe<Scalars['UtcOffset']>
  startsWith?: Maybe<Scalars['UtcOffset']>
  endsWith?: Maybe<Scalars['UtcOffset']>
}

type GraphbackScalarInput = BigIntInput | ByteInput | CurrencyInput | DIDInput |
DurationInput | EmailAddressInput | GUIDInput | HSLInput | HSLAInput | HexColorCodeInput |
HexadecimalInput | IBANInput | IPv4Input | IPv6Input | ISBNInput | ISO8601DurationInput |
LatitudeInput | LocalDateInput | LocalEndTimeInput | LocalTimeInput | LongitudeInput |
MACInput | NegativeFloatInput | NegativeIntInput | NonEmptyStringInput | NonNegativeFloatInput |
NonNegativeIntInput | NonPositiveFloatInput | NonPositiveIntInput | PhoneNumberInput |
PortInput | PositiveFloatInput | PositiveIntInput | PostalCodeInput | RGBAInput |
RGBInput | URLInput | USCurrencyInput | UUIDInput | UtcOffsetInput |
DateInput | DateTimeInput | TimeInput | TimestampInput

export type QueryFilterOperator = keyof IdInput | keyof BooleanInput | keyof StringInput | keyof FloatInput | keyof IntInput | keyof GraphbackScalarInput
/**
 * Query filter used in Graphback services and data providers
 */
export type QueryFilter<T = any> = {
  [P in keyof T]: IdInput | BooleanInput | StringInput | FloatInput | IntInput | GraphbackScalarInput | any;
} & RootQuerySelector<T>

interface RootQuerySelector<T = any> {
  and?: Array<QueryFilter<T>>
  or?: Array<QueryFilter<T>>
  not?: QueryFilter<T>
}
