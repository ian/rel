export { default as Boolean } from "./boolean"
export { default as UUID } from "./uuid"
export { default as Int } from "./int"
export { default as Float } from "./float"
export { default as DateTime } from "./dateTime"
export { default as Geo } from "./geo"
export { default as PhoneNumber } from "./phoneNumber"
export { default as String } from "./string"
export { default as Slug } from "./slug"
export { default as Ref } from "./ref"
export { default as Array } from "./array"

export { default as Field } from "./field"

import Boolean from "./boolean"
import UUID from "./uuid"
import Int from "./int"
import Float from "./float"
import DateTime from "./dateTime"
import Geo from "./geo"
import PhoneNumber from "./phoneNumber"
import String from "./string"
import Slug from "./slug"
import Ref from "./ref"
import Array from "./array"

export default {
  boolean: () => new Boolean(),
  uuid: () => new UUID(),
  int: () => new Int(),
  float: () => new Float(),
  dateTime: () => new DateTime(),
  geo: () => new Geo(),
  phoneNumber: () => new PhoneNumber(),
  string: () => new String(),
  slug: (opts) => new Slug(opts),

  ref: (model) => new Ref(model),
  array: (contains) => new Array(contains),
}
