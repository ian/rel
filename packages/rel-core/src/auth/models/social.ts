import { string, type } from "../../fields"
import { Module, Direction } from "../../types"

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
        following: {
          from: {
            label: "User",
          },
          to: {
            label: "User",
          },
          rel: {
            label: "FOLLOWS",
          },
        },
        followers: {
          from: {
            label: "User",
          },
          to: {
            label: "User",
          },
          rel: {
            label: "FOLLOWS",
            direction: Direction.IN,
          },
        },
      },
    },
  },
} as Module
