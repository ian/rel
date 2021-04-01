import Boolean from "./fields/boolean"
import UUID from "./fields/uuid"
import Int from "./fields/int"
import DateTime from "./fields/dateTime"
import Field from "./fields/field"
import Geo from "./fields/geo"
import PhoneNumber from "./fields/phoneNumber"
import String from "./fields/string"
import Slug from "./fields/slug"
import Type from "./fields/type"
import Array from "./fields/array"

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

export { default as BooleanField } from "./fields/boolean"
export { default as UUIDField } from "./fields/uuid"
export { default as IntField } from "./fields/int"
export { default as DateTimeField } from "./fields/dateTime"
export { default as Field } from "./fields/field"
export { default as GeoField } from "./fields/geo"
export { default as PhoneNumberField } from "./fields/phoneNumber"
export { default as StringField } from "./fields/string"
export { default as SlugField } from "./fields/slug"
export { default as TypeField } from "./fields/type"
export { default as ArrayField } from "./fields/array"

export { default as ModelField } from "./model"
