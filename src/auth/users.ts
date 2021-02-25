import { string, type } from "../fields"
import { Module } from "../types"

export default (): Module => ({
  schema: {
    Auth: {
      id: false,
      timestamps: false,
      fields: {
        token: string().required(),
        user: type("User").required(),
      },
    },
    User: {
      fields: {
        name: string().required(),
        abbr: string(),
        description: string(),
      },
    },
  },
  // extend: {
  //   Login: {
  //     schema: "Login(token: String!): Auth",
  //     resolver: (obj, params, context) => {
  //       return {
  //         token: "FAKE123",
  //         user: {},
  //       }
  //     },
  //   },
  //   Register: {
  //     schema: "Login(token: String!): Auth",
  //     resolver: (obj, params, context) => {
  //       return {
  //         token: "FAKE123",
  //         user: {},
  //       }
  //     },
  //   },
  // },
  directives: {
    authenticate: {
      typeDef: "directive @authenticate on FIELD_DEFINITION",
      handler: async function (next, src, args, context) {
        throw new Error("AUTHENTICATE")
      },
    },
    admin: {
      typeDef: "directive @admin on FIELD_DEFINITION",
      handler: async function (next, src, args, context) {
        throw new Error("ADMIN")
      },
    },
  },
})
