import UUID from "./uuid"
import Int from "./int"
import DateTime from "./dateTime"
import Field from "./field"
import Geo from "./geo"
import PhoneNumber from "./phoneNumber"
import String from "./string"

import Type from "./type"
import Array from "./array"

export type GeneratedField = () => Field

export const uuid: GeneratedField = () => new UUID()
export const int: GeneratedField = () => new Int()
export const dateTime: GeneratedField = () => new DateTime()
export const geo: GeneratedField = () => new Geo()
export const phoneNumber: GeneratedField = () => new PhoneNumber()
export const string: GeneratedField = () => new String()
export const type = (model) => new Type(model)
export const array = (contains) => new Array(contains)

export default {
  uuid,
  int,
  dateTime,
  geo,
  phoneNumber,
  string,
  type,
  array,
}
