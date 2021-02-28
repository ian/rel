import { Fields, Field, Params, ReducedType } from "~/types"

function generateParams(params: Params) {
  return Object.entries(params)
    .map((entry) => {
      const [name, field] = entry
      return `${name}: ${field.toGQL()}`
    })
    .join(", ")
}

// function generateField(name, field: ReducedField) {
//   const { typeDef } = field

//   if (!typeDef) throw new Error(`Missing typedef for ${name}`)

//   if (typeof typeDef === "string") {
//     return typeDef
//   } else {
//     const { params, returns } = typeDef

//     const fieldDef = [name]
//     if (params) {
//       fieldDef.push(`( ${generateParams(params)} )`)
//     }
//     fieldDef.push(": ")
//     fieldDef.push(returns.toGQL())

//     return fieldDef.join("")
//   }
// }

function generateProperty(name, field: Field) {
  const fieldDef = [name]
  // const { params, returns } = typeDef

  // if (params) {
  //   fieldDef.push(`( ${generateParams(params)} )`)
  // }
  // fieldDef.push(": ")
  // fieldDef.push(returns.toGQL())

  return fieldDef.join("")
}

// export function generateProperties(fields: Fields) {
//   // const { guards = true } = opts
//   const gqlFields = []

//   Object.entries(fields).forEach((fieldObj) => {
//     const [name, def] = fieldObj
//     gqlFields.push(generateField(name, def))
//   })

//   return gqlFields.join("\n")
// }

export function generateType(name: string, type: ReducedType) {
  const gqlFields = []

  Object.entries(type).forEach((fieldObj) => {
    const [name, def] = fieldObj
    // const gql = generateField(name, def)
    console.log("fieldObj", fieldObj)
    const gql = "TEMP"
    gqlFields.push(gql)
  })

  return `type ${name} {
  ${gqlFields.join("\n")}
}`
}
