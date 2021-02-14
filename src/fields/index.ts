import Geo from "./geo"
import PhoneNumber from "./phoneNumber"
import String from "./string"
import Type from "./type"

export const geo = () => new Geo()
export const phoneNumber = () => new PhoneNumber()
export const string = () => new String()
export const type = (model) => new Type(model)

export default {
  geo,
  phoneNumber,
  string,
  type,
}
