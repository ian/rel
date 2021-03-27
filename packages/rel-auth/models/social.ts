import { Module, Direction } from "@reldb/types"
import { string, type, rel } from "@reldb/meta"

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
      relations: {
        following: rel("FOLLOWS").to("User"),
        followers: rel("FOLLOWS").to("User").direction(Direction.IN),
      },
    },
  },
} as Module
