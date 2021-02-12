// type StringType = {
//   gqlName: string
//   isRequired: boolean
//   required: () => void
// }

// export function string(): ObjectType {
//   function String() {
//     this.gqlName = "Geo"
//     this.isRequired = false

//     this.required = () => {
//       this.isRequired = true
//       return this
//     }
//   }

//   return new String()
// }

export default class BaseField {
  isRequired = false

  required() {
    this.isRequired = true
    return this
  }

  guard(level) {
    return this
  }
}
