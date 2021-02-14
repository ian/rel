import BaseField from "./base"
import { string } from "yup"

function e164() {
  return string().matches(/^\+?[1]\d{10}$/, "Invalid phone number")
}
export default class PhoneNumber extends BaseField {
  _gqlName = "Geo"
  _validator = e164()
}
