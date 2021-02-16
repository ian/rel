import { Field } from "./base"
import Geo from "./geo"
import PhoneNumber from "./phoneNumber"
import String from "./string"
import Type from "./type"

export type GeneratedField = () => Field

export const geo: GeneratedField = () => new Geo()
export const phoneNumber: GeneratedField = () => new PhoneNumber()
export const string: GeneratedField = () => new String()
export const type = (model) => new Type(model)

export default {
  geo,
  phoneNumber,
  string,
  type,
}
