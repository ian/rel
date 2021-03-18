import { Rel, Fields } from "../../property"
import { Module, Direction } from "../../types"

const { string, type } = Fields

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
        following: Rel("FOLLOWS").to("User"),
        followers: Rel("FOLLOWS").to("User").direction(Direction.IN),
      },
    },
  },
} as Module
