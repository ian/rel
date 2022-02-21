import { DateTimeResolver, UUIDResolver } from "graphql-scalars"

// export { default as String } from "./String"

export default {
  DateTime: DateTimeResolver,
  ID: UUIDResolver,
}
