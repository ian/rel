import { string, type } from "../fields"
import { Module, ENDPOINTS } from "../types"

export default (): Module => ({
  schema: {
    Auth: {
      id: false,
      timestamps: false,
      input: false,
      fields: {
        token: string().required(),
        user: type("User").required(),
      },
    },
    User: {
      fields: {
        name: string().required(),
      },
    },
  },
  directives: {
    authenticate: {
      typeDef: "directive @authenticate on FIELD_DEFINITION",
      resolver: async function (next, src, args, context) {
        throw new Error("AUTHENTICATE")
      },
    },
    admin: {
      typeDef: "directive @admin on FIELD_DEFINITION",
      resolver: async function (next, src, args, context) {
        throw new Error("ADMIN")
      },
    },
  },
  endpoints: {
    Login: {
      type: ENDPOINTS.MUTATOR,
      typeDef: {
        params: { token: string().required() },
        returns: type("Auth"),
      },
      resolver: (obj, params, context) => {
        return {
          token: "FAKE123",
          user: {},
        }
      },
    },
    Register: {
      type: ENDPOINTS.MUTATOR,
      typeDef: {
        params: { input: type("UserInput").required() },
        returns: type("Auth"),
      },
      resolver: (obj, params, context) => {
        return {
          token: "FAKE123",
          user: {},
        }
      },
    },
  },
})
