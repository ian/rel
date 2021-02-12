type Field = {
  gqlName: string
  isRequired: boolean
}

export type Fields = {
  [key: string]: Field
}
