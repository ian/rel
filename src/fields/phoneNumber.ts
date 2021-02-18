import Field from "./field"
import { string } from "yup"

function e164() {
  return string().matches(/^\+?[1]\d{10}$/, "Invalid phone number")
}
export default class PhoneNumber extends Field {
  _validator = e164()

  constructor() {
    super("PhoneNumber")
  }
}
