import Boolean from "./boolean"
import UUID from "./uuid"
import Int from "./int"
import DateTime from "./dateTime"
import Field from "./field"
import Geo from "./geo"
import PhoneNumber from "./phoneNumber"
import String from "./string"
import Slug from "./slug"
import Ref from "./ref"
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

export const ref: GeneratedField = (model) => new Ref(model)
export const array: GeneratedField = (contains) => new Array(contains)

export { default as Boolean } from "./boolean"
export { default as UUID } from "./uuid"
export { default as Int } from "./int"
export { default as DateTime } from "./dateTime"
export { default as Field } from "./field"
export { default as Geo } from "./geo"
export { default as PhoneNumber } from "./phoneNumber"
export { default as String } from "./string"
export { default as Slug } from "./slug"
export { default as Ref } from "./ref"
export { default as Array } from "./array"
