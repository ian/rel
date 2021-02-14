import BaseField from "./base"
import { string } from "yup"

export default class Geo extends BaseField {
  _gqlName = "Geo"
  _validator = string()
}
