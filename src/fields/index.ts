import ID from "./id"
import Field from "./field"
import Geo from "./geo"
import PhoneNumber from "./phoneNumber"
import String from "./string"
import Type from "./type"

export type GeneratedField = () => Field

export const id: GeneratedField = () => new ID()
export const geo: GeneratedField = () => new Geo()
export const phoneNumber: GeneratedField = () => new PhoneNumber()
export const string: GeneratedField = () => new String()
export const type = (model) => new Type(model)

export default {
  id,
  geo,
  phoneNumber,
  string,
  type,
}
