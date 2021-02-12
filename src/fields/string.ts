export * as fields from "yup"

type StringType = {
  gqlName: string
  isRequired: boolean

  required: () => void
}

export function string(): StringType {
  function String() {
    this.gqlName = "String"
    this.isRequired = false

    this.required = () => {
      this.isRequired = true
      return this
    }
  }

  return new String()
}
