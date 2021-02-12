// export * as fields from "yup"
import BaseField from "./base"

// type StringType = {
//   gqlName: string
//   isRequired: boolean

//   required: () => void
// }

// export function string(): StringType {
//   function String() {
//     this.gqlName = "String"
//     this.isRequired = false

//     this.required = () => {
//       this.isRequired = true
//       return this
//     }
//   }

//   return new String()
// }

export default class StringField extends BaseField {
  gqlName = "String"
}
