import { string } from "yup"
import BaseField from "./base"

export default class String extends BaseField {
  _gqlName = "String"
  _validator = string()
}
