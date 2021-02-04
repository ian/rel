type StringType = {
  typeName: string
  isRequired: boolean

  required: () => void
}

export function string(): StringType {
  function String() {
    this.typeName = "String"
    this.isRequired = false

    this.required = () => {
      this.isRequired = true
      return this
    }
  }

  return new String()
}
