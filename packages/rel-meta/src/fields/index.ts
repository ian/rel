import Boolean from "./boolean"
import UUID from "./uuid"
import Int from "./int"
import DateTime from "./dateTime"
import Field from "./field"
import Geo from "./geo"
import PhoneNumber from "./phoneNumber"
import String from "./string"
import Slug from "./slug"
import Type from "./type"
import Array from "./array"

type GeneratedField = (any?) => Field

export const boolean: GeneratedField = () => new Boolean()
export const uuid: GeneratedField = () => new UUID()
export const int: GeneratedField = () => new Int()
export const dateTime: GeneratedField = () => new DateTime()
export const geo: GeneratedField = () => new Geo()
export const phoneNumber: GeneratedField = () => new PhoneNumber()
export const string: GeneratedField = () => new String()
export const slug: GeneratedField = (opts) => new Slug(opts)

export const type: GeneratedField = (model) => new Type(model)
export const array: GeneratedField = (contains) => new Array(contains)

export { default as BooleanField } from "./boolean"
export { default as UUIDField } from "./uuid"
export { default as IntField } from "./int"
export { default as DateTimeField } from "./dateTime"
export { default as Field } from "./field"
export { default as GeoField } from "./geo"
export { default as PhoneNumberField } from "./phoneNumber"
export { default as StringField } from "./string"
export { default as SlugField } from "./slug"
export { default as TypeField } from "./type"
export { default as ArrayField } from "./array"
