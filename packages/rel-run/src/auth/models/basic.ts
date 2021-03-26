import { string, type } from "@reldb/meta"
import { Module } from "@reldb/types"

export default {
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
} as Module
