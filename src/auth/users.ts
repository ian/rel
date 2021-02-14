export default () => ({
  directives: {
    authenticate: {
      schema: "directive @authenticate on FIELD_DEFINITION",
      handler: async function (next, src, args, context) {
        throw new Error("AUTHENTICATE")
      },
    },
    admin: {
      schema: "directive @admin on FIELD_DEFINITION",
      handler: async function (next, src, args, context) {
        throw new Error("ADMIN")
      },
    },
  },
})
